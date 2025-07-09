import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FiUser, FiMail, FiSettings, FiMenu, FiFilter } from 'react-icons/fi';
import Drawer from './Drawer';
import { Input, Textarea, Select, Filter } from '../ui';

const meta: Meta<typeof Drawer> = {
  title: 'UI/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '4방향(좌/우/상/하)에서 슬라이드되는 사이드 드로어 컴포넌트입니다. 접근성과 애니메이션을 지원합니다.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '드로어 열림 상태'
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: '드로어 위치'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: '드로어 크기'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '오버레이 클릭 시 닫기'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키로 닫기'
    },
    showCloseButton: {
      control: 'boolean',
      description: '닫기 버튼 표시'
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태'
    },
    onClose: {
      action: 'closed',
      description: '드로어 닫기 시 호출'
    },
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 클릭 시 호출'
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 클릭 시 호출'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// 기본 드로어
export const Default: Story = {
  args: {
    isOpen: true,
    title: '기본 드로어',
    subtitle: '드로어의 기본적인 사용 예시입니다.',
    children: (
      <div>
        <p>이것은 기본 드로어의 내용입니다.</p>
        <p>드로어는 사이드에서 슬라이드되어 나타나는 패널입니다.</p>
      </div>
    )
  }
};

// 다양한 위치
export const Positions: Story = {
  render: () => {
    const [openDrawer, setOpenDrawer] = useState<'left' | 'right' | 'top' | 'bottom' | null>(null);

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => setOpenDrawer('left')}>Left Drawer</button>
          <button onClick={() => setOpenDrawer('right')}>Right Drawer</button>
          <button onClick={() => setOpenDrawer('top')}>Top Drawer</button>
          <button onClick={() => setOpenDrawer('bottom')}>Bottom Drawer</button>
        </div>

        {openDrawer && (
          <Drawer
            isOpen={true}
            onClose={() => setOpenDrawer(null)}
            title={`${openDrawer.toUpperCase()} 드로어`}
            position={openDrawer}
          >
            <p>이것은 {openDrawer} 위치의 드로어입니다.</p>
            <p>다양한 위치에서 드로어를 사용할 수 있습니다.</p>
          </Drawer>
        )}
      </div>
    );
  }
};

// 다양한 크기
export const Sizes: Story = {
  render: () => {
    const [openDrawer, setOpenDrawer] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | null>(null);

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => setOpenDrawer('sm')}>Small Drawer</button>
          <button onClick={() => setOpenDrawer('md')}>Medium Drawer</button>
          <button onClick={() => setOpenDrawer('lg')}>Large Drawer</button>
          <button onClick={() => setOpenDrawer('xl')}>Extra Large Drawer</button>
          <button onClick={() => setOpenDrawer('full')}>Full Screen Drawer</button>
        </div>

        {openDrawer && (
          <Drawer
            isOpen={true}
            onClose={() => setOpenDrawer(null)}
            title={`${openDrawer.toUpperCase()} 크기 드로어`}
            size={openDrawer}
          >
            <p>이것은 {openDrawer} 크기의 드로어입니다.</p>
            <p>콘텐츠에 맞는 적절한 크기를 선택할 수 있습니다.</p>
          </Drawer>
        )}
      </div>
    );
  }
};

// 네비게이션 드로어
export const NavigationDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
      { id: 'home', label: '홈', icon: FiMenu },
      { id: 'profile', label: '프로필', icon: FiUser },
      { id: 'settings', label: '설정', icon: FiSettings },
      { id: 'help', label: '도움말', icon: FiMenu }
    ];

    return (
      <div style={{ padding: '20px' }}>
        <button onClick={() => setIsOpen(true)}>메뉴 열기</button>

        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="네비게이션"
          position="left"
          size="md"
        >
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {menuItems.map((item) => (
                <li key={item.id} style={{ marginBottom: '8px' }}>
                  <button
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-gray-100)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Drawer>
      </div>
    );
  }
};

// 필터 드로어
export const FilterDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const filterSections = [
      {
        id: 'category',
        title: '카테고리',
        type: 'checkbox' as const,
        icon: <FiFilter />,
        options: [
          { id: 'hotel', label: '호텔', value: 'hotel', count: 125 },
          { id: 'flight', label: '항공', value: 'flight', count: 89 },
          { id: 'tour', label: '투어', value: 'tour', count: 67 }
        ]
      },
      {
        id: 'price',
        title: '가격 범위',
        type: 'range' as const,
        icon: <FiFilter />,
        min: 0,
        max: 1000000,
        step: 10000
      }
    ];

    return (
      <div style={{ padding: '20px' }}>
        <button onClick={() => setIsOpen(true)}>필터 열기</button>

        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="필터"
          position="right"
          size="lg"
          buttons={[
            {
              label: '초기화',
              variant: 'secondary',
              onClick: () => console.log('초기화')
            },
            {
              label: '적용',
              variant: 'primary',
              onClick: () => {
                console.log('필터 적용');
                setIsOpen(false);
              }
            }
          ]}
        >
          <Filter
            title="검색 필터"
            sections={filterSections}
            onApply={(value) => console.log('필터 적용:', value)}
            onClear={() => console.log('필터 초기화')}
            defaultExpanded={true}
          />
        </Drawer>
      </div>
    );
  }
};

// 폼 드로어
export const FormDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      role: '',
      description: ''
    });

    const handleSubmit = () => {
      console.log('Form submitted:', formData);
      setIsOpen(false);
    };

    return (
      <div style={{ padding: '20px' }}>
        <button onClick={() => setIsOpen(true)}>사용자 추가</button>

        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="새 사용자 추가"
          position="right"
          size="lg"
          buttons={[
            {
              label: '취소',
              variant: 'secondary',
              onClick: () => setIsOpen(false)
            },
            {
              label: '저장',
              variant: 'primary',
              onClick: handleSubmit
            }
          ]}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="이름"
              placeholder="사용자 이름을 입력하세요"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              icon={FiUser}
            />
            
            <Input
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
              icon={FiMail}
            />
            
            <Select
              label="역할"
              options={[
                { label: '관리자', value: 'admin' },
                { label: '편집자', value: 'editor' },
                { label: '뷰어', value: 'viewer' }
              ]}
              value={formData.role}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, role: e.target.value })}
            />
            
            <Textarea
              label="설명"
              placeholder="사용자에 대한 설명을 입력하세요"
              rows={3}
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </Drawer>
      </div>
    );
  }
};

// 커스텀 버튼
export const CustomButtons: Story = {
  args: {
    isOpen: true,
    title: '커스텀 버튼',
    children: (
      <div>
        <p>커스텀 버튼을 사용한 드로어 예시입니다.</p>
        <p>다양한 스타일과 동작을 가진 버튼을 설정할 수 있습니다.</p>
      </div>
    ),
    buttons: [
      {
        label: '저장',
        variant: 'primary',
        onClick: () => console.log('저장됨')
      },
      {
        label: '임시저장',
        variant: 'secondary',
        onClick: () => console.log('임시저장됨')
      },
      {
        label: '삭제',
        variant: 'danger',
        onClick: () => console.log('삭제됨')
      }
    ]
  }
};

// 로딩 상태
export const Loading: Story = {
  args: {
    isOpen: true,
    title: '로딩 중',
    loading: true,
    children: (
      <div>
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    )
  }
};

// 에러 상태
export const WithError: Story = {
  args: {
    isOpen: true,
    title: '오류 발생',
    error: '데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.',
    children: (
      <div>
        <p>오류가 발생한 드로어의 예시입니다.</p>
      </div>
    )
  }
};

// 푸터 정렬
export const FooterAlignment: Story = {
  render: () => {
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'space-between'>('right');

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label>푸터 정렬: </label>
          <select value={alignment} onChange={(e) => setAlignment(e.target.value as any)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="space-between">Space Between</option>
          </select>
        </div>

        <button onClick={() => {}}>드로어 열기</button>

        <Drawer
          isOpen={true}
          onClose={() => {}}
          title="푸터 정렬 테스트"
          footerAlign={alignment}
          buttons={[
            { label: '취소', variant: 'secondary' },
            { label: '저장', variant: 'primary' }
          ]}
        >
          <p>푸터의 정렬 방식을 테스트할 수 있습니다.</p>
        </Drawer>
      </div>
    );
  }
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right');

    const openDrawer = (pos: typeof position) => {
      setPosition(pos);
      setIsOpen(true);
    };

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button onClick={() => openDrawer('left')}>왼쪽 드로어</button>
          <button onClick={() => openDrawer('right')}>오른쪽 드로어</button>
          <button onClick={() => openDrawer('top')}>위쪽 드로어</button>
          <button onClick={() => openDrawer('bottom')}>아래쪽 드로어</button>
        </div>

        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position={position}
          title={`${position} 드로어`}
          onConfirm={() => {
            console.log('확인됨');
            setIsOpen(false);
          }}
          onCancel={() => {
            console.log('취소됨');
            setIsOpen(false);
          }}
        >
          <div>
            <p>이것은 {position}에서 열리는 드로어입니다.</p>
            <p>다양한 위치에서 드로어를 사용할 수 있습니다.</p>
            <p>ESC 키를 눌러 닫을 수 있습니다.</p>
          </div>
        </Drawer>
      </div>
    );
  }
};

// 접근성 테스트
export const Accessibility: Story = {
  args: {
    isOpen: true,
    title: '접근성 테스트',
    subtitle: '키보드 네비게이션과 스크린 리더를 테스트해보세요.',
    children: (
      <div>
        <p>이 드로어는 다음과 같은 접근성 기능을 제공합니다:</p>
        <ul>
          <li>ESC 키로 드로어 닫기</li>
          <li>포커스 트랩 (Tab 키로 드로어 내부 순환)</li>
          <li>ARIA 라벨 및 역할</li>
          <li>스크린 리더 호환성</li>
        </ul>
        <p>Tab 키를 눌러 버튼들 사이를 이동해보세요.</p>
      </div>
    ),
    buttons: [
      { label: '첫 번째 버튼', variant: 'primary' },
      { label: '두 번째 버튼', variant: 'secondary' },
      { label: '세 번째 버튼', variant: 'ghost' }
    ]
  }
}; 