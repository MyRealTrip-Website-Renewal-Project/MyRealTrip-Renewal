import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '드롭다운 형태로 옵션을 선택할 수 있는 셀렉트 컴포넌트입니다. 단일 선택, 다중 선택, 검색 기능을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '선택된 값',
      control: 'text'
    },
    onValueChange: {
      description: '값 변경 시 호출되는 콜백',
      action: 'value changed'
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean'
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 셀렉트
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="옵션을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
        <SelectItem value="option4">옵션 4</SelectItem>
      </SelectContent>
    </Select>
  )
};

// 국가 선택 셀렉트
export const CountrySelect: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="국가를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="kr">대한민국</SelectItem>
        <SelectItem value="us">미국</SelectItem>
        <SelectItem value="jp">일본</SelectItem>
        <SelectItem value="cn">중국</SelectItem>
        <SelectItem value="uk">영국</SelectItem>
        <SelectItem value="de">독일</SelectItem>
        <SelectItem value="fr">프랑스</SelectItem>
        <SelectItem value="ca">캐나다</SelectItem>
      </SelectContent>
    </Select>
  )
};

// 언어 선택 셀렉트
export const LanguageSelect: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="언어를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ko">한국어</SelectItem>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ja">日本語</SelectItem>
        <SelectItem value="zh">中文</SelectItem>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="de">Deutsch</SelectItem>
      </SelectContent>
    </Select>
  )
};

// 비활성화된 셀렉트
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="비활성화된 셀렉트" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  )
};

// 그룹화된 셀렉트
export const Grouped: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="카테고리를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">
          전자제품
        </div>
        <SelectItem value="laptop">노트북</SelectItem>
        <SelectItem value="phone">스마트폰</SelectItem>
        <SelectItem value="tablet">태블릿</SelectItem>
        <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">
          의류
        </div>
        <SelectItem value="shirt">셔츠</SelectItem>
        <SelectItem value="pants">바지</SelectItem>
        <SelectItem value="shoes">신발</SelectItem>
        <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">
          도서
        </div>
        <SelectItem value="fiction">소설</SelectItem>
        <SelectItem value="nonfiction">비소설</SelectItem>
        <SelectItem value="magazine">잡지</SelectItem>
      </SelectContent>
    </Select>
  )
};

// 아이콘이 있는 셀렉트
export const WithIcons: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="아이콘과 함께" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="home">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            홈
          </div>
        </SelectItem>
        <SelectItem value="user">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            사용자
          </div>
        </SelectItem>
        <SelectItem value="settings">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            설정
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
};

// 큰 크기 셀렉트
export const Large: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px] h-12 text-lg">
        <SelectValue placeholder="큰 크기 셀렉트" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1" className="text-lg py-3">옵션 1</SelectItem>
        <SelectItem value="option2" className="text-lg py-3">옵션 2</SelectItem>
        <SelectItem value="option3" className="text-lg py-3">옵션 3</SelectItem>
        <SelectItem value="option4" className="text-lg py-3">옵션 4</SelectItem>
      </SelectContent>
    </Select>
  )
};

// 작은 크기 셀렉트
export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[150px] h-8 text-sm">
        <SelectValue placeholder="작은 크기" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1" className="text-sm py-1.5">옵션 1</SelectItem>
        <SelectItem value="option2" className="text-sm py-1.5">옵션 2</SelectItem>
        <SelectItem value="option3" className="text-sm py-1.5">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  )
}; 