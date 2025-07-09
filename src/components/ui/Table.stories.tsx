import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { Badge } from './Badge';
import { Button } from './Button';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '테이블 컴포넌트입니다. 데이터를 표 형태로 표시하며 정렬, 필터링, 페이지네이션 기능을 제공합니다.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '테이블 크기'
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: '테이블 테마'
    },
    selectable: {
      control: 'boolean',
      description: '행 선택 가능 여부'
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', width: '100%', maxWidth: '1200px' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터
const sampleData = [
  {
    id: 1,
    name: '김철수',
    email: 'kim@example.com',
    role: '관리자',
    status: '활성',
    department: '개발팀',
    joinDate: '2023-01-15',
    salary: 5000000
  },
  {
    id: 2,
    name: '이영희',
    email: 'lee@example.com',
    role: '개발자',
    status: '활성',
    department: '개발팀',
    joinDate: '2023-03-20',
    salary: 4000000
  },
  {
    id: 3,
    name: '박민수',
    email: 'park@example.com',
    role: '디자이너',
    status: '비활성',
    department: '디자인팀',
    joinDate: '2023-02-10',
    salary: 3500000
  },
  {
    id: 4,
    name: '정수진',
    email: 'jung@example.com',
    role: '개발자',
    status: '활성',
    department: '개발팀',
    joinDate: '2023-04-05',
    salary: 4200000
  },
  {
    id: 5,
    name: '최동현',
    email: 'choi@example.com',
    role: '기획자',
    status: '활성',
    department: '기획팀',
    joinDate: '2023-01-30',
    salary: 3800000
  }
];

// 기본 컬럼 정의
const basicColumns = [
  {
    key: 'id',
    title: 'ID',
    width: 80,
    sortable: true
  },
  {
    key: 'name',
    title: '이름',
    sortable: true
  },
  {
    key: 'email',
    title: '이메일'
  },
  {
    key: 'role',
    title: '역할',
    sortable: true
  },
  {
    key: 'status',
    title: '상태',
    render: (value: string) => (
      <Badge type={value === '활성' ? 'green' : 'red'}>
        {value}
      </Badge>
    )
  },
  {
    key: 'department',
    title: '부서',
    sortable: true
  }
];

// 기본 테이블
export const Default: Story = {
  args: {
    data: sampleData,
    columns: basicColumns
  }
};

// 선택 가능한 테이블
export const Selectable: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    selectable: true
  }
};

// 액션이 있는 테이블
export const WithActions: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    actions: [
      {
        key: 'edit',
        label: '수정',
        type: 'primary',
        onClick: (record) => console.log('수정:', record)
      },
      {
        key: 'delete',
        label: '삭제',
        type: 'danger',
        onClick: (record) => console.log('삭제:', record)
      }
    ]
  }
};

// 필터가 있는 테이블
export const WithFilters: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    filters: [
      {
        key: 'department',
        label: '부서',
        type: 'select',
        options: [
          { value: '개발팀', label: '개발팀' },
          { value: '디자인팀', label: '디자인팀' },
          { value: '기획팀', label: '기획팀' }
        ],
        value: '',
        onChange: (value) => console.log('부서 필터:', value)
      },
      {
        key: 'status',
        label: '상태',
        type: 'select',
        options: [
          { value: '활성', label: '활성' },
          { value: '비활성', label: '비활성' }
        ],
        value: '',
        onChange: (value) => console.log('상태 필터:', value)
      }
    ]
  }
};

// 검색이 있는 테이블
export const WithSearch: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    onSearchChange: (term) => console.log('검색어:', term)
  }
};

// 페이지네이션이 있는 테이블
export const WithPagination: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    pagination: {
      current: 1,
      pageSize: 3,
      total: sampleData.length,
      onChange: (page, pageSize) => console.log('페이지 변경:', page, pageSize)
    }
  }
};

// 크기별 테이블
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Small Size</h3>
        <Table
          size="sm"
          data={sampleData.slice(0, 3)}
          columns={basicColumns}
        />
      </div>
      <div>
        <h3>Medium Size (Default)</h3>
        <Table
          data={sampleData.slice(0, 3)}
          columns={basicColumns}
        />
      </div>
      <div>
        <h3>Large Size</h3>
        <Table
          size="lg"
          data={sampleData.slice(0, 3)}
          columns={basicColumns}
        />
      </div>
    </div>
  )
};

// 테마별 테이블
export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Default Theme</h3>
        <Table
          data={sampleData.slice(0, 2)}
          columns={basicColumns}
        />
      </div>
      <div>
        <h3>Primary Theme</h3>
        <Table
          theme="primary"
          data={sampleData.slice(0, 2)}
          columns={basicColumns}
        />
      </div>
      <div>
        <h3>Success Theme</h3>
        <Table
          theme="success"
          data={sampleData.slice(0, 2)}
          columns={basicColumns}
        />
      </div>
      <div>
        <h3>Warning Theme</h3>
        <Table
          theme="warning"
          data={sampleData.slice(0, 2)}
          columns={basicColumns}
        />
      </div>
      <div>
        <h3>Error Theme</h3>
        <Table
          theme="error"
          data={sampleData.slice(0, 2)}
          columns={basicColumns}
        />
      </div>
    </div>
  )
};

// 복잡한 컬럼이 있는 테이블
export const ComplexColumns: Story = {
  args: {
    data: sampleData,
    columns: [
      {
        key: 'id',
        title: 'ID',
        width: 80,
        sortable: true
      },
      {
        key: 'name',
        title: '이름',
        sortable: true,
        render: (value, record) => (
          <div>
            <div style={{ fontWeight: 'bold' }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        )
      },
      {
        key: 'role',
        title: '역할',
        sortable: true,
        render: (value) => (
          <Badge type="blue">{value}</Badge>
        )
      },
      {
        key: 'department',
        title: '부서',
        sortable: true
      },
      {
        key: 'joinDate',
        title: '입사일',
        sortable: true,
        render: (value) => new Date(value).toLocaleDateString('ko-KR')
      },
      {
        key: 'salary',
        title: '급여',
        sortable: true,
        render: (value) => `${value.toLocaleString()}원`
      }
    ]
  }
};

// 로딩 상태 테이블
export const Loading: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: true
  }
};

// 빈 상태 테이블
export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    emptyText: '사용자 데이터가 없습니다. 새로운 사용자를 추가해보세요.'
  }
};

// 행 클릭 이벤트가 있는 테이블
export const WithRowClick: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    onRowClick: (record, index) => {
      alert(`선택된 행: ${record.name} (인덱스: ${index})`);
    }
  }
};

// 비활성화된 행이 있는 테이블
export const WithDisabledRows: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    rowDisabled: (record) => record.status === '비활성'
  }
};

// 모든 기능이 포함된 테이블
export const FullFeatured: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    selectable: true,
    actions: [
      {
        key: 'edit',
        label: '수정',
        type: 'primary',
        onClick: (record) => console.log('수정:', record)
      },
      {
        key: 'delete',
        label: '삭제',
        type: 'danger',
        onClick: (record) => console.log('삭제:', record)
      }
    ],
    filters: [
      {
        key: 'department',
        label: '부서',
        type: 'select',
        options: [
          { value: '개발팀', label: '개발팀' },
          { value: '디자인팀', label: '디자인팀' },
          { value: '기획팀', label: '기획팀' }
        ],
        value: '',
        onChange: (value) => console.log('부서 필터:', value)
      }
    ],
    onSearchChange: (term) => console.log('검색어:', term),
    pagination: {
      current: 1,
      pageSize: 3,
      total: sampleData.length,
      onChange: (page, pageSize) => console.log('페이지 변경:', page, pageSize)
    },
    onRowClick: (record) => console.log('행 클릭:', record)
  }
}; 