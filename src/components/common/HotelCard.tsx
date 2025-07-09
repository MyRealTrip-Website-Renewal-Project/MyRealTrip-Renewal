import React from 'react';
import type { HotelCardData } from '../../types/hotel';
import {
  Card,
  CardImage,
  CardInfo,
  HotelName,
  Stars,
  ReviewRow,
  Rating,
  ReviewLink,
  BadgeRow,
  Badge,
  PriceRow,
  PriceLabel,
  Price,
} from './HotelCard.styled';

interface HotelCardProps {
  hotel: HotelCardData;
  tabIndex?: number;
  role?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, tabIndex = 0, role = 'article' }) => (
  <Card
    tabIndex={tabIndex}
    role={role}
    aria-label={hotel.name}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
  >
    <CardImage src={hotel.image} alt={hotel.name} />
    <CardInfo>
      <HotelName>
        {hotel.name}
        {hotel.star && (
          <Stars aria-label={`별점 ${hotel.star}점`}>
            {'★'.repeat(hotel.star)}
          </Stars>
        )}
      </HotelName>
      <ReviewRow>
        <Rating aria-label={`평점 ${hotel.rating}점`}>
          <strong>{hotel.rating}</strong>
          <span>/10</span>
        </Rating>
        <ReviewLink
          href={hotel.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="이용자 리뷰 페이지로 이동"
        >
          이용자 리뷰 <strong>{hotel.reviewCount}</strong>개
        </ReviewLink>
      </ReviewRow>
      <BadgeRow>
        {hotel.freeCancel && (
          <Badge variant="freeCancel" aria-label="무료 취소">
            무료 취소
          </Badge>
        )}
        {hotel.timeSale && (
          <Badge variant="timeSale" aria-label="타임 세일">
            타임 세일
          </Badge>
        )}
        {hotel.badgeText && (
          <Badge variant="hotelBadge">{hotel.badgeText}</Badge>
        )}
      </BadgeRow>
      <PriceRow>
        <PriceLabel>최저가</PriceLabel>
        <Price>
          <strong>{hotel.price}</strong>
        </Price>
      </PriceRow>
    </CardInfo>
  </Card>
);

export default HotelCard; 