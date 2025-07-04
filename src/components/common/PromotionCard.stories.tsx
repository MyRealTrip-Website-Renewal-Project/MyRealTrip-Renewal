import React from 'react';
import PromotionCard, { PromotionCardProps } from './PromotionCard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PromotionCard> = {
  title: 'Common/PromotionCard',
  component: PromotionCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PromotionCard>;

export const Default: Story = {
  args: {
    image: 'https://via.placeholder.com/260x150',
    title: '프로모션 타이틀',
    buttonText: '자세히 보기',
    buttonUrl: '#',
  } as PromotionCardProps,
}; 