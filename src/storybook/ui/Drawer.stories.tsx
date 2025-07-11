import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { XIcon, MenuIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const meta: Meta<any> = {
  title: 'UI/Drawer',
  component: 'div',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사이드에서 슬라이드되어 나타나는 드로어 컴포넌트입니다. 네비게이션, 설정, 필터 등에 사용됩니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      description: '드로어 위치',
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      defaultValue: 'left'
    },
    size: {
      description: '드로어 크기',
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      defaultValue: 'md'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 드로어
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>
          드로어 열기
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* 배경 오버레이 */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* 드로어 */}
            <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">드로어 제목</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-600">
                  이것은 드로어의 내용입니다. 여기에 다양한 컴포넌트들을 배치할 수 있습니다.
                </p>
                <div className="mt-4 space-y-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded">
                    메뉴 항목 1
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded">
                    메뉴 항목 2
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded">
                    메뉴 항목 3
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

// 오른쪽 드로어
export const RightDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>
          오른쪽 드로어 열기
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            />
            
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">설정</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">일반 설정</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">알림 받기</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">다크 모드</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">계정</h3>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded text-sm">
                    프로필 편집
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded text-sm">
                    비밀번호 변경
                  </button>
                </div>
              </div>
            </div>
          </div>
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
      { icon: <UserIcon className="w-5 h-5" />, label: '대시보드', href: '/' },
      { icon: <SettingsIcon className="w-5 h-5" />, label: '제품', href: '/products' },
      { icon: <UserIcon className="w-5 h-5" />, label: '주문', href: '/orders' },
      { icon: <SettingsIcon className="w-5 h-5" />, label: '고객', href: '/customers' },
      { icon: <UserIcon className="w-5 h-5" />, label: '설정', href: '/settings' }
    ];

    return (
      <div>
        <Button onClick={() => setIsOpen(true)} variant="ghost">
          <MenuIcon className="w-5 h-5" />
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            />
            
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">네비게이션</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4">
                <div className="space-y-1">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    );
  }
};

// 필터 드로어
export const FilterDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)} variant="outline">
          필터
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            />
            
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">필터</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">가격 범위</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="price" className="rounded" />
                      <span className="text-sm">₩0 - ₩10,000</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="price" className="rounded" />
                      <span className="text-sm">₩10,000 - ₩50,000</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="price" className="rounded" />
                      <span className="text-sm">₩50,000+</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">카테고리</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">전자제품</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">의류</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">도서</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button className="flex-1" variant="outline">
                      초기화
                    </Button>
                    <Button className="flex-1">
                      적용
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

// 전체 화면 드로어
export const FullScreen: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>
          전체 화면 드로어
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-white">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">전체 화면 드로어</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-600">
                  이것은 전체 화면을 차지하는 드로어입니다. 모바일에서 자주 사용됩니다.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">섹션 1</h3>
                    <p className="text-sm text-gray-600">섹션 내용입니다.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">섹션 2</h3>
                    <p className="text-sm text-gray-600">섹션 내용입니다.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">섹션 3</h3>
                    <p className="text-sm text-gray-600">섹션 내용입니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}; 