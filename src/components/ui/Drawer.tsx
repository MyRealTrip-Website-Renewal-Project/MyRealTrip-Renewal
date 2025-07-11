import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/ui/Drawer.module.scss';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'outlined' | 'filled';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  showOverlay?: boolean;
  overlayOpacity?: number;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  title,
  position = 'right',
  size = 'md',
  variant = 'default',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  showOverlay = true,
  overlayOpacity = 0.5,
  zIndex = 1000,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // 포털을 위한 컨테이너 생성
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'drawer-portal';
    document.body.appendChild(container);
    setPortalContainer(container);

    return () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  // 열기/닫기 애니메이션 처리
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsAnimating(true);
      
      // 포커스 트랩 설정
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // body 스크롤 방지
      document.body.style.overflow = 'hidden';
      
      // 애니메이션 완료 후 상태 업데이트
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // 애니메이션 지속 시간과 일치

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
      
      // body 스크롤 복원
      document.body.style.overflow = '';
      
      // 이전 포커스로 복원
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      
      // 애니메이션 완료 후 숨김
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [open]);

  // ESC 키 처리
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // 포커스 트랩
  useEffect(() => {
    if (!open || !isVisible) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [open, isVisible]);

  // 오버레이 클릭 처리
  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // 드로어 클릭 처리 (이벤트 버블링 방지)
  const handleDrawerClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  // 드로어 클래스
  const drawerClasses = [
    styles.drawer,
    styles[`drawer--${position}`],
    styles[`drawer--${size}`],
    styles[`drawer--${variant}`],
    isVisible && styles.drawerVisible,
    isAnimating && styles.drawerAnimating,
    className,
  ].filter(Boolean).join(' ');

  // 오버레이 클래스
  const overlayClasses = [
    styles.overlay,
    isVisible && styles.overlayVisible,
    isAnimating && styles.overlayAnimating,
  ].filter(Boolean).join(' ');

  // 헤더 클래스
  const headerClasses = [
    styles.header,
    styles[`header--${size}`],
  ].filter(Boolean).join(' ');

  // 컨텐츠 클래스
  const contentClasses = [
    styles.content,
    styles[`content--${size}`],
  ].filter(Boolean).join(' ');

  // 오버레이 스타일
  const overlayStyle = {
    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
    zIndex: zIndex - 1,
  };

  // 드로어 스타일
  const drawerStyle = {
    zIndex,
    ...style,
  };

  if (!portalContainer || !isVisible) {
    return null;
  }

  return createPortal(
    <div className={styles.drawerContainer}>
      {/* 오버레이 */}
      {showOverlay && (
        <div
          className={overlayClasses}
          style={overlayStyle}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* 드로어 */}
      <div
        ref={drawerRef}
        className={drawerClasses}
        style={drawerStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        aria-label={ariaLabel || '드로어'}
        onClick={handleDrawerClick}
        tabIndex={-1}
      >
        {/* 헤더 */}
        {(title || showCloseButton) && (
          <div className={headerClasses}>
            {title && (
              <h2 id="drawer-title" className={styles.title}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="드로어 닫기"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* 컨텐츠 */}
        <div className={contentClasses}>
          {children}
        </div>
      </div>
    </div>,
    portalContainer
  );
}; 