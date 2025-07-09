import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonVariant, ButtonAlign } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    children: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    align: 'center',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    align: 'center',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    align: 'center',
  },
};

export const AlignLeft: Story = {
  args: {
    children: 'Left Aligned',
    align: 'left',
  },
};
export const AlignCenter: Story = {
  args: {
    children: 'Center Aligned',
    align: 'center',
  },
};
export const AlignRight: Story = {
  args: {
    children: 'Right Aligned',
    align: 'right',
  },
}; 