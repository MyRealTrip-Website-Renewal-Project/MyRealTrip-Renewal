import React from 'react';
import Badge, { BadgeProps } from './Badge';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    icon: <span role="img" aria-label="최저가">💰</span>,
    text: '최저가 보장',
  } as BadgeProps,
};

export const WithCustomIcon: Story = {
  args: {
    icon: <span role="img" aria-label="호텔">🏨</span>,
    text: '호텔 숙박 보장',
  } as BadgeProps,
}; 