import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, TextareaAlign } from './Textarea';
import { MdComment } from 'react-icons/md';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
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
type Story = StoryObj<typeof Textarea>;

const Template = (args: any) => {
  const [value, setValue] = useState('');
  return <Textarea {...args} value={value} onChange={e => setValue(e.target.value)} />;
};

export const Default: Story = {
  render: Template,
  args: {
    label: '내용',
    placeholder: '내용을 입력하세요',
    align: 'left',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: '내용',
    placeholder: '내용을 입력하세요',
    error: '내용을 입력해 주세요',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: '비활성 텍스트에어리어',
    placeholder: '입력 불가',
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: Template,
  args: {
    label: '댓글',
    placeholder: '댓글을 입력하세요',
    icon: MdComment,
  },
}; 