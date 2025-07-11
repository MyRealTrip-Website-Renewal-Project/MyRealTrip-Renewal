import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from '@/components/ui/Loader';

const meta: Meta<typeof Loader> = {
  title: 'UI/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '로딩 상태를 표시하는 스피너 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '로더 크기',
    },
    color: {
      control: 'color',
      description: '로더 색상',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const CustomColor: Story = {
  args: {
    color: '#ff6b6b',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 크기의 로더를 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const WithText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <Loader />
      <p>Loading...</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '텍스트와 함께 사용하는 예시입니다.',
      },
    },
  },
}; 