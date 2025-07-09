import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from './Timeline';
import { Badge } from './Badge';

const meta: Meta<typeof Timeline> = {
  title: 'UI/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '타임라인 컴포넌트입니다. 시간 순서대로 이벤트를 표시하며 다양한 상태와 액션을 지원합니다.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '타임라인 크기'
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: '타임라인 테마'
    },
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'alternate'],
      description: '타임라인 레이아웃'
    },
    animated: {
      control: 'boolean',
      description: '애니메이션 활성화 여부'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', width: '100%', maxWidth: '800px' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터
const sampleItems: TimelineItem[] = [
  {
    key: '1',
    title: '프로젝트 시작',
    description: '새로운 웹 애플리케이션 프로젝트가 시작되었습니다.',
    time: '2024-01-15 09:00',
    status: 'completed',
    tags: ['시작', '계획'],
    icon: '🚀'
  },
  {
    key: '2',
    title: '요구사항 분석',
    description: '고객 요구사항을 분석하고 기능 명세서를 작성했습니다.',
    time: '2024-01-20 14:30',
    status: 'completed',
    tags: ['분석', '문서'],
    icon: '📋'
  },
  {
    key: '3',
    title: '디자인 작업',
    description: 'UI/UX 디자인 작업을 진행 중입니다.',
    time: '2024-01-25 11:00',
    status: 'active',
    tags: ['디자인', '진행중'],
    icon: '🎨'
  },
  {
    key: '4',
    title: '개발 시작',
    description: '프론트엔드 개발을 시작했습니다.',
    time: '2024-02-01 10:00',
    status: 'active',
    tags: ['개발', '진행중'],
    icon: '💻'
  },
  {
    key: '5',
    title: '테스트 계획',
    description: '테스트 계획을 수립해야 합니다.',
    time: '2024-02-10 16:00',
    status: 'warning',
    tags: ['테스트', '대기'],
    icon: '⚠️'
  }
];

// 액션이 있는 데이터
const itemsWithActions: TimelineItem[] = [
  {
    key: '1',
    title: '주문 접수',
    description: '고객의 주문이 접수되었습니다.',
    time: '2024-01-15 10:30',
    status: 'completed',
    tags: ['주문', '접수'],
    actions: [
      {
        key: 'view',
        label: '상세보기',
        type: 'primary',
        onClick: (item) => console.log('상세보기:', item)
      },
      {
        key: 'edit',
        label: '수정',
        onClick: (item) => console.log('수정:', item)
      }
    ]
  },
  {
    key: '2',
    title: '결제 처리',
    description: '결제가 성공적으로 처리되었습니다.',
    time: '2024-01-15 10:35',
    status: 'completed',
    tags: ['결제', '완료'],
    actions: [
      {
        key: 'receipt',
        label: '영수증',
        type: 'primary',
        onClick: (item) => console.log('영수증:', item)
      }
    ]
  },
  {
    key: '3',
    title: '배송 준비',
    description: '상품 배송 준비 중입니다.',
    time: '2024-01-15 14:00',
    status: 'active',
    tags: ['배송', '진행중'],
    actions: [
      {
        key: 'track',
        label: '배송추적',
        type: 'primary',
        onClick: (item) => console.log('배송추적:', item)
      },
      {
        key: 'cancel',
        label: '취소',
        type: 'danger',
        onClick: (item) => console.log('취소:', item)
      }
    ]
  }
];

// 기본 타임라인
export const Default: Story = {
  args: {
    items: sampleItems
  }
};

// 액션이 있는 타임라인
export const WithActions: Story = {
  args: {
    items: itemsWithActions
  }
};

// 크기별 타임라인
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Small Size</h3>
        <Timeline
          size="sm"
          items={sampleItems.slice(0, 3)}
        />
      </div>
      <div>
        <h3>Medium Size (Default)</h3>
        <Timeline
          items={sampleItems.slice(0, 3)}
        />
      </div>
      <div>
        <h3>Large Size</h3>
        <Timeline
          size="lg"
          items={sampleItems.slice(0, 3)}
        />
      </div>
    </div>
  )
};

// 테마별 타임라인
export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Default Theme</h3>
        <Timeline
          items={sampleItems.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Primary Theme</h3>
        <Timeline
          theme="primary"
          items={sampleItems.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Success Theme</h3>
        <Timeline
          theme="success"
          items={sampleItems.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Warning Theme</h3>
        <Timeline
          theme="warning"
          items={sampleItems.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Error Theme</h3>
        <Timeline
          theme="error"
          items={sampleItems.slice(0, 2)}
        />
      </div>
    </div>
  )
};

// 레이아웃별 타임라인
export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Vertical Layout (Default)</h3>
        <Timeline
          layout="vertical"
          items={sampleItems.slice(0, 3)}
        />
      </div>
      <div>
        <h3>Alternate Layout</h3>
        <Timeline
          layout="alternate"
          items={sampleItems.slice(0, 4)}
        />
      </div>
    </div>
  )
};

// 애니메이션이 있는 타임라인
export const Animated: Story = {
  args: {
    items: sampleItems,
    animated: true
  }
};

// 상태별 타임라인
export const Statuses: Story = {
  args: {
    items: [
      {
        key: '1',
        title: '완료된 작업',
        description: '이 작업은 성공적으로 완료되었습니다.',
        time: '2024-01-15 09:00',
        status: 'completed',
        tags: ['완료']
      },
      {
        key: '2',
        title: '진행 중인 작업',
        description: '현재 진행 중인 작업입니다.',
        time: '2024-01-15 10:00',
        status: 'active',
        tags: ['진행중']
      },
      {
        key: '3',
        title: '경고가 있는 작업',
        description: '주의가 필요한 작업입니다.',
        time: '2024-01-15 11:00',
        status: 'warning',
        tags: ['경고']
      },
      {
        key: '4',
        title: '오류가 발생한 작업',
        description: '오류가 발생한 작업입니다.',
        time: '2024-01-15 12:00',
        status: 'error',
        tags: ['오류']
      },
      {
        key: '5',
        title: '비활성화된 작업',
        description: '비활성화된 작업입니다.',
        time: '2024-01-15 13:00',
        status: 'disabled',
        tags: ['비활성']
      }
    ]
  }
};

// 커스텀 아이콘이 있는 타임라인
export const WithCustomIcons: Story = {
  args: {
    items: [
      {
        key: '1',
        title: '이메일 발송',
        description: '고객에게 이메일이 발송되었습니다.',
        time: '2024-01-15 09:00',
        status: 'completed',
        icon: '📧'
      },
      {
        key: '2',
        title: '파일 업로드',
        description: '중요한 파일이 업로드되었습니다.',
        time: '2024-01-15 10:00',
        status: 'completed',
        icon: '📁'
      },
      {
        key: '3',
        title: '데이터베이스 백업',
        description: '데이터베이스 백업이 완료되었습니다.',
        time: '2024-01-15 11:00',
        status: 'active',
        icon: '💾'
      },
      {
        key: '4',
        title: '보안 점검',
        description: '시스템 보안 점검을 진행합니다.',
        time: '2024-01-15 12:00',
        status: 'warning',
        icon: '🔒'
      }
    ]
  }
};

// 로딩 상태 타임라인
export const Loading: Story = {
  args: {
    items: [],
    loading: true
  }
};

// 빈 상태 타임라인
export const Empty: Story = {
  args: {
    items: [],
    emptyText: '이벤트가 없습니다. 새로운 이벤트를 추가해보세요.'
  }
};

// 복잡한 타임라인 (모든 기능 포함)
export const Complex: Story = {
  args: {
    items: [
      {
        key: '1',
        title: '사용자 등록',
        description: '새로운 사용자가 시스템에 등록되었습니다. 이메일 인증이 완료되었고 프로필 정보가 입력되었습니다.',
        time: '2024-01-15 09:00',
        status: 'completed',
        tags: ['사용자', '등록', '인증'],
        icon: '👤',
        actions: [
          {
            key: 'view',
            label: '상세보기',
            type: 'primary',
            onClick: (item) => console.log('사용자 상세보기:', item)
          },
          {
            key: 'edit',
            label: '수정',
            onClick: (item) => console.log('사용자 수정:', item)
          }
        ]
      },
      {
        key: '2',
        title: '결제 처리',
        description: '고객의 결제가 성공적으로 처리되었습니다. 신용카드 결제가 승인되었고 영수증이 발급되었습니다.',
        time: '2024-01-15 10:30',
        status: 'completed',
        tags: ['결제', '승인', '완료'],
        icon: '💳',
        actions: [
          {
            key: 'receipt',
            label: '영수증',
            type: 'primary',
            onClick: (item) => console.log('영수증 보기:', item)
          },
          {
            key: 'refund',
            label: '환불',
            type: 'danger',
            onClick: (item) => console.log('환불 처리:', item)
          }
        ]
      },
      {
        key: '3',
        title: '배송 시작',
        description: '상품이 배송 센터에서 출발했습니다. 예상 배송일은 2-3일 후입니다.',
        time: '2024-01-15 14:00',
        status: 'active',
        tags: ['배송', '출발', '진행중'],
        icon: '🚚',
        actions: [
          {
            key: 'track',
            label: '배송추적',
            type: 'primary',
            onClick: (item) => console.log('배송추적:', item)
          }
        ]
      },
      {
        key: '4',
        title: '고객 문의',
        description: '고객으로부터 상품 관련 문의가 접수되었습니다. 빠른 답변이 필요합니다.',
        time: '2024-01-15 16:00',
        status: 'warning',
        tags: ['문의', '대기', '긴급'],
        icon: '❓',
        actions: [
          {
            key: 'reply',
            label: '답변',
            type: 'primary',
            onClick: (item) => console.log('답변 작성:', item)
          },
          {
            key: 'assign',
            label: '담당자 지정',
            onClick: (item) => console.log('담당자 지정:', item)
          }
        ]
      }
    ],
    animated: true,
    onItemClick: (item) => console.log('타임라인 아이템 클릭:', item)
  }
}; 