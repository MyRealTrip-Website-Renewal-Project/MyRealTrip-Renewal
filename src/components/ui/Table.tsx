import React, { useState, useMemo, ReactNode } from 'react';
import styles from './Table.module.scss';

export interface TableColumn<T = any> {
  /** 컬럼 키 */
  key: string;
  /** 컬럼 제목 */
  title: string;
  /** 데이터 접근자 */
  dataIndex?: string;
  /** 정렬 가능 여부 */
  sortable?: boolean;
  /** 컬럼 너비 */
  width?: string | number;
  /** 커스텀 렌더러 */
  render?: (value: any, record: T, index: number) => ReactNode;
  /** 정렬 함수 */
  sorter?: (a: T, b: T) => number;
}

export interface TableAction<T = any> {
  /** 액션 키 */
  key: string;
  /** 액션 라벨 */
  label: string;
  /** 액션 타입 */
  type?: 'primary' | 'danger' | 'default';
  /** 액션 아이콘 */
  icon?: ReactNode;
  /** 액션 핸들러 */
  onClick: (record: T, index: number) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface TableFilter {
  /** 필터 키 */
  key: string;
  /** 필터 라벨 */
  label: string;
  /** 필터 타입 */
  type: 'select' | 'input' | 'date';
  /** 필터 옵션 (select 타입의 경우) */
  options?: { value: string; label: string }[];
  /** 필터 값 */
  value?: any;
  /** 필터 변경 핸들러 */
  onChange: (value: any) => void;
}

export interface TableProps<T = any> {
  /** 테이블 데이터 */
  data: T[];
  /** 테이블 컬럼 정의 */
  columns: TableColumn<T>[];
  /** 테이블 액션 */
  actions?: TableAction<T>[];
  /** 테이블 필터 */
  filters?: TableFilter[];
  /** 테이블 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 테이블 테마 */
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** 선택 가능 여부 */
  selectable?: boolean;
  /** 선택된 행들 */
  selectedRows?: T[];
  /** 선택 변경 핸들러 */
  onSelectionChange?: (selectedRows: T[]) => void;
  /** 정렬 상태 */
  sortConfig?: {
    key: string;
    direction: 'asc' | 'desc';
  };
  /** 정렬 변경 핸들러 */
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
  /** 검색어 */
  searchTerm?: string;
  /** 검색 변경 핸들러 */
  onSearchChange?: (term: string) => void;
  /** 페이지네이션 설정 */
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  /** 로딩 상태 */
  loading?: boolean;
  /** 빈 상태 메시지 */
  emptyText?: string;
  /** 커스텀 클래스명 */
  className?: string;
  /** 행 클릭 핸들러 */
  onRowClick?: (record: T, index: number) => void;
  /** 행 비활성화 여부 */
  rowDisabled?: (record: T, index: number) => boolean;
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  filters = [],
  size = 'md',
  theme = 'default',
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortConfig,
  onSortChange,
  searchTerm = '',
  onSearchChange,
  pagination,
  loading = false,
  emptyText = '데이터가 없습니다',
  className = '',
  onRowClick,
  rowDisabled
}: TableProps<T>) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localSortConfig, setLocalSortConfig] = useState(sortConfig);

  // 검색 및 필터링된 데이터
  const filteredData = useMemo(() => {
    let result = [...data];

    // 검색 필터링
    if (localSearchTerm) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(localSearchTerm.toLowerCase())
        )
      );
    }

    // 커스텀 필터링
    filters.forEach(filter => {
      if (filter.value) {
        result = result.filter(item => {
          const itemValue = item[filter.key];
          if (filter.type === 'select') {
            return itemValue === filter.value;
          }
          if (filter.type === 'input') {
            return String(itemValue).toLowerCase().includes(String(filter.value).toLowerCase());
          }
          return true;
        });
      }
    });

    return result;
  }, [data, localSearchTerm, filters]);

  // 정렬된 데이터
  const sortedData = useMemo(() => {
    if (!localSortConfig) return filteredData;

    const { key, direction } = localSortConfig;
    const column = columns.find(col => col.key === key);
    
    if (!column?.sortable && !column?.sorter) return filteredData;

    return [...filteredData].sort((a, b) => {
      let comparison = 0;
      
      if (column.sorter) {
        comparison = column.sorter(a, b);
      } else {
        const aValue = column.dataIndex ? a[column.dataIndex] : a[key];
        const bValue = column.dataIndex ? b[column.dataIndex] : b[key];
        
        if (aValue < bValue) comparison = -1;
        if (aValue > bValue) comparison = 1;
      }
      
      return direction === 'desc' ? -comparison : comparison;
    });
  }, [filteredData, localSortConfig, columns]);

  // 페이지네이션된 데이터
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const { current, pageSize } = pagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, pagination]);

  const handleSort = (key: string) => {
    const column = columns.find(col => col.key === key);
    if (!column?.sortable) return;

    const newDirection = localSortConfig?.key === key && localSortConfig.direction === 'asc' ? 'desc' : 'asc';
    const newSortConfig = { key, direction: newDirection };
    
    setLocalSortConfig(newSortConfig);
    onSortChange?.(key, newDirection);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange?.(paginatedData);
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (record: T, checked: boolean) => {
    if (checked) {
      onSelectionChange?.([...selectedRows, record]);
    } else {
      onSelectionChange?.(selectedRows.filter(row => row !== record));
    }
  };

  const isRowSelected = (record: T) => {
    return selectedRows.includes(record);
  };

  const getCellValue = (record: T, column: TableColumn<T>) => {
    if (column.render) {
      return column.render(record[column.dataIndex || column.key], record, data.indexOf(record));
    }
    return record[column.dataIndex || column.key];
  };

  const renderPagination = () => {
    if (!pagination) return null;

    const { current, pageSize, total, onChange } = pagination;
    const totalPages = Math.ceil(total / pageSize);
    const startItem = (current - 1) * pageSize + 1;
    const endItem = Math.min(current * pageSize, total);

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (current <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        } else if (current >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = current - 1; i <= current + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    return (
      <div className={styles.tableFooter}>
        <div className={styles.tableInfo}>
          {startItem}-{endItem} / {total}개 항목
        </div>
        <div className={styles.tableActions}>
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={() => onChange(current - 1, pageSize)}
              disabled={current === 1}
            >
              이전
            </button>
            
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`${styles.paginationButton} ${page === current ? styles.active : ''}`}
                onClick={() => typeof page === 'number' && onChange(page, pageSize)}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
            
            <button
              className={styles.paginationButton}
              onClick={() => onChange(current + 1, pageSize)}
              disabled={current === totalPages}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFilters = () => {
    if (filters.length === 0 && !onSearchChange) return null;

    return (
      <div className={styles.tableFilters}>
        {onSearchChange && (
          <input
            type="text"
            placeholder="검색..."
            value={localSearchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        )}
        
        {filters.map(filter => (
          <div key={filter.key} className={styles.filterGroup}>
            <label>{filter.label}</label>
            {filter.type === 'select' ? (
              <select
                value={filter.value || ''}
                onChange={(e) => filter.onChange(e.target.value)}
              >
                <option value="">전체</option>
                {filter.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={filter.type === 'date' ? 'date' : 'text'}
                value={filter.value || ''}
                onChange={(e) => filter.onChange(e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📊</div>
      <div className={styles.emptyTitle}>데이터가 없습니다</div>
      <div className={styles.emptyDescription}>{emptyText}</div>
    </div>
  );

  const renderLoadingState = () => (
    <div className={styles.loadingState}>
      <div>로딩 중...</div>
    </div>
  );

  const getTableClasses = () => {
    const classes = [
      styles.table,
      styles[size],
      theme !== 'default' && styles[theme],
      className
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getHeaderClasses = (column: TableColumn<T>) => {
    const classes = [
      column.sortable && styles.sortable,
      localSortConfig?.key === column.key && styles[localSortConfig.direction],
      selectable && column.key === 'select' && styles.selectable
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getRowClasses = (record: T, index: number) => {
    const classes = [
      isRowSelected(record) && styles.selected,
      rowDisabled?.(record, index) && styles.disabled
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  return (
    <div className={styles.tableContainer}>
      {renderFilters()}
      
      <table className={getTableClasses()}>
        <thead className={styles.tableHeader}>
          <tr>
            {selectable && (
              <th className={styles.selectable}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={paginatedData.length > 0 && paginatedData.every(isRowSelected)}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
            )}
            
            {columns.map(column => (
              <th
                key={column.key}
                className={getHeaderClasses(column)}
                onClick={() => handleSort(column.key)}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
            
            {actions.length > 0 && (
              <th className={styles.actions}>액션</th>
            )}
          </tr>
        </thead>
        
        <tbody className={styles.tableBody}>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                {renderLoadingState()}
              </td>
            </tr>
          ) : paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                {renderEmptyState()}
              </td>
            </tr>
          ) : (
            paginatedData.map((record, index) => (
              <tr
                key={index}
                className={getRowClasses(record, index)}
                onClick={() => onRowClick?.(record, index)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {selectable && (
                  <td className={styles.selectable}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={isRowSelected(record)}
                      onChange={(e) => handleSelectRow(record, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                
                {columns.map(column => (
                  <td key={column.key} style={{ width: column.width }}>
                    {getCellValue(record, column)}
                  </td>
                ))}
                
                {actions.length > 0 && (
                  <td className={styles.actions}>
                    {actions.map(action => (
                      <button
                        key={action.key}
                        className={`${styles.actionButton} ${action.type ? styles[action.type] : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(record, index);
                        }}
                        disabled={action.disabled}
                        title={action.label}
                      >
                        {action.icon || action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {renderPagination()}
    </div>
  );
};

export default Table; 