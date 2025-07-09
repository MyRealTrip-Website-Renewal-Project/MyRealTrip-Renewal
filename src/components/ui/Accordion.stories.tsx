import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { Badge } from './Badge';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '아코디언 컴포넌트입니다. 접을 수 있는 콘텐츠 섹션을 제공합니다.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '아코디언 크기'
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: '아코디언 테마'
    },
    allowMultiple: {
      control: 'boolean',
      description: '여러 아이템을 동시에 열 수 있는지 여부'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '600px', width: '100%' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 아코디언
export const Default: Story = {
  args: {
    items: [
      {
        title: '첫 번째 섹션',
        content: '첫 번째 섹션의 내용입니다. 여기에 다양한 콘텐츠를 포함할 수 있습니다.'
      },
      {
        title: '두 번째 섹션',
        content: '두 번째 섹션의 내용입니다. 긴 텍스트나 복잡한 컴포넌트도 포함 가능합니다.'
      },
      {
        title: '세 번째 섹션',
        content: '세 번째 섹션의 내용입니다. 아코디언은 정보를 체계적으로 정리하는 데 유용합니다.'
      }
    ]
  }
};

// 기본 열린 아코디언
export const DefaultOpen: Story = {
  args: {
    items: [
      {
        title: '기본 열린 섹션',
        content: '이 섹션은 기본적으로 열려있습니다.',
        defaultOpen: true
      },
      {
        title: '두 번째 섹션',
        content: '이 섹션은 기본적으로 닫혀있습니다.'
      },
      {
        title: '세 번째 섹션',
        content: '이 섹션도 기본적으로 닫혀있습니다.'
      }
    ]
  }
};

// 여러 개 동시 열기 허용
export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    items: [
      {
        title: '첫 번째 섹션',
        content: '여러 섹션을 동시에 열 수 있습니다.'
      },
      {
        title: '두 번째 섹션',
        content: '이 섹션도 열어둘 수 있습니다.'
      },
      {
        title: '세 번째 섹션',
        content: '모든 섹션을 동시에 열 수 있습니다.'
      }
    ]
  }
};

// 크기별 아코디언
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Small Size</h3>
        <Accordion
          size="sm"
          items={[
            {
              title: '작은 크기',
              content: '작은 크기의 아코디언입니다.'
            }
          ]}
        />
      </div>
      <div>
        <h3>Medium Size (Default)</h3>
        <Accordion
          items={[
            {
              title: '중간 크기',
              content: '중간 크기의 아코디언입니다.'
            }
          ]}
        />
      </div>
      <div>
        <h3>Large Size</h3>
        <Accordion
          size="lg"
          items={[
            {
              title: '큰 크기',
              content: '큰 크기의 아코디언입니다.'
            }
          ]}
        />
      </div>
    </div>
  )
};

// 테마별 아코디언
export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Default Theme</h3>
        <Accordion
          items={[
            {
              title: '기본 테마',
              content: '기본 테마의 아코디언입니다.'
            }
          ]}
        />
      </div>
      <div>
        <h3>Primary Theme</h3>
        <Accordion
          theme="primary"
          items={[
            {
              title: '프라이머리 테마',
              content: '프라이머리 테마의 아코디언입니다.'
            }
          ]}
        />
      </div>
      <div>
        <h3>Success Theme</h3>
        <Accordion
          theme="success"
          items={[
            {
              title: '성공 테마',
              content: '성공 테마의 아코디언입니다.'
            }
          ]}
        />
      </div>
      <div>
        <h3>Warning Theme</h3>
        <Accordion
          theme="warning"
          items={[
            {
              title: '경고 테마',
              content: '경고 테마의 아코디언입니다.'
            }
          ]}
        />
      </div>
      <div>
        <h3>Error Theme</h3>
        <Accordion
          theme="error"
          items={[
            {
              title: '에러 테마',
              content: '에러 테마의 아코디언입니다.'
            }
          ]}
        />
      </div>
    </div>
  )
};

// 복잡한 콘텐츠
export const ComplexContent: Story = {
  args: {
    items: [
      {
        title: '복잡한 콘텐츠',
        content: (
          <div>
            <p>여러 줄의 텍스트와 함께 다양한 요소들을 포함할 수 있습니다.</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Badge type="blue">태그1</Badge>
              <Badge type="green">태그2</Badge>
              <Badge type="yellow">태그3</Badge>
            </div>
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
              <li>리스트 아이템 1</li>
              <li>리스트 아이템 2</li>
              <li>리스트 아이템 3</li>
            </ul>
            <div style={{ 
              background: '#f5f5f5', 
              padding: '0.5rem', 
              borderRadius: '4px',
              marginTop: '0.5rem'
            }}>
              <strong>코드 블록:</strong>
              <pre style={{ margin: '0.5rem 0', fontSize: '12px' }}>
                {`function example() {
  return "Hello World";
}`}
              </pre>
            </div>
          </div>
        )
      },
      {
        title: 'HTML 콘텐츠',
        content: (
          <div>
            <h4>HTML 요소들</h4>
            <p>아코디언 내부에는 <strong>강조 텍스트</strong>, <em>기울임 텍스트</em>, 
            <a href="#" style={{ color: '#2196f3' }}>링크</a> 등 다양한 HTML 요소를 사용할 수 있습니다.</p>
            <blockquote style={{ 
              borderLeft: '4px solid #2196f3', 
              paddingLeft: '1rem', 
              margin: '1rem 0',
              fontStyle: 'italic'
            }}>
              인용문도 포함할 수 있습니다.
            </blockquote>
          </div>
        )
      }
    ]
  }
};

// 비활성화된 아이템
export const DisabledItems: Story = {
  args: {
    items: [
      {
        title: '활성화된 섹션',
        content: '이 섹션은 클릭할 수 있습니다.'
      },
      {
        title: '비활성화된 섹션',
        content: '이 섹션은 비활성화되어 있습니다.',
        disabled: true
      },
      {
        title: '또 다른 활성화된 섹션',
        content: '이 섹션도 클릭할 수 있습니다.'
      }
    ]
  }
};

// 긴 텍스트
export const LongText: Story = {
  args: {
    items: [
      {
        title: '긴 텍스트 섹션',
        content: (
          <div>
            <p>
              이것은 매우 긴 텍스트를 포함하는 아코디언 섹션입니다. 아코디언은 
              긴 콘텐츠를 체계적으로 정리하고 사용자가 필요할 때만 표시할 수 있게 
              해주는 유용한 UI 컴포넌트입니다.
            </p>
            <p>
              아코디언의 장점은 다음과 같습니다:
            </p>
            <ul>
              <li>화면 공간을 효율적으로 사용할 수 있습니다.</li>
              <li>사용자가 관심 있는 정보만 선택적으로 볼 수 있습니다.</li>
              <li>복잡한 정보를 단계적으로 제공할 수 있습니다.</li>
              <li>모바일 환경에서도 사용하기 편리합니다.</li>
            </ul>
            <p>
              아코디언은 FAQ, 설정 메뉴, 문서 구조 등 다양한 용도로 활용할 수 있으며, 
              사용자 경험을 향상시키는 데 도움이 됩니다.
            </p>
          </div>
        )
      }
    ]
  }
};

// FAQ 스타일
export const FAQStyle: Story = {
  args: {
    items: [
      {
        title: '자주 묻는 질문 1: 서비스 이용 방법은?',
        content: '서비스 이용 방법에 대한 자세한 안내입니다. 계정을 생성하고 로그인한 후 원하는 기능을 이용하실 수 있습니다.'
      },
      {
        title: '자주 묻는 질문 2: 결제 방법은?',
        content: '다양한 결제 방법을 지원합니다. 신용카드, 계좌이체, 간편결제 등이 가능합니다.'
      },
      {
        title: '자주 묻는 질문 3: 환불 정책은?',
        content: '구매 후 7일 이내에는 무조건 환불이 가능합니다. 단, 사용한 서비스의 경우 부분 환불이 적용될 수 있습니다.'
      },
      {
        title: '자주 묻는 질문 4: 고객 지원은?',
        content: '24시간 고객 지원 서비스를 제공합니다. 이메일, 전화, 실시간 채팅을 통해 문의하실 수 있습니다.'
      }
    ]
  }
}; 