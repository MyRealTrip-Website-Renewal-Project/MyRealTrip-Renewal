// 위치 기반 추천 유틸리티

export interface Location {
  lat: number;
  lon: number;
  name: string;
  country?: string;
  type: 'city' | 'country' | 'station' | 'airport' | 'location';
}

interface LocationWithScore extends Location {
  distance: number;
  relevance: number;
}

export interface UserLocation {
  lat: number;
  lon: number;
  city?: string;
  country?: string;
}

// API 설정
const OPENTRIPMAP_API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY || '5ae2e3f221c38a28845f05b6e1c3b7b6c1c3b7b6c1c3b7b6c1c3b7b6c1c3b7b6'; // 더미 키
const API_BASE_URL = 'https://api.opentripmap.io/0.1/en/places';

// CORS 프록시 설정 (개발 환경에서만 사용)
const CORS_PROXY = import.meta.env.DEV ? 'https://cors-anywhere.herokuapp.com/' : '';

// 요청 제한 및 캐싱
const requestCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5분
const REQUEST_DELAY = 500; // 500ms 딜레이

// 실제 API 호출 함수 (API 키가 있을 때 사용)
const fetchFromAPI = async (url: string): Promise<any> => {
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
    let response;
    
    if (import.meta.env.DEV && CORS_PROXY) {
      // 개발 환경: CORS 프록시 사용
      response = await fetch(`${CORS_PROXY}${url}`, {
        headers: {
          'Origin': 'http://localhost:5173',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
    } else {
      // 프로덕션 환경: 직접 호출
      response = await fetch(url);
    }
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('API 요청 한도 초과. 잠시 후 다시 시도해주세요.');
      }
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 캐시 저장
    requestCache.set(cacheKey, { data, timestamp: now });
    
    return data;
  } catch (error) {
    console.error('API 요청 오류:', error);
    throw error;
  }
};

// 현재 위치 가져오기
export const getCurrentLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error('위치 가져오기 실패:', error);
        // 기본값으로 서울 설정
        resolve({
          lat: 37.5665,
          lon: 126.9780,
          city: '서울',
          country: '대한민국',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5분 캐시
      }
    );
  });
};

// 두 지점 간 거리 계산 (Haversine formula)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// 가까운 여행지 추천 (API 또는 로컬 데이터 사용)
export const getNearbyDestinations = async (userLocation: UserLocation): Promise<Location[]> => {
  // API 키가 유효한지 확인
  const isValidAPIKey = OPENTRIPMAP_API_KEY && 
    OPENTRIPMAP_API_KEY !== '5ae2e3f221c38a28845f05b6e1c3b7b6c1c3b7b6c1c3b7b6c1c3b7b6c1c3b7b6' &&
    OPENTRIPMAP_API_KEY.length > 20;

  if (isValidAPIKey) {
    try {
      // 실제 API 호출
      const url = `${API_BASE_URL}/radius?radius=5000&lon=${userLocation.lon}&lat=${userLocation.lat}&apikey=${OPENTRIPMAP_API_KEY}`;
      const data = await fetchFromAPI(url);
      
      return data.features?.map((feature: any) => {
        const properties = feature.properties;
        const coordinates = feature.geometry?.coordinates;
        
        return {
          lat: coordinates?.[1] || 0,
          lon: coordinates?.[0] || 0,
          name: properties.name || properties.display_name || '',
          country: properties.country || '',
          type: getLocationType(properties),
        };
      }).filter((location: Location) => location.name) || [];
    } catch (error) {
      console.error('API 호출 실패, 로컬 데이터 사용:', error);
    }
  }

  // API 호출 실패 시 로컬 데이터 사용
  const nearbyPlaces = [
    { name: '명동', lat: 37.5636, lon: 126.9834, country: '대한민국', type: 'location' as const },
    { name: '홍대', lat: 37.5563, lon: 126.9237, country: '대한민국', type: 'location' as const },
    { name: '강남', lat: 37.5172, lon: 127.0473, country: '대한민국', type: 'location' as const },
    { name: '이태원', lat: 37.5344, lon: 126.9941, country: '대한민국', type: 'location' as const },
    { name: '잠실', lat: 37.5139, lon: 127.1006, country: '대한민국', type: 'location' as const },
  ];

  return nearbyPlaces.map(place => ({
    lat: place.lat,
    lon: place.lon,
    name: place.name,
    country: place.country,
    type: place.type,
  }));
};

// 위치 타입 분류
const getLocationType = (properties: any): Location['type'] => {
  const name = properties.name || properties.display_name || '';
  const placeType = properties.place_type;
  
  if (placeType === 'city') return 'city';
  if (placeType === 'country') return 'country';
  if (name.includes('역') || name.includes('Station') || name.includes('train')) return 'station';
  if (name.includes('공항') || name.includes('Airport') || name.includes('airport')) return 'airport';
  return 'location';
};

// 인기 여행지 (위치 기반)
export const getPopularDestinations = (userLocation: UserLocation): Location[] => {
  const popularCities = [
    { name: '도쿄', lat: 35.6762, lon: 139.6503, country: '일본', type: 'city' as const },
    { name: '오사카', lat: 34.6937, lon: 135.5023, country: '일본', type: 'city' as const },
    { name: '후쿠오카', lat: 33.5902, lon: 130.4017, country: '일본', type: 'city' as const },
    { name: '파리', lat: 48.8566, lon: 2.3522, country: '프랑스', type: 'city' as const },
    { name: '런던', lat: 51.5074, lon: -0.1278, country: '영국', type: 'city' as const },
    { name: '뉴욕', lat: 40.7128, lon: -74.0060, country: '미국', type: 'city' as const },
    { name: '방콕', lat: 13.7563, lon: 100.5018, country: '태국', type: 'city' as const },
    { name: '싱가포르', lat: 1.3521, lon: 103.8198, country: '싱가포르', type: 'city' as const },
  ];

  // 거리순으로 정렬
  return popularCities
    .map(city => ({
      ...city,
      distance: calculateDistance(userLocation.lat, userLocation.lon, city.lat, city.lon)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 6)
    .map(({ distance, ...city }) => city);
};

// 검색어와 유사한 여행지 찾기 (API 또는 로컬 데이터 + 위치 기반 가중치)
export const searchNearbyPlaces = async (
  query: string, 
  userLocation: UserLocation
): Promise<Location[]> => {
  // API 키가 유효한지 확인
  const isValidAPIKey = OPENTRIPMAP_API_KEY && 
    OPENTRIPMAP_API_KEY !== '5ae2e3f221c38a28845f05b6e1c3b7b6c1c3b7b6c1c3b7b6c1c3b7b6c1c3b7b6' &&
    OPENTRIPMAP_API_KEY.length > 20;

  if (isValidAPIKey) {
    try {
      // 실제 API 호출
      const url = `${API_BASE_URL}/autosuggest?name=${encodeURIComponent(query)}&apikey=${OPENTRIPMAP_API_KEY}`;
      const data = await fetchFromAPI(url);
      
      const results = data.features?.map((feature: any) => {
        const properties = feature.properties;
        const coordinates = feature.geometry?.coordinates;
        
        return {
          lat: coordinates?.[1] || 0,
          lon: coordinates?.[0] || 0,
          name: properties.name || properties.display_name || '',
          country: properties.country || '',
          type: getLocationType(properties),
        };
      }).filter((location: Location) => location.name) || [];

      // 거리 기반 가중치 적용
      return results
        .map((location: Location): LocationWithScore => ({
          ...location,
          distance: calculateDistance(userLocation.lat, userLocation.lon, location.lat, location.lon),
          relevance: calculateRelevance(query, location.name, calculateDistance(userLocation.lat, userLocation.lon, location.lat, location.lon))
        }))
        .sort((a: LocationWithScore, b: LocationWithScore) => b.relevance - a.relevance)
        .slice(0, 10)
        .map(({ distance, relevance, ...location }: LocationWithScore): Location => location);
    } catch (error) {
      console.error('API 호출 실패, 로컬 데이터 사용:', error);
    }
  }

  // API 호출 실패 시 로컬 데이터 사용
  const localSearchData = [
    { name: '도쿄', lat: 35.6762, lon: 139.6503, country: '일본', type: 'city' as const },
    { name: '도쿄역', lat: 35.6812, lon: 139.7671, country: '일본', type: 'station' as const },
    { name: '신주쿠', lat: 35.6895, lon: 139.6917, country: '일본', type: 'location' as const },
    { name: '하네다공항', lat: 35.5494, lon: 139.7798, country: '일본', type: 'airport' as const },
    { name: '오사카', lat: 34.6937, lon: 135.5023, country: '일본', type: 'city' as const },
    { name: '오사카역', lat: 34.7024, lon: 135.4959, country: '일본', type: 'station' as const },
    { name: '간사이공항', lat: 34.4342, lon: 135.2441, country: '일본', type: 'airport' as const },
    { name: '파리', lat: 48.8566, lon: 2.3522, country: '프랑스', type: 'city' as const },
    { name: '파리 샤를 드 골 공항', lat: 49.0097, lon: 2.5479, country: '프랑스', type: 'airport' as const },
    { name: '런던', lat: 51.5074, lon: -0.1278, country: '영국', type: 'city' as const },
    { name: '히드로 공항', lat: 51.4700, lon: -0.4543, country: '영국', type: 'airport' as const },
  ];

  // 검색어 필터링
  const filteredResults = localSearchData.filter(place => 
    place.name.toLowerCase().includes(query.toLowerCase()) ||
    place.country?.toLowerCase().includes(query.toLowerCase())
  );

  // 거리 기반 가중치 적용
  return filteredResults
    .map((location): LocationWithScore => ({
      ...location,
      distance: calculateDistance(userLocation.lat, userLocation.lon, location.lat, location.lon),
      relevance: calculateRelevance(query, location.name, calculateDistance(userLocation.lat, userLocation.lon, location.lat, location.lon))
    }))
    .sort((a: LocationWithScore, b: LocationWithScore) => b.relevance - a.relevance)
    .slice(0, 10)
    .map(({ distance, relevance, ...location }: LocationWithScore): Location => location);
};

// 관련성 점수 계산 (검색어 매칭 + 거리 가중치)
const calculateRelevance = (query: string, name: string, distance: number): number => {
  const queryLower = query.toLowerCase();
  const nameLower = name.toLowerCase();
  
  // 검색어 매칭 점수
  let matchScore = 0;
  if (nameLower.includes(queryLower)) matchScore += 10;
  if (nameLower.startsWith(queryLower)) matchScore += 5;
  
  // 거리 가중치 (가까울수록 높은 점수)
  const distanceScore = Math.max(0, 10 - distance / 1000); // 1000km당 1점 감소
  
  return matchScore + distanceScore;
}; 