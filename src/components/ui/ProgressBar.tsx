import React from 'react';
import styles from './ProgressBar.module.scss';
import clsx from 'clsx';

export type ProgressBarType = 'primary' | 'success' | 'error' | 'warning' | 'info';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  type?: ProgressBarType;
  showValue?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  type = 'primary',
  showValue = false,
  className,
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={styles.progressBarWrapper}>
      {label && <div className={styles.label}>{label}</div>}
      <div
        className={clsx(styles.bar, styles[type], className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        aria-valuemin={0}
        aria-label={label}
      >
        <div className={styles.progress} style={{ width: `${percent}%` }} />
      </div>
      {showValue && <div className={styles.value}>{Math.round(percent)}%</div>}
    </div>
  );
}; 