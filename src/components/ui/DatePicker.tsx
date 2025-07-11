import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/ui/DatePicker.module.scss';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  error?: boolean;
  helperText?: string;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '날짜를 선택하세요',
  disabled = false,
  size = 'md',
  variant = 'default',
  error = false,
  helperText,
  minDate,
  maxDate,
  format = 'YYYY-MM-DD',
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setCurrentDate(value);
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleToggle();
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  };

  const getDisplayValue = () => {
    if (!selectedDate) return placeholder;
    return formatDate(selectedDate);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (!isDateDisabled(clickedDate)) {
      setSelectedDate(clickedDate);
      onChange?.(clickedDate);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange?.(null);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // 이전 달의 마지막 날들
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`prev-${i}`} className={styles.calendarDayEmpty} />);
    }

    // 현재 달의 날들
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentDate.getMonth() && 
        selectedDate.getFullYear() === currentDate.getFullYear();
      const isToday = new Date().toDateString() === date.toDateString();
      const isDisabled = isDateDisabled(date);

      const dayClasses = [
        styles.calendarDay,
        isSelected && styles.calendarDaySelected,
        isToday && styles.calendarDayToday,
        isDisabled && styles.calendarDayDisabled,
      ].filter(Boolean).join(' ');

      days.push(
        <button
          key={day}
          className={dayClasses}
          onClick={() => handleDateClick(day)}
          disabled={isDisabled}
          type="button"
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const datePickerClasses = [
    styles.datePicker,
    styles[`datePicker--${size}`],
    styles[`datePicker--${variant}`],
    isOpen && styles.datePickerOpen,
    disabled && styles.datePickerDisabled,
    error && styles.datePickerError,
    className,
  ].filter(Boolean).join(' ');

  const triggerClasses = [
    styles.datePickerTrigger,
    styles[`datePickerTrigger--${size}`],
    styles[`datePickerTrigger--${variant}`],
    isOpen && styles.datePickerTriggerOpen,
    disabled && styles.datePickerTriggerDisabled,
    error && styles.datePickerTriggerError,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.datePickerContainer} ref={datePickerRef}>
      <div className={datePickerClasses} style={style}>
        <div
          className={triggerClasses}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={ariaLabel}
          aria-describedby={helperText ? `${ariaLabel}-helper` : undefined}
        >
          <span className={styles.datePickerValue}>{getDisplayValue()}</span>
          <div className={styles.datePickerIcons}>
            {selectedDate && (
              <button
                type="button"
                className={styles.datePickerClear}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                disabled={disabled}
                aria-label="날짜 지우기"
              >
                ×
              </button>
            )}
            <span className={styles.datePickerCalendarIcon}>📅</span>
          </div>
        </div>
        
        {isOpen && (
          <div className={styles.datePickerDropdown}>
            <div className={styles.calendarHeader}>
              <button
                type="button"
                className={styles.calendarNavButton}
                onClick={goToPreviousMonth}
                aria-label="이전 달"
              >
                ‹
              </button>
              <span className={styles.calendarTitle}>
                {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
              </span>
              <button
                type="button"
                className={styles.calendarNavButton}
                onClick={goToNextMonth}
                aria-label="다음 달"
              >
                ›
              </button>
            </div>
            
            <div className={styles.calendar}>
              <div className={styles.calendarWeekdays}>
                {dayNames.map(day => (
                  <div key={day} className={styles.calendarWeekday}>{day}</div>
                ))}
              </div>
              <div className={styles.calendarDays}>
                {renderCalendar()}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {helperText && (
        <div 
          id={`${ariaLabel}-helper`}
          className={`${styles.datePickerHelperText} ${error ? styles.datePickerHelperTextError : ''}`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}; 