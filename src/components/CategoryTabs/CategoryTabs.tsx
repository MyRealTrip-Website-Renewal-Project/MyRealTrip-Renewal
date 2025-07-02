import React from 'react';
import styled, { css } from 'styled-components';
import type { Category } from '@types/category';

interface CategoryTabsProps {
  categories: Category[];
}

const flexRow = css`
  display: flex;
  align-items: center;
`;

const TabsNav = styled.nav`
  background: ${({ theme }) => theme.color.white};
`;

const TabsInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  ${flexRow}
  gap: 12px;
  height: 40px;
  padding: 0 16px;
  @media (max-width: 768px) {
    gap: 6px;
    height: 36px;
    padding: 0 4px;
    overflow-x: auto;
    font-size: 12px;
  }
`;

const Tab = styled.div`
  ${flexRow}
  gap: 4px;
  font-size: 13px;
  font-weight: 400;
  color: #444;
  font-family: inherit;
  letter-spacing: 0.01em;
  cursor: pointer;
  padding: 0 6px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-bottom 0.15s;
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0 4px;
    height: 36px;
    line-height: 36px;
  }
`;

const TabIcon = styled.span`
  font-size: 16px;
  ${flexRow}
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CategoryTabs: React.FC<CategoryTabsProps> = React.memo(({ categories }) => (
  <TabsNav>
    <TabsInner>
      {categories.map((cat, i) => (
        <Tab key={i}>
          <TabIcon>{cat.icon}</TabIcon>
          <span>{cat.label}</span>
        </Tab>
      ))}
    </TabsInner>
  </TabsNav>
));

export default CategoryTabs; 