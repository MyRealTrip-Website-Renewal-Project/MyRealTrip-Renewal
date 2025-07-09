import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryTabs from '@components/common/CategoryTabs';
import SubTabs from '@components/common/SubTabs';
import CI from '@assets/img/CI.svg';
import type { Category } from '../../types/category';
import type { SubTab } from '../../types/subtab';
import ArrowDownIcon, { SearchIcon } from '../../components/common/ArrowDownIcon';
import Modal from '../common/Modal';
import AuthModal from '../common/AuthModal';
import { useSearchStore } from '../../store/useSearchStore';
import { useDebounce } from '../../hooks/useDebounce';
import {
  HeaderContainer,
  HeaderInner,
  HeaderLeft,
  HeaderLogo,
  SearchBarContainer,
  SearchInput,
  SearchButton,
  HeaderRight,
  PartnerLogin,
  LoginButton,
  HeaderTabsWrapper,
} from './Header.styled';

interface HeaderProps {
  categories: Category[];
  subTabs: SubTab[];
}

const Header = React.memo(function Header({ categories, subTabs }: HeaderProps) {
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { query, setQuery, addRecentSearch } = useSearchStore();
  const debouncedQuery = useDebounce(query, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      addRecentSearch(query.trim());
      // TODO: 실제 검색 로직 구현
      console.log('Searching for:', query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <HeaderInner>
        {/* Left: Logo */}
        <HeaderLeft>
          <HeaderLogo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <img 
                src={CI}
                alt="Myrealtrip" 
                width={120} 
                height={32}
              />
            </Link>
          </HeaderLogo>
        </HeaderLeft>
        
        {/* Center: Search Bar */}
        <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder='"앰배서더풀만" 초특가 호캉스 오픈런 준비!'
            value={query}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
          />
          <SearchButton
            onClick={handleSearchSubmit}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="검색"
          >
            <SearchIcon size={20} />
          </SearchButton>
        </SearchBarContainer>
        
        {/* Right: Partner/Login */}
        <HeaderRight>
          <PartnerLogin>파트너 로그인</PartnerLogin>
          <LoginButton
            onClick={() => setAuthOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            로그인 및 회원가입
          </LoginButton>
        </HeaderRight>
      </HeaderInner>
      
      {/* Tabs: Category + SubTabs together */}
      <HeaderTabsWrapper>
        <CategoryTabs categories={categories} />
        <SubTabs subTabs={subTabs} />
      </HeaderTabsWrapper>
      
      <Modal open={authOpen} onClose={() => setAuthOpen(false)}>
        <AuthModal />
      </Modal>
    </HeaderContainer>
  );
});

export default Header; 