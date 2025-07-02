import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import CI from '@assets/img/CI.svg';
import CategoryTabs from '@components/CategoryTabs/CategoryTabs';
import SubTabs from '@components/SubTabs/SubTabs';
import type { Category } from '@types/category';
import type { SubTab } from '@types/subtab';
import type { ThemeType } from '@styles/theme';

interface StickyHeaderProps {
  categories: Category[];
  subTabs: SubTab[];
}

const flexRow = css`
  display: flex;
  align-items: center;
`;

const StickyHeaderWrap = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
`;

const HeaderBar = styled.header`
  background: ${({ theme }) => theme.color.white};
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  ${flexRow}
  justify-content: space-between;
  padding: 0 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 8px;
    align-items: flex-start;
  }
`;

const HeaderLeft = styled.div`
  ${flexRow}
  flex: 1 1 0;
  min-width: 0;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const Logo = styled.img`
  height: 32px;
  margin-right: 24px;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 8px;
  }
`;

const SearchBarWrap = styled.div`
  position: relative;
  width: 320px;
  background: ${({ theme }) => theme.color.gray};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: 40px;
  ${flexRow}
  box-shadow: none;
  @media (max-width: 768px) {
    width: 100%;
    min-width: 100px;
    max-width: 100%;
    margin-bottom: 8px;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  color: ${({ theme }) => theme.color.text};
  flex: 1;
  padding: 0 40px 0 16px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius};
  &::placeholder {
    color: ${({ theme }) => theme.color.placeholder};
    font-size: 15px;
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 28px;
  ${flexRow}
  justify-content: center;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.color.yellowHover};
  }
`;

const HeaderRight = styled.div`
  ${flexRow}
  gap: 18px;
  margin-left: 32px;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 8px;
    width: 100%;
    justify-content: flex-end;
  }
`;

const PartnerLogin = styled.span`
  color: #666;
  font-size: 15px;
`;

const LoginBtn = styled.button`
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 16px;
  padding: 8px 22px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.color.secondary};
  }
`;

const SearchIcon: React.FC = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 20 20">
    <circle cx="9" cy="9" r="7" stroke="#bdbdbd" strokeWidth="2"/>
    <path d="M15 15L18 18" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const StickyHeader: React.FC<StickyHeaderProps> = ({ categories, subTabs }) => {
  const [keyword, setKeyword] = React.useState('');
  const handleSearch = () => {
    if (keyword.trim()) alert(`'${keyword}'(으)로 검색합니다!`);
    else alert('여행지를 입력해 주세요.');
  };

  return (
    <StickyHeaderWrap>
      <HeaderBar>
        <HeaderInner>
          <HeaderLeft>
            <Logo src={CI} alt="Myrealtrip CI" />
            <SearchBarWrap>
              <SearchInput
                type="text"
                placeholder='"휘닉스파크" 역대급 특가 오픈'
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <SearchBtn onClick={handleSearch} aria-label="검색">
                <SearchIcon />
              </SearchBtn>
            </SearchBarWrap>
          </HeaderLeft>
          <HeaderRight>
            <PartnerLogin>파트너 로그인</PartnerLogin>
            <LoginBtn>로그인 및 회원가입</LoginBtn>
          </HeaderRight>
        </HeaderInner>
      </HeaderBar>
      <CategoryTabs categories={categories} />
      <SubTabs subTabs={subTabs} />
    </StickyHeaderWrap>
  );
};

export default StickyHeader; 