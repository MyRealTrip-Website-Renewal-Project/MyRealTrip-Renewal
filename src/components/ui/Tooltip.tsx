import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './Tooltip.module.scss';

export interface TooltipProps {
  /** 툴팁 내용 */
  content: string | ReactNode;
  /** 툴팁 방향 */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** 툴팁 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 툴팁 테마 */
  theme?: 'default' | 'light' | 'primary' | 'success' | 'warning' | 'error';
  /** 툴팁 표시 지연 시간 (ms) */
  delay?: number;
  /** 툴팁 숨김 지연 시간 (ms) */
  hideDelay?: number;
  /** 항상 표시 여부 */
  alwaysShow?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
  /** 자식 요소 */
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  size = 'md',
  theme = 'default',
  delay = 200,
  hideDelay = 0,
  alwaysShow = false,
  disabled = false,
  className = '',
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled || alwaysShow) return;
    
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    setShowTimeout(timeout);
  };

  const hideTooltip = () => {
    if (disabled || alwaysShow) return;
    
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }
    
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
    
    setHideTimeout(timeout);
  };

  const handleMouseEnter = () => {
    showTooltip();
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  const handleFocus = () => {
    showTooltip();
  };

  const handleBlur = () => {
    hideTooltip();
  };

  useEffect(() => {
    if (alwaysShow) {
      setIsVisible(true);
    }
  }, [alwaysShow]);

  useEffect(() => {
    return () => {
      if (showTimeout) clearTimeout(showTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [showTimeout, hideTimeout]);

  const getTooltipClasses = () => {
    const classes = [
      styles.tooltipContent,
      styles[position],
      styles[size],
      theme !== 'default' && styles[theme],
      isVisible && styles.visible
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  return (
    <div
      ref={triggerRef}
      className={`${styles.tooltip} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
      <div
        ref={tooltipRef}
        className={getTooltipClasses()}
        role="tooltip"
        aria-hidden={!isVisible}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip; 