import React, { useState, useCallback } from 'react';
import styles from '@/styles/ui/Rating.module.scss';

export interface RatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  readOnly?: boolean;
  disabled?: boolean;
  showValue?: boolean;
  showLabel?: boolean;
  precision?: 0.5 | 1;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  size = 'md',
  variant = 'default',
  readOnly = false,
  disabled = false,
  showValue = false,
  showLabel = false,
  precision = 1,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const displayValue = isHovering ? hoverValue : value;

  const handleMouseEnter = useCallback((rating: number) => {
    if (!readOnly && !disabled) {
      setHoverValue(rating);
      setIsHovering(true);
    }
  }, [readOnly, disabled]);

  const handleMouseLeave = useCallback(() => {
    if (!readOnly && !disabled) {
      setHoverValue(null);
      setIsHovering(false);
    }
  }, [readOnly, disabled]);

  const handleClick = useCallback((rating: number) => {
    if (!readOnly && !disabled && onChange) {
      onChange(rating);
    }
  }, [readOnly, disabled, onChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, rating: number) => {
    if (readOnly || disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleClick(rating);
        break;
      case 'ArrowRight':
        event.preventDefault();
        const nextRating = Math.min(rating + precision, max);
        handleClick(nextRating);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        const prevRating = Math.max(rating - precision, 0);
        handleClick(prevRating);
        break;
    }
  }, [readOnly, disabled, handleClick, precision, max]);

  const getRatingLabel = (rating: number): string => {
    const labels: { [key: number]: string } = {
      0: '평가 없음',
      0.5: '매우 나쁨',
      1: '나쁨',
      1.5: '보통 이하',
      2: '보통',
      2.5: '보통 이상',
      3: '좋음',
      3.5: '매우 좋음',
      4: '훌륭함',
      4.5: '거의 완벽',
      5: '완벽함',
    };
    return labels[rating] || `${rating}점`;
  };

  const renderStar = (index: number) => {
    const rating = index + 1;
    const isHalfStar = precision === 0.5 && displayValue && displayValue >= rating - 0.5 && displayValue < rating;
    const isFullStar = displayValue && displayValue >= rating;
    const isEmptyStar = !isFullStar && !isHalfStar;

    const starClasses = [
      styles.ratingStar,
      styles[`ratingStar--${size}`],
      styles[`ratingStar--${variant}`],
      isFullStar && styles.ratingStarFilled,
      isHalfStar && styles.ratingStarHalf,
      isEmptyStar && styles.ratingStarEmpty,
      readOnly && styles.ratingStarReadOnly,
      disabled && styles.ratingStarDisabled,
    ].filter(Boolean).join(' ');

    return (
      <button
        key={index}
        type="button"
        className={starClasses}
        onClick={() => handleClick(rating)}
        onMouseEnter={() => handleMouseEnter(rating)}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => handleKeyDown(e, rating)}
        disabled={readOnly || disabled}
        tabIndex={readOnly || disabled ? -1 : 0}
        role="radio"
        aria-checked={value === rating}
        aria-label={`${rating}점 ${getRatingLabel(rating)}`}
      >
        <span className={styles.ratingStarIcon}>
          {isFullStar ? '★' : isHalfStar ? '☆' : '☆'}
        </span>
        {isHalfStar && (
          <span className={styles.ratingStarHalfIcon}>★</span>
        )}
      </button>
    );
  };

  const ratingClasses = [
    styles.rating,
    styles[`rating--${size}`],
    styles[`rating--${variant}`],
    readOnly && styles.ratingReadOnly,
    disabled && styles.ratingDisabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.ratingContainer}>
      <div
        className={ratingClasses}
        style={style}
        role="radiogroup"
        aria-label={ariaLabel || '별점 평가'}
        aria-describedby={showLabel ? `${ariaLabel}-label` : undefined}
      >
        {Array.from({ length: max }, (_, index) => renderStar(index))}
      </div>
      
      {showValue && (
        <div className={styles.ratingValue}>
          {displayValue?.toFixed(precision === 0.5 ? 1 : 0)}/{max}
        </div>
      )}
      
      {showLabel && (
        <div 
          id={`${ariaLabel}-label`}
          className={styles.ratingLabel}
        >
          {getRatingLabel(displayValue || 0)}
        </div>
      )}
    </div>
  );
}; 