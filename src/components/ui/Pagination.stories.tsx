import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    page: { control: false },
    total: { control: 'number' },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

const Template = (args: any) => {
  const [page, setPage] = useState(1);
  return <Pagination {...args} page={page} onChange={setPage} />;
};

export const Default: Story = {
  render: Template,
  args: {
    total: 10,
  },
};

export const ManyPages: Story = {
  render: Template,
  args: {
    total: 30,
  },
}; 