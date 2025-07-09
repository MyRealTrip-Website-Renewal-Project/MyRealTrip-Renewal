import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating, RatingSize } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'UI/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value: { control: false },
    max: { control: 'number' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    showValue: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof Rating>;

const Template = (args: any) => {
  const [value, setValue] = useState(3);
  return <Rating {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: Template,
  args: {
    max: 5,
    showValue: true,
  },
};

export const Large: Story = {
  render: Template,
  args: {
    max: 5,
    size: 'lg',
    showValue: true,
  },
};

export const Small: Story = {
  render: Template,
  args: {
    max: 5,
    size: 'sm',
    showValue: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    max: 5,
    disabled: true,
    showValue: true,
  },
};

export const ReadOnly: Story = {
  render: Template,
  args: {
    max: 5,
    readOnly: true,
    showValue: true,
  },
}; 