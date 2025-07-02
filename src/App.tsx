import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StickyHeader from '@components/Header/Header';
import type { Category } from '@types/category';
import type { SubTab } from '@types/subtab';

const Home = lazy(() => import('@pages/Home/Home'));
const About = lazy(() => import('@pages/About/About'));

const categories: Category[] = [
  { icon: '🎉', label: '혜택' },
  { icon: '✈️', label: '항공' },
  { icon: '🏨', label: '해외숙소' },
  { icon: '🏠', label: '국내숙소' },
  { icon: '🗽', label: '투어·티켓' },
  { icon: '🎡', label: '샤프로특가' },
  { icon: '🏄‍♂️', label: '휘닉스파크' },
  { icon: '🏝️', label: '동남아호텔딜' },
  { icon: '🏡', label: '한인민박' },
  { icon: '▼', label: '더보기' },
];

const subTabs: SubTab[] = [
  { label: '앰배서더풀만', active: false },
  { label: '여행상품', active: true },
  { label: '파인·촌뜨기들', active: false },
  { label: 'LIVE 방송', active: false },
  { label: '여행블로그', active: false },
];

export default function App() {
  return (
    <BrowserRouter>
      <StickyHeader categories={categories} subTabs={subTabs} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}