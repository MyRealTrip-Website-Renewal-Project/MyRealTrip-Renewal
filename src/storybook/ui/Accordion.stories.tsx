import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

const meta: Meta<any> = {
  title: 'UI/Accordion',
  component: 'div',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '접을 수 있는 아코디언 컴포넌트입니다. FAQ, 설정, 정보 표시 등에 사용됩니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '아코디언 타입',
      control: 'select',
      options: ['single', 'multiple'],
      defaultValue: 'single'
    },
    collapsible: {
      description: '모든 항목을 접을 수 있는지 여부',
      control: 'boolean',
      defaultValue: true
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 아코디언 아이템 컴포넌트
interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  onToggle
}) => {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{title}</span>
        {isOpen ? (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRightIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-3">
          <p className="text-gray-600">{content}</p>
        </div>
      )}
    </div>
  );
};

// 기본 아코디언
export const Default: Story = {
  render: () => {
    const [openItem, setOpenItem] = useState<number | null>(0);

    const items = [
      {
        title: '아코디언 항목 1',
        content: '이것은 첫 번째 아코디언 항목의 내용입니다. 여기에 다양한 정보를 표시할 수 있습니다.'
      },
      {
        title: '아코디언 항목 2',
        content: '두 번째 아코디언 항목의 내용입니다. 긴 텍스트나 복잡한 컴포넌트도 포함할 수 있습니다.'
      },
      {
        title: '아코디언 항목 3',
        content: '세 번째 아코디언 항목의 내용입니다. 이미지, 링크, 버튼 등 다양한 요소를 포함할 수 있습니다.'
      }
    ];

    return (
      <div className="w-96 space-y-2">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openItem === index}
            onToggle={() => setOpenItem(openItem === index ? null : index)}
          />
        ))}
      </div>
    );
  }
};

// 다중 선택 아코디언
export const Multiple: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

    const items = [
      {
        title: '계정 설정',
        content: '사용자 계정 정보를 관리하고 설정을 변경할 수 있습니다.'
      },
      {
        title: '보안 설정',
        content: '비밀번호 변경, 2단계 인증, 로그인 기록 등을 관리합니다.'
      },
      {
        title: '알림 설정',
        content: '이메일, 푸시 알림, SMS 알림 등의 설정을 관리합니다.'
      },
      {
        title: '개인정보 보호',
        content: '개인정보 수집 및 이용에 대한 설정을 관리합니다.'
      }
    ];

    const toggleItem = (index: number) => {
      const newOpenItems = new Set(openItems);
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
      setOpenItems(newOpenItems);
    };

    return (
      <div className="w-96 space-y-2">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openItems.has(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    );
  }
};

// FAQ 아코디언
export const FAQ: Story = {
  render: () => {
    const [openItem, setOpenItem] = useState<number | null>(0);

    const faqs = [
      {
        question: '서비스 이용 방법은 어떻게 되나요?',
        answer: '회원가입 후 로그인하여 서비스를 이용할 수 있습니다. 자세한 이용 방법은 가이드를 참고해주세요.'
      },
      {
        question: '결제 방법은 어떤 것이 있나요?',
        answer: '신용카드, 계좌이체, 휴대폰 결제 등 다양한 결제 방법을 지원합니다.'
      },
      {
        question: '환불 정책은 어떻게 되나요?',
        answer: '구매 후 7일 이내에 환불 신청이 가능합니다. 단, 사용된 서비스는 환불이 제한될 수 있습니다.'
      },
      {
        question: '고객 지원은 어떻게 받을 수 있나요?',
        answer: '이메일, 전화, 실시간 채팅을 통해 고객 지원을 받을 수 있습니다. 운영시간은 평일 9시-18시입니다.'
      }
    ];

    return (
      <div className="w-96 space-y-2">
        <h2 className="text-xl font-semibold mb-4">자주 묻는 질문</h2>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            title={faq.question}
            content={faq.answer}
            isOpen={openItem === index}
            onToggle={() => setOpenItem(openItem === index ? null : index)}
          />
        ))}
      </div>
    );
  }
};

// 복잡한 내용 아코디언
export const ComplexContent: Story = {
  render: () => {
    const [openItem, setOpenItem] = useState<number | null>(0);

    const items = [
      {
        title: '사용자 정보',
        content: (
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold">김</span>
              </div>
              <div>
                <p className="font-medium">김철수</p>
                <p className="text-sm text-gray-500">kim@example.com</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">전화번호</p>
                <p>010-1234-5678</p>
              </div>
              <div>
                <p className="text-gray-500">가입일</p>
                <p>2024년 1월 15일</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              정보 수정
            </button>
          </div>
        )
      },
      {
        title: '최근 활동',
        content: (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">로그인</span>
              <span className="text-xs text-gray-500">2시간 전</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">주문 완료</span>
              <span className="text-xs text-gray-500">1일 전</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">리뷰 작성</span>
              <span className="text-xs text-gray-500">3일 전</span>
            </div>
          </div>
        )
      },
      {
        title: '설정',
        content: (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">이메일 알림</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">푸시 알림</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">다크 모드</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        )
      }
    ];

    return (
      <div className="w-96 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setOpenItem(openItem === index ? null : index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{item.title}</span>
              {openItem === index ? (
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openItem === index && (
              <div className="px-4 pb-3">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};

// 접을 수 없는 아코디언
export const NonCollapsible: Story = {
  render: () => {
    const [openItem, setOpenItem] = useState<number>(0);

    const items = [
      {
        title: '필수 정보',
        content: '이 항목은 반드시 열려있어야 하는 중요한 정보입니다.'
      },
      {
        title: '추가 정보',
        content: '이 항목은 선택적으로 열고 닫을 수 있습니다.'
      },
      {
        title: '부가 정보',
        content: '이 항목도 선택적으로 열고 닫을 수 있습니다.'
      }
    ];

    return (
      <div className="w-96 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => index > 0 && setOpenItem(openItem === index ? 0 : index)}
              className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                index === 0 ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <span className="font-medium text-gray-900">{item.title}</span>
              {index === 0 ? (
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              ) : openItem === index ? (
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {(index === 0 || openItem === index) && (
              <div className="px-4 pb-3">
                <p className="text-gray-600">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}; 