import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChevronDownIcon, SettingsIcon, UserIcon, LogOutIcon, HelpCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const meta: Meta<any> = {
  title: 'UI/Menu',
  component: 'div',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '드롭다운 메뉴 컴포넌트입니다. 네비게이션, 액션, 설정 메뉴 등 다양한 용도로 사용됩니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      description: '메뉴 트리거 요소',
      control: 'select',
      options: ['button', 'text', 'icon'],
      defaultValue: 'button'
    },
    placement: {
      description: '메뉴 위치',
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      defaultValue: 'bottom'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 메뉴
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <span>메뉴</span>
          <ChevronDownIcon className="w-4 h-4" />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-1">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                메뉴 항목 1
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                메뉴 항목 2
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                메뉴 항목 3
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

// 사용자 메뉴
export const UserMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          className="flex items-center space-x-2"
        >
          <UserIcon className="w-5 h-5" />
          <span>사용자</span>
          <ChevronDownIcon className="w-4 h-4" />
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">김철수</p>
              <p className="text-sm text-gray-500">kim@example.com</p>
            </div>
            <div className="py-1">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                <UserIcon className="w-4 h-4" />
                <span>프로필</span>
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                <SettingsIcon className="w-4 h-4" />
                <span>설정</span>
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                <HelpCircleIcon className="w-4 h-4" />
                <span>도움말</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                <LogOutIcon className="w-4 h-4" />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

// 액션 메뉴
export const ActionMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
        >
          액션
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-1">
              <button className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50">
                편집
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50">
                복사
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-yellow-50">
                공유
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

// 네비게이션 메뉴
export const NavigationMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
      { label: '홈', href: '/' },
      { label: '제품', href: '/products' },
      { label: '서비스', href: '/services' },
      { label: '회사 소개', href: '/about' },
      { label: '연락처', href: '/contact' }
    ];

    return (
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          className="flex items-center space-x-2"
        >
          <span>메뉴</span>
          <ChevronDownIcon className="w-4 h-4" />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
};

// 설정 메뉴
export const SettingsMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          size="sm"
        >
          <SettingsIcon className="w-5 h-5" />
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">설정</h3>
            </div>
            <div className="py-1">
              <div className="px-4 py-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">알림 받기</span>
                </label>
              </div>
              <div className="px-4 py-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">다크 모드</span>
                </label>
              </div>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                계정 설정
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                개인정보 보호
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                보안
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

// 그룹화된 메뉴
export const GroupedMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
        >
          그룹 메뉴
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-1">
              <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                파일
              </div>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                새로 만들기
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                열기
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                저장
              </button>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                편집
              </div>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                복사
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                붙여넣기
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                실행 취소
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

// 비활성화된 메뉴
export const Disabled: Story = {
  render: () => {
    return (
      <div className="relative">
        <Button
          variant="outline"
          disabled
          className="flex items-center space-x-2"
        >
          <span>메뉴</span>
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </div>
    );
  }
}; 