// Mapbox API 유틸리티 (무료 플랜 최적화)

export interface MapboxPlace {
  id: string;
  type: 'Feature';
  place_type: string[];
  relevance: number;
  properties: {
    wikidata?: string;
    short_code?: string;
    address?: string;
    category?: string;
    landmark?: boolean;
    maki?: string;
  };
  text: string;
  place_name: string;
  bbox?: number[];
  center: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
  context?: Array<{
    id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
  }>;
}

export interface MapboxSearchResult {
  type: 'FeatureCollection';
  query: string[];
  features: MapboxPlace[];
  attribution: string;
}

// Mapbox API 설정
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGFydTA5MTQiLCJhIjoiY21jdHRhczlkMDJodzJtb29kcWdqcWM2ZSJ9.YboU25M0nNjue3naYFgfMA';
const MAPBOX_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

// 무료 플랜 한도 관리
const DAILY_LIMIT = 100000; // Mapbox 무료 플랜: 일 100,000회
const MONTHLY_LIMIT = 100000; // Mapbox 무료 플랜: 월 100,000회

// 요청 카운터 (실제로는 서버에서 관리해야 함)
let dailyRequestCount = 0;
let monthlyRequestCount = 0;
let lastResetDate = new Date().getDate();
let lastResetMonth = new Date().getMonth();

// 요청 제한 및 캐싱
const requestCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30분 (무료 플랜 최적화)
const REQUEST_DELAY = 100; // 100ms 딜레이 (무료 플랜 최적화)

// API 상태 관리
let isMapboxDisabled = false;
let disableReason = '';

// 요청 한도 확인
const checkRequestLimit = (): boolean => {
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  
  // 일일 리셋
  if (currentDate !== lastResetDate) {
    dailyRequestCount = 0;
    lastResetDate = currentDate;
  }
  
  // 월간 리셋
  if (currentMonth !== lastResetMonth) {
    monthlyRequestCount = 0;
    lastResetMonth = currentMonth;
  }
  
  const isWithinLimit = dailyRequestCount < DAILY_LIMIT && monthlyRequestCount < MONTHLY_LIMIT;
  
  // 한도 초과 시 Mapbox 비활성화
  if (!isWithinLimit && !isMapboxDisabled) {
    isMapboxDisabled = true;
    if (dailyRequestCount >= DAILY_LIMIT) {
      disableReason = '일일 요청 한도 초과';
    } else if (monthlyRequestCount >= MONTHLY_LIMIT) {
      disableReason = '월간 요청 한도 초과';
    }
    console.warn(`Mapbox API 비활성화: ${disableReason}`);
  }
  
  return isWithinLimit;
};

// 요청 카운터 증가
const incrementRequestCount = (): void => {
  dailyRequestCount++;
  monthlyRequestCount++;
};

// 캐시된 API 요청
const cachedFetch = async (url: string): Promise<any> => {
  // Mapbox가 비활성화된 경우
  if (isMapboxDisabled) {
    throw new Error(`Mapbox API 비활성화됨: ${disableReason}`);
  }
  
  const cacheKey = url;
  const now = Date.now();
  
  // 캐시 확인
  if (requestCache.has(cacheKey)) {
    const cached = requestCache.get(cacheKey)!;
    if (now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  }
  
  // 요청 한도 확인
  if (!checkRequestLimit()) {
    throw new Error('일일 또는 월간 API 요청 한도에 도달했습니다.');
  }
  
  // 요청 딜레이
  await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 요청 카운터 증가
    incrementRequestCount();
    
    // 캐시 저장
    requestCache.set(cacheKey, { data, timestamp: now });
    
    return data;
  } catch (error) {
    console.error('Mapbox API 오류:', error);
    throw error;
  }
};

// 장소 타입 분류
export const getPlaceType = (placeTypes: string[]): 'city' | 'airport' | 'station' | 'location' => {
  if (placeTypes.includes('place') || placeTypes.includes('region')) {
    return 'city';
  }
  if (placeTypes.includes('poi') && placeTypes.includes('airport')) {
    return 'airport';
  }
  if (placeTypes.includes('poi') && (placeTypes.includes('station') || placeTypes.includes('transit'))) {
    return 'station';
  }
  return 'location';
};

// 텍스트 검색 (여행지, 공항, 역 등) - 다국어 지원
export const searchPlaces = async (
  query: string,
  proximity?: { lng: number; lat: number },
  limit: number = 10
): Promise<MapboxPlace[]> => {
  try {
    // 다국어 검색을 위해 여러 언어로 시도
    const languages = ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de'];
    let allResults: MapboxPlace[] = [];
    
    for (const lang of languages) {
      try {
        let url = `${MAPBOX_BASE_URL}/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&language=${lang}&limit=${Math.ceil(limit / languages.length)}&types=place,poi`;
        
        if (proximity) {
          url += `&proximity=${proximity.lng},${proximity.lat}`;
        }
        
        const data: MapboxSearchResult = await cachedFetch(url);
        
        if (data.features && data.features.length > 0) {
          allResults = [...allResults, ...data.features];
        }
      } catch (error) {
        console.warn(`${lang} 언어 검색 실패:`, error);
        continue;
      }
    }
    
    // 중복 제거 및 정렬
    const uniqueResults = allResults.filter((place, index, self) => 
      index === self.findIndex(p => p.id === place.id)
    );
    
    return uniqueResults.slice(0, limit);
  } catch (error) {
    console.error('다국어 장소 검색 실패:', error);
    return [];
  }
};

// 자동완성 검색 (무료 플랜 최적화) - 다국어 지원
export const getPlaceAutocomplete = async (
  input: string,
  proximity?: { lng: number; lat: number },
  limit: number = 5
): Promise<MapboxPlace[]> => {
  if (input.length < 2) return [];
  
  try {
    // 다국어 자동완성을 위해 여러 언어로 시도
    const languages = ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de'];
    let allResults: MapboxPlace[] = [];
    
    for (const lang of languages) {
      try {
        let url = `${MAPBOX_BASE_URL}/${encodeURIComponent(input)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&language=${lang}&limit=${Math.ceil(limit / languages.length)}&types=place,poi&autocomplete=true`;
        
        if (proximity) {
          url += `&proximity=${proximity.lng},${proximity.lat}`;
        }
        
        const data: MapboxSearchResult = await cachedFetch(url);
        
        if (data.features && data.features.length > 0) {
          allResults = [...allResults, ...data.features];
        }
      } catch (error) {
        console.warn(`${lang} 언어 자동완성 실패:`, error);
        continue;
      }
    }
    
    // 중복 제거 및 정렬
    const uniqueResults = allResults.filter((place, index, self) => 
      index === self.findIndex(p => p.id === place.id)
    );
    
    return uniqueResults.slice(0, limit);
  } catch (error) {
    console.error('다국어 자동완성 검색 실패:', error);
    return [];
  }
};

// 주변 장소 검색
export const searchNearbyPlaces = async (
  location: { lng: number; lat: number },
  radius: number = 5000,
  limit: number = 10
): Promise<MapboxPlace[]> => {
  try {
    const url = `${MAPBOX_BASE_URL}/${location.lng},${location.lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}&language=ko&limit=${limit}&types=place,poi&radius=${radius}`;
    
    const data: MapboxSearchResult = await cachedFetch(url);
    
    return data.features || [];
  } catch (error) {
    console.error('주변 장소 검색 실패:', error);
    return [];
  }
};

// 인기 여행지 검색 (캐시 최적화)
export const getPopularDestinations = async (): Promise<MapboxPlace[]> => {
  const popularQueries = [
    '도쿄',
    '오사카',
    '파리',
    '런던',
    '뉴욕',
    '방콕',
    '싱가포르',
    '시드니',
    '로마',
    '베네치아'
  ];

  const allPlaces: MapboxPlace[] = [];
  
  for (const query of popularQueries) {
    try {
      const places = await searchPlaces(query, undefined, 1); // 각 쿼리당 1개만 가져오기
      if (places.length > 0) {
        allPlaces.push(places[0]);
      }
    } catch (error) {
      console.error(`${query} 검색 실패:`, error);
    }
  }
  
  return allPlaces;
};

// 국가별 도시 검색
export const searchCitiesByCountry = async (
  country: string,
  limit: number = 5
): Promise<MapboxPlace[]> => {
  try {
    const url = `${MAPBOX_BASE_URL}/${encodeURIComponent(country)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&language=ko&limit=${limit}&types=place`;
    
    const data: MapboxSearchResult = await cachedFetch(url);
    
    return data.features.filter(place => 
      place.place_type.includes('place') && 
      place.context?.some(ctx => ctx.text === country)
    ) || [];
  } catch (error) {
    console.error('국가별 도시 검색 실패:', error);
    return [];
  }
};

// 공항 검색
export const searchAirports = async (
  query: string,
  limit: number = 5
): Promise<MapboxPlace[]> => {
  try {
    const url = `${MAPBOX_BASE_URL}/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&language=ko&limit=${limit}&types=poi&poi_category=airport`;
    
    const data: MapboxSearchResult = await cachedFetch(url);
    
    return data.features.filter(place => 
      place.place_type.includes('poi') && 
      place.properties.category === 'airport'
    ) || [];
  } catch (error) {
    console.error('공항 검색 실패:', error);
    return [];
  }
};

// 역 검색
export const searchStations = async (
  query: string,
  limit: number = 5
): Promise<MapboxPlace[]> => {
  try {
    const url = `${MAPBOX_BASE_URL}/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&language=ko&limit=${limit}&types=poi&poi_category=station`;
    
    const data: MapboxSearchResult = await cachedFetch(url);
    
    return data.features.filter(place => 
      place.place_type.includes('poi') && 
      (place.properties.category === 'station' || place.text.includes('역'))
    ) || [];
  } catch (error) {
    console.error('역 검색 실패:', error);
    return [];
  }
};

// API 상태 확인
export const isMapboxAPIEnabled = (): boolean => {
  return !isMapboxDisabled;
};

// API 비활성화 이유
export const getMapboxDisableReason = (): string => {
  return disableReason;
};

// API 수동 재활성화 (개발용)
export const resetMapboxAPI = (): void => {
  isMapboxDisabled = false;
  disableReason = '';
  dailyRequestCount = 0;
  monthlyRequestCount = 0;
  console.log('Mapbox API 재활성화됨');
};

// 통합 검색 시스템 (Mapbox API + 대체 시스템) - 다국어 지원
export const searchPlacesWithFallback = async (
  query: string,
  proximity?: { lng: number; lat: number },
  limit: number = 10
): Promise<MapboxPlace[]> => {
  try {
    // Mapbox API 사용 가능한지 확인
    if (isMapboxAPIEnabled()) {
      const mapboxResults = await searchPlaces(query, proximity, limit);
      
      if (mapboxResults.length > 0) {
        return mapboxResults;
      }
    }
    
    // Mapbox API 실패 시 대체 시스템 사용 (다국어 지원)
    const { searchFallbackPlaces } = await import('./fallbackSearch');
    const fallbackResults = await searchFallbackPlaces(query);
    
    // FallbackPlace를 MapboxPlace 형식으로 변환
    return fallbackResults.map(place => ({
      id: `fallback-${place.name}-${place.country}`,
      type: 'Feature',
      place_type: ['place'],
      relevance: place.relevance,
      properties: {
        name: place.name,
        country: place.country,
        type: place.type,
        address: `${place.name}, ${place.country}`,
        // 다국어 별칭 정보 추가
        aliases: (place as any).aliases || {}
      },
      text: place.name,
      place_name: `${place.name}, ${place.country}`,
      center: place.coordinates ? [place.coordinates.lon, place.coordinates.lat] : [0, 0],
      geometry: place.coordinates ? {
        type: 'Point',
        coordinates: [place.coordinates.lon, place.coordinates.lat]
      } : {
        type: 'Point',
        coordinates: [0, 0]
      },
      context: [
        {
          id: `country.${place.country}`,
          text: place.country,
          short_code: place.country
        }
      ]
    }));
  } catch (error) {
    console.error('다국어 통합 검색 실패:', error);
    return [];
  }
};

// 통합 자동완성 시스템 (다국어 지원)
export const getAutocompleteWithFallback = async (
  input: string,
  proximity?: { lng: number; lat: number },
  limit: number = 5
): Promise<MapboxPlace[]> => {
  try {
    // Mapbox API 사용 가능한지 확인
    if (isMapboxAPIEnabled()) {
      const mapboxResults = await getPlaceAutocomplete(input, proximity, limit);
      
      if (mapboxResults.length > 0) {
        return mapboxResults;
      }
    }
    
    // Mapbox API 실패 시 대체 시스템 사용 (다국어 지원)
    const { getFallbackAutocomplete } = await import('./fallbackSearch');
    const fallbackResults = await getFallbackAutocomplete(input);
    
    // FallbackPlace를 MapboxPlace 형식으로 변환
    return fallbackResults.map(place => ({
      id: `fallback-${place.name}-${place.country}`,
      type: 'Feature',
      place_type: ['place'],
      relevance: place.relevance,
      properties: {
        name: place.name,
        country: place.country,
        type: place.type,
        address: `${place.name}, ${place.country}`,
        aliases: (place as any).aliases || {}
      },
      text: place.name,
      place_name: `${place.name}, ${place.country}`,
      center: place.coordinates ? [place.coordinates.lon, place.coordinates.lat] : [0, 0],
      geometry: place.coordinates ? {
        type: 'Point',
        coordinates: [place.coordinates.lon, place.coordinates.lat]
      } : {
        type: 'Point',
        coordinates: [0, 0]
      },
      context: [
        {
          id: `country.${place.country}`,
          text: place.country,
          short_code: place.country
        }
      ]
    }));
  } catch (error) {
    console.error('다국어 통합 자동완성 실패:', error);
    return [];
  }
};

// 요청 통계 (디버깅용)
export const getRequestStats = () => ({
  dailyRequests: dailyRequestCount,
  monthlyRequests: monthlyRequestCount,
  dailyLimit: DAILY_LIMIT,
  monthlyLimit: MONTHLY_LIMIT,
  remainingDaily: DAILY_LIMIT - dailyRequestCount,
  remainingMonthly: MONTHLY_LIMIT - monthlyRequestCount,
  isDisabled: isMapboxDisabled,
  disableReason: disableReason
}); 