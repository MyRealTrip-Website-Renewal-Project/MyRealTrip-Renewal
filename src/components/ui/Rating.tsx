import React from 'react';
import styles from './Rating.module.scss';
import clsx from 'clsx';
import { MdStar, MdStarBorder } from 'react-icons/md';

export type RatingSize = 'sm' | 'md' | 'lg';

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: RatingSize;
  disabled?: boolean;
  readOnly?: boolean;
  showValue?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onChange,
  size = 'md',
  disabled,
  readOnly,
  showValue,
  className,
}) => {
  return (
    <div className={clsx(styles.ratingWrapper, className)} role="radiogroup" aria-label="별점">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value;
        return (
          <span
            key={i}
            className={clsx(styles.star, styles[size], {
              [styles.disabled]: disabled,
              empty: !filled,
            })}
            role="radio"
            aria-checked={filled}
            tabIndex={disabled || readOnly ? -1 : 0}
            onClick={() => !disabled && !readOnly && onChange?.(i + 1)}
            onKeyDown={e => {
              if (!disabled && !readOnly && (e.key === 'Enter' || e.key === ' ')) onChange?.(i + 1);
            }}
            aria-disabled={disabled}
          >
            {filled ? <MdStar /> : <MdStarBorder />}
          </span>
        );
      })}
      {showValue && <span className={styles.value}>{value} / {max}</span>}
    </div>
  );
}; 