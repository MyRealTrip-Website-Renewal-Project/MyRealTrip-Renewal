import React, { useState, useRef, useEffect } from 'react';
import styles from './DatePicker.module.scss';
import clsx from 'clsx';
import { MdChevronLeft, MdChevronRight, MdCalendarToday } from 'react-icons/md';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  error?: string;
  className?: string;
}

function getDaysArray(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
  return days;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  min,
  max,
  disabled,
  error,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => value || new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const days = getDaysArray(view.getFullYear(), view.getMonth());
  const today = new Date();

  const isDisabled = (date: Date) => {
    if (disabled) return true;
    if (min && date < min) return true;
    if (max && date > max) return true;
    return false;
  };

  return (
    <div className={styles.datePickerWrapper} ref={ref}>
      <div className={styles.inputBox}>
        <input
          className={clsx(
            styles.input,
            { [styles.error]: !!error, [styles.disabled]: disabled },
            className
          )}
          value={value ? value.toLocaleDateString() : ''}
          onFocus={() => !disabled && setOpen(true)}
          readOnly
          disabled={disabled}
          placeholder="날짜 선택"
        />
        <MdCalendarToday style={{ position: 'absolute', right: 16, color: '#aaa', fontSize: 20 }} />
      </div>
      {open && (
        <div className={styles.calendar}>
          <div className={styles.header}>
            <button
              className={styles.navButton}
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
              disabled={min && new Date(view.getFullYear(), view.getMonth() - 1, 1) < min}
              aria-label="이전 달"
              type="button"
            >
              <MdChevronLeft />
            </button>
            <span>{view.getFullYear()}년 {view.getMonth() + 1}월</span>
            <button
              className={styles.navButton}
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
              disabled={max && new Date(view.getFullYear(), view.getMonth() + 1, 1) > max}
              aria-label="다음 달"
              type="button"
            >
              <MdChevronRight />
            </button>
          </div>
          <div className={styles.days}>
            {[...Array(7)].map((_, i) => (
              <span key={i} style={{ textAlign: 'center', fontWeight: 600, color: '#888', fontSize: 13 }}>
                {'일월화수목금토'[i]}
              </span>
            ))}
            {days.map((d, i) =>
              d ? (
                <button
                  key={i}
                  className={clsx(
                    styles.day,
                    {
                      today:
                        d.toDateString() === today.toDateString(),
                      selected:
                        value && d.toDateString() === value.toDateString(),
                      disabled: isDisabled(d),
                    }
                  )}
                  onClick={() => !isDisabled(d) && onChange(d)}
                  disabled={isDisabled(d)}
                  type="button"
                >
                  {d.getDate()}
                </button>
              ) : (
                <span key={i} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 