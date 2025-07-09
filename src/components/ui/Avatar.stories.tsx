import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarSize } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    initial: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    initial: 'A',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: '프로필',
  },
};

export const Large: Story = {
  args: {
    initial: 'L',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    initial: 'S',
    size: 'sm',
  },
};

export const Selected: Story = {
  args: {
    initial: '선택',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    initial: '비활성',
    disabled: true,
  },
}; 