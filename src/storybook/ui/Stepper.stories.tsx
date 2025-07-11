import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const meta: Meta<any> = {
  title: 'UI/Stepper',
  component: 'div',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '단계별 진행 상황을 표시하는 스테퍼 컴포넌트입니다. 폼 작성, 온보딩, 결제 과정 등에 사용됩니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      description: '현재 단계',
      control: 'number',
      defaultValue: 1
    },
    totalSteps: {
      description: '전체 단계 수',
      control: 'number',
      defaultValue: 4
    },
    orientation: {
      description: '스테퍼 방향',
      control: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스테퍼
export const Default: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const steps = [
      { title: '정보 입력', description: '기본 정보를 입력하세요' },
      { title: '검증', description: '입력 정보를 확인하세요' },
      { title: '결제', description: '결제 정보를 입력하세요' },
      { title: '완료', description: '모든 과정이 완료되었습니다' }
    ];

    const nextStep = () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    };

    const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep > index + 1
                      ? 'bg-green-500 border-green-500 text-white'
                      : currentStep === index + 1
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}
                >
                  {currentStep > index + 1 ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 ${
                    currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
          >
            이전
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === totalSteps}
          >
            {currentStep === totalSteps ? '완료' : '다음'}
          </Button>
        </div>
      </div>
    );
  }
};

// 세로 스테퍼
export const Vertical: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const steps = [
      { title: '계정 생성', description: '기본 계정 정보를 입력하세요' },
      { title: '프로필 설정', description: '프로필 정보를 설정하세요' },
      { title: '권한 설정', description: '사용자 권한을 설정하세요' },
      { title: '완료', description: '계정 생성이 완료되었습니다' }
    ];

    return (
      <div className="flex space-x-8">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                  currentStep > index + 1
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === index + 1
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-l border-gray-200 pl-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">단계 {currentStep}</h3>
            <p className="text-gray-600">
              {steps[currentStep - 1]?.description}
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                variant="outline"
                size="sm"
              >
                이전
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                disabled={currentStep === totalSteps}
                size="sm"
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// 간단한 스테퍼
export const Simple: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(2);
    const totalSteps = 5;

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentStep > index + 1
                    ? 'bg-green-500 text-white'
                    : currentStep === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckIcon className="w-3 h-3" />
                ) : (
                  index + 1
                )}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`w-8 h-0.5 mx-1 ${
                    currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            단계 {currentStep} / {totalSteps}
          </p>
        </div>
      </div>
    );
  }
};

// 진행률 표시 스테퍼
export const WithProgress: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(2);
    const totalSteps = 4;

    const progress = (currentStep / totalSteps) * 100;

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">진행률</span>
            <span className="text-gray-900">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep > index + 1
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === index + 1
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className="text-xs text-gray-500 mt-1">단계 {index + 1}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            variant="outline"
          >
            이전
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            disabled={currentStep === totalSteps}
          >
            다음
          </Button>
        </div>
      </div>
    );
  }
};

// 에러 상태 스테퍼
export const WithError: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(2);
    const totalSteps = 4;
    const errorStep = 2; // 에러가 발생한 단계

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep > index + 1
                      ? 'bg-green-500 border-green-500 text-white'
                      : currentStep === index + 1 && index + 1 === errorStep
                      ? 'bg-red-500 border-red-500 text-white'
                      : currentStep === index + 1
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}
                >
                  {currentStep > index + 1 ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : currentStep === index + 1 && index + 1 === errorStep ? (
                    <span className="text-lg">!</span>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1">단계 {index + 1}</span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 ${
                    currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {currentStep === errorStep && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              단계 {errorStep}에서 오류가 발생했습니다. 다시 시도해주세요.
            </p>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            variant="outline"
          >
            이전
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            disabled={currentStep === totalSteps}
          >
            다음
          </Button>
        </div>
      </div>
    );
  }
}; 