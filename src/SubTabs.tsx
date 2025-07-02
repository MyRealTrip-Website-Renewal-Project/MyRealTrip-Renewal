import React from 'react';

const subTabs = [
  { label: '앰배서더풀만', active: false },
  { label: '여행상품', active: true },
  { label: '파인·촌뜨기들', active: false },
  { label: 'LIVE 방송', active: false },
  { label: '여행블로그', active: false },
];

export default function SubTabs() {
  return (
    <nav className="sub-tabs">
      <div className="sub-tabs-inner">
        {subTabs.map((tab, i) => (
          <div
            className={`sub-tab${tab.active ? ' active' : ''}`}
            key={i}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </nav>
  );
}
