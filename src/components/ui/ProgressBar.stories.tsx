import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, ProgressBarType } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
    label: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['primary', 'success', 'error', 'warning', 'info'],
    },
    showValue: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 60,
    label: '진행률',
    showValue: true,
  },
};

export const Success: Story = {
  args: {
    value: 100,
    label: '완료',
    type: 'success',
    showValue: true,
  },
};

export const Error: Story = {
  args: {
    value: 30,
    label: '에러',
    type: 'error',
    showValue: true,
  },
};

export const Warning: Story = {
  args: {
    value: 80,
    label: '경고',
    type: 'warning',
    showValue: true,
  },
};

export const Info: Story = {
  args: {
    value: 50,
    label: '정보',
    type: 'info',
    showValue: true,
  },
}; 