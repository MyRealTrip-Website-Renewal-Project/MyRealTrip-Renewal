import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/ui/TimePicker.module.scss';

export interface TimePickerProps {
  value?: Date | null;
  onChange?: (time: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  error?: boolean;
  helperText?: string;
  format?: '12h' | '24h';
  showSeconds?: boolean;
  step?: number; // 분 단위 스텝
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder = '시간을 선택하세요',
  disabled = false,
  size = 'md',
  variant = 'default',
  error = false,
  helperText,
  format = '24h',
  showSeconds = false,
  step = 1,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(value || null);
  const timePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedTime(value || null);
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

  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    if (format === '12h') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0시를 12시로 표시
      
      if (showSeconds) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
      }
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } else {
      if (showSeconds) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  };

  const getDisplayValue = () => {
    if (!selectedTime) return placeholder;
    return formatTime(selectedTime);
  };

  const generateHours = (): number[] => {
    if (format === '12h') {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    } else {
      return Array.from({ length: 24 }, (_, i) => i);
    }
  };

  const generateMinutes = (): number[] => {
    return Array.from({ length: 60 / step }, (_, i) => i * step);
  };

  const generateSeconds = (): number[] => {
    return Array.from({ length: 60 }, (_, i) => i);
  };

  const handleTimeSelect = (type: 'hour' | 'minute' | 'second', value: number) => {
    const currentTime = selectedTime || new Date();
    const newTime = new Date(currentTime);
    
    if (type === 'hour') {
      if (format === '12h') {
        // 12시간 형식에서 AM/PM 처리
        const currentHour = newTime.getHours();
        const isPM = currentHour >= 12;
        newTime.setHours(isPM ? value + 12 : value);
      } else {
        newTime.setHours(value);
      }
    } else if (type === 'minute') {
      newTime.setMinutes(value);
    } else if (type === 'second') {
      newTime.setSeconds(value);
    }
    
    setSelectedTime(newTime);
    onChange?.(newTime);
  };

  const handleClear = () => {
    setSelectedTime(null);
    onChange?.(null);
  };

  const timePickerClasses = [
    styles.timePicker,
    styles[`timePicker--${size}`],
    styles[`timePicker--${variant}`],
    isOpen && styles.timePickerOpen,
    disabled && styles.timePickerDisabled,
    error && styles.timePickerError,
    className,
  ].filter(Boolean).join(' ');

  const triggerClasses = [
    styles.timePickerTrigger,
    styles[`timePickerTrigger--${size}`],
    styles[`timePickerTrigger--${variant}`],
    isOpen && styles.timePickerTriggerOpen,
    disabled && styles.timePickerTriggerDisabled,
    error && styles.timePickerTriggerError,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.timePickerContainer} ref={timePickerRef}>
      <div className={timePickerClasses} style={style}>
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
          <span className={styles.timePickerValue}>{getDisplayValue()}</span>
          <div className={styles.timePickerIcons}>
            {selectedTime && (
              <button
                type="button"
                className={styles.timePickerClear}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                disabled={disabled}
                aria-label="시간 지우기"
              >
                ×
              </button>
            )}
            <span className={styles.timePickerClockIcon}>🕐</span>
          </div>
        </div>
        
        {isOpen && (
          <div className={styles.timePickerDropdown}>
            <div className={styles.timePickerContent}>
              {/* 시간 선택 */}
              <div className={styles.timePickerSection}>
                <div className={styles.timePickerSectionTitle}>시간</div>
                <div className={styles.timePickerOptions}>
                  {generateHours().map((hour) => {
                    const currentTime = selectedTime || new Date();
                    const currentHour = format === '12h' 
                      ? (currentTime.getHours() % 12 || 12)
                      : currentTime.getHours();
                    const isSelected = hour === currentHour;
                    
                    return (
                      <button
                        key={hour}
                        type="button"
                        className={`${styles.timePickerOption} ${isSelected ? styles.timePickerOptionSelected : ''}`}
                        onClick={() => handleTimeSelect('hour', hour)}
                      >
                        {hour.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 분 선택 */}
              <div className={styles.timePickerSection}>
                <div className={styles.timePickerSectionTitle}>분</div>
                <div className={styles.timePickerOptions}>
                  {generateMinutes().map((minute) => {
                    const currentTime = selectedTime || new Date();
                    const currentMinute = currentTime.getMinutes();
                    const isSelected = minute === currentMinute;
                    
                    return (
                      <button
                        key={minute}
                        type="button"
                        className={`${styles.timePickerOption} ${isSelected ? styles.timePickerOptionSelected : ''}`}
                        onClick={() => handleTimeSelect('minute', minute)}
                      >
                        {minute.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 초 선택 (showSeconds가 true일 때만) */}
              {showSeconds && (
                <div className={styles.timePickerSection}>
                  <div className={styles.timePickerSectionTitle}>초</div>
                  <div className={styles.timePickerOptions}>
                    {generateSeconds().map((second) => {
                      const currentTime = selectedTime || new Date();
                      const currentSecond = currentTime.getSeconds();
                      const isSelected = second === currentSecond;
                      
                      return (
                        <button
                          key={second}
                          type="button"
                          className={`${styles.timePickerOption} ${isSelected ? styles.timePickerOptionSelected : ''}`}
                          onClick={() => handleTimeSelect('second', second)}
                        >
                          {second.toString().padStart(2, '0')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* AM/PM 선택 (12시간 형식일 때만) */}
              {format === '12h' && (
                <div className={styles.timePickerSection}>
                  <div className={styles.timePickerSectionTitle}>AM/PM</div>
                  <div className={styles.timePickerOptions}>
                    {['AM', 'PM'].map((ampm) => {
                      const currentTime = selectedTime || new Date();
                      const currentHour = currentTime.getHours();
                      const isPM = currentHour >= 12;
                      const isSelected = (ampm === 'PM') === isPM;
                      
                      return (
                        <button
                          key={ampm}
                          type="button"
                          className={`${styles.timePickerOption} ${isSelected ? styles.timePickerOptionSelected : ''}`}
                          onClick={() => {
                            const newTime = new Date(currentTime);
                            if (ampm === 'PM' && currentHour < 12) {
                              newTime.setHours(currentHour + 12);
                            } else if (ampm === 'AM' && currentHour >= 12) {
                              newTime.setHours(currentHour - 12);
                            }
                            setSelectedTime(newTime);
                            onChange?.(newTime);
                          }}
                        >
                          {ampm}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {helperText && (
        <div 
          id={`${ariaLabel}-helper`}
          className={`${styles.timePickerHelperText} ${error ? styles.timePickerHelperTextError : ''}`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}; 