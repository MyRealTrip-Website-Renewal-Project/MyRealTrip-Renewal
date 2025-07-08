// Google Places API 유틸리티

export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  types: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  opening_hours?: {
    open_now: boolean;
  };
}

export interface PlacesSearchResult {
  results: Place[];
  status: string;
  next_page_token?: string;
}

// Google Places API 설정
const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

// 요청 제한 및 캐싱
const requestCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10분
const REQUEST_DELAY = 300; // 300ms 딜레이

// 캐시된 API 요청
const cachedFetch = async (url: string): Promise<any> => {
  const cacheKey = url;
  const now = Date.now();
  
  // 캐시 확인
  if (requestCache.has(cacheKey)) {
    const cached = requestCache.get(cacheKey)!;
    if (now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  }
  
  // 요청 딜레이
  await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Places API 오류: ${data.status}`);
    }
    
    // 캐시 저장
    requestCache.set(cacheKey, { data, timestamp: now });
    
    return data;
  } catch (error) {
    console.error('Google Places API 오류:', error);
    throw error;
  }
};

// 장소 타입 분류
export const getPlaceType = (types: string[]): 'city' | 'airport' | 'station' | 'location' => {
  if (types.includes('locality') || types.includes('administrative_area_level_1')) {
    return 'city';
  }
  if (types.includes('airport')) {
    return 'airport';
  }
  if (types.includes('subway_station') || types.includes('train_station') || types.includes('transit_station')) {
    return 'station';
  }
  return 'location';
};

// 텍스트 검색 (여행지, 공항, 역 등)
export const searchPlaces = async (
  query: string, 
  location?: { lat: number; lng: number },
  radius?: number
): Promise<Place[]> => {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('Google Places API 키가 설정되지 않았습니다.');
    return [];
  }

  try {
    let url = `${GOOGLE_PLACES_BASE_URL}/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}&language=ko`;
    
    if (location && radius) {
      url += `&location=${location.lat},${location.lng}&radius=${radius}`;
    }
    
    const data: PlacesSearchResult = await cachedFetch(url);
    
    return data.results || [];
  } catch (error) {
    console.error('장소 검색 실패:', error);
    return [];
  }
};

// 주변 장소 검색
export const searchNearbyPlaces = async (
  location: { lat: number; lng: number },
  radius: number = 5000,
  type?: string
): Promise<Place[]> => {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('Google Places API 키가 설정되지 않았습니다.');
    return [];
  }

  try {
    let url = `${GOOGLE_PLACES_BASE_URL}/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&key=${GOOGLE_PLACES_API_KEY}&language=ko`;
    
    if (type) {
      url += `&type=${type}`;
    }
    
    const data: PlacesSearchResult = await cachedFetch(url);
    
    return data.results || [];
  } catch (error) {
    console.error('주변 장소 검색 실패:', error);
    return [];
  }
};

// 장소 상세 정보
export const getPlaceDetails = async (placeId: string): Promise<Place | null> => {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('Google Places API 키가 설정되지 않았습니다.');
    return null;
  }

  try {
    const url = `${GOOGLE_PLACES_BASE_URL}/details/json?place_id=${placeId}&fields=place_id,name,formatted_address,geometry,types,photos,rating,user_ratings_total,price_level,opening_hours&key=${GOOGLE_PLACES_API_KEY}&language=ko`;
    
    const data = await cachedFetch(url);
    
    return data.result || null;
  } catch (error) {
    console.error('장소 상세 정보 조회 실패:', error);
    return null;
  }
};

// 자동완성 검색
export const getPlaceAutocomplete = async (
  input: string,
  location?: { lat: number; lng: number },
  radius?: number
): Promise<Place[]> => {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('Google Places API 키가 설정되지 않았습니다.');
    return [];
  }

  try {
    let url = `${GOOGLE_PLACES_BASE_URL}/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_PLACES_API_KEY}&language=ko&types=(cities)|(airport)|(subway_station)|(train_station)`;
    
    if (location && radius) {
      url += `&location=${location.lat},${location.lng}&radius=${radius}`;
    }
    
    const data = await cachedFetch(url);
    
    // 자동완성 결과를 상세 정보로 변환
    const places: Place[] = [];
    for (const prediction of data.predictions || []) {
      if (prediction.place_id) {
        const details = await getPlaceDetails(prediction.place_id);
        if (details) {
          places.push(details);
        }
      }
    }
    
    return places;
  } catch (error) {
    console.error('자동완성 검색 실패:', error);
    return [];
  }
};

// 인기 여행지 검색
export const getPopularDestinations = async (): Promise<Place[]> => {
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

  const allPlaces: Place[] = [];
  
  for (const query of popularQueries) {
    try {
      const places = await searchPlaces(query);
      if (places.length > 0) {
        allPlaces.push(places[0]); // 첫 번째 결과만 추가
      }
    } catch (error) {
      console.error(`${query} 검색 실패:`, error);
    }
  }
  
  return allPlaces;
}; 