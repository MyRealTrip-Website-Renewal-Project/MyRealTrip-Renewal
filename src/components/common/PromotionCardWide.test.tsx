import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PromotionCardWide, { PromotionCardWideProps } from './PromotionCardWide';

describe('PromotionCardWide', () => {
  const props: PromotionCardWideProps = {
    image: 'https://via.placeholder.com/320x140',
    period: '7.7 - 7.10',
  };

  it('renders period', () => {
    render(<PromotionCardWide {...props} />);
    expect(screen.getByText('7.7 - 7.10')).toBeInTheDocument();
  });

  it('renders image with alt text', () => {
    render(<PromotionCardWide {...props} />);
    expect(screen.getByAltText('7.7 - 7.10')).toBeInTheDocument();
  });
}); 