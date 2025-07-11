import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tag } from '@/components/ui/Tag';

const meta: Meta<typeof Tag> = {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '라벨이나 카테고리를 표시하는 태그 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: '태그 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '태그 크기',
    },
    closable: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tag',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const Closable: Story = {
  args: {
    closable: true,
    children: 'Closable Tag',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Tag',
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => alert('Tag clicked!'),
    children: 'Clickable Tag',
  },
};

export const InteractiveClosable: Story = {
  render: () => {
    const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
    
    const handleClose = (tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
    };
    
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <Tag
            key={tag}
            closable
            onClose={() => handleClose(tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '닫기 기능이 동작하는 인터랙티브 태그 예시입니다.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="info">Info</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 태그 변형을 한 번에 확인할 수 있습니다.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 태그 크기를 한 번에 확인할 수 있습니다.',
      },
    },
  },
}; 