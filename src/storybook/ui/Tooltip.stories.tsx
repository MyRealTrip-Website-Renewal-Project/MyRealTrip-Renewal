import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { InfoIcon, HelpCircleIcon, AlertCircleIcon } from 'lucide-react';

const meta: Meta<any> = {
  title: 'UI/Tooltip',
  component: 'div',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '요소에 마우스를 올렸을 때 추가 정보를 표시하는 툴팁 컴포넌트입니다. 다양한 위치와 스타일을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      description: '툴팁 위치',
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      defaultValue: 'top'
    },
    content: {
      description: '툴팁 내용',
      control: 'text'
    },
    delay: {
      description: '표시 지연 시간 (ms)',
      control: 'number',
      defaultValue: 200
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 툴팁 컴포넌트
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-900';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-900';
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900';
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 ${getPositionClasses()}`}>
          <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap">
            {content}
            <div className={`absolute w-0 h-0 border-4 border-transparent ${getArrowClasses()}`} />
          </div>
        </div>
      )}
    </div>
  );
};

// 기본 툴팁
export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Tooltip content="이것은 기본 툴팁입니다">
        <Button>마우스를 올려보세요</Button>
      </Tooltip>
    </div>
  )
};

// 다양한 위치의 툴팁
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div className="flex justify-center">
        <Tooltip content="위쪽 툴팁" position="top">
          <Button>위쪽</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="아래쪽 툴팁" position="bottom">
          <Button>아래쪽</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="왼쪽 툴팁" position="left">
          <Button>왼쪽</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="오른쪽 툴팁" position="right">
          <Button>오른쪽</Button>
        </Tooltip>
      </div>
    </div>
  )
};

// 아이콘 툴팁
export const IconTooltips: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Tooltip content="도움말 정보입니다">
          <HelpCircleIcon className="w-5 h-5 text-gray-400 cursor-help" />
        </Tooltip>
        <span>도움말이 필요한 항목</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Tooltip content="추가 정보를 확인하세요">
          <InfoIcon className="w-5 h-5 text-blue-500 cursor-help" />
        </Tooltip>
        <span>정보 아이콘</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Tooltip content="주의가 필요한 항목입니다">
          <AlertCircleIcon className="w-5 h-5 text-yellow-500 cursor-help" />
        </Tooltip>
        <span>경고 아이콘</span>
      </div>
    </div>
  )
};

// 긴 내용 툴팁
export const LongContent: Story = {
  render: () => (
    <div className="space-y-4">
      <Tooltip content="이것은 매우 긴 툴팁 내용입니다. 여러 줄에 걸쳐 표시될 수 있으며, 사용자에게 자세한 정보를 제공합니다.">
        <Button>긴 내용 툴팁</Button>
      </Tooltip>
      
      <Tooltip content="이 툴팁은 HTML 태그를 포함할 수 있습니다. <strong>굵은 텍스트</strong>나 <em>기울임 텍스트</em>도 사용 가능합니다.">
        <Button>HTML 내용 툴팁</Button>
      </Tooltip>
    </div>
  )
};

// 지연 시간이 있는 툴팁
export const WithDelay: Story = {
  render: () => (
    <div className="space-y-4">
      <Tooltip content="즉시 표시되는 툴팁" delay={0}>
        <Button>즉시 표시</Button>
      </Tooltip>
      
      <Tooltip content="1초 후 표시되는 툴팁" delay={1000}>
        <Button>1초 지연</Button>
      </Tooltip>
      
      <Tooltip content="기본 지연 시간(200ms) 툴팁">
        <Button>기본 지연</Button>
      </Tooltip>
    </div>
  )
};

// 폼 요소 툴팁
export const FormTooltips: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          사용자명
          <Tooltip content="영문, 숫자, 언더스코어만 사용 가능합니다">
            <HelpCircleIcon className="w-4 h-4 text-gray-400 ml-1 inline cursor-help" />
          </Tooltip>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="사용자명을 입력하세요"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          비밀번호
          <Tooltip content="8자 이상, 영문, 숫자, 특수문자 포함">
            <HelpCircleIcon className="w-4 h-4 text-gray-400 ml-1 inline cursor-help" />
          </Tooltip>
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
    </div>
  )
};

// 커스텀 스타일 툴팁
export const CustomStyle: Story = {
  render: () => {
    const CustomTooltip: React.FC<{ content: string; children: React.ReactNode }> = ({
      content,
      children
    }) => {
      const [isVisible, setIsVisible] = useState(false);

      return (
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {children}
          {isVisible && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
              <div className="bg-blue-600 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                {content}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-blue-600" />
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="space-y-4">
        <CustomTooltip content="커스텀 스타일 툴팁">
          <Button variant="outline">커스텀 스타일</Button>
        </CustomTooltip>
      </div>
    );
  }
}; 