import React from 'react';
import Header from './Header';
import CategoryTabs from './CategoryTabs';
import SubTabs from './SubTabs';

export default function App() {
  return (
    <>
      <Header />
      <CategoryTabs />
      <SubTabs />
      {/* 이후 컨텐츠 */}
    </>
  );
}