import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastType } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['error', 'warning', 'info', 'success'],
    },
    children: { control: 'text' },
    onClose: { action: 'closed' },
  },
};
export default meta;
type Story = StoryObj<typeof Toast>;

const Template = (args: any) => {
  const [open, setOpen] = useState(true);
  return (
    <>{open && <Toast {...args} onClose={() => setOpen(false)} />}</>
  );
};

export const Error: Story = {
  render: Template,
  args: {
    type: 'error',
    children: '에러가 발생했습니다. 다시 시도해 주세요.',
  },
};

export const Warning: Story = {
  render: Template,
  args: {
    type: 'warning',
    children: '경고: 입력값을 확인해 주세요.',
  },
};

export const Info: Story = {
  render: Template,
  args: {
    type: 'info',
    children: '안내: 저장이 완료되었습니다.',
  },
};

export const Success: Story = {
  render: Template,
  args: {
    type: 'success',
    children: '성공적으로 처리되었습니다!',
  },
}; 