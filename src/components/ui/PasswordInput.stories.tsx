import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'UI/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: false },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof PasswordInput>;

const Template = (args: any) => {
  const [value, setValue] = useState('');
  return <PasswordInput {...args} value={value} onChange={e => setValue(e.target.value)} />;
};

export const Default: Story = {
  render: Template,
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    error: '8자 이상 입력해 주세요',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: '비활성 비밀번호',
    placeholder: '입력 불가',
    disabled: true,
  },
}; 