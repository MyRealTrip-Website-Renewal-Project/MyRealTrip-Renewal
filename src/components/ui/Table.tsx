import React, { useState, useCallback, useMemo } from 'react';
import styles from '@/styles/ui/Table.module.scss';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex: keyof T;
  width?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey?: keyof T | ((record: T, index: number) => string);
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'striped' | 'compact';
  selectable?: boolean;
  multiSelect?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: boolean;
  };
  loading?: boolean;
  emptyText?: string;
  onRowSelect?: (selectedKeys: string[], selectedRows: T[]) => void;
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, any>) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onRowClick?: (record: T, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export interface SortState {
  key: string;
  order: 'asc' | 'desc';
}

export interface FilterState {
  [key: string]: any;
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  rowKey = 'id',
  size = 'md',
  variant = 'default',
  selectable = false,
  multiSelect = false,
  sortable = false,
  filterable = false,
  pagination,
  loading = false,
  emptyText = '데이터가 없습니다',
  onRowSelect,
  onSort,
  onFilter,
  onPageChange,
  onRowClick,
  className = '',
  style,
  'aria-label': ariaLabel,
}: TableProps<T>) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [sortState, setSortState] = useState<SortState | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({});

  // 행 키 생성 함수
  const getRowKey = useCallback((record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record, index);
    }
    return String(record[rowKey]);
  }, [rowKey]);

  // 정렬된 데이터
  const sortedData = useMemo(() => {
    if (!sortState || !sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortState.key];
      const bValue = b[sortState.key];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortState.order === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState, sortable]);

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    if (!filterable || Object.keys(filterState).length === 0) return sortedData;

    return sortedData.filter(record => {
      return Object.entries(filterState).every(([key, value]) => {
        if (!value || value === '') return true;
        const recordValue = record[key];
        return String(recordValue).toLowerCase().includes(String(value).toLowerCase());
      });
    });
  }, [sortedData, filterState, filterable]);

  // 페이지네이션된 데이터
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;

    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, pagination]);

  // 정렬 처리
  const handleSort = useCallback((column: TableColumn<T>) => {
    if (!column.sortable || !sortable) return;

    const newOrder = sortState?.key === column.key && sortState.order === 'asc' ? 'desc' : 'asc';
    const newSortState = { key: column.key, order: newOrder };
    
    setSortState(newSortState);
    onSort?.(column.key, newOrder);
  }, [sortState, sortable, onSort]);

  // 필터 처리
  const handleFilter = useCallback((key: string, value: any) => {
    const newFilterState = { ...filterState, [key]: value };
    setFilterState(newFilterState);
    onFilter?.(newFilterState);
  }, [filterState, onFilter]);

  // 행 선택 처리
  const handleRowSelect = useCallback((key: string, checked: boolean) => {
    const newSelectedKeys = new Set(selectedKeys);
    
    if (checked) {
      if (!multiSelect) {
        newSelectedKeys.clear();
      }
      newSelectedKeys.add(key);
    } else {
      newSelectedKeys.delete(key);
    }
    
    setSelectedKeys(newSelectedKeys);
    
    const selectedRows = data.filter(record => newSelectedKeys.has(getRowKey(record, 0)));
    onRowSelect?.(Array.from(newSelectedKeys), selectedRows);
  }, [selectedKeys, multiSelect, data, getRowKey, onRowSelect]);

  // 전체 선택 처리
  const handleSelectAll = useCallback((checked: boolean) => {
    const newSelectedKeys = new Set<string>();
    
    if (checked) {
      paginatedData.forEach(record => {
        newSelectedKeys.add(getRowKey(record, 0));
      });
    }
    
    setSelectedKeys(newSelectedKeys);
    
    const selectedRows = data.filter(record => newSelectedKeys.has(getRowKey(record, 0)));
    onRowSelect?.(Array.from(newSelectedKeys), selectedRows);
  }, [paginatedData, data, getRowKey, onRowSelect]);

  // 페이지 변경 처리
  const handlePageChange = useCallback((page: number, pageSize: number) => {
    onPageChange?.(page, pageSize);
  }, [onPageChange]);

  // 행 클릭 처리
  const handleRowClick = useCallback((record: T, index: number) => {
    onRowClick?.(record, index);
  }, [onRowClick]);

  // 테이블 클래스
  const tableClasses = [
    styles.table,
    styles[`table--${size}`],
    styles[`table--${variant}`],
    className,
  ].filter(Boolean).join(' ');

  // 헤더 클래스
  const headerClasses = [
    styles.tableHeader,
    styles[`tableHeader--${size}`],
  ].filter(Boolean).join(' ');

  // 셀 클래스
  const getCellClasses = (column: TableColumn<T>) => [
    styles.tableCell,
    styles[`tableCell--${size}`],
    styles[`tableCell--${column.align || 'left'}`],
    column.fixed && styles[`tableCell--fixed-${column.fixed}`],
  ].filter(Boolean).join(' ');

  // 정렬 아이콘
  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable || !sortable) return null;
    
    if (sortState?.key === column.key) {
      return sortState.order === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  return (
    <div className={styles.tableContainer}>
      <table
        className={tableClasses}
        style={style}
        role="table"
        aria-label={ariaLabel || '데이터 테이블'}
      >
        <thead className={headerClasses}>
          <tr>
            {selectable && (
              <th className={styles.tableHeaderCell}>
                <input
                  type="checkbox"
                  checked={paginatedData.length > 0 && selectedKeys.size === paginatedData.length}
                  indeterminate={selectedKeys.size > 0 && selectedKeys.size < paginatedData.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="전체 선택"
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.key}
                className={styles.tableHeaderCell}
                style={{ width: column.width }}
                onClick={() => handleSort(column)}
              >
                <div className={styles.tableHeaderContent}>
                  <span className={styles.tableHeaderTitle}>
                    {column.title}
                  </span>
                  {getSortIcon(column) && (
                    <span className={styles.tableSortIcon}>
                      {getSortIcon(column)}
                    </span>
                  )}
                </div>
                {filterable && column.filterable && (
                  <input
                    type="text"
                    className={styles.tableFilter}
                    placeholder={`${column.title} 필터`}
                    value={filterState[column.key] || ''}
                    onChange={(e) => handleFilter(column.key, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className={styles.tableLoading}
              >
                로딩 중...
              </td>
            </tr>
          ) : paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className={styles.tableEmpty}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            paginatedData.map((record, index) => {
              const key = getRowKey(record, index);
              const isSelected = selectedKeys.has(key);
              
              return (
                <tr
                  key={key}
                  className={[
                    styles.tableRow,
                    isSelected && styles.tableRowSelected,
                    onRowClick && styles.tableRowClickable,
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleRowClick(record, index)}
                >
                  {selectable && (
                    <td className={styles.tableCell}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleRowSelect(key, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${key} 선택`}
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={getCellClasses(column)}
                      style={{ width: column.width }}
                    >
                      {column.render
                        ? column.render(record[column.dataIndex], record, index)
                        : record[column.dataIndex]
                      }
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      {pagination && (
        <div className={styles.tablePagination}>
          <div className={styles.tablePaginationInfo}>
            {pagination.showTotal && (
              <span>
                총 {pagination.total}개 항목 중 {(pagination.current - 1) * pagination.pageSize + 1}-
                {Math.min(pagination.current * pagination.pageSize, pagination.total)}개
              </span>
            )}
          </div>
          <div className={styles.tablePaginationControls}>
            <button
              type="button"
              className={styles.tablePaginationButton}
              disabled={pagination.current === 1}
              onClick={() => handlePageChange(pagination.current - 1, pagination.pageSize)}
            >
              이전
            </button>
            <span className={styles.tablePaginationCurrent}>
              {pagination.current} / {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <button
              type="button"
              className={styles.tablePaginationButton}
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              onClick={() => handlePageChange(pagination.current + 1, pagination.pageSize)}
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 