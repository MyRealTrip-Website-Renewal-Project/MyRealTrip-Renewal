import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon, ClockIcon, AlertCircleIcon, StarIcon } from 'lucide-react';

const meta: Meta<any> = {
  title: 'UI/Timeline',
  component: 'div',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '시간 순서대로 이벤트나 활동을 표시하는 타임라인 컴포넌트입니다. 진행 상태, 아이콘, 설명을 포함할 수 있습니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      description: '타임라인 방향',
      control: 'select',
      options: ['vertical', 'horizontal'],
      defaultValue: 'vertical'
    },
    size: {
      description: '타임라인 크기',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 타임라인
export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <CheckIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">주문 접수</h3>
            <p className="text-sm text-gray-500">2024년 3월 15일 14:30</p>
            <p className="text-sm text-gray-600 mt-1">
              주문이 성공적으로 접수되었습니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">결제 완료</h3>
            <p className="text-sm text-gray-500">2024년 3월 15일 14:35</p>
            <p className="text-sm text-gray-600 mt-1">
              결제가 완료되었습니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <ClockIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">배송 준비 중</h3>
            <p className="text-sm text-gray-500">2024년 3월 16일 09:00</p>
            <p className="text-sm text-gray-600 mt-1">
              상품이 배송 준비 중입니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <ClockIcon className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-400">배송 완료</h3>
            <p className="text-sm text-gray-400">예상: 2024년 3월 18일</p>
            <p className="text-sm text-gray-400 mt-1">
              상품이 배송될 예정입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

// 프로젝트 타임라인
export const ProjectTimeline: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">프로젝트 시작</h3>
            <p className="text-sm text-gray-500">2024년 1월 15일</p>
            <p className="text-sm text-gray-600 mt-1">
              새로운 웹 애플리케이션 개발 프로젝트가 시작되었습니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">요구사항 분석 완료</h3>
            <p className="text-sm text-gray-500">2024년 1월 30일</p>
            <p className="text-sm text-gray-600 mt-1">
              사용자 요구사항 분석 및 기능 명세서 작성이 완료되었습니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <ClockIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">개발 진행 중</h3>
            <p className="text-sm text-gray-500">2024년 2월 15일 - 현재</p>
            <p className="text-sm text-gray-600 mt-1">
              프론트엔드 및 백엔드 개발이 진행 중입니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <ClockIcon className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-400">테스트 단계</h3>
            <p className="text-sm text-gray-400">예상: 2024년 3월 15일</p>
            <p className="text-sm text-gray-400 mt-1">
              통합 테스트 및 사용자 테스트가 예정되어 있습니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <StarIcon className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-400">배포</h3>
            <p className="text-sm text-gray-400">예상: 2024년 4월 1일</p>
            <p className="text-sm text-gray-400 mt-1">
              프로덕션 환경에 배포될 예정입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

// 상태별 타임라인
export const StatusTimeline: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">완료됨</h3>
            <p className="text-sm text-gray-500">2024년 3월 10일</p>
            <p className="text-sm text-gray-600 mt-1">
              작업이 성공적으로 완료되었습니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <ClockIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">진행 중</h3>
            <p className="text-sm text-gray-500">2024년 3월 15일</p>
            <p className="text-sm text-gray-600 mt-1">
              현재 작업이 진행 중입니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <AlertCircleIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">대기 중</h3>
            <p className="text-sm text-gray-500">2024년 3월 20일</p>
            <p className="text-sm text-gray-600 mt-1">
              외부 의존성으로 인해 대기 중입니다.
            </p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4">
          <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <AlertCircleIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">오류</h3>
            <p className="text-sm text-gray-500">2024년 3월 25일</p>
            <p className="text-sm text-gray-600 mt-1">
              문제가 발생하여 조치가 필요합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

// 간단한 타임라인
export const Simple: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="relative flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full"></div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">첫 번째 단계</h3>
            <p className="text-xs text-gray-500">2024년 3월 15일</p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full"></div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900">두 번째 단계</h3>
            <p className="text-xs text-gray-500">2024년 3월 16일</p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-400">세 번째 단계</h3>
            <p className="text-xs text-gray-400">2024년 3월 17일</p>
          </div>
        </div>

        <div className="relative flex items-start space-x-4">
          <div className="flex-shrink-0 w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-400">네 번째 단계</h3>
            <p className="text-xs text-gray-400">2024년 3월 18일</p>
          </div>
        </div>
      </div>
    </div>
  )
};

// 가로 타임라인
export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
        
        <div className="relative flex justify-between">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-medium text-gray-900 text-center">시작</h3>
            <p className="text-xs text-gray-500 text-center">1월</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-medium text-gray-900 text-center">진행</h3>
            <p className="text-xs text-gray-500 text-center">2월</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
              <ClockIcon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-medium text-gray-900 text-center">검토</h3>
            <p className="text-xs text-gray-500 text-center">3월</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
              <StarIcon className="w-4 h-4 text-gray-500" />
            </div>
            <h3 className="text-xs font-medium text-gray-400 text-center">완료</h3>
            <p className="text-xs text-gray-400 text-center">4월</p>
          </div>
        </div>
      </div>
    </div>
  )
}; 