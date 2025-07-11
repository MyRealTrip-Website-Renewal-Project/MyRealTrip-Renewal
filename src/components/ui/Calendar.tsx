import React from 'react';
import styles from '@/styles/ui/Calendar.module.scss';

export type CalendarProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const Calendar = ({ value, onChange, className = '', style, ariaLabel }: CalendarProps) => {
  // 실제 구현은 추후 확장
  return (
    <div
      className={`${styles.calendar} ${className}`}
      style={style}
      aria-label={ariaLabel || '달력'}
      role="group"
    >
      <span>달력 컴포넌트 (예시)</span>
      {/* value, onChange 등은 추후 실제 달력 구현에 활용 */}
    </div>
  );
}; 