import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '로딩 상태를 표시하는 스켈레톤 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circular', 'rectangular'],
      description: '스켈레톤 모양',
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', 'none'],
      description: '애니메이션 타입',
    },
    width: {
      control: 'text',
      description: '너비',
    },
    height: {
      control: 'text',
      description: '높이',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: '50px',
    height: '50px',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '200px',
    height: '100px',
  },
};

export const Pulse: Story = {
  args: {
    animation: 'pulse',
  },
};

export const Wave: Story = {
  args: {
    animation: 'wave',
  },
};

export const NoAnimation: Story = {
  args: {
    animation: 'none',
  },
};

export const CustomSize: Story = {
  args: {
    width: '300px',
    height: '20px',
  },
};

export const SkeletonTextComponent: Story = {
  render: (args) => <SkeletonText {...args} />,
  argTypes: {
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: '텍스트 라인 수',
    },
  },
  args: {
    lines: 3,
  },
};

export const SkeletonTextSingleLine: Story = {
  render: () => <SkeletonText lines={1} />,
};

export const SkeletonTextMultipleLines: Story = {
  render: () => <SkeletonText lines={5} />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <Skeleton variant="text" width="200px" />
      <Skeleton variant="circular" width="50px" height="50px" />
      <Skeleton variant="rectangular" width="200px" height="100px" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 스켈레톤 변형을 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const AllAnimations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Skeleton animation="pulse" width="200px" />
      <Skeleton animation="wave" width="200px" />
      <Skeleton animation="none" width="200px" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 애니메이션 타입을 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ width: '300px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <Skeleton variant="circular" width="40px" height="40px" style={{ marginBottom: '12px' }} />
      <Skeleton variant="text" width="80%" style={{ marginBottom: '8px' }} />
      <Skeleton variant="text" width="60%" style={{ marginBottom: '16px' }} />
      <Skeleton variant="rectangular" width="100%" height="120px" style={{ marginBottom: '12px' }} />
      <div style={{ display: 'flex', gap: '8px' }}>
        <Skeleton variant="text" width="60px" />
        <Skeleton variant="text" width="60px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '카드 형태의 스켈레톤 예시입니다.',
      },
    },
  },
};

export const ListSkeleton: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
          <Skeleton variant="circular" width="40px" height="40px" />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" style={{ marginBottom: '4px' }} />
            <Skeleton variant="text" width="50%" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '리스트 형태의 스켈레톤 예시입니다.',
      },
    },
  },
}; 