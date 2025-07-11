import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table, TableColumn } from '../../components/ui/Table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  department: string;
}

const sampleData: User[] = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    role: '관리자',
    status: 'active',
    department: 'IT',
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee@example.com',
    role: '사용자',
    status: 'active',
    department: '마케팅',
  },
  {
    id: '3',
    name: '박민수',
    email: 'park@example.com',
    role: '관리자',
    status: 'inactive',
    department: 'IT',
  },
];

const columns: TableColumn<User>[] = [
  {
    key: 'name',
    title: '이름',
    dataIndex: 'name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'email',
    title: '이메일',
    dataIndex: 'email',
    sortable: true,
    filterable: true,
  },
  {
    key: 'role',
    title: '역할',
    dataIndex: 'role',
    sortable: true,
    filterable: true,
  },
  {
    key: 'status',
    title: '상태',
    dataIndex: 'status',
    sortable: true,
    filterable: true,
    render: (value) => (
      <span data-testid={`status-${value}`}>
        {value === 'active' ? '활성' : '비활성'}
      </span>
    ),
  },
  {
    key: 'department',
    title: '부서',
    dataIndex: 'department',
    sortable: true,
    filterable: true,
  },
];

describe('Table', () => {
  it('기본 렌더링이 올바르게 작동한다', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByText('이메일')).toBeInTheDocument();
    expect(screen.getByText('김철수')).toBeInTheDocument();
    expect(screen.getByText('이영희')).toBeInTheDocument();
  });

  it('커스텀 렌더 함수가 올바르게 작동한다', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    expect(screen.getByTestId('status-active')).toBeInTheDocument();
    expect(screen.getByTestId('status-inactive')).toBeInTheDocument();
    expect(screen.getByText('활성')).toBeInTheDocument();
    expect(screen.getByText('비활성')).toBeInTheDocument();
  });

  it('정렬이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onSort = jest.fn();
    
    render(<Table data={sampleData} columns={columns} sortable={true} onSort={onSort} />);
    
    // 이름 컬럼 헤더 클릭
    const nameHeader = screen.getByText('이름');
    await user.click(nameHeader);
    
    expect(onSort).toHaveBeenCalledWith('name', 'asc');
    
    // 다시 클릭하여 내림차순 정렬
    await user.click(nameHeader);
    expect(onSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('필터링이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onFilter = jest.fn();
    
    render(<Table data={sampleData} columns={columns} filterable={true} onFilter={onFilter} />);
    
    // 이름 필터 입력
    const nameFilter = screen.getByPlaceholderText('이름 필터');
    await user.type(nameFilter, '김');
    
    expect(onFilter).toHaveBeenCalledWith({ name: '김' });
  });

  it('행 선택이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onRowSelect = jest.fn();
    
    render(
      <Table 
        data={sampleData} 
        columns={columns} 
        selectable={true} 
        multiSelect={true} 
        onRowSelect={onRowSelect} 
      />
    );
    
    // 첫 번째 행 선택
    const firstCheckbox = screen.getAllByRole('checkbox')[1]; // 전체 선택 체크박스 다음
    await user.click(firstCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith(['1'], [sampleData[0]]);
    
    // 두 번째 행 선택 (다중 선택)
    const secondCheckbox = screen.getAllByRole('checkbox')[2];
    await user.click(secondCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith(['1', '2'], [sampleData[0], sampleData[1]]);
  });

  it('단일 선택이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onRowSelect = jest.fn();
    
    render(
      <Table 
        data={sampleData} 
        columns={columns} 
        selectable={true} 
        multiSelect={false} 
        onRowSelect={onRowSelect} 
      />
    );
    
    // 첫 번째 행 선택
    const firstCheckbox = screen.getAllByRole('checkbox')[1];
    await user.click(firstCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith(['1'], [sampleData[0]]);
    
    // 두 번째 행 선택 (단일 선택이므로 첫 번째는 해제)
    const secondCheckbox = screen.getAllByRole('checkbox')[2];
    await user.click(secondCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith(['2'], [sampleData[1]]);
  });

  it('전체 선택이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onRowSelect = jest.fn();
    
    render(
      <Table 
        data={sampleData} 
        columns={columns} 
        selectable={true} 
        multiSelect={true} 
        onRowSelect={onRowSelect} 
      />
    );
    
    // 전체 선택 체크박스 클릭
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    await user.click(selectAllCheckbox);
    
    expect(onRowSelect).toHaveBeenCalledWith(['1', '2', '3'], sampleData);
  });

  it('페이지네이션이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    
    const pagination = {
      current: 1,
      pageSize: 2,
      total: sampleData.length,
      showTotal: true,
    };
    
    render(
      <Table 
        data={sampleData} 
        columns={columns} 
        pagination={pagination}
        onPageChange={onPageChange} 
      />
    );
    
    // 다음 페이지 버튼 클릭
    const nextButton = screen.getByText('다음');
    await user.click(nextButton);
    
    expect(onPageChange).toHaveBeenCalledWith(2, 2);
  });

  it('행 클릭이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onRowClick = jest.fn();
    
    render(<Table data={sampleData} columns={columns} onRowClick={onRowClick} />);
    
    // 첫 번째 행 클릭
    const firstRow = screen.getByText('김철수').closest('tr');
    await user.click(firstRow!);
    
    expect(onRowClick).toHaveBeenCalledWith(sampleData[0], 0);
  });

  it('로딩 상태가 올바르게 표시된다', () => {
    render(<Table data={[]} columns={columns} loading={true} />);
    
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });

  it('빈 데이터 상태가 올바르게 표시된다', () => {
    render(<Table data={[]} columns={columns} emptyText="데이터가 없습니다" />);
    
    expect(screen.getByText('데이터가 없습니다')).toBeInTheDocument();
  });

  it('다양한 크기로 렌더링된다', () => {
    const { rerender } = render(<Table data={sampleData} columns={columns} size="sm" />);
    expect(screen.getByRole('table')).toHaveClass('table--sm');
    
    rerender(<Table data={sampleData} columns={columns} size="md" />);
    expect(screen.getByRole('table')).toHaveClass('table--md');
    
    rerender(<Table data={sampleData} columns={columns} size="lg" />);
    expect(screen.getByRole('table')).toHaveClass('table--lg');
  });

  it('다양한 변형으로 렌더링된다', () => {
    const { rerender } = render(<Table data={sampleData} columns={columns} variant="default" />);
    expect(screen.getByRole('table')).toHaveClass('table--default');
    
    rerender(<Table data={sampleData} columns={columns} variant="bordered" />);
    expect(screen.getByRole('table')).toHaveClass('table--bordered');
    
    rerender(<Table data={sampleData} columns={columns} variant="striped" />);
    expect(screen.getByRole('table')).toHaveClass('table--striped');
    
    rerender(<Table data={sampleData} columns={columns} variant="compact" />);
    expect(screen.getByRole('table')).toHaveClass('table--compact');
  });

  it('커스텀 rowKey가 올바르게 작동한다', () => {
    const customRowKey = (record: User) => `user-${record.id}`;
    
    render(<Table data={sampleData} columns={columns} rowKey={customRowKey} />);
    
    // 기본 렌더링이 정상적으로 작동하는지 확인
    expect(screen.getByText('김철수')).toBeInTheDocument();
    expect(screen.getByText('이영희')).toBeInTheDocument();
  });

  it('정렬 불가능한 컬럼은 정렬 아이콘이 표시되지 않는다', () => {
    const nonSortableColumns: TableColumn<User>[] = [
      {
        key: 'name',
        title: '이름',
        dataIndex: 'name',
        sortable: false,
      },
      {
        key: 'email',
        title: '이메일',
        dataIndex: 'email',
        sortable: false,
      },
    ];
    
    render(<Table data={sampleData} columns={nonSortableColumns} sortable={true} />);
    
    // 정렬 아이콘이 표시되지 않아야 함
    expect(screen.queryByText('↕')).not.toBeInTheDocument();
  });

  it('필터링 불가능한 컬럼은 필터 입력이 표시되지 않는다', () => {
    const nonFilterableColumns: TableColumn<User>[] = [
      {
        key: 'name',
        title: '이름',
        dataIndex: 'name',
        filterable: false,
      },
      {
        key: 'email',
        title: '이메일',
        dataIndex: 'email',
        filterable: false,
      },
    ];
    
    render(<Table data={sampleData} columns={nonFilterableColumns} filterable={true} />);
    
    // 필터 입력이 표시되지 않아야 함
    expect(screen.queryByPlaceholderText('이름 필터')).not.toBeInTheDocument();
  });

  it('선택 불가능한 테이블에서 체크박스가 표시되지 않는다', () => {
    render(<Table data={sampleData} columns={columns} selectable={false} />);
    
    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes).toHaveLength(0);
  });

  it('접근성 속성이 올바르게 설정된다', () => {
    render(<Table data={sampleData} columns={columns} aria-label="사용자 목록" />);
    
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('aria-label', '사용자 목록');
  });

  it('키보드 네비게이션이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onRowClick = jest.fn();
    
    render(<Table data={sampleData} columns={columns} onRowClick={onRowClick} />);
    
    const firstRow = screen.getByText('김철수').closest('tr');
    firstRow!.focus();
    
    // Enter 키로 행 클릭
    await user.keyboard('{Enter}');
    expect(onRowClick).toHaveBeenCalledWith(sampleData[0], 0);
  });

  it('정렬 상태가 올바르게 표시된다', async () => {
    const user = userEvent.setup();
    
    render(<Table data={sampleData} columns={columns} sortable={true} />);
    
    const nameHeader = screen.getByText('이름');
    await user.click(nameHeader);
    
    // 정렬 아이콘이 변경되어야 함
    expect(screen.getByText('↑')).toBeInTheDocument();
    
    await user.click(nameHeader);
    expect(screen.getByText('↓')).toBeInTheDocument();
  });

  it('페이지네이션 정보가 올바르게 표시된다', () => {
    const pagination = {
      current: 1,
      pageSize: 2,
      total: sampleData.length,
      showTotal: true,
    };
    
    render(<Table data={sampleData} columns={columns} pagination={pagination} />);
    
    expect(screen.getByText(/총 3개 항목 중 1-2개/)).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('페이지네이션 버튼이 올바르게 비활성화된다', () => {
    const pagination = {
      current: 1,
      pageSize: 10,
      total: sampleData.length,
    };
    
    render(<Table data={sampleData} columns={columns} pagination={pagination} />);
    
    const prevButton = screen.getByText('이전');
    expect(prevButton).toBeDisabled();
  });
}); 