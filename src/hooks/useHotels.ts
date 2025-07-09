import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { hotelApi, type Hotel, type HotelSearchParams } from '../services/api';

// 호텔 목록 조회 훅
export const useHotels = (params?: HotelSearchParams) => {
  return useQuery({
    queryKey: ['hotels', params],
    queryFn: () => hotelApi.getHotels(params),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

// 호텔 상세 조회 훅
export const useHotel = (id: string) => {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => hotelApi.getHotel(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// 호텔 검색 훅
export const useHotelSearch = (query: string, params?: HotelSearchParams) => {
  return useQuery({
    queryKey: ['hotelSearch', query, params],
    queryFn: () => hotelApi.searchHotels(query, params),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2분
    gcTime: 5 * 60 * 1000, // 5분
  });
};

// 무한 스크롤을 위한 호텔 목록 훅
export const useInfiniteHotels = (params?: HotelSearchParams) => {
  return useInfiniteQuery({
    queryKey: ['infiniteHotels', params],
    queryFn: ({ pageParam = 1 }) => 
      hotelApi.getHotels({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지에 데이터가 있으면 다음 페이지로
      if (lastPage.data && lastPage.data.length > 0) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}; 