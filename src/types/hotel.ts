export interface HotelCardData {
  image: string;
  name: string;
  star?: number;
  rating: number;
  reviewUrl: string;
  reviewCount: number;
  freeCancel?: boolean;
  timeSale?: boolean;
  badgeText?: string;
  price: string | number;
} 