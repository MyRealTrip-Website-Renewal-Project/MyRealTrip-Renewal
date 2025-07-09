import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputAlign } from './Input';
import { MdSearch, MdLock } from 'react-icons/md';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    disabled: { control: 'boolean' },
    icon: { control: false },
    value: { control: false },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

const Template = (args: any) => {
  const [value, setValue] = useState('');
  return <Input {...args} value={value} onChange={e => setValue(e.target.value)} />;
};

export const Default: Story = {
  render: Template,
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    align: 'left',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    error: '이메일 형식이 올바르지 않습니다',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: '비활성 인풋',
    placeholder: '입력 불가',
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: Template,
  args: {
    label: '검색',
    placeholder: '검색어를 입력하세요',
    icon: MdSearch,
  },
};

export const Password: Story = {
  render: Template,
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    icon: MdLock,
  },
}; 