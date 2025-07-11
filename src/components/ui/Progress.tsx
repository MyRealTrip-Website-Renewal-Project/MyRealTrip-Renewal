import React from 'react';
import styles from '@/styles/ui/Progress.module.scss';

export interface ProgressProps {
  value: number;
  max?: number;
  type?: 'line' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  showLabel?: boolean;
  labelPosition?: 'top' | 'bottom' | 'inside';
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  type = 'line',
  size = 'md',
  variant = 'primary',
  showLabel = false,
  labelPosition = 'top',
  animated = false,
  striped = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const isIndeterminate = value < 0;

  const progressClasses = [
    styles.progress,
    styles[`progress--${type}`],
    styles[`progress--${size}`],
    styles[`progress--${variant}`],
    animated && styles.progressAnimated,
    striped && styles.progressStriped,
    className,
  ].filter(Boolean).join(' ');

  const barClasses = [
    styles.progressBar,
    styles[`progressBar--${variant}`],
    animated && styles.progressBarAnimated,
    striped && styles.progressBarStriped,
  ].filter(Boolean).join(' ');

  const renderLabel = () => {
    if (!showLabel) return null;
    
    const labelText = isIndeterminate ? '진행 중...' : `${Math.round(percentage)}%`;
    
    return (
      <div className={`${styles.progressLabel} ${styles[`progressLabel--${labelPosition}`]}`}>
        {labelText}
      </div>
    );
  };

  const renderLineProgress = () => (
    <div className={styles.progressTrack}>
      <div
        className={barClasses}
        style={{
          width: isIndeterminate ? '100%' : `${percentage}%`,
        }}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={isIndeterminate ? '진행 중' : `${percentage}% 완료`}
      />
    </div>
  );

  const renderCircleProgress = () => {
    const radius = size === 'sm' ? 30 : size === 'lg' ? 50 : 40;
    const strokeWidth = size === 'sm' ? 4 : size === 'lg' ? 6 : 5;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = isIndeterminate 
      ? circumference * 0.25 
      : circumference - (percentage / 100) * circumference;

    return (
      <div className={styles.progressCircle}>
        <svg
          className={styles.progressCircleSvg}
          width={radius * 2 + strokeWidth}
          height={radius * 2 + strokeWidth}
          viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}
        >
          <circle
            className={styles.progressCircleTrack}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className={barClasses}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            role="progressbar"
            aria-valuenow={isIndeterminate ? undefined : value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={isIndeterminate ? '진행 중' : `${percentage}% 완료`}
          />
        </svg>
        {showLabel && labelPosition === 'inside' && (
          <div className={styles.progressCircleLabel}>
            {isIndeterminate ? '진행 중...' : `${Math.round(percentage)}%`}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={progressClasses}>
      {labelPosition === 'top' && renderLabel()}
      
      {type === 'line' ? renderLineProgress() : renderCircleProgress()}
      
      {labelPosition === 'bottom' && renderLabel()}
    </div>
  );
}; 