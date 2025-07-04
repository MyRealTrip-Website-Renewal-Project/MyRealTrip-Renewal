import React from 'react';
import PromotionCardWide, { PromotionCardWideProps } from './PromotionCardWide';
import { Meta, StoryObj } from '@storybook/react';
import promotion1 from '../../stories/assets/promotion1.jpg';

const meta: Meta<typeof PromotionCardWide> = {
  title: 'Common/PromotionCardWide',
  component: PromotionCardWide,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PromotionCardWide>;

export const Default: Story = {
  args: {
    image: promotion1,
    title: '7.7 메가세일',
    subtitle: '단 4일, 여름 휴가비 1억원 쏜다!',
    period: '7.7 - 7.10',
  } as PromotionCardWideProps,
}; 