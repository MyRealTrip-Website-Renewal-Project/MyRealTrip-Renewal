import React from 'react';
import styled, { css } from 'styled-components';
import type { SubTab } from '@types/subtab';

interface SubTabsProps {
  subTabs: SubTab[];
}

const flexRow = css`
  display: flex;
  align-items: center;
`;

const SubTabsNav = styled.nav`
  background: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const SubTabsInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  ${flexRow}
  gap: 18px;
  height: 40px;
  padding: 0 24px;
  @media (max-width: 768px) {
    gap: 6px;
    height: 32px;
    padding: 0 4px;
    overflow-x: auto;
    font-size: 12px;
  }
`;

const SubTabItem = styled.div<{ $active?: boolean }>`
  font-size: 15px;
  color: #888;
  cursor: pointer;
  padding: 0 8px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-bottom 0.15s;
  ${(props) =>
    props.$active &&
    css`
      color: ${({ theme }) => theme.color.danger};
      border-bottom: 2px solid ${({ theme }) => theme.color.danger};
      font-weight: 700;
    `}
  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0 4px;
    height: 32px;
    line-height: 32px;
  }
`;

const SubTabs: React.FC<SubTabsProps> = React.memo(({ subTabs }) => (
  <SubTabsNav>
    <SubTabsInner>
      {subTabs.map((tab, i) => (
        <SubTabItem key={i} $active={tab.active}>
          {tab.label}
        </SubTabItem>
      ))}
    </SubTabsInner>
  </SubTabsNav>
));

export default SubTabs; 