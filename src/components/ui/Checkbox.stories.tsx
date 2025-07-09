import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: false },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

const Template = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: '동의합니다',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: '필수 동의',
    error: '필수 항목입니다',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: '비활성 체크박스',
    disabled: true,
  },
}; 