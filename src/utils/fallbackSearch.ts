// 대체 검색 시스템 (Mapbox API 한도 초과 시 사용)

export interface FallbackPlace {
  name: string;
  country: string;
  type: 'city' | 'airport' | 'station' | 'location';
  coordinates?: { lat: number; lon: number };
  relevance: number;
}

// 다국어 여행지 데이터 인터페이스
interface MultilingualPlace extends FallbackPlace {
  aliases?: {
    ko?: string[];
    en?: string[];
    ja?: string[];
    zh?: string[];
    es?: string[];
    fr?: string[];
    de?: string[];
  };
}

// 전세계 주요 여행지 데이터 (다국어 지원)
const GLOBAL_DESTINATIONS: MultilingualPlace[] = [
  // 아시아
  { 
    name: '도쿄', 
    country: '일본', 
    type: 'city', 
    coordinates: { lat: 35.6762, lon: 139.6503 }, 
    relevance: 100,
    aliases: {
      ko: ['도쿄', '동경'],
      en: ['Tokyo'],
      ja: ['東京', 'とうきょう'],
      zh: ['东京', '東京都'],
      es: ['Tokio'],
      fr: ['Tokyo'],
      de: ['Tokio']
    }
  },
  { 
    name: '오사카', 
    country: '일본', 
    type: 'city', 
    coordinates: { lat: 34.6937, lon: 135.5023 }, 
    relevance: 95,
    aliases: {
      ko: ['오사카', '대판'],
      en: ['Osaka'],
      ja: ['大阪', 'おおさか'],
      zh: ['大阪'],
      es: ['Osaka'],
      fr: ['Osaka'],
      de: ['Osaka']
    }
  },
  { 
    name: '후쿠오카', 
    country: '일본', 
    type: 'city', 
    coordinates: { lat: 33.5902, lon: 130.4017 }, 
    relevance: 90,
    aliases: {
      ko: ['후쿠오카', '복강'],
      en: ['Fukuoka'],
      ja: ['福岡', 'ふくおか'],
      zh: ['福冈'],
      es: ['Fukuoka'],
      fr: ['Fukuoka'],
      de: ['Fukuoka']
    }
  },
  { 
    name: '서울', 
    country: '대한민국', 
    type: 'city', 
    coordinates: { lat: 37.5665, lon: 126.9780 }, 
    relevance: 100,
    aliases: {
      ko: ['서울', '서울특별시'],
      en: ['Seoul'],
      ja: ['ソウル'],
      zh: ['首尔', '漢城'],
      es: ['Seúl'],
      fr: ['Séoul'],
      de: ['Seoul']
    }
  },
  { 
    name: '부산', 
    country: '대한민국', 
    type: 'city', 
    coordinates: { lat: 35.1796, lon: 129.0756 }, 
    relevance: 85,
    aliases: {
      ko: ['부산', '부산광역시'],
      en: ['Busan', 'Pusan'],
      ja: ['釜山', 'プサン'],
      zh: ['釜山'],
      es: ['Busan'],
      fr: ['Busan'],
      de: ['Busan']
    }
  },
  { 
    name: '방콕', 
    country: '태국', 
    type: 'city', 
    coordinates: { lat: 13.7563, lon: 100.5018 }, 
    relevance: 95,
    aliases: {
      ko: ['방콕'],
      en: ['Bangkok'],
      ja: ['バンコク'],
      zh: ['曼谷'],
      es: ['Bangkok'],
      fr: ['Bangkok'],
      de: ['Bangkok']
    }
  },
  { 
    name: '싱가포르', 
    country: '싱가포르', 
    type: 'city', 
    coordinates: { lat: 1.3521, lon: 103.8198 }, 
    relevance: 90,
    aliases: {
      ko: ['싱가포르'],
      en: ['Singapore'],
      ja: ['シンガポール'],
      zh: ['新加坡'],
      es: ['Singapur'],
      fr: ['Singapour'],
      de: ['Singapur']
    }
  },
  { 
    name: '홍콩', 
    country: '중국', 
    type: 'city', 
    coordinates: { lat: 22.3193, lon: 114.1694 }, 
    relevance: 95,
    aliases: {
      ko: ['홍콩'],
      en: ['Hong Kong'],
      ja: ['香港'],
      zh: ['香港'],
      es: ['Hong Kong'],
      fr: ['Hong Kong'],
      de: ['Hongkong']
    }
  },
  { 
    name: '타이페이', 
    country: '대만', 
    type: 'city', 
    coordinates: { lat: 25.0330, lon: 121.5654 }, 
    relevance: 85,
    aliases: {
      ko: ['타이페이', '대북'],
      en: ['Taipei'],
      ja: ['台北', 'タイペイ'],
      zh: ['台北', '臺北'],
      es: ['Taipei'],
      fr: ['Taipei'],
      de: ['Taipeh']
    }
  },
  { 
    name: '마닐라', 
    country: '필리핀', 
    type: 'city', 
    coordinates: { lat: 14.5995, lon: 120.9842 }, 
    relevance: 80,
    aliases: {
      ko: ['마닐라'],
      en: ['Manila'],
      ja: ['マニラ'],
      zh: ['马尼拉'],
      es: ['Manila'],
      fr: ['Manille'],
      de: ['Manila']
    }
  },

  // 유럽
  { name: '파리', country: '프랑스', type: 'city', coordinates: { lat: 48.8566, lon: 2.3522 }, relevance: 100 },
  { name: '런던', country: '영국', type: 'city', coordinates: { lat: 51.5074, lon: -0.1278 }, relevance: 100 },
  { name: '로마', country: '이탈리아', type: 'city', coordinates: { lat: 41.9028, lon: 12.4964 }, relevance: 95 },
  { name: '베네치아', country: '이탈리아', type: 'city', coordinates: { lat: 45.4408, lon: 12.3155 }, relevance: 90 },
  { name: '밀란', country: '이탈리아', type: 'city', coordinates: { lat: 45.4642, lon: 9.1900 }, relevance: 85 },
  { name: '바르셀로나', country: '스페인', type: 'city', coordinates: { lat: 41.3851, lon: 2.1734 }, relevance: 90 },
  { name: '마드리드', country: '스페인', type: 'city', coordinates: { lat: 40.4168, lon: -3.7038 }, relevance: 85 },
  { name: '암스테르담', country: '네덜란드', type: 'city', coordinates: { lat: 52.3676, lon: 4.9041 }, relevance: 90 },
  { name: '베를린', country: '독일', type: 'city', coordinates: { lat: 52.5200, lon: 13.4050 }, relevance: 85 },
  { name: '뮌헨', country: '독일', type: 'city', coordinates: { lat: 48.1351, lon: 11.5820 }, relevance: 80 },
  { name: '비엔나', country: '오스트리아', type: 'city', coordinates: { lat: 48.2082, lon: 16.3738 }, relevance: 85 },
  { name: '프라하', country: '체코', type: 'city', coordinates: { lat: 50.0755, lon: 14.4378 }, relevance: 85 },
  { name: '부다페스트', country: '헝가리', type: 'city', coordinates: { lat: 47.4979, lon: 19.0402 }, relevance: 80 },
  { name: '크라쿠프', country: '폴란드', type: 'city', coordinates: { lat: 50.0647, lon: 19.9450 }, relevance: 75 },

  // 북미
  { name: '뉴욕', country: '미국', type: 'city', coordinates: { lat: 40.7128, lon: -74.0060 }, relevance: 100 },
  { name: '로스앤젤레스', country: '미국', type: 'city', coordinates: { lat: 34.0522, lon: -118.2437 }, relevance: 95 },
  { name: '샌프란시스코', country: '미국', type: 'city', coordinates: { lat: 37.7749, lon: -122.4194 }, relevance: 90 },
  { name: '시카고', country: '미국', type: 'city', coordinates: { lat: 41.8781, lon: -87.6298 }, relevance: 85 },
  { name: '마이애미', country: '미국', type: 'city', coordinates: { lat: 25.7617, lon: -80.1918 }, relevance: 85 },
  { name: '라스베가스', country: '미국', type: 'city', coordinates: { lat: 36.1699, lon: -115.1398 }, relevance: 80 },
  { name: '토론토', country: '캐나다', type: 'city', coordinates: { lat: 43.6532, lon: -79.3832 }, relevance: 85 },
  { name: '밴쿠버', country: '캐나다', type: 'city', coordinates: { lat: 49.2827, lon: -123.1207 }, relevance: 80 },

  // 오세아니아
  { name: '시드니', country: '호주', type: 'city', coordinates: { lat: -33.8688, lon: 151.2093 }, relevance: 90 },
  { name: '멜버른', country: '호주', type: 'city', coordinates: { lat: -37.8136, lon: 144.9631 }, relevance: 85 },
  { name: '골드코스트', country: '호주', type: 'city', coordinates: { lat: -28.0167, lon: 153.4000 }, relevance: 80 },
  { name: '오클랜드', country: '뉴질랜드', type: 'city', coordinates: { lat: -36.8485, lon: 174.7633 }, relevance: 80 },

  // 주요 공항
  { name: '하네다공항', country: '일본', type: 'airport', coordinates: { lat: 35.5494, lon: 139.7798 }, relevance: 90 },
  { name: '나리타공항', country: '일본', type: 'airport', coordinates: { lat: 35.7719, lon: 140.3928 }, relevance: 85 },
  { name: '간사이공항', country: '일본', type: 'airport', coordinates: { lat: 34.4342, lon: 135.2441 }, relevance: 85 },
  { name: '인천공항', country: '대한민국', type: 'airport', coordinates: { lat: 37.4602, lon: 126.4407 }, relevance: 95 },
  { name: '김포공항', country: '대한민국', type: 'airport', coordinates: { lat: 37.5583, lon: 126.7905 }, relevance: 85 },
  { name: '수완나품공항', country: '태국', type: 'airport', coordinates: { lat: 13.6900, lon: 100.7501 }, relevance: 90 },
  { name: '창이공항', country: '싱가포르', type: 'airport', coordinates: { lat: 1.3644, lon: 103.9915 }, relevance: 90 },
  { name: '파리 샤를 드 골 공항', country: '프랑스', type: 'airport', coordinates: { lat: 49.0097, lon: 2.5479 }, relevance: 90 },
  { name: '히드로 공항', country: '영국', type: 'airport', coordinates: { lat: 51.4700, lon: -0.4543 }, relevance: 90 },
  { name: 'JFK 공항', country: '미국', type: 'airport', coordinates: { lat: 40.6413, lon: -73.7781 }, relevance: 90 },
  { name: 'LAX 공항', country: '미국', type: 'airport', coordinates: { lat: 33.9416, lon: -118.4085 }, relevance: 85 },

  // 주요 역
  { name: '도쿄역', country: '일본', type: 'station', coordinates: { lat: 35.6812, lon: 139.7671 }, relevance: 85 },
  { name: '오사카역', country: '일본', type: 'station', coordinates: { lat: 34.7024, lon: 135.4959 }, relevance: 80 },
  { name: '신주쿠역', country: '일본', type: 'station', coordinates: { lat: 35.6895, lon: 139.6917 }, relevance: 80 },
  { name: '서울역', country: '대한민국', type: 'station', coordinates: { lat: 37.5547, lon: 126.9706 }, relevance: 85 },
  { name: '부산역', country: '대한민국', type: 'station', coordinates: { lat: 35.1147, lon: 129.0403 }, relevance: 80 },
];

// 다국어 검색 함수
export const searchFallbackPlaces = async (query: string): Promise<FallbackPlace[]> => {
  const queryLower = query.toLowerCase();
  
  // 다국어 검색어 변환
  const searchTerms = getMultilingualSearchTerms(query);
  
  // 검색어 매칭 (다국어 지원)
  const results = GLOBAL_DESTINATIONS.filter(place => {
    // 기본 이름 및 국가 매칭
    const nameMatch = place.name.toLowerCase().includes(queryLower);
    const countryMatch = place.country.toLowerCase().includes(queryLower);
    
    // 다국어 별칭 매칭
    const aliasMatch = searchTerms.some(term => {
      return Object.values(place.aliases || {}).some(aliases => 
        aliases?.some(alias => alias.toLowerCase().includes(term))
      );
    });
    
    return nameMatch || countryMatch || aliasMatch;
  });

  // 관련성 점수 계산 및 정렬
  const scoredResults = results.map(place => {
    let score = place.relevance;
    
    // 정확한 이름 매칭
    if (place.name.toLowerCase() === queryLower) {
      score += 50;
    }
    // 이름으로 시작
    else if (place.name.toLowerCase().startsWith(queryLower)) {
      score += 30;
    }
    // 이름에 포함
    else if (place.name.toLowerCase().includes(queryLower)) {
      score += 20;
    }
    
    // 다국어 별칭 매칭
    searchTerms.forEach(term => {
      Object.values(place.aliases || {}).forEach(aliases => {
        aliases?.forEach(alias => {
          if (alias.toLowerCase() === term) {
            score += 40; // 정확한 별칭 매칭
          } else if (alias.toLowerCase().startsWith(term)) {
            score += 25; // 별칭으로 시작
          } else if (alias.toLowerCase().includes(term)) {
            score += 15; // 별칭에 포함
          }
        });
      });
    });
    
    // 국가 매칭
    if (place.country.toLowerCase().includes(queryLower)) {
      score += 10;
    }
    
    return { ...place, relevance: score };
  });

  // 관련성 순으로 정렬
  return scoredResults
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 10);
};

// 다국어 검색어 변환 함수
export const getMultilingualSearchTerms = (query: string): string[] => {
  const terms = [query.toLowerCase()];
  
  // 영어 검색어를 다른 언어로 변환
  const translations: { [key: string]: string[] } = {
    'tokyo': ['도쿄', '동경', '東京', 'とうきょう', '东京', '東京都'],
    'osaka': ['오사카', '대판', '大阪', 'おおさか', '大阪'],
    'seoul': ['서울', '서울특별시', 'ソウル', '首尔', '漢城'],
    'bangkok': ['방콕', 'バンコク', '曼谷'],
    'singapore': ['싱가포르', 'シンガポール', '新加坡'],
    'hong kong': ['홍콩', '香港'],
    'taipei': ['타이페이', '대북', '台北', 'タイペイ', '臺北'],
    'manila': ['마닐라', 'マニラ', '马尼拉'],
    'paris': ['파리', 'パリ', '巴黎'],
    'london': ['런던', 'ロンドン', '伦敦'],
    'rome': ['로마', 'ローマ', '罗马'],
    'venice': ['베네치아', 'ベネチア', '威尼斯'],
    'milan': ['밀란', 'ミラノ', '米兰'],
    'barcelona': ['바르셀로나', 'バルセロナ', '巴塞罗那'],
    'madrid': ['마드리드', 'マドリード', '马德里'],
    'amsterdam': ['암스테르담', 'アムステルダム', '阿姆斯特丹'],
    'berlin': ['베를린', 'ベルリン', '柏林'],
    'munich': ['뮌헨', 'ミュンヘン', '慕尼黑'],
    'vienna': ['비엔나', 'ウィーン', '维也纳'],
    'prague': ['프라하', 'プラハ', '布拉格'],
    'budapest': ['부다페스트', 'ブダペスト', '布达佩斯'],
    'krakow': ['크라쿠프', 'クラクフ', '克拉科夫'],
    'new york': ['뉴욕', 'ニューヨーク', '纽约'],
    'los angeles': ['로스앤젤레스', 'ロサンゼルス', '洛杉矶'],
    'san francisco': ['샌프란시스코', 'サンフランシスコ', '旧金山'],
    'chicago': ['시카고', 'シカゴ', '芝加哥'],
    'miami': ['마이애미', 'マイアミ', '迈阿密'],
    'las vegas': ['라스베가스', 'ラスベガス', '拉斯维加斯'],
    'toronto': ['토론토', 'トロント', '多伦多'],
    'vancouver': ['밴쿠버', 'バンクーバー', '温哥华'],
    'sydney': ['시드니', 'シドニー', '悉尼'],
    'melbourne': ['멜버른', 'メルボルン', '墨尔本'],
    'gold coast': ['골드코스트', 'ゴールドコースト', '黄金海岸'],
    'auckland': ['오클랜드', 'オークランド', '奥克兰']
  };
  
  // 번역된 검색어 추가
  Object.entries(translations).forEach(([english, translated]) => {
    if (query.toLowerCase().includes(english)) {
      terms.push(...translated);
    }
  });
  
  return [...new Set(terms)]; // 중복 제거
};

// 자동완성 함수 (다국어 지원)
export const getFallbackAutocomplete = async (input: string): Promise<FallbackPlace[]> => {
  if (input.length < 2) return [];
  
  const inputLower = input.toLowerCase();
  const searchTerms = getMultilingualSearchTerms(input);
  
  // 자동완성 매칭 (다국어 지원)
  const results = GLOBAL_DESTINATIONS.filter(place => {
    // 기본 이름 및 국가 매칭
    const nameStartsWith = place.name.toLowerCase().startsWith(inputLower);
    const countryStartsWith = place.country.toLowerCase().startsWith(inputLower);
    
    // 다국어 별칭 매칭
    const aliasStartsWith = searchTerms.some(term => {
      return Object.values(place.aliases || {}).some(aliases => 
        aliases?.some(alias => alias.toLowerCase().startsWith(term))
      );
    });
    
    return nameStartsWith || countryStartsWith || aliasStartsWith;
  });

  // 관련성 점수 계산
  const scoredResults = results.map(place => {
    let score = place.relevance;
    
    if (place.name.toLowerCase().startsWith(inputLower)) {
      score += 30;
    }
    
    // 다국어 별칭 매칭 점수
    searchTerms.forEach(term => {
      Object.values(place.aliases || {}).forEach(aliases => {
        aliases?.forEach(alias => {
          if (alias.toLowerCase().startsWith(term)) {
            score += 25; // 별칭으로 시작
          }
        });
      });
    });
    
    if (place.country.toLowerCase().startsWith(inputLower)) {
      score += 10;
    }
    
    return { ...place, relevance: score };
  });

  return scoredResults
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5);
};

// 인기 여행지
export const getFallbackPopularDestinations = (): FallbackPlace[] => {
  return GLOBAL_DESTINATIONS
    .filter(place => place.type === 'city')
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 10);
};

// 국가별 도시 검색
export const searchFallbackCitiesByCountry = async (country: string): Promise<FallbackPlace[]> => {
  const countryLower = country.toLowerCase();
  
  return GLOBAL_DESTINATIONS
    .filter(place => 
      place.type === 'city' && 
      place.country.toLowerCase().includes(countryLower)
    )
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5);
};

// 공항 검색
export const searchFallbackAirports = async (query: string): Promise<FallbackPlace[]> => {
  const queryLower = query.toLowerCase();
  
  return GLOBAL_DESTINATIONS
    .filter(place => 
      place.type === 'airport' && 
      (place.name.toLowerCase().includes(queryLower) || 
       place.country.toLowerCase().includes(queryLower))
    )
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5);
};

// 역 검색
export const searchFallbackStations = async (query: string): Promise<FallbackPlace[]> => {
  const queryLower = query.toLowerCase();
  
  return GLOBAL_DESTINATIONS
    .filter(place => 
      place.type === 'station' && 
      (place.name.toLowerCase().includes(queryLower) || 
       place.country.toLowerCase().includes(queryLower))
    )
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5);
}; 