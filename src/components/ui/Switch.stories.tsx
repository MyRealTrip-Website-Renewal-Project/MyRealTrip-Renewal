import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
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
type Story = StoryObj<typeof Switch>;

const Template = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      {...args}
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: '스위치',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: '필수 스위치',
    error: '필수 항목입니다',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: '비활성 스위치',
    disabled: true,
  },
}; 