import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header from '../layout/Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    categories: [
      { icon: '✈️', label: '항공' },
      { icon: '🏨', label: '해외숙소' },
      { icon: '🏠', label: '국내숙소' },
    ],
    subTabs: [
      { label: '여행상품', active: true },
      { label: '파인·촌뜨기들', active: false },
    ],
  },
}; 