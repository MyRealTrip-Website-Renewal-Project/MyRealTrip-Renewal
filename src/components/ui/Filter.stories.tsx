import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FiSearch, FiFilter, FiCalendar, FiDollarSign, FiStar, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';
import Filter from './Filter';

const meta: Meta<typeof Filter> = {
  title: 'UI/Filter',
  component: Filter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '다양한 필터 타입을 지원하는 고급 필터 컴포넌트입니다. 체크박스, 라디오, 범위, 슬라이더, 날짜 범위, 검색 등을 지원합니다.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: '필터 제목'
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태'
    },
    defaultExpanded: {
      control: 'boolean',
      description: '기본 확장 상태'
    },
    showCount: {
      control: 'boolean',
      description: '옵션 개수 표시 여부'
    },
    onApply: {
      action: 'applied',
      description: '적용 버튼 클릭 시 호출'
    },
    onClear: {
      action: 'cleared',
      description: '초기화 버튼 클릭 시 호출'
    },
    onChange: {
      action: 'changed',
      description: '값 변경 시 호출'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Filter>;

// 기본 필터
export const Default: Story = {
  args: {
    title: '필터',
    sections: [
      {
        id: 'category',
        title: '카테고리',
        type: 'checkbox',
        icon: <FiFilter />,
        options: [
          { id: 'hotel', label: '호텔', value: 'hotel', count: 125 },
          { id: 'flight', label: '항공', value: 'flight', count: 89 },
          { id: 'tour', label: '투어', value: 'tour', count: 67 },
          { id: 'restaurant', label: '레스토랑', value: 'restaurant', count: 234 }
        ]
      },
      {
        id: 'rating',
        title: '평점',
        type: 'radio',
        icon: <FiStar />,
        options: [
          { id: '5', label: '5점', value: '5', count: 45 },
          { id: '4', label: '4점 이상', value: '4', count: 123 },
          { id: '3', label: '3점 이상', value: '3', count: 256 },
          { id: '2', label: '2점 이상', value: '2', count: 389 }
        ]
      }
    ]
  }
};

// 가격 범위 필터
export const PriceRange: Story = {
  args: {
    title: '가격 필터',
    sections: [
      {
        id: 'price',
        title: '가격 범위',
        type: 'range',
        icon: <FiDollarSign />,
        min: 0,
        max: 1000000,
        step: 10000,
        placeholder: '가격을 입력하세요',
        validation: {
          min: 0,
          max: 1000000,
          message: '가격은 0원에서 1,000,000원 사이여야 합니다.'
        }
      },
      {
        id: 'price-slider',
        title: '가격 슬라이더',
        type: 'slider',
        icon: <FiDollarSign />,
        min: 0,
        max: 500000,
        step: 10000
      }
    ]
  }
};

// 날짜 범위 필터
export const DateRange: Story = {
  args: {
    title: '날짜 필터',
    sections: [
      {
        id: 'date-range',
        title: '여행 기간',
        type: 'date-range',
        icon: <FiCalendar />,
        required: true
      },
      {
        id: 'search',
        title: '목적지 검색',
        type: 'search',
        icon: <FiMapPin />,
        placeholder: '도시나 국가를 검색하세요'
      }
    ]
  }
};

// 복합 필터
export const ComplexFilter: Story = {
  args: {
    title: '상세 필터',
    defaultExpanded: true,
    sections: [
      {
        id: 'location',
        title: '지역',
        type: 'checkbox',
        icon: <FiMapPin />,
        options: [
          { id: 'seoul', label: '서울', value: 'seoul', count: 89 },
          { id: 'busan', label: '부산', value: 'busan', count: 67 },
          { id: 'jeju', label: '제주', value: 'jeju', count: 45 },
          { id: 'tokyo', label: '도쿄', value: 'tokyo', count: 123 },
          { id: 'bangkok', label: '방콕', value: 'bangkok', count: 78 }
        ]
      },
      {
        id: 'price-range',
        title: '가격 범위',
        type: 'range',
        icon: <FiDollarSign />,
        min: 0,
        max: 1000000,
        step: 10000
      },
      {
        id: 'rating',
        title: '평점',
        type: 'radio',
        icon: <FiStar />,
        options: [
          { id: '5', label: '5점', value: '5', count: 23 },
          { id: '4', label: '4점 이상', value: '4', count: 67 },
          { id: '3', label: '3점 이상', value: '3', count: 134 },
          { id: '2', label: '2점 이상', value: '2', count: 256 }
        ]
      },
      {
        id: 'duration',
        title: '여행 기간',
        type: 'slider',
        icon: <FiClock />,
        min: 1,
        max: 30,
        step: 1
      },
      {
        id: 'travelers',
        title: '여행자 수',
        type: 'radio',
        icon: <FiUsers />,
        options: [
          { id: '1', label: '1명', value: '1', count: 45 },
          { id: '2', label: '2명', value: '2', count: 89 },
          { id: '3-4', label: '3-4명', value: '3-4', count: 67 },
          { id: '5+', label: '5명 이상', value: '5+', count: 34 }
        ]
      }
    ]
  }
};

// 로딩 상태
export const Loading: Story = {
  args: {
    title: '필터',
    loading: true,
    sections: []
  }
};

// 에러 상태
export const WithError: Story = {
  args: {
    title: '필터',
    error: '필터를 불러오는 중 오류가 발생했습니다.',
    sections: [
      {
        id: 'category',
        title: '카테고리',
        type: 'checkbox',
        options: [
          { id: 'hotel', label: '호텔', value: 'hotel', count: 125 },
          { id: 'flight', label: '항공', value: 'flight', count: 89 }
        ]
      }
    ]
  }
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    title: '필터',
    disabled: true,
    sections: [
      {
        id: 'category',
        title: '카테고리',
        type: 'checkbox',
        options: [
          { id: 'hotel', label: '호텔', value: 'hotel', count: 125 },
          { id: 'flight', label: '항공', value: 'flight', count: 89 }
        ]
      }
    ]
  }
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [filterValue, setFilterValue] = useState({});
    const [appliedValue, setAppliedValue] = useState({});

    const sections = [
      {
        id: 'category',
        title: '카테고리',
        type: 'checkbox' as const,
        icon: <FiFilter />,
        options: [
          { id: 'hotel', label: '호텔', value: 'hotel', count: 125 },
          { id: 'flight', label: '항공', value: 'flight', count: 89 },
          { id: 'tour', label: '투어', value: 'tour', count: 67 }
        ]
      },
      {
        id: 'price',
        title: '가격 범위',
        type: 'range' as const,
        icon: <FiDollarSign />,
        min: 0,
        max: 1000000,
        step: 10000
      },
      {
        id: 'rating',
        title: '평점',
        type: 'radio' as const,
        icon: <FiStar />,
        options: [
          { id: '5', label: '5점', value: '5', count: 45 },
          { id: '4', label: '4점 이상', value: '4', count: 123 },
          { id: '3', label: '3점 이상', value: '3', count: 256 }
        ]
      }
    ];

    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <Filter
            title="인터랙티브 필터"
            sections={sections}
            value={filterValue}
            onChange={setFilterValue}
            onApply={setAppliedValue}
            defaultExpanded={true}
          />
        </div>
        <div style={{ flex: 1, padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>현재 선택된 값:</h3>
          <pre style={{ background: 'white', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(filterValue, null, 2)}
          </pre>
          
          <h3 style={{ marginTop: '20px' }}>적용된 값:</h3>
          <pre style={{ background: 'white', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(appliedValue, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
};

// 호텔 검색 필터
export const HotelSearch: Story = {
  args: {
    title: '호텔 검색 필터',
    defaultExpanded: true,
    sections: [
      {
        id: 'location',
        title: '지역',
        type: 'search',
        icon: <FiMapPin />,
        placeholder: '도시, 지역, 호텔명을 검색하세요'
      },
      {
        id: 'price',
        title: '가격 범위',
        type: 'range',
        icon: <FiDollarSign />,
        min: 0,
        max: 500000,
        step: 10000
      },
      {
        id: 'rating',
        title: '호텔 등급',
        type: 'checkbox',
        icon: <FiStar />,
        options: [
          { id: '5', label: '5성급', value: '5', count: 23 },
          { id: '4', label: '4성급', value: '4', count: 67 },
          { id: '3', label: '3성급', value: '3', count: 134 },
          { id: '2', label: '2성급', value: '2', count: 89 }
        ]
      },
      {
        id: 'amenities',
        title: '편의시설',
        type: 'checkbox',
        icon: <FiFilter />,
        options: [
          { id: 'wifi', label: '무료 Wi-Fi', value: 'wifi', count: 234 },
          { id: 'parking', label: '주차장', value: 'parking', count: 189 },
          { id: 'pool', label: '수영장', value: 'pool', count: 67 },
          { id: 'gym', label: '피트니스', value: 'gym', count: 89 },
          { id: 'restaurant', label: '레스토랑', value: 'restaurant', count: 156 }
        ]
      },
      {
        id: 'check-in',
        title: '체크인 날짜',
        type: 'date-range',
        icon: <FiCalendar />,
        required: true
      }
    ]
  }
};

// 항공편 검색 필터
export const FlightSearch: Story = {
  args: {
    title: '항공편 검색 필터',
    defaultExpanded: true,
    sections: [
      {
        id: 'departure',
        title: '출발지',
        type: 'search',
        icon: <FiMapPin />,
        placeholder: '출발 공항을 검색하세요'
      },
      {
        id: 'arrival',
        title: '도착지',
        type: 'search',
        icon: <FiMapPin />,
        placeholder: '도착 공항을 검색하세요'
      },
      {
        id: 'date',
        title: '여행 날짜',
        type: 'date-range',
        icon: <FiCalendar />,
        required: true
      },
      {
        id: 'airline',
        title: '항공사',
        type: 'checkbox',
        icon: <FiFilter />,
        options: [
          { id: 'korean', label: '대한항공', value: 'korean', count: 45 },
          { id: 'asiana', label: '아시아나항공', value: 'asiana', count: 38 },
          { id: 'jeju', label: '제주항공', value: 'jeju', count: 67 },
          { id: 'jin', label: '진에어', value: 'jin', count: 89 },
          { id: 'tway', label: '티웨이항공', value: 'tway', count: 56 }
        ]
      },
      {
        id: 'price',
        title: '가격 범위',
        type: 'slider',
        icon: <FiDollarSign />,
        min: 0,
        max: 1000000,
        step: 10000
      },
      {
        id: 'stops',
        title: '경유',
        type: 'radio',
        icon: <FiClock />,
        options: [
          { id: 'direct', label: '직항', value: 'direct', count: 23 },
          { id: 'one-stop', label: '1회 경유', value: 'one-stop', count: 45 },
          { id: 'any', label: '경유 상관없음', value: 'any', count: 89 }
        ]
      }
    ]
  }
}; 