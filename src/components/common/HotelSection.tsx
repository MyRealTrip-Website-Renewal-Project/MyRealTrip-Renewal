import React from 'react';
import styles from './HotelSection.module.css';
import badgeGuarantee from '../../assets/img/0AS6o120009gxfriv28B3.webp';
import badgeLowest from '../../assets/img/0AS5f120008whj34f2145.webp';
import badgeStay from '../../assets/img/0AS2j120009gxknwsA052.webp';
import promoImg from '../../assets/img/b0c8dc949e5e03c58041e395601d75a7.b0c8dc949e5e03c58041e395601d75a7.png';
import HotelCard from './HotelCard';
import PromotionCard from './PromotionCard';
import CityTab from './CityTab';
import Badge from './Badge';

export interface Badge {
  icon: React.ReactNode;
  text: string;
  color?: string;
}

export interface CityLabel {
  name: string;
  selected: boolean;
  onClick: () => void;
}

export interface HotelCardData {
  id: string;
  image: string;
  name: string;
  rating: number;
  reviewCount: number;
  reviewUrl: string;
  price: string;
  freeCancel?: boolean;
  timeSale?: boolean;
  badgeText?: string;
  badgeColor?: string;
  star?: number;
}

export interface PromotionCardData {
  image: string;
  title: string;
  buttonText: string;
  buttonUrl: string;
}

export interface HotelSectionProps {
  title?: string;
  badges?: Badge[];
  cities?: CityLabel[];
  hotels?: HotelCardData[];
  promotion?: PromotionCardData;
  selectedCity?: string;
  onSelectCity?: (city: string) => void;
}

// 이미지와 1:1로 맞는 더미 데이터
const defaultBadges: Badge[] = [
  {
    icon: <img src={badgeLowest} alt="최저가 보장제" style={{width:18,height:18,display:'inline',verticalAlign:'middle'}} />,
    text: '최저가 보장제',
  },
  {
    icon: <img src={badgeGuarantee} alt="호텔 예약 보장제" style={{width:18,height:18,display:'inline',verticalAlign:'middle'}} />,
    text: '호텔 예약 보장제',
  },
  {
    icon: <img src={badgeStay} alt="호텔 숙박 보장제" style={{width:18,height:18,display:'inline',verticalAlign:'middle'}} />,
    text: '호텔 숙박 보장제',
  },
];

const defaultCities: CityLabel[] = [
  { name: '부산', selected: true, onClick: () => {} },
  { name: '제주', selected: false, onClick: () => {} },
  { name: '서귀포', selected: false, onClick: () => {} },
  { name: '인천', selected: false, onClick: () => {} },
  { name: '속초', selected: false, onClick: () => {} },
  { name: '강릉', selected: false, onClick: () => {} },
  { name: '고양', selected: false, onClick: () => {} },
];

const defaultHotels: HotelCardData[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    name: '호메르스 호텔',
    rating: 8.6,
    reviewCount: 229,
    reviewUrl: '#',
    price: '230,658원',
    freeCancel: true,
    star: 5,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    name: '페어필드 바이 메리어트 부산',
    rating: 8.8,
    reviewCount: 538,
    reviewUrl: '#',
    price: '236,550원',
    timeSale: true,
    star: 5,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    name: '호텔포레 더 스파',
    rating: 9.0,
    reviewCount: 138,
    reviewUrl: '#',
    price: '160,851원',
    freeCancel: true,
    star: 5,
  },
];

const defaultPromotion: PromotionCardData = {
  image: promoImg,
  title: '전 세계 초특가 호텔',
  buttonText: '지금 확인하기',
  buttonUrl: '#',
};

const HotelSection: React.FC<HotelSectionProps> = ({
  title = '인기 호텔 및 숙소',
  badges = defaultBadges,
  cities = defaultCities,
  hotels = defaultHotels,
  promotion = defaultPromotion,
  selectedCity,
  onSelectCity,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.badgeRow}>
        {badges.map((badge, i) => (
          <Badge key={i} icon={badge.icon} text={badge.text} />
        ))}
      </div>
      <div className={styles.cityRow}>
        {cities.map(city => (
          <CityTab key={city.name} name={city.name} selected={city.selected} onClick={city.onClick} />
        ))}
      </div>
      <div className={styles.cardList}>
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
        <PromotionCard
          image={promotion.image}
          title={promotion.title}
          buttonText={promotion.buttonText}
          buttonUrl={promotion.buttonUrl}
        />
      </div>
    </section>
  );
};

export default HotelSection; 