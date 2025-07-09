import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Loader, LoaderSize } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'UI/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    size: 'md',
    label: '로딩 중',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: '로딩 중',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: '로딩 중',
  },
}; 