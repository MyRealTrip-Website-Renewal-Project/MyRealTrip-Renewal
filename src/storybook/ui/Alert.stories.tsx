import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert } from '@/components/ui/Alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '정보, 성공, 경고, 오류 메시지를 표시하는 알림 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: '알림 타입',
    },
    title: {
      control: 'text',
      description: '알림 제목',
    },
    closable: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default info alert.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    children: 'This is an info alert with important information.',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success',
    children: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    children: 'Please be careful before proceeding.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    children: 'An error occurred. Please try again.',
  },
};

export const WithoutTitle: Story = {
  args: {
    type: 'info',
    children: 'This alert has no title.',
  },
};

export const Closable: Story = {
  args: {
    type: 'info',
    title: 'Closable Alert',
    children: 'This alert has a close button.',
    closable: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button onClick={() => setVisible(true)}>
          Show Alert
        </button>
      );
    }

    return (
      <Alert
        type="info"
        title="Interactive Alert"
        closable
        onClose={() => setVisible(false)}
      >
        Click the close button to hide this alert.
      </Alert>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '닫기 기능이 동작하는 인터랙티브 예시입니다.',
      },
    },
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '500px' }}>
      <Alert type="info" title="Info">
        This is an info alert.
      </Alert>
      <Alert type="success" title="Success">
        Operation completed successfully!
      </Alert>
      <Alert type="warning" title="Warning">
        Please be careful before proceeding.
      </Alert>
      <Alert type="error" title="Error">
        An error occurred. Please try again.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 알림 타입을 한 번에 확인할 수 있습니다.',
      },
    },
  },
}; 