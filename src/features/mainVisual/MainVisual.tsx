import React, { useState, useCallback } from 'react';
import styles from './MainVisual.module.css';
import common from '@styles/global.css';
import ArrowDownIcon, { SearchIcon } from '../../components/common/ArrowDownIcon';

const tabList = [
  { label: '숙소', iconType: 'img', imgSrc: '/src/assets/img/76_original_1708677309.png' },
  { label: '항공권', iconType: 'img', imgSrc: '/src/assets/img/69_original_1708677075.png' },
  { label: '기차표', iconType: 'img', imgSrc: '/src/assets/img/2247_original_1749704796.png' },
  { label: '렌터카·공항픽업', iconType: 'img', imgSrc: '/src/assets/img/71_original_1708677259.png' },
  { label: '투어&티켓', iconType: 'img', imgSrc: '/src/assets/img/2057_original_1708678186.png' },
  { label: '항공 + 호텔', iconType: 'img', imgSrc: '/src/assets/img/2159_original_1722315289.png', isNew: true },
];

const TabIcon = React.memo(function TabIcon({ iconType, imgSrc }: any) {
  if (iconType === 'img') {
    return <img src={imgSrc} alt="탭 아이콘" width={22} height={22} style={{ display: 'block', marginRight: 8 }} />;
  }
  if (iconType === 'arrow') {
    return <ArrowDownIcon size={22} style={{ marginRight: 8 }} />;
  }
  return (
    <svg width="22" height="22" style={{ marginRight: 8 }}><rect width="22" height="22" rx="6" fill="#232f3e" /></svg>
  );
});

const SearchTab = React.memo(function SearchTab({ label, iconType, imgSrc, active, isNew, onClick }: any) {
  return (
    <li
      className={styles.tabItem + (active ? ' ' + styles.activeTab : '')}
      role="tab"
      tabIndex={active ? 0 : -1}
      aria-selected={active ? 'true' : 'false'}
      onClick={onClick}
    >
      <TabIcon iconType={iconType} imgSrc={imgSrc} />
      <span className={styles.tabName}>{label}</span>
      {isNew && (
        <span className={styles.newBadge}>New</span>
      )}
    </li>
  );
});

// 입력값 sanitize 함수
function sanitizeInput(input: string) {
  return input.replace(/[<>"']/g, '');
}

function SearchBar() {
  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(sanitizeInput(e.target.value));
  };

  const handleSearch = async () => {
    if (searchLoading) return;
    setSearchLoading(true);
    // 실제 검색 로직 (API 호출 등)
    // 민감정보 콘솔 출력 금지 (예시)
    // console.log('검색어:', search); // X
    setTimeout(() => {
      setSearchLoading(false);
    }, 800); // 예시: 0.8초 후 버튼 활성화
  };

  return (
    <div className={styles.searchBar}>
      {/* 여행지 */}
      <div className={styles.searchFieldBox}>
        <div className={styles.searchFieldLabel}>여행지</div>
        <input
          className={styles.searchInput}
          placeholder="도시, 공항, 지역, 랜드마크, 호텔 이름으로 검색"
          value={search}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>
      {/* 체크인/1박/체크아웃 - 한 박스에 */}
      <div className={styles.dateBox} style={{ flexDirection: 'row', alignItems: 'center', gap: 0, minWidth: 320, padding: '0 0 0 0' }}>
        <div style={{ flex: 1, padding: '12px 18px 10px 18px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div className={styles.dateLabel}>체크인</div>
          <div className={styles.dateValue}>7월 3일(목)</div>
        </div>
        <div className={styles.nightsText} style={{ flex: '0 0 48px', textAlign: 'center' }}>1박</div>
        <div style={{ flex: 1, padding: '12px 18px 10px 18px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div className={styles.dateLabel}>체크아웃</div>
          <div className={styles.dateValue}>7월 4일(금)</div>
        </div>
      </div>
      {/* 객실당 인원 수 */}
      <div className={styles.searchFieldBox} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minWidth: 220 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.searchFieldLabel}>객실당 인원 수</div>
          <div className={styles.searchValue} style={{ fontWeight: 700, fontSize: 12, color: '#232f3e' }}>객실 1개, 성인 2명, 어린이 0명</div>
        </div>
        <ArrowDownIcon size={20} style={{ marginLeft: 8 }} />
      </div>
      {/* 검색 버튼 */}
      <button
        className={styles.searchBtn}
        type="button"
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        onClick={handleSearch}
        disabled={searchLoading}
      >
        <span className={styles.searchBtnIcon}>
          <SearchIcon size={20} style={{ filter: 'invert(1) grayscale(1) brightness(2)' }} />
        </span>
        <span>검색</span>
      </button>
    </div>
  );
}

const MainVisual = React.memo(function MainVisual({
  backgroundImage = '/src/assets/img/76924789273a48aadae2ee510514eea924c63067.webp',
  title = '여행이 필요할 때, 마이리얼트립',
  subtitle = '',
}: {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}) {
  const [selectedTab, setSelectedTab] = useState(tabList[0].label);
  const handleTabClick = useCallback((label: string) => setSelectedTab(label), []);
  return (
    <div className={styles.mainVisual}>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.visualTitle}>{title}</h1>
        <div className={styles.visualInfoRow}>
          <span className={styles.check}><img src="/src/assets/img/0AS6b1200090fx7s7F635.webp" alt="체크 아이콘" width={18} height={18} /></span>
          <span className={styles.infoText}>보다 안전한 안심 결제 시스템</span>
          <span className={styles.divider}>|</span>
          <span className={styles.check}><img src="/src/assets/img/0AS6b1200090fx7s7F635.webp" alt="체크 아이콘" width={18} height={18} /></span>
          <span className={styles.infoText}>24시간 연중무휴 고객센터</span>
        </div>
      </div>
      <div className={styles.tabSearchWrap}>
        <ul className={styles.tabBar} role="tablist">
          {tabList.map((tab, idx) => (
            <SearchTab
              key={tab.label}
              {...tab}
              active={selectedTab === tab.label}
              onClick={() => handleTabClick(tab.label)}
            />
          ))}
        </ul>
        <SearchBar />
      </div>
    </div>
  );
});

export default MainVisual; 