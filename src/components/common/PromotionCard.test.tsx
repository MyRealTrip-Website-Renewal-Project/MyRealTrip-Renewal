import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PromotionCard, { PromotionCardProps } from './PromotionCard';

describe('PromotionCard', () => {
  const props: PromotionCardProps = {
    image: 'https://via.placeholder.com/260x150',
    title: '프로모션 타이틀',
    buttonText: '자세히 보기',
    buttonUrl: 'https://promo.com',
  };

  it('renders title and button', () => {
    render(<PromotionCard {...props} />);
    expect(screen.getByText('프로모션 타이틀')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '자세히 보기' })).toHaveAttribute('href', 'https://promo.com');
  });

  it('renders image with alt text', () => {
    render(<PromotionCard {...props} />);
    expect(screen.getByAltText('프로모션 타이틀')).toBeInTheDocument();
  });
}); 