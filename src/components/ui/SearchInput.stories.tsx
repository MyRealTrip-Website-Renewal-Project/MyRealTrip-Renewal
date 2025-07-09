import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'UI/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: false },
    onChange: { action: 'changed' },
    onClear: { action: 'cleared' },
  },
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

const Template = (args: any) => {
  const [value, setValue] = useState('');
  return (
    <SearchInput
      {...args}
      value={value}
      onChange={e => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: '검색',
    placeholder: '검색어를 입력하세요',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: '검색',
    placeholder: '검색어를 입력하세요',
    error: '검색어를 입력해 주세요',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: '비활성 검색',
    placeholder: '입력 불가',
    disabled: true,
  },
}; 