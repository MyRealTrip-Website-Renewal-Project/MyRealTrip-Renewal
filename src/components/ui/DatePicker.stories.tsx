import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    value: { control: false },
    onChange: { action: 'changed' },
    min: { control: false },
    max: { control: false },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

const Template = (args: any) => {
  const [value, setValue] = useState<Date | null>(null);
  return <DatePicker {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: Template,
};

export const WithMinMax: Story = {
  render: Template,
  args: {
    min: new Date(2024, 0, 1),
    max: new Date(2024, 11, 31),
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
}; 