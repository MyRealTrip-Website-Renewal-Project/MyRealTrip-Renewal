import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/Calendar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '날짜를 선택하고 표시하는 캘린더 컴포넌트입니다. 단일 날짜, 범위, 다중 선택을 지원합니다.'
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

// 기본 캘린더
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            선택된 날짜: {date ? format(date, "PPP", { locale: ko }) : "없음"}
          </p>
        </div>
      </div>
    );
  }
};

// 범위 선택 캘린더
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
      <div className="space-y-4">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="rounded-md border"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">
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
              "날짜를 선택하세요"
            )}
          </p>
        </div>
      </div>
    );
  }
};

// 다중 선택 캘린더
export const Multiple: Story = {
  render: () => {
    const [date, setDate] = useState<Date[]>();

    return (
      <div className="space-y-4">
        <Calendar
          mode="multiple"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            선택된 날짜: {date ? `${date.length}개` : "없음"}
          </p>
          {date && date.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              {date.map((d, i) => (
                <span key={i} className="mr-2">
                  {format(d, "MM/dd")}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
};

// 비활성화된 날짜가 있는 캘린더
export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    // 오늘부터 7일 전까지 비활성화
    const disabledDates = {
      before: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      after: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후까지
    };

    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDates}
          className="rounded-md border"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            선택된 날짜: {date ? format(date, "PPP", { locale: ko }) : "없음"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            과거 날짜와 30일 이후 날짜는 선택할 수 없습니다
          </p>
        </div>
      </div>
    );
  }
};

// 이벤트가 있는 캘린더
export const WithEvents: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    // 샘플 이벤트 데이터
    const events = [
      { date: new Date(2024, 2, 15), title: "회의" },
      { date: new Date(2024, 2, 20), title: "생일" },
      { date: new Date(2024, 2, 25), title: "약속" },
    ];

    const isEventDate = (date: Date) => {
      return events.some(event => 
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      );
    };

    const getEventTitle = (date: Date) => {
      const event = events.find(event => 
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      );
      return event?.title;
    };

    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            Day: ({ date: dayDate, ...props }) => {
              const hasEvent = isEventDate(dayDate);
              return (
                <div
                  {...props}
                  className={`relative ${hasEvent ? 'bg-blue-50' : ''}`}
                  title={hasEvent ? getEventTitle(dayDate) : undefined}
                >
                  {dayDate.getDate()}
                  {hasEvent && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                  )}
                </div>
              );
            }
          }}
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            선택된 날짜: {date ? format(date, "PPP", { locale: ko }) : "없음"}
          </p>
          {date && isEventDate(date) && (
            <p className="text-sm text-blue-600 mt-1">
              이벤트: {getEventTitle(date)}
            </p>
          )}
        </div>
      </div>
    );
  }
};

// 인라인 캘린더
export const Inline: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <div className="border rounded-lg p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
        />
      </div>
    );
  }
};

// 작은 크기 캘린더
export const Small: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border scale-75 origin-top"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            선택된 날짜: {date ? format(date, "PPP", { locale: ko }) : "없음"}
          </p>
        </div>
      </div>
    );
  }
};

// 주말만 선택 가능한 캘린더
export const WeekendsOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    const isWeekend = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // 일요일(0) 또는 토요일(6)
    };

    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => !isWeekend(date)}
          className="rounded-md border"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            선택된 날짜: {date ? format(date, "PPP", { locale: ko }) : "없음"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            주말만 선택 가능합니다
          </p>
        </div>
      </div>
    );
  }
}; 