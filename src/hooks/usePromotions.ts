import { useQuery } from '@tanstack/react-query';
import { promotionApi, type Promotion } from '../services/api';

// 프로모션 목록 조회 훅
export const usePromotions = () => {
  return useQuery({
    queryKey: ['promotions'],
    queryFn: () => promotionApi.getPromotions(),
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
  });
};

// 프로모션 상세 조회 훅
export const usePromotion = (id: string) => {
  return useQuery({
    queryKey: ['promotion', id],
    queryFn: () => promotionApi.getPromotion(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}; 