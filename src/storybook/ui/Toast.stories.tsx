import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '@/components/ui/Toast';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '임시 알림 메시지를 표시하는 토스트 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
      description: '토스트 메시지',
    },
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: '토스트 타입',
    },
    duration: {
      control: 'number',
      description: '표시 시간 (ms)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is a toast message',
  },
};

export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
  },
};

export const Warning: Story = {
  args: {
    message: 'Please check your input',
    type: 'warning',
  },
};

export const Error: Story = {
  args: {
    message: 'An error occurred',
    type: 'error',
  },
};

export const LongMessage: Story = {
  args: {
    message: 'This is a very long toast message that might wrap to multiple lines to demonstrate how the component handles longer content.',
    type: 'info',
  },
};

export const ShortDuration: Story = {
  args: {
    message: 'This toast will disappear quickly',
    duration: 2000,
  },
};

export const LongDuration: Story = {
  args: {
    message: 'This toast will stay for a long time',
    duration: 10000,
  },
}; 