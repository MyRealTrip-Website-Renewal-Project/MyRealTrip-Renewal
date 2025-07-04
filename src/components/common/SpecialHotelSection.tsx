import React, { useEffect, useState } from 'react';
import styles from './SpecialHotelSection.module.css';

// 예시 국가별 주요 도시 데이터
const COUNTRY_CITY_MAP: Record<string, string[]> = {
  KR: ['서울', '부산', '제주'],
  JP: ['도쿄', '오사카', '교토'],
  US: ['뉴욕', 'LA', '샌프란시스코'],
};

// 예시 도시별 호텔 상품 데이터
const HOTEL_DATA: Record<string, Array<{
  id: string;
  name: string;
  image: string;
  price: string;
  link: string;
}>> = {
  '서울': [
    { id: '1', name: '서울 시티 호텔', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', price: '120,000원', link: '#' },
    { id: '2', name: '강남 프리미엄 호텔', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', price: '180,000원', link: '#' },
  ],
  '부산': [
    { id: '3', name: '해운대 오션뷰 호텔', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', price: '150,000원', link: '#' },
    { id: '4', name: '광안리 비치 호텔', image: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=400&q=80', price: '130,000원', link: '#' },
  ],
  '제주': [
    { id: '5', name: '제주 리조트', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80', price: '200,000원', link: '#' },
  ],
  '도쿄': [
    { id: '6', name: '도쿄 시내 호텔', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', price: '170,000원', link: '#' },
  ],
  '오사카': [
    { id: '7', name: '오사카 중심 호텔', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', price: '160,000원', link: '#' },
  ],
  '교토': [
    { id: '8', name: '교토 전통 료칸', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', price: '140,000원', link: '#' },
  ],
  '뉴욕': [
    { id: '9', name: '뉴욕 맨해튼 호텔', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', price: '250,000원', link: '#' },
  ],
  'LA': [
    { id: '10', name: 'LA 다운타운 호텔', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', price: '210,000원', link: '#' },
  ],
  '샌프란시스코': [
    { id: '11', name: '샌프란시스코 베이 호텔', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', price: '230,000원', link: '#' },
  ],
};

function getCountryByLanguage(lang: string): string {
  if (lang.startsWith('ko')) return 'KR';
  if (lang.startsWith('ja')) return 'JP';
  if (lang.startsWith('en')) return 'US';
  return 'KR'; // 기본값
}

interface Hotel {
  id: string;
  name: string;
  image: string;
  price: string;
  link: string;
}

interface SpecialHotelSectionProps {
  title: string;
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
  hotels: Hotel[];
  loading?: boolean;
}

const SpecialHotelSection: React.FC<SpecialHotelSectionProps> = ({
  title,
  cities,
  selectedCity,
  onSelectCity,
  hotels,
  loading,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.labelList}>
        {cities.map(city => (
          <button
            key={city}
            className={selectedCity === city ? styles.labelActive : styles.label}
            onClick={() => onSelectCity(city)}
            type="button"
          >
            {city}
          </button>
        ))}
      </div>
      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#888' }}>로딩 중...</div>
      ) : (
        <div className={styles.cardList}>
          {hotels.map(hotel => (
            <a key={hotel.id} href={hotel.link} className={styles.card} target="_blank" rel="noopener noreferrer">
              <img src={hotel.image} alt={hotel.name} className={styles.cardImg} />
              <div className={styles.cardInfo}>
                <div className={styles.cardName}>{hotel.name}</div>
                <div className={styles.cardPrice}>{hotel.price}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default SpecialHotelSection; 