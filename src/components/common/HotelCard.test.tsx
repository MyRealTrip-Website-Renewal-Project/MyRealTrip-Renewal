import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelCard from './HotelCard';
import type { HotelCardData } from '../../types/hotel';

describe('HotelCard', () => {
  const hotel: HotelCardData = {
    image: 'https://via.placeholder.com/260x150',
    name: '테스트 호텔',
    star: 5,
    rating: 8.7,
    reviewUrl: 'https://test.com',
    reviewCount: 42,
    freeCancel: true,
    timeSale: true,
    badgeText: '최저가 보장',
    price: '99,000원',
  };

  it('renders hotel name, star, rating, and price', () => {
    render(<HotelCard hotel={hotel} />);
    expect(screen.getByText('테스트 호텔')).toBeInTheDocument();
    expect(screen.getByLabelText('별점 5점')).toBeInTheDocument();
    expect(screen.getByText('8.7')).toBeInTheDocument();
    expect(screen.getByText('99,000원')).toBeInTheDocument();
  });

  it('renders review link with correct href', () => {
    render(<HotelCard hotel={hotel} />);
    const link = screen.getByRole('link', { name: /이용자 리뷰 페이지로 이동/i });
    expect(link).toHaveAttribute('href', 'https://test.com');
  });

  it('renders badges when provided', () => {
    render(<HotelCard hotel={hotel} />);
    expect(screen.getByText('무료 취소')).toBeInTheDocument();
    expect(screen.getByText('타임 세일')).toBeInTheDocument();
    expect(screen.getByText('최저가 보장')).toBeInTheDocument();
  });

  it('does not render badges when not provided', () => {
    const noBadgeHotel = { ...hotel, freeCancel: false, timeSale: false, badgeText: undefined };
    render(<HotelCard hotel={noBadgeHotel} />);
    expect(screen.queryByText('무료 취소')).toBeNull();
    expect(screen.queryByText('타임 세일')).toBeNull();
    expect(screen.queryByText('최저가 보장')).toBeNull();
  });
}); 