import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from './Button';
import { Badge } from './Badge';
import { Icon } from './Icon';
import { FiInfo, FiHelpCircle } from 'react-icons/fi';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '툴팁 컴포넌트입니다. 마우스 호버나 포커스 시 추가 정보를 표시합니다.'
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: '툴팁 내용'
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: '툴팁 표시 방향'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '툴팁 크기'
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'light', 'primary', 'success', 'warning', 'error'],
      description: '툴팁 테마'
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: '툴팁 표시 지연 시간 (ms)'
    },
    hideDelay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: '툴팁 숨김 지연 시간 (ms)'
    },
    alwaysShow: {
      control: 'boolean',
      description: '항상 표시 여부'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 툴팁
export const Default: Story = {
  args: {
    content: '기본 툴팁입니다',
    children: <Button>호버하세요</Button>
  }
};

// 방향별 툴팁
export const Positions: Story = {
  render: () => (
    <>
      <Tooltip content="위쪽 툴팁" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="아래쪽 툴팁" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="왼쪽 툴팁" position="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="오른쪽 툴팁" position="right">
        <Button>Right</Button>
      </Tooltip>
    </>
  )
};

// 크기별 툴팁
export const Sizes: Story = {
  render: () => (
    <>
      <Tooltip content="작은 툴팁" size="sm">
        <Button>Small</Button>
      </Tooltip>
      <Tooltip content="중간 툴팁" size="md">
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip content="큰 툴팁" size="lg">
        <Button>Large</Button>
      </Tooltip>
    </>
  )
};

// 테마별 툴팁
export const Themes: Story = {
  render: () => (
    <>
      <Tooltip content="기본 테마" theme="default">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip content="라이트 테마" theme="light">
        <Button variant="outline">Light</Button>
      </Tooltip>
      <Tooltip content="프라이머리 테마" theme="primary">
        <Button variant="primary">Primary</Button>
      </Tooltip>
      <Tooltip content="성공 테마" theme="success">
        <Button variant="secondary">Success</Button>
      </Tooltip>
      <Tooltip content="경고 테마" theme="warning">
        <Button variant="outline">Warning</Button>
      </Tooltip>
      <Tooltip content="에러 테마" theme="error">
        <Button variant="secondary">Error</Button>
      </Tooltip>
    </>
  )
};

// 다양한 콘텐츠
export const ContentTypes: Story = {
  render: () => (
    <>
      <Tooltip content="간단한 텍스트 툴팁">
        <Button>Text</Button>
      </Tooltip>
      <Tooltip content={
        <div>
          <strong>HTML 툴팁</strong><br />
          여러 줄의 내용을 포함할 수 있습니다
        </div>
      }>
        <Button>HTML</Button>
      </Tooltip>
      <Tooltip content={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Icon icon={FiInfo} size={16} />
          아이콘이 포함된 툴팁
        </div>
      }>
        <Button>Icon</Button>
      </Tooltip>
    </>
  )
};

// 지연 시간 설정
export const Delays: Story = {
  render: () => (
    <>
      <Tooltip content="즉시 표시" delay={0}>
        <Button>No Delay</Button>
      </Tooltip>
      <Tooltip content="0.5초 후 표시" delay={500}>
        <Button>500ms Delay</Button>
      </Tooltip>
      <Tooltip content="1초 후 표시" delay={1000}>
        <Button>1s Delay</Button>
      </Tooltip>
    </>
  )
};

// 항상 표시
export const AlwaysShow: Story = {
  render: () => (
    <>
      <Tooltip content="항상 표시되는 툴팁" alwaysShow>
        <Button>Always Visible</Button>
      </Tooltip>
      <Tooltip content="비활성화된 툴팁" disabled>
        <Button>Disabled</Button>
      </Tooltip>
    </>
  )
};

// 다양한 요소와 함께 사용
export const WithOtherComponents: Story = {
  render: () => (
    <>
      <Tooltip content="배지에 대한 설명">
        <Badge type="blue">Badge</Badge>
      </Tooltip>
      <Tooltip content="아이콘에 대한 설명">
        <Icon icon={FiHelpCircle} size={24} className="cursor-pointer" />
      </Tooltip>
      <Tooltip content="링크에 대한 설명">
        <a href="#" style={{ color: '#2196f3', textDecoration: 'none' }}>
          링크
        </a>
      </Tooltip>
    </>
  )
};

// 긴 텍스트 툴팁
export const LongText: Story = {
  args: {
    content: '이것은 매우 긴 툴팁 텍스트입니다. 여러 줄로 표시되며 최대 너비를 초과하면 자동으로 줄바꿈됩니다.',
    children: <Button>Long Text</Button>
  }
};

// 복잡한 레이아웃
export const ComplexLayout: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '400px' }}>
      <Tooltip content="그리드 아이템 1">
        <Button>Item 1</Button>
      </Tooltip>
      <Tooltip content="그리드 아이템 2">
        <Button>Item 2</Button>
      </Tooltip>
      <Tooltip content="그리드 아이템 3">
        <Button>Item 3</Button>
      </Tooltip>
      <Tooltip content="그리드 아이템 4">
        <Button>Item 4</Button>
      </Tooltip>
      <Tooltip content="그리드 아이템 5">
        <Button>Item 5</Button>
      </Tooltip>
      <Tooltip content="그리드 아이템 6">
        <Button>Item 6</Button>
      </Tooltip>
    </div>
  )
}; 