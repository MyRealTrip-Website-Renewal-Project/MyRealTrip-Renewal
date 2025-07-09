import React from 'react';
import styles from './Pagination.module.scss';
import clsx from 'clsx';
import { MdChevronLeft, MdChevronRight, MdMoreHoriz } from 'react-icons/md';

interface PaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
  className?: string;
}

const getPages = (page: number, total: number) => {
  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total);
    } else if (page >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', total);
    }
  }
  return pages;
};

export const Pagination: React.FC<PaginationProps> = ({ page, total, onChange, className }) => {
  const pages = getPages(page, total);
  return (
    <nav className={clsx(styles.pagination, className)} aria-label="페이지네이션">
      <button
        className={clsx(styles.button, { [styles.disabled]: page === 1 })}
        onClick={() => page > 1 && onChange(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지"
      >
        <MdChevronLeft className={styles.icon} />
      </button>
      {pages.map((p, i) =>
        p === '...'
          ? <span key={i} className={styles.ellipsis}><MdMoreHoriz /></span>
          : <button
              key={p}
              className={clsx(styles.button, { [styles.active]: page === p })}
              onClick={() => typeof p === 'number' && onChange(p)}
              disabled={page === p}
              aria-current={page === p ? 'page' : undefined}
            >
              {p}
            </button>
      )}
      <button
        className={clsx(styles.button, { [styles.disabled]: page === total })}
        onClick={() => page < total && onChange(page + 1)}
        disabled={page === total}
        aria-label="다음 페이지"
      >
        <MdChevronRight className={styles.icon} />
      </button>
    </nav>
  );
}; 