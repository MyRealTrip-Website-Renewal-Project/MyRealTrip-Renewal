import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import CategoryTabs from '@components/common/CategoryTabs';
import SubTabs from '@components/common/SubTabs';
import CI from '@assets/img/CI.svg';
import type { Category } from '../../types/category';
import type { SubTab } from '../../types/subtab';
import ArrowDownIcon, { SearchIcon } from '../../components/common/ArrowDownIcon';
import Modal from '../common/Modal';
import AuthModal from '../common/AuthModal';

const SEARCH_ICON_URL = 'https://dffoxz5he03rp.cloudfront.net/icons/ic_search_20x20_gray_500.svg';

interface HeaderProps {
  categories: Category[];
  subTabs: SubTab[];
}

const Header = React.memo(function Header({ categories, subTabs }: HeaderProps) {
  const [search, setSearch] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles['header-inner']}>
        {/* Left: Logo */}
        <div className={styles['header-left']}>
          <Link to="/" className={styles['header-logo']}>
            <img 
              src={CI}
              alt="Myrealtrip" 
              width={120} 
              height={32}
            />
          </Link>
        </div>
        {/* Center: Search Bar */}
        <div className={styles['header-searchbar']}>
          <input
            type="text"
            placeholder='"앰배서더풀만" 초특가 호캉스 오픈런 준비!'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className={styles['search-icon-btn']} aria-label="검색">
            <SearchIcon size={20} />
          </button>
        </div>
        {/* Right: Partner/Login */}
        <div className={styles['header-right']}>
          <span className={styles['partner-login']}>파트너 로그인</span>
          <button className={styles['login-btn']} onClick={() => setAuthOpen(true)}>로그인 및 회원가입</button>
        </div>
      </div>
      {/* Tabs: Category + SubTabs together */}
      <div className={styles['header-tabs-wrap']}>
        <CategoryTabs categories={categories} />
        <SubTabs subTabs={subTabs} />
      </div>
      <Modal open={authOpen} onClose={() => setAuthOpen(false)}>
        <AuthModal />
      </Modal>
    </header>
  );
});

export default Header; 