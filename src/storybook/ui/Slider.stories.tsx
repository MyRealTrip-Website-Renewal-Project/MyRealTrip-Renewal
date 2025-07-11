import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from '@/components/ui/Slider';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '값을 선택할 수 있는 슬라이더 컴포넌트입니다. 단일 값, 범위 값, 다양한 스타일을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      description: '기본값',
      control: 'object'
    },
    value: {
      description: '현재 값 (제어 컴포넌트)',
      control: 'object'
    },
    onValueChange: {
      description: '값 변경 시 호출되는 콜백',
      action: 'value changed'
    },
    min: {
      description: '최소값',
      control: 'number',
      defaultValue: 0
    },
    max: {
      description: '최대값',
      control: 'number',
      defaultValue: 100
    },
    step: {
      description: '단계값',
      control: 'number',
      defaultValue: 1
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 슬라이더
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div className="space-y-4">
        <div className="w-80">
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">값: {value[0]}</p>
        </div>
      </div>
    );
  }
};

// 범위 슬라이더
export const Range: Story = {
  render: () => {
    const [value, setValue] = useState([20, 80]);

    return (
      <div className="space-y-4">
        <div className="w-80">
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            범위: {value[0]} - {value[1]}
          </p>
        </div>
      </div>
    );
  }
};

// 가격 범위 슬라이더
export const PriceRange: Story = {
  render: () => {
    const [value, setValue] = useState([10000, 50000]);

    return (
      <div className="space-y-4">
        <div className="w-80">
          <Slider
            value={value}
            onValueChange={setValue}
            min={0}
            max={100000}
            step={1000}
            className="w-full"
          />
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            가격 범위: ₩{value[0].toLocaleString()} - ₩{value[1].toLocaleString()}
          </p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>₩0</span>
            <span>₩100,000</span>
          </div>
        </div>
      </div>
    );
  }
};

// 볼륨 슬라이더
export const Volume: Story = {
  render: () => {
    const [value, setValue] = useState([70]);

    return (
      <div className="space-y-4">
        <div className="w-80">
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">볼륨: {value[0]}%</p>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    );
  }
};

// 비활성화된 슬라이더
export const Disabled: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="w-80">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            disabled
            className="w-full"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">비활성화된 슬라이더</p>
        </div>
      </div>
    );
  }
};

// 단계가 있는 슬라이더
export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState([3]);

    const steps = ['매우 낮음', '낮음', '보통', '높음', '매우 높음'];

    return (
      <div className="space-y-4">
        <div className="w-80">
          <Slider
            value={value}
            onValueChange={setValue}
            min={1}
            max={5}
            step={1}
            className="w-full"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            레벨: {steps[value[0] - 1]} ({value[0]}/5)
          </p>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      </div>
    );
  }
};

// 제어 컴포넌트 슬라이더
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([25]);

    const handleChange = (newValue: number[]) => {
      setValue(newValue);
      console.log('슬라이더 값 변경:', newValue);
    };

    return (
      <div className="space-y-4">
        <div className="w-80">
          <Slider
            value={value}
            onValueChange={handleChange}
            max={100}
            step={5}
            className="w-full"
          />
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">값: {value[0]}</p>
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setValue([Math.max(0, value[0] - 10)])}
              className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
            >
              -10
            </button>
            <button
              onClick={() => setValue([Math.min(100, value[0] + 10)])}
              className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
            >
              +10
            </button>
          </div>
        </div>
      </div>
    );
  }
};

// 커스텀 스타일 슬라이더
export const CustomStyle: Story = {
  render: () => {
    const [value, setValue] = useState([60]);

    return (
      <div className="space-y-4">
        <div className="w-80">
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="w-full [&>span]:bg-blue-500 [&>span]:h-3 [&>span]:rounded-full"
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">커스텀 스타일: {value[0]}%</p>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    );
  }
}; 