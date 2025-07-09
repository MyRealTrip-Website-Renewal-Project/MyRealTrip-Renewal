import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './Popover.module.scss';
import { Button } from './Button';

export interface PopoverProps {
  /** 팝오버 내용 */
  content: ReactNode;
  /** 팝오버 제목 */
  title?: string;
  /** 팝오버 방향 */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** 팝오버 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 팝오버 테마 */
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** 팝오버 표시 지연 시간 (ms) */
  delay?: number;
  /** 팝오버 숨김 지연 시간 (ms) */
  hideDelay?: number;
  /** 항상 표시 여부 */
  alwaysShow?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 닫기 버튼 표시 여부 */
  showCloseButton?: boolean;
  /** 푸터 버튼들 */
  footer?: ReactNode;
  /** 커스텀 클래스명 */
  className?: string;
  /** 자식 요소 */
  children: ReactNode;
  /** 팝오버 열림/닫힘 상태 변경 콜백 */
  onOpenChange?: (isOpen: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  title,
  position = 'top',
  size = 'md',
  theme = 'default',
  delay = 200,
  hideDelay = 0,
  alwaysShow = false,
  disabled = false,
  showCloseButton = false,
  footer,
  className = '',
  children,
  onOpenChange
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showPopover = () => {
    if (disabled || alwaysShow) return;
    
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    
    const timeout = setTimeout(() => {
      setIsVisible(true);
      onOpenChange?.(true);
    }, delay);
    
    setShowTimeout(timeout);
  };

  const hidePopover = () => {
    if (disabled || alwaysShow) return;
    
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }
    
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onOpenChange?.(false);
    }, hideDelay);
    
    setHideTimeout(timeout);
  };

  const handleMouseEnter = () => {
    showPopover();
  };

  const handleMouseLeave = () => {
    hidePopover();
  };

  const handleFocus = () => {
    showPopover();
  };

  const handleBlur = () => {
    hidePopover();
  };

  const handleClose = () => {
    setIsVisible(false);
    onOpenChange?.(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
      onOpenChange?.(false);
    }
  };

  useEffect(() => {
    if (alwaysShow) {
      setIsVisible(true);
      onOpenChange?.(true);
    }
  }, [alwaysShow, onOpenChange]);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (showTimeout) clearTimeout(showTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [showTimeout, hideDelay]);

  const getPopoverClasses = () => {
    const classes = [
      styles.popoverContent,
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
      className={`${styles.popover} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
      <div
        ref={popoverRef}
        className={getPopoverClasses()}
        role="dialog"
        aria-hidden={!isVisible}
        aria-labelledby={title ? 'popover-title' : undefined}
      >
        {(title || showCloseButton) && (
          <div className={styles.popoverHeader}>
            {title && <h3 id="popover-title">{title}</h3>}
            {showCloseButton && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="닫기"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className={styles.popoverBody}>
          {content}
        </div>
        {footer && (
          <div className={styles.popoverFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popover; 