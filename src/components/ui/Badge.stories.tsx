import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeType, BadgeSize } from './Badge';
import { MdCheck, MdInfo, MdStar } from 'react-icons/md';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['gray', 'red', 'blue', 'green', 'yellow'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    icon: { control: false },
    children: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: '기본',
  },
};

export const Red: Story = {
  args: {
    type: 'red',
    children: '에러',
    icon: MdInfo,
  },
};

export const Blue: Story = {
  args: {
    type: 'blue',
    children: '정보',
    icon: MdInfo,
  },
};

export const Green: Story = {
  args: {
    type: 'green',
    children: '성공',
    icon: MdCheck,
  },
};

export const Yellow: Story = {
  args: {
    type: 'yellow',
    children: '경고',
    icon: MdStar,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}; 