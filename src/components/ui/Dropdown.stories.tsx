import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownAlign } from './Dropdown';

const options = [
  { label: '선택하세요', value: '', disabled: true },
  { label: '서울', value: 'seoul' },
  { label: '부산', value: 'busan' },
  { label: '제주', value: 'jeju' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
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
    value: { control: false },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

const Template = (args: any) => {
  const [value, setValue] = useState('');
  return <Dropdown {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: Template,
  args: {
    label: '지역 선택',
    options,
    align: 'left',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: '지역 선택',
    options,
    error: '필수 선택입니다',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: '지역 선택',
    options,
    disabled: true,
  },
};

export const Required: Story = {
  render: Template,
  args: {
    label: '필수 선택',
    options,
    required: true,
  },
};

export const AlignCenter: Story = {
  render: Template,
  args: {
    label: '중앙 정렬',
    options,
    align: 'center',
  },
};
export const AlignRight: Story = {
  render: Template,
  args: {
    label: '오른쪽 정렬',
    options,
    align: 'right',
  },
}; 