import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/Progress';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '진행률을 표시하는 프로그레스 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '진행률 값',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: '최대값',
    },
    type: {
      control: { type: 'select' },
      options: ['line', 'circle'],
      description: '프로그레스 타입',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '프로그레스 크기',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'info'],
      description: '프로그레스 스타일',
    },
    showLabel: {
      control: 'boolean',
      description: '라벨 표시 여부',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'inside'],
      description: '라벨 위치',
    },
    animated: {
      control: 'boolean',
      description: '애니메이션 여부',
    },
    striped: {
      control: 'boolean',
      description: '줄무늬 효과',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Line: Story = {
  args: {
    type: 'line',
    value: 75,
  },
};

export const Circle: Story = {
  args: {
    type: 'circle',
    value: 60,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    value: 30,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    value: 80,
  },
};

export const WithLabel: Story = {
  args: {
    value: 65,
    showLabel: true,
  },
};

export const LabelTop: Story = {
  args: {
    value: 45,
    showLabel: true,
    labelPosition: 'top',
  },
};

export const LabelBottom: Story = {
  args: {
    value: 70,
    showLabel: true,
    labelPosition: 'bottom',
  },
};

export const LabelInside: Story = {
  args: {
    type: 'circle',
    value: 85,
    showLabel: true,
    labelPosition: 'inside',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    value: 90,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    value: 60,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    value: 25,
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    value: 40,
  },
};

export const Animated: Story = {
  args: {
    value: 75,
    animated: true,
  },
};

export const Striped: Story = {
  args: {
    value: 80,
    striped: true,
  },
};

export const AnimatedStriped: Story = {
  args: {
    value: 70,
    animated: true,
    striped: true,
  },
};

export const Indeterminate: Story = {
  args: {
    value: -1,
  },
};

export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
      
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div style={{ width: '300px' }}>
        <Progress value={progress} showLabel />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '자동으로 진행되는 인터랙티브 프로그레스입니다.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Progress variant="primary" value={75} showLabel />
      <Progress variant="success" value={90} showLabel />
      <Progress variant="warning" value={60} showLabel />
      <Progress variant="error" value={25} showLabel />
      <Progress variant="info" value={45} showLabel />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 프로그레스 변형을 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Progress size="sm" value={50} showLabel />
      <Progress size="md" value={50} showLabel />
      <Progress size="lg" value={50} showLabel />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 프로그레스 크기를 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const LineVsCircle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <div>
        <h4>Line Progress</h4>
        <Progress type="line" value={75} showLabel />
      </div>
      <div>
        <h4>Circle Progress</h4>
        <Progress type="circle" value={75} showLabel labelPosition="inside" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '라인과 원형 프로그레스를 비교할 수 있습니다.',
      },
    },
  },
}; 