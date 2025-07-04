import React, { useState } from 'react';
import SpecialHotelSection from './SpecialHotelSection';

// 더미 도시 데이터
const DUMMY_CITIES = ['서울', '부산', '제주'];

// 더미 호텔 상품 데이터
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
};

const SpecialHotelSectionContainer: React.FC = () => {
  const [cities] = useState(DUMMY_CITIES);
  const [selectedCity, setSelectedCity] = useState(DUMMY_CITIES[0]);

  const hotels = HOTEL_DATA[selectedCity] || [];

  return (
    <SpecialHotelSection
      title="특별 추천 호텔"
      cities={cities}
      selectedCity={selectedCity}
      onSelectCity={setSelectedCity}
      hotels={hotels}
      loading={false}
    />
  );
};

export default SpecialHotelSectionContainer; 