import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from './FormGroup';
import { Input } from './Input';

const meta: Meta<typeof FormGroup> = {
  title: 'UI/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    children: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  args: {
    label: '이름',
    description: '실명을 입력해 주세요',
    children: <Input placeholder="이름" />,
  },
};

export const Required: Story = {
  args: {
    label: '이메일',
    required: true,
    children: <Input placeholder="이메일" />,
  },
};

export const Error: Story = {
  args: {
    label: '비밀번호',
    error: '8자 이상 입력해 주세요',
    children: <Input type="password" placeholder="비밀번호" />,
  },
}; 