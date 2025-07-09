import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage, ErrorMessageType } from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'UI/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['error', 'warning', 'info', 'success'],
    },
    children: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Error: Story = {
  args: {
    type: 'error',
    children: '에러가 발생했습니다. 다시 시도해 주세요.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    children: '경고: 입력값을 확인해 주세요.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    children: '안내: 저장이 완료되었습니다.',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    children: '성공적으로 처리되었습니다!',
  },
}; 