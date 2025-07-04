import React from 'react';
import styles from './HotelCard.module.css';
import type { HotelCardData } from '../../types/hotel';

interface HotelCardProps {
  hotel: HotelCardData;
  tabIndex?: number;
  role?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, tabIndex = 0, role = 'article' }) => (
  <div className={styles.card} tabIndex={tabIndex} role={role} aria-label={hotel.name}>
    <img src={hotel.image} alt={hotel.name} className={styles.img} />
    <div className={styles.info}>
      <div className={styles.name}>
        {hotel.name}
        {hotel.star && <span className={styles.stars} aria-label={`별점 ${hotel.star}점`}>{'★'.repeat(hotel.star)}</span>}
      </div>
      <div className={styles.reviewRow}>
        <span className={styles.rating} aria-label={`평점 ${hotel.rating}점`}><strong>{hotel.rating}</strong><span>/10</span></span>
        <a href={hotel.reviewUrl} className={styles.reviewLink} target="_blank" rel="noopener noreferrer" aria-label="이용자 리뷰 페이지로 이동">
          이용자 리뷰 <strong>{hotel.reviewCount}</strong>개
        </a>
      </div>
      <div className={styles.badgeRow}>
        {hotel.freeCancel && <span className={styles.freeCancel} aria-label="무료 취소">무료 취소</span>}
        {hotel.timeSale && <span className={styles.timeSale} aria-label="타임 세일">타임 세일</span>}
        {hotel.badgeText && <span className={styles.hotelBadge}>{hotel.badgeText}</span>}
      </div>
      <div className={styles.priceRow}>
        <span className={styles.priceLabel}>최저가</span>
        <span className={styles.price}><strong>{hotel.price}</strong></span>
      </div>
    </div>
  </div>
);
export default HotelCard; 