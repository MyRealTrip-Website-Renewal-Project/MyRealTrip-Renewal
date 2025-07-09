// API 기본 설정
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.myrealtrip.com';

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// 에러 타입
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// API 클라이언트 클래스
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET 요청
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return this.request<T>(url, { method: 'GET' });
  }

  // POST 요청
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT 요청
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE 요청
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// API 클라이언트 인스턴스
export const apiClient = new ApiClient(API_BASE_URL);

// 호텔 관련 API
export interface Hotel {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: string;
  star?: number;
  freeCancel?: boolean;
  timeSale?: boolean;
  badgeText?: string;
  reviewUrl: string;
}

export interface HotelSearchParams {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  page?: number;
  limit?: number;
}

export const hotelApi = {
  // 호텔 목록 조회
  getHotels: (params?: HotelSearchParams) =>
    apiClient.get<Hotel[]>('/hotels', params as Record<string, string>),

  // 호텔 상세 조회
  getHotel: (id: string) =>
    apiClient.get<Hotel>(`/hotels/${id}`),

  // 호텔 검색
  searchHotels: (query: string, params?: HotelSearchParams) => {
    const searchParams: Record<string, string> = { q: query };
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams[key] = String(value);
        }
      });
    }
    return apiClient.get<Hotel[]>('/hotels/search', searchParams);
  },
};

// 프로모션 관련 API
export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  discount?: string;
  endDate?: string;
}

export const promotionApi = {
  // 프로모션 목록 조회
  getPromotions: () =>
    apiClient.get<Promotion[]>('/promotions'),

  // 프로모션 상세 조회
  getPromotion: (id: string) =>
    apiClient.get<Promotion>(`/promotions/${id}`),
};

// 검색 관련 API
export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'hotel' | 'location' | 'activity';
}

export const searchApi = {
  // 검색 제안
  getSuggestions: (query: string) =>
    apiClient.get<SearchSuggestion[]>(`/search/suggestions?q=${encodeURIComponent(query)}`),

  // 인기 검색어
  getPopularSearches: () =>
    apiClient.get<string[]>('/search/popular'),
}; 