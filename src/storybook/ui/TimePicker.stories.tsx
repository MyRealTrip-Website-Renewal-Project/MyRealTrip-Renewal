import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { ClockIcon } from 'lucide-react';

const meta: Meta<typeof Select> = {
  title: 'UI/TimePicker',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '시간을 선택할 수 있는 타임피커 컴포넌트입니다. 시간과 분을 개별적으로 선택할 수 있으며, 다양한 시간 형식을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '선택된 시간 값',
      control: 'text'
    },
    onValueChange: {
      description: '시간 선택 시 호출되는 콜백',
      action: 'time changed'
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean'
    },
    format: {
      description: '시간 형식',
      control: 'select',
      options: ['12h', '24h'],
      defaultValue: '24h'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 타임피커
export const Default: Story = {
  render: () => {
    const [hour, setHour] = useState<string>('09');
    const [minute, setMinute] = useState<string>('00');

    return (
      <div className="flex items-center space-x-2">
        <Select value={hour} onValueChange={setHour}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="시간" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => (
              <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-lg font-semibold">:</span>
        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="분" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }, (_, i) => (
              <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
};

// 12시간 형식 타임피커
export const TwelveHour: Story = {
  render: () => {
    const [hour, setHour] = useState<string>('09');
    const [minute, setMinute] = useState<string>('00');
    const [period, setPeriod] = useState<string>('AM');

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
      <div className="flex items-center space-x-2">
        <Select value={hour} onValueChange={setHour}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="시간" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((h) => (
              <SelectItem key={h} value={h.toString().padStart(2, '0')}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-lg font-semibold">:</span>
        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="분" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }, (_, i) => (
              <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }
};

// 버튼 스타일 타임피커
export const ButtonStyle: Story = {
  render: () => {
    const [hour, setHour] = useState<string>('14');
    const [minute, setMinute] = useState<string>('30');

    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="w-[100px] justify-between"
          onClick={() => {
            const currentHour = parseInt(hour);
            setHour(((currentHour + 1) % 24).toString().padStart(2, '0'));
          }}
        >
          <ClockIcon className="h-4 w-4" />
          {hour}
        </Button>
        <span className="text-lg font-semibold">:</span>
        <Button
          variant="outline"
          className="w-[100px] justify-between"
          onClick={() => {
            const currentMinute = parseInt(minute);
            setMinute(((currentMinute + 15) % 60).toString().padStart(2, '0'));
          }}
        >
          <ClockIcon className="h-4 w-4" />
          {minute}
        </Button>
      </div>
    );
  }
};

// 간격 설정 타임피커
export const WithInterval: Story = {
  render: () => {
    const [hour, setHour] = useState<string>('09');
    const [minute, setMinute] = useState<string>('00');

    // 30분 간격으로 설정
    const minuteIntervals = Array.from({ length: 24 }, (_, i) => i * 30);

    return (
      <div className="flex items-center space-x-2">
        <Select value={hour} onValueChange={setHour}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="시간" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => (
              <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-lg font-semibold">:</span>
        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="분" />
          </SelectTrigger>
          <SelectContent>
            {minuteIntervals.map((m) => (
              <SelectItem key={m} value={m.toString().padStart(2, '0')}>
                {m.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
};

// 비활성화된 타임피커
export const Disabled: Story = {
  render: () => {
    return (
      <div className="flex items-center space-x-2">
        <Select value="09" disabled>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="시간" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => (
              <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-lg font-semibold">:</span>
        <Select value="00" disabled>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="분" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }, (_, i) => (
              <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
};

// 현재 시간 표시 타임피커
export const CurrentTime: Story = {
  render: () => {
    const [hour, setHour] = useState<string>('09');
    const [minute, setMinute] = useState<string>('00');

    const setCurrentTime = () => {
      const now = new Date();
      setHour(now.getHours().toString().padStart(2, '0'));
      setMinute(now.getMinutes().toString().padStart(2, '0'));
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Select value={hour} onValueChange={setHour}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="시간" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => (
                <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                  {i.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-lg font-semibold">:</span>
          <Select value={minute} onValueChange={setMinute}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="분" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) => (
                <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                  {i.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={setCurrentTime} variant="outline" size="sm">
          현재 시간으로 설정
        </Button>
      </div>
    );
  }
}; 