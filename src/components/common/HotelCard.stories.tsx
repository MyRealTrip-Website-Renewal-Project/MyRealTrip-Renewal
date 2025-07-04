import React from 'react';
import HotelCard from './HotelCard';
import type { HotelCardData } from '../../types/hotel';
import { Meta, StoryObj } from '@storybook/react';

const sampleHotel: HotelCardData = {
  image: 'https://via.placeholder.com/260x150',
  name: '샘플 호텔',
  star: 4,
  rating: 9.2,
  reviewUrl: '#',
  reviewCount: 123,
  freeCancel: true,
  timeSale: true,
  badgeText: '최저가 보장',
  price: '120,000원',
};

const meta: Meta<typeof HotelCard> = {
  title: 'Common/HotelCard',
  component: HotelCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HotelCard>;

export const Default: Story = {
  args: {
    hotel: sampleHotel,
  },
};

export const NoBadge: Story = {
  args: {
    hotel: { ...sampleHotel, badgeText: undefined, freeCancel: false, timeSale: false },
  },
}; 