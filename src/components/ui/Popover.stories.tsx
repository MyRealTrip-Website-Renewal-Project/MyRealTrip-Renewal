import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from './Button';
import { Badge } from './Badge';

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '팝오버 컴포넌트입니다. 마우스 호버나 포커스 시 추가 정보나 메뉴를 표시합니다.'
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: '팝오버 내용'
    },
    title: {
      control: 'text',
      description: '팝오버 제목'
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: '팝오버 표시 방향'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '팝오버 크기'
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: '팝오버 테마'
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: '팝오버 표시 지연 시간 (ms)'
    },
    hideDelay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: '팝오버 숨김 지연 시간 (ms)'
    },
    alwaysShow: {
      control: 'boolean',
      description: '항상 표시 여부'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    showCloseButton: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부'
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

// 기본 팝오버
export const Default: Story = {
  args: {
    content: '기본 팝오버입니다',
    children: <Button>호버하세요</Button>
  }
};

// 제목이 있는 팝오버
export const WithTitle: Story = {
  args: {
    title: '팝오버 제목',
    content: '제목이 있는 팝오버입니다',
    children: <Button>제목 팝오버</Button>
  }
};

// 방향별 팝오버
export const Positions: Story = {
  render: () => (
    <>
      <Popover content="위쪽 팝오버" position="top">
        <Button>Top</Button>
      </Popover>
      <Popover content="아래쪽 팝오버" position="bottom">
        <Button>Bottom</Button>
      </Popover>
      <Popover content="왼쪽 팝오버" position="left">
        <Button>Left</Button>
      </Popover>
      <Popover content="오른쪽 팝오버" position="right">
        <Button>Right</Button>
      </Popover>
    </>
  )
};

// 크기별 팝오버
export const Sizes: Story = {
  render: () => (
    <>
      <Popover content="작은 팝오버" size="sm">
        <Button>Small</Button>
      </Popover>
      <Popover content="중간 팝오버" size="md">
        <Button>Medium</Button>
      </Popover>
      <Popover content="큰 팝오버" size="lg">
        <Button>Large</Button>
      </Popover>
    </>
  )
};

// 테마별 팝오버
export const Themes: Story = {
  render: () => (
    <>
      <Popover content="기본 테마" theme="default">
        <Button>Default</Button>
      </Popover>
      <Popover content="프라이머리 테마" theme="primary">
        <Button variant="primary">Primary</Button>
      </Popover>
      <Popover content="성공 테마" theme="success">
        <Button variant="secondary">Success</Button>
      </Popover>
      <Popover content="경고 테마" theme="warning">
        <Button variant="outline">Warning</Button>
      </Popover>
      <Popover content="에러 테마" theme="error">
        <Button variant="secondary">Error</Button>
      </Popover>
    </>
  )
};

// 닫기 버튼이 있는 팝오버
export const WithCloseButton: Story = {
  args: {
    title: '닫기 버튼 팝오버',
    content: '닫기 버튼이 있는 팝오버입니다',
    showCloseButton: true,
    children: <Button>닫기 버튼</Button>
  }
};

// 푸터가 있는 팝오버
export const WithFooter: Story = {
  args: {
    title: '푸터 팝오버',
    content: '푸터에 버튼들이 있는 팝오버입니다',
    showCloseButton: true,
    footer: (
      <>
        <Button variant="outline">취소</Button>
        <Button>확인</Button>
      </>
    ),
    children: <Button>푸터 팝오버</Button>
  }
};

// 복잡한 콘텐츠
export const ComplexContent: Story = {
  args: {
    title: '복잡한 콘텐츠',
    content: (
      <div>
        <p>여러 줄의 텍스트와 함께 다양한 요소들을 포함할 수 있습니다.</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <Badge type="blue">태그1</Badge>
          <Badge type="green">태그2</Badge>
        </div>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
          <li>리스트 아이템 1</li>
          <li>리스트 아이템 2</li>
          <li>리스트 아이템 3</li>
        </ul>
      </div>
    ),
    children: <Button>복잡한 콘텐츠</Button>
  }
};

// 지연 시간 설정
export const Delays: Story = {
  render: () => (
    <>
      <Popover content="즉시 표시" delay={0}>
        <Button>No Delay</Button>
      </Popover>
      <Popover content="0.5초 후 표시" delay={500}>
        <Button>500ms Delay</Button>
      </Popover>
      <Popover content="1초 후 표시" delay={1000}>
        <Button>1s Delay</Button>
      </Popover>
    </>
  )
};

// 항상 표시
export const AlwaysShow: Story = {
  render: () => (
    <>
      <Popover content="항상 표시되는 팝오버" alwaysShow>
        <Button>Always Visible</Button>
      </Popover>
      <Popover content="비활성화된 팝오버" disabled>
        <Button>Disabled</Button>
      </Popover>
    </>
  )
};

// 긴 텍스트 팝오버
export const LongText: Story = {
  args: {
    title: '긴 텍스트 팝오버',
    content: '이것은 매우 긴 팝오버 텍스트입니다. 여러 줄로 표시되며 최대 너비를 초과하면 자동으로 줄바꿈됩니다. 팝오버는 사용자에게 추가 정보를 제공하거나 추가 작업을 수행할 수 있는 메뉴를 표시하는 데 사용됩니다.',
    children: <Button>Long Text</Button>
  }
};

// 메뉴 형태의 팝오버
export const MenuStyle: Story = {
  args: {
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button style={{ 
          background: 'none', 
          border: 'none', 
          padding: '0.5rem', 
          textAlign: 'left',
          cursor: 'pointer',
          borderRadius: '4px'
        }}>
          메뉴 항목 1
        </button>
        <button style={{ 
          background: 'none', 
          border: 'none', 
          padding: '0.5rem', 
          textAlign: 'left',
          cursor: 'pointer',
          borderRadius: '4px'
        }}>
          메뉴 항목 2
        </button>
        <button style={{ 
          background: 'none', 
          border: 'none', 
          padding: '0.5rem', 
          textAlign: 'left',
          cursor: 'pointer',
          borderRadius: '4px'
        }}>
          메뉴 항목 3
        </button>
      </div>
    ),
    children: <Button>메뉴 팝오버</Button>
  }
}; 