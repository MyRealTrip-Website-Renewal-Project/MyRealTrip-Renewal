import React from 'react';
import { screen } from '@testing-library/react';
import { customRender } from '../../test/utils/test-utils';
import '@testing-library/jest-dom';
import PromotionCard, { PromotionCardProps } from './PromotionCard';

describe('PromotionCard', () => {
  const props: PromotionCardProps = {
    image: 'https://via.placeholder.com/260x150',
    title: '프로모션 타이틀',
    buttonText: '자세히 보기',
    buttonUrl: 'https://promo.com',
  };

  it('renders image with correct alt text', () => {
    render(<PromotionCard {...props} />);
    expect(screen.getByAltText('프로모션 이미지')).toBeInTheDocument();
  });

  it('renders card with correct role and tabIndex', () => {
    render(<PromotionCard {...props} />);
    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('tabIndex', '0');
  });
}); 