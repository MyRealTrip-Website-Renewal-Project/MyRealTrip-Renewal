import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StepperSimple } from './StepperSimple';

const meta: Meta<typeof StepperSimple> = {
  title: 'UI/StepperSimple',
  component: StepperSimple,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    value: { control: false },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof StepperSimple>;

const Template = (args: any) => {
  const [value, setValue] = useState(1);
  return <StepperSimple {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: Template,
  args: {
    min: 1,
    max: 10,
    step: 1,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    min: 1,
    max: 10,
    step: 1,
    disabled: true,
  },
}; 