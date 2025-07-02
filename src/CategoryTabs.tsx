import React from 'react';

const categories = [
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

export default function CategoryTabs() {
  return (
    <nav className="category-tabs">
      <div className="category-tabs-inner">
        {categories.map((cat, i) => (
          <div className="category-tab" key={i}>
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
