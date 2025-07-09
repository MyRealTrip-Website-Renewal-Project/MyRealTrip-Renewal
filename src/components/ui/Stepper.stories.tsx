import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    value: { control: false },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const Template = (args: any) => {
  const [value, setValue] = useState(1);
  return <Stepper {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: Template,
  args: {
    label: '수량',
    min: 1,
    max: 10,
    step: 1,
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: '수량',
    min: 1,
    max: 10,
    step: 1,
    error: '최소 1개 이상 선택',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: '비활성 스테퍼',
    min: 1,
    max: 10,
    step: 1,
    disabled: true,
  },
}; 