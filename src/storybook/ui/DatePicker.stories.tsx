import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const meta: Meta<typeof Calendar> = {
  title: 'UI/DatePicker',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '날짜를 선택할 수 있는 데이트피커 컴포넌트입니다. 팝오버 형태로 캘린더를 표시하며, 다양한 날짜 형식을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: '날짜 선택 모드',
      control: 'select',
      options: ['single', 'range', 'multiple'],
      defaultValue: 'single'
    },
    selected: {
      description: '선택된 날짜',
      control: 'date'
    },
    onSelect: {
      description: '날짜 선택 시 호출되는 콜백',
      action: 'date selected'
    },
    disabled: {
      description: '비활성화된 날짜들',
      control: 'object'
    },
    locale: {
      description: '로케일 설정',
      control: 'select',
      options: ['ko', 'en'],
      defaultValue: 'ko'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 데이트피커
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: ko }) : "날짜를 선택하세요"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
};

// 범위 선택 데이트피커
export const Range: Story = {
  render: () => {
    const [date, setDate] = useState<{
      from: Date;
      to: Date | undefined;
    }>({
      from: new Date(),
      to: undefined,
    });

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: ko })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: ko })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: ko })
              )
            ) : (
              "날짜 범위를 선택하세요"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    );
  }
};

// 다중 선택 데이트피커
export const Multiple: Story = {
  render: () => {
    const [date, setDate] = useState<Date[]>();

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              `${date.length}개 날짜 선택됨`
            ) : (
              "날짜들을 선택하세요"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="multiple"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
};

// 비활성화된 날짜가 있는 데이트피커
export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    // 오늘부터 7일 전까지 비활성화
    const disabledDates = {
      before: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      after: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후까지
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: ko }) : "날짜를 선택하세요"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={disabledDates}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
};

// 인라인 데이트피커
export const Inline: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <div className="border rounded-lg p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    );
  }
};

// 커스텀 포맷 데이트피커
export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "yyyy년 MM월 dd일 (EEEE)", { locale: ko })
            ) : (
              "날짜를 선택하세요"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
};

// 작은 크기 데이트피커
export const Small: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[200px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-3 w-3" />
            {date ? format(date, "PP", { locale: ko }) : "날짜 선택"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
}; 