import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader } from './FileUploader';

const meta: Meta<typeof FileUploader> = {
  title: 'UI/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    value: { control: false },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof FileUploader>;

const Template = (args: any) => {
  const [value, setValue] = useState<File[]>([]);
  return <FileUploader {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: Template,
};

export const Multiple: Story = {
  render: Template,
  args: {
    multiple: true,
  },
};

export const ImageOnly: Story = {
  render: Template,
  args: {
    accept: 'image/*',
    multiple: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
}; 