import React from 'react';
import styles from './Board.module.scss';
import clsx from 'clsx';

export interface BoardColumn<T = any> {
  key: string;
  title: React.ReactNode;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface BoardProps<T = any> {
  columns: BoardColumn<T>[];
  data: T[];
  emptyText?: string;
  className?: string;
}

export function Board<T = any>({ columns, data, emptyText = '데이터가 없습니다', className }: BoardProps<T>) {
  return (
    <table className={clsx(styles.board, className)}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {columns.map(col => (
            <th
              key={col.key}
              className={clsx(styles.th)}
              style={{ textAlign: col.align || 'left' }}
              scope="col"
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr className={styles.tr}>
            <td className={clsx(styles.td, styles.empty)} colSpan={columns.length}>
              {emptyText}
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr className={styles.tr} key={rowIndex}>
              {columns.map(col => (
                <td
                  key={col.key}
                  className={clsx(styles.td)}
                  style={{ textAlign: col.align || 'left' }}
                >
                  {col.render ? col.render(row, rowIndex) : (row as Record<string, any>)[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
} 