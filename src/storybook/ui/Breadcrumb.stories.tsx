import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';

const meta: Meta<any> = {
  title: 'UI/Breadcrumb',
  component: 'div',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '현재 페이지의 위치를 표시하는 브레드크럼 컴포넌트입니다. 네비게이션과 사용자 경험 향상에 도움이 됩니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      description: '구분자 아이콘',
      control: 'select',
      options: ['chevron', 'slash', 'arrow'],
      defaultValue: 'chevron'
    },
    showHome: {
      description: '홈 아이콘 표시 여부',
      control: 'boolean',
      defaultValue: true
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 브레드크럼
export const Default: Story = {
  render: () => {
    const items = [
      { label: '홈', href: '/' },
      { label: '제품', href: '/products' },
      { label: '전자제품', href: '/products/electronics' },
      { label: '스마트폰', href: '/products/electronics/smartphones' }
    ];

    return (
      <nav className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.label}</span>
            ) : (
              <a
                href={item.href}
                className="text-gray-500 hover:text-gray-700 hover:underline"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>
    );
  }
};

// 홈 아이콘이 있는 브레드크럼
export const WithHomeIcon: Story = {
  render: () => {
    const items = [
      { label: '홈', href: '/' },
      { label: '관리', href: '/admin' },
      { label: '사용자', href: '/admin/users' },
      { label: '사용자 목록', href: '/admin/users/list' }
    ];

    return (
      <nav className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium flex items-center">
                {index === 0 && <HomeIcon className="w-4 h-4 mr-1" />}
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-gray-500 hover:text-gray-700 hover:underline flex items-center"
              >
                {index === 0 && <HomeIcon className="w-4 h-4 mr-1" />}
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>
    );
  }
};

// 슬래시 구분자
export const SlashSeparator: Story = {
  render: () => {
    const items = [
      { label: '홈', href: '/' },
      { label: '문서', href: '/docs' },
      { label: 'API', href: '/docs/api' },
      { label: '인증', href: '/docs/api/auth' }
    ];

    return (
      <nav className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <span className="text-gray-400 mx-2">/</span>
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.label}</span>
            ) : (
              <a
                href={item.href}
                className="text-gray-500 hover:text-gray-700 hover:underline"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>
    );
  }
};

// 긴 경로 브레드크럼
export const LongPath: Story = {
  render: () => {
    const items = [
      { label: '홈', href: '/' },
      { label: '쇼핑', href: '/shopping' },
      { label: '의류', href: '/shopping/clothing' },
      { label: '남성복', href: '/shopping/clothing/men' },
      { label: '상의', href: '/shopping/clothing/men/tops' },
      { label: '티셔츠', href: '/shopping/clothing/men/tops/tshirts' },
      { label: '베이직 티', href: '/shopping/clothing/men/tops/tshirts/basic' }
    ];

    return (
      <nav className="flex items-center space-x-2 text-sm max-w-full overflow-hidden">
        {items.map((item, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" />
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium truncate">{item.label}</span>
            ) : index === 0 ? (
              <a
                href={item.href}
                className="text-gray-500 hover:text-gray-700 hover:underline flex-shrink-0"
              >
                {item.label}
              </a>
            ) : index === items.length - 2 ? (
              <a
                href={item.href}
                className="text-gray-500 hover:text-gray-700 hover:underline flex-shrink-0"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-400">...</span>
            )}
          </div>
        ))}
      </nav>
    );
  }
};

// 컴팩트 브레드크럼
export const Compact: Story = {
  render: () => {
    const items = [
      { label: '홈', href: '/' },
      { label: '제품', href: '/products' },
      { label: '현재 페이지', href: '/products/current' }
    ];

    return (
      <nav className="flex items-center space-x-1 text-xs">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-3 h-3 text-gray-400 mx-1" />
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.label}</span>
            ) : (
              <a
                href={item.href}
                className="text-gray-500 hover:text-gray-700 hover:underline"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>
    );
  }
};

// 큰 브레드크럼
export const Large: Story = {
  render: () => {
    const items = [
      { label: '홈', href: '/' },
      { label: '서비스', href: '/services' },
      { label: '웹 개발', href: '/services/web-development' },
      { label: '프론트엔드', href: '/services/web-development/frontend' }
    ];

    return (
      <nav className="flex items-center space-x-3 text-base">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-5 h-5 text-gray-400 mx-3" />
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-semibold">{item.label}</span>
            ) : (
              <a
                href={item.href}
                className="text-gray-500 hover:text-gray-700 hover:underline"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>
    );
  }
};

// 커스텀 스타일 브레드크럼
export const CustomStyle: Story = {
  render: () => {
    const items = [
      { label: '홈', href: '/' },
      { label: '프로젝트', href: '/projects' },
      { label: 'MyRealTrip', href: '/projects/myrealtrip' }
    ];

    return (
      <nav className="flex items-center space-x-2 text-sm bg-gray-50 px-4 py-2 rounded-lg">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-blue-400 mx-2" />
            )}
            {index === items.length - 1 ? (
              <span className="text-blue-600 font-medium">{item.label}</span>
            ) : (
              <a
                href={item.href}
                className="text-gray-600 hover:text-blue-600 hover:underline"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>
    );
  }
}; 