import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@/components/ui/Divider';

const meta: Meta<typeof Divider> = {
  title: 'UI/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '콘텐츠를 구분하는 구분선 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: '구분선 방향',
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted'],
      description: '구분선 스타일',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '구분선 크기',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error'],
      description: '구분선 색상',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100px' }}>
      <span>Left</span>
      <Divider {...args} />
      <span>Right</span>
    </div>
  ),
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
};

export const Dotted: Story = {
  args: {
    variant: 'dotted',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
  },
};

export const Error: Story = {
  args: {
    color: 'error',
  },
};

export const WithText: Story = {
  args: {
    children: 'OR',
  },
};

export const WithLongText: Story = {
  args: {
    children: 'Section Divider',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <Divider variant="solid" />
      <Divider variant="dashed" />
      <Divider variant="dotted" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 구분선 스타일을 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <Divider size="sm" />
      <Divider size="md" />
      <Divider size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 구분선 크기를 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <Divider color="default" />
      <Divider color="primary" />
      <Divider color="secondary" />
      <Divider color="success" />
      <Divider color="warning" />
      <Divider color="error" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 구분선 색상을 한 번에 확인할 수 있습니다.',
      },
    },
  },
}; 