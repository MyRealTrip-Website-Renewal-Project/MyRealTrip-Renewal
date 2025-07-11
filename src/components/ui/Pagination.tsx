import React from 'react';
import styles from '@/styles/ui/Pagination.module.scss';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  showTotalItems?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = false,
  showTotalItems = false,
  className = '',
  disabled = false,
}) => {
  const handlePageChange = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled || !onPageSizeChange) return;
    const newPageSize = parseInt(event.target.value, 10);
    onPageSizeChange(newPageSize);
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalPages <= 1 && !showPageSizeSelector && !showTotalItems) {
    return null;
  }

  return (
    <div className={`${styles.pagination} ${className}`}>
      {showTotalItems && (
        <div className={styles.paginationInfo}>
          <span>
            {startItem}-{endItem} / {totalItems} 항목
          </span>
        </div>
      )}

      <div className={styles.paginationControls}>
        <button
          className={`${styles.paginationButton} ${styles.paginationButtonPrev}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage <= 1}
          aria-label="이전 페이지"
        >
          ‹
        </button>

        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className={styles.paginationEllipsis}>...</span>
            ) : (
              <button
                className={`${styles.paginationButton} ${
                  page === currentPage ? styles.paginationButtonActive : ''
                }`}
                onClick={() => handlePageChange(page as number)}
                disabled={disabled}
                aria-label={`${page} 페이지로 이동`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          className={`${styles.paginationButton} ${styles.paginationButtonNext}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage >= totalPages}
          aria-label="다음 페이지"
        >
          ›
        </button>
      </div>

      {showPageSizeSelector && onPageSizeChange && (
        <div className={styles.paginationSizeSelector}>
          <label htmlFor="page-size" className={styles.paginationSizeLabel}>
            페이지당 항목:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={handlePageSizeChange}
            disabled={disabled}
            className={styles.paginationSizeSelect}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}; 