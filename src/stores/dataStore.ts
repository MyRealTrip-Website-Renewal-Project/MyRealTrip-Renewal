import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DataItem {
  id: string;
  [key: string]: any;
}

export interface DataState<T = DataItem> {
  // 데이터 캐시
  cache: Record<string, {
    data: T[];
    timestamp: number;
    expiresAt: number;
    isLoading: boolean;
    error?: string;
  }>;
  
  // 페이지네이션 상태
  pagination: Record<string, {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }>;
  
  // 필터 상태
  filters: Record<string, Record<string, any>>;
  
  // 정렬 상태
  sorting: Record<string, {
    field: string;
    direction: 'asc' | 'desc';
  }>;
  
  // 액션들
  setData: <T>(key: string, data: T[], expiresIn?: number) => void;
  getData: <T>(key: string) => T[] | undefined;
  setLoading: (key: string, isLoading: boolean) => void;
  setError: (key: string, error?: string) => void;
  clearCache: (key?: string) => void;
  clearAllCache: () => void;
  
  // 페이지네이션 액션들
  setPagination: (key: string, pagination: Partial<DataState['pagination'][string]>) => void;
  getPagination: (key: string) => DataState['pagination'][string] | undefined;
  
  // 필터 액션들
  setFilter: (key: string, filters: Record<string, any>) => void;
  getFilter: (key: string) => Record<string, any> | undefined;
  clearFilter: (key: string) => void;
  
  // 정렬 액션들
  setSorting: (key: string, sorting: DataState['sorting'][string]) => void;
  getSorting: (key: string) => DataState['sorting'][string] | undefined;
  clearSorting: (key: string) => void;
  
  // 유틸리티 액션들
  isExpired: (key: string) => boolean;
  isStale: (key: string, staleTime?: number) => boolean;
  getCacheInfo: (key: string) => DataState['cache'][string] | undefined;
}

export const useDataStore = create<DataState>()(
  devtools(
    (set, get) => ({
      cache: {},
      pagination: {},
      filters: {},
      sorting: {},
      
      setData: <T>(key: string, data: T[], expiresIn: number = 5 * 60 * 1000) => set(
        (state) => ({
          cache: {
            ...state.cache,
            [key]: {
              data,
              timestamp: Date.now(),
              expiresAt: Date.now() + expiresIn,
              isLoading: false,
              error: undefined,
            },
          },
        }),
        false,
        'data/setData'
      ),
      
      getData: <T>(key: string) => {
        const state = get();
        const cacheItem = state.cache[key];
        if (!cacheItem || cacheItem.isLoading) {
          return undefined;
        }
        return cacheItem.data as T[];
      },
      
      setLoading: (key: string, isLoading: boolean) => set(
        (state) => ({
          cache: {
            ...state.cache,
            [key]: {
              ...state.cache[key],
              isLoading,
              error: isLoading ? undefined : state.cache[key]?.error,
            },
          },
        }),
        false,
        'data/setLoading'
      ),
      
      setError: (key: string, error?: string) => set(
        (state) => ({
          cache: {
            ...state.cache,
            [key]: {
              ...state.cache[key],
              error,
              isLoading: false,
            },
          },
        }),
        false,
        'data/setError'
      ),
      
      clearCache: (key?: string) => set(
        (state) => {
          if (key) {
            const { [key]: removed, ...remaining } = state.cache;
            return { cache: remaining };
          }
          return { cache: {} };
        },
        false,
        'data/clearCache'
      ),
      
      clearAllCache: () => set(
        { cache: {}, pagination: {}, filters: {}, sorting: {} },
        false,
        'data/clearAllCache'
      ),
      
      setPagination: (key: string, pagination: Partial<DataState['pagination'][string]>) => set(
        (state) => ({
          pagination: {
            ...state.pagination,
            [key]: {
              page: 1,
              pageSize: 10,
              total: 0,
              totalPages: 0,
              ...state.pagination[key],
              ...pagination,
            },
          },
        }),
        false,
        'data/setPagination'
      ),
      
      getPagination: (key: string) => {
        const state = get();
        return state.pagination[key];
      },
      
      setFilter: (key: string, filters: Record<string, any>) => set(
        (state) => ({
          filters: {
            ...state.filters,
            [key]: {
              ...state.filters[key],
              ...filters,
            },
          },
        }),
        false,
        'data/setFilter'
      ),
      
      getFilter: (key: string) => {
        const state = get();
        return state.filters[key];
      },
      
      clearFilter: (key: string) => set(
        (state) => {
          const { [key]: removed, ...remaining } = state.filters;
          return { filters: remaining };
        },
        false,
        'data/clearFilter'
      ),
      
      setSorting: (key: string, sorting: DataState['sorting'][string]) => set(
        (state) => ({
          sorting: {
            ...state.sorting,
            [key]: sorting,
          },
        }),
        false,
        'data/setSorting'
      ),
      
      getSorting: (key: string) => {
        const state = get();
        return state.sorting[key];
      },
      
      clearSorting: (key: string) => set(
        (state) => {
          const { [key]: removed, ...remaining } = state.sorting;
          return { sorting: remaining };
        },
        false,
        'data/clearSorting'
      ),
      
      isExpired: (key: string) => {
        const state = get();
        const cacheItem = state.cache[key];
        return cacheItem ? Date.now() > cacheItem.expiresAt : true;
      },
      
      isStale: (key: string, staleTime: number = 60 * 1000) => {
        const state = get();
        const cacheItem = state.cache[key];
        return cacheItem ? Date.now() > cacheItem.timestamp + staleTime : true;
      },
      
      getCacheInfo: (key: string) => {
        const state = get();
        return state.cache[key];
      },
    }),
    {
      name: 'data-store',
    }
  )
); 