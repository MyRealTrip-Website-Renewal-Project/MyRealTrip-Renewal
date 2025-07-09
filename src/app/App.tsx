import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import StickyHeader from '@components/layout/Header';
import type { Category } from '../types/category';
import type { SubTab } from '../types/subtab';
import Splash from '@features/splash/Splash';
import { Providers } from './Providers';

// 페이지 컴포넌트들을 지연 로딩으로 가져오기
const Home = lazy(() => import('@features/home/HomePage'));
const About = lazy(() => import('@features/about/AboutPage'));

// 카테고리 데이터 정의
const categories: Category[] = [
  { icon: <img src="/src/assets/img/2257_original_1750901078.png" alt="혜택" style={{ width: 18, height: 18, verticalAlign: 'middle' }} />, label: '혜택' },
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

// 서브 탭 데이터 정의
const subTabs: SubTab[] = [
  { label: '앰배서더풀만', active: false },
  { label: '여행상품', active: true },
  { label: '파인·촌뜨기들', active: false },
  { label: 'LIVE 방송', active: false },
  { label: '여행블로그', active: false },
];

// 로딩 컴포넌트
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    로딩 중...
  </div>
);

export default React.memo(function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <Providers>
        <Splash />
      </Providers>
    );
  }

  return (
    <Providers>
      <HelmetProvider>
        <BrowserRouter>
          <StickyHeader categories={categories} subTabs={subTabs} />
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Home />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<LoadingSpinner />}>
                <About />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Providers>
  );
});