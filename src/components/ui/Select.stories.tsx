import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectAlign } from './Select';

const options = [
  { label: '선택하세요', value: '', disabled: true },
  { label: '서울', value: 'seoul' },
  { label: '부산', value: 'busan' },
  { label: '제주', value: 'jeju' },
];

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: '지역 선택',
    options,
    align: 'left',
  },
};

export const Error: Story = {
  args: {
    label: '지역 선택',
    options,
    error: '필수 선택입니다',
  },
};

export const Disabled: Story = {
  args: {
    label: '지역 선택',
    options,
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: '필수 선택',
    options,
    required: true,
  },
};

export const AlignCenter: Story = {
  args: {
    label: '중앙 정렬',
    options,
    align: 'center',
  },
};
export const AlignRight: Story = {
  args: {
    label: '오른쪽 정렬',
    options,
    align: 'right',
  },
}; 