import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@/components/ui/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사용자 프로필 이미지나 이니셜을 표시하는 아바타 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '아바타 크기',
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
      description: '아바타 모양',
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy'],
      description: '상태 표시',
    },
    src: {
      control: 'text',
      description: '이미지 URL',
    },
    initials: {
      control: 'text',
      description: '이니셜 텍스트',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initials: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    initials: 'JD',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    initials: 'JD',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    initials: 'JD',
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    initials: 'JD',
  },
};

export const Online: Story = {
  args: {
    initials: 'JD',
    status: 'online',
  },
};

export const Offline: Story = {
  args: {
    initials: 'JD',
    status: 'offline',
  },
};

export const Away: Story = {
  args: {
    initials: 'JD',
    status: 'away',
  },
};

export const Busy: Story = {
  args: {
    initials: 'JD',
    status: 'busy',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="xs" initials="XS" />
      <Avatar size="sm" initials="SM" />
      <Avatar size="md" initials="MD" />
      <Avatar size="lg" initials="LG" />
      <Avatar size="xl" initials="XL" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 크기의 아바타를 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar initials="ON" status="online" />
      <Avatar initials="OF" status="offline" />
      <Avatar initials="AW" status="away" />
      <Avatar initials="BU" status="busy" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 상태 표시를 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const Clickable: Story = {
  args: {
    initials: 'JD',
    onClick: () => alert('Avatar clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 가능한 아바타 예시입니다.',
      },
    },
  },
}; 