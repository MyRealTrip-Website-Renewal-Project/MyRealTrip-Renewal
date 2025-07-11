import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '@/styles/ui/Slider.module.scss';

export interface SliderProps {
  value?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  disabled?: boolean;
  showValue?: boolean;
  showTooltip?: boolean;
  showMarks?: boolean;
  marks?: { value: number; label: string }[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  variant = 'default',
  disabled = false,
  showValue = false,
  showTooltip = false,
  showMarks = false,
  marks = [],
  orientation = 'horizontal',
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [tooltipValue, setTooltipValue] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isRange = Array.isArray(value);
  const currentValue = isRange ? value : [value];

  const getPercentage = useCallback((val: number): number => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  const getValueFromPercentage = useCallback((percentage: number): number => {
    const rawValue = (percentage / 100) * (max - min) + min;
    return Math.round(rawValue / step) * step;
  }, [min, max, step]);

  const getValueFromPosition = useCallback((clientX: number, clientY: number): number => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    let percentage: number;

    if (orientation === 'horizontal') {
      percentage = ((clientX - rect.left) / rect.width) * 100;
    } else {
      percentage = ((rect.bottom - clientY) / rect.height) * 100;
    }

    percentage = Math.max(0, Math.min(100, percentage));
    return getValueFromPercentage(percentage);
  }, [orientation, min, getValueFromPercentage]);

  const handleMouseDown = useCallback((event: React.MouseEvent, index: number) => {
    if (disabled) return;

    event.preventDefault();
    setIsDragging(true);
    setDragIndex(index);
    
    const newValue = getValueFromPosition(event.clientX, event.clientY);
    const clampedValue = Math.max(min, Math.min(max, newValue));
    
    if (isRange) {
      const newRange = [...currentValue] as [number, number];
      newRange[index] = clampedValue;
      onChange?.(newRange);
    } else {
      onChange?.(clampedValue);
    }
  }, [disabled, min, max, isRange, currentValue, onChange, getValueFromPosition]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || dragIndex === null) return;

    const newValue = getValueFromPosition(event.clientX, event.clientY);
    const clampedValue = Math.max(min, Math.min(max, newValue));
    
    if (isRange) {
      const newRange = [...currentValue] as [number, number];
      newRange[dragIndex] = clampedValue;
      onChange?.(newRange);
    } else {
      onChange?.(clampedValue);
    }
  }, [isDragging, dragIndex, min, max, isRange, currentValue, onChange, getValueFromPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragIndex(null);
  }, []);

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (disabled) return;

    const newValue = getValueFromPosition(event.clientX, event.clientY);
    const clampedValue = Math.max(min, Math.min(max, newValue));
    
    if (isRange) {
      // Find closest thumb
      const distances = currentValue.map(val => Math.abs(val - clampedValue));
      const closestIndex = distances.indexOf(Math.min(...distances));
      const newRange = [...currentValue] as [number, number];
      newRange[closestIndex] = clampedValue;
      onChange?.(newRange);
    } else {
      onChange?.(clampedValue);
    }
  }, [disabled, min, max, isRange, currentValue, onChange, getValueFromPosition]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    if (disabled) return;

    const stepValue = step;
    let newValue: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newValue = Math.min(max, (isRange ? currentValue[index] : currentValue[0]) + stepValue);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newValue = Math.max(min, (isRange ? currentValue[index] : currentValue[0]) - stepValue);
        break;
      case 'Home':
        event.preventDefault();
        newValue = min;
        break;
      case 'End':
        event.preventDefault();
        newValue = max;
        break;
      default:
        return;
    }

    if (isRange) {
      const newRange = [...currentValue] as [number, number];
      newRange[index] = newValue;
      onChange?.(newRange);
    } else {
      onChange?.(newValue);
    }
  }, [disabled, min, max, step, isRange, currentValue, onChange]);

  const handleThumbMouseEnter = useCallback((val: number) => {
    if (showTooltip) {
      setTooltipValue(val);
    }
  }, [showTooltip]);

  const handleThumbMouseLeave = useCallback(() => {
    if (showTooltip) {
      setTooltipValue(null);
    }
  }, [showTooltip]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const renderThumb = (index: number, value: number) => {
    const percentage = getPercentage(value);
    const position = orientation === 'horizontal' ? `${percentage}%` : `${100 - percentage}%`;

    const thumbClasses = [
      styles.sliderThumb,
      styles[`sliderThumb--${size}`],
      styles[`sliderThumb--${variant}`],
      isDragging && dragIndex === index && styles.sliderThumbDragging,
      disabled && styles.sliderThumbDisabled,
    ].filter(Boolean).join(' ');

    return (
      <div
        key={index}
        className={thumbClasses}
        style={{
          [orientation === 'horizontal' ? 'left' : 'bottom']: position,
        }}
        onMouseDown={(e) => handleMouseDown(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onMouseEnter={() => handleThumbMouseEnter(value)}
        onMouseLeave={handleThumbMouseLeave}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}`}
        aria-label={`${isRange ? (index === 0 ? '최소값' : '최대값') : '값'} ${value}`}
      >
        {showTooltip && tooltipValue === value && (
          <div className={styles.sliderTooltip}>
            {value}
          </div>
        )}
      </div>
    );
  };

  const renderTrack = () => {
    const trackClasses = [
      styles.sliderTrack,
      styles[`sliderTrack--${size}`],
      styles[`sliderTrack--${variant}`],
      styles[`sliderTrack--${orientation}`],
      disabled && styles.sliderTrackDisabled,
    ].filter(Boolean).join(' ');

    return (
      <div className={trackClasses}>
        <div className={styles.sliderTrackBackground} />
        <div
          className={styles.sliderTrackFill}
          style={{
            [orientation === 'horizontal' ? 'width' : 'height']: isRange
              ? `${getPercentage(currentValue[1]) - getPercentage(currentValue[0])}%`
              : `${getPercentage(currentValue[0])}%`,
            [orientation === 'horizontal' ? 'left' : 'bottom']: isRange
              ? `${getPercentage(currentValue[0])}%`
              : '0%',
          }}
        />
      </div>
    );
  };

  const renderMarks = () => {
    if (!showMarks && marks.length === 0) return null;

    const markItems = showMarks && marks.length === 0
      ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
          value: min + i * step,
          label: `${min + i * step}`,
        }))
      : marks;

    return (
      <div className={styles.sliderMarks}>
        {markItems.map((mark) => (
          <div
            key={mark.value}
            className={styles.sliderMark}
            style={{
              [orientation === 'horizontal' ? 'left' : 'bottom']: `${getPercentage(mark.value)}%`,
            }}
          >
            <div className={styles.sliderMarkDot} />
            <div className={styles.sliderMarkLabel}>{mark.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const sliderClasses = [
    styles.slider,
    styles[`slider--${size}`],
    styles[`slider--${variant}`],
    styles[`slider--${orientation}`],
    disabled && styles.sliderDisabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.sliderContainer}>
      <div
        ref={sliderRef}
        className={sliderClasses}
        style={style}
        onClick={handleClick}
        role="group"
        aria-label={ariaLabel}
      >
        {renderTrack()}
        {renderMarks()}
        {currentValue.map((val, index) => renderThumb(index, val))}
      </div>
      
      {showValue && (
        <div className={styles.sliderValue}>
          {isRange ? `${currentValue[0]} - ${currentValue[1]}` : currentValue[0]}
        </div>
      )}
    </div>
  );
}; 