import React, { useState } from 'react';
import HotelSection, { HotelSectionProps, HotelCardData } from './HotelSection';
import promoImg from '../../assets/img/b0c8dc949e5e03c58041e395601d75a7.b0c8dc949e5e03c58041e395601d75a7.png';

const BADGES = [
  { icon: <span>✅</span>, text: '최저가 보장제', color: '#1ec800' },
  { icon: <span>🏨</span>, text: '호텔 예약 보장제', color: '#ffb300' },
  { icon: <span>🚌</span>, text: '호텔 숙박 보장제', color: '#ff9100' },
];

const CITY_LIST = ['부산', '제주', '서귀포', '인천', '속초', '강릉', '고양'];

const HOTEL_DATA: Record<string, HotelCardData[]> = {
  부산: [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      name: '호메르스 호텔',
      rating: 8.6,
      reviewCount: 229,
      reviewUrl: '#',
      price: '234,859원',
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
      star: 4,
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      name: '호텔포레 더 스파',
      rating: 9.0,
      reviewCount: 138,
      reviewUrl: '#',
      price: '160,843원',
      freeCancel: true,
      star: 4,
    },
  ],
  제주: [
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
      name: '제주 오션뷰 호텔',
      rating: 8.2,
      reviewCount: 120,
      reviewUrl: '#',
      price: '180,000원',
      freeCancel: true,
      star: 4,
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      name: '제주 시티 호텔',
      rating: 8.5,
      reviewCount: 99,
      reviewUrl: '#',
      price: '150,000원',
      timeSale: true,
      star: 3,
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      name: '제주 프리미엄 호텔',
      rating: 9.1,
      reviewCount: 210,
      reviewUrl: '#',
      price: '210,000원',
      freeCancel: true,
      star: 5,
    },
  ],
  서귀포: [], 인천: [], 속초: [], 강릉: [], 고양: [],
};

const PROMOTION = {
  image: promoImg,
  title: '전 세계 초특가 호텔',
  buttonText: '지금 확인하기',
  buttonUrl: '#',
};

const HotelSectionContainer: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(CITY_LIST[0]);
  const cities = CITY_LIST.map(city => ({
    name: city,
    selected: city === selectedCity,
    onClick: () => setSelectedCity(city),
  }));
  return (
    <HotelSection
      selectedCity={selectedCity}
      onSelectCity={setSelectedCity}
      cities={cities}
      hotels={HOTEL_DATA[selectedCity] || []}
      promotion={PROMOTION}
    />
  );
};

export default HotelSectionContainer; 