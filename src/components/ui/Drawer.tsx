import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiChevronLeft, FiChevronRight, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import styles from './Drawer.module.scss';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DrawerFooterAlign = 'left' | 'center' | 'right' | 'space-between';

export interface DrawerButton {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  position?: DrawerPosition;
  size?: DrawerSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  loading?: boolean;
  error?: string;
  footer?: React.ReactNode;
  footerAlign?: DrawerFooterAlign;
  buttons?: DrawerButton[];
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  loading = false,
  error,
  footer,
  footerAlign = 'right',
  buttons,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  className = '',
  contentClassName = '',
  overlayClassName = ''
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // 포커스 트랩 설정
  useEffect(() => {
    if (isOpen) {
      // 이전 포커스 요소 저장
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // 드로어 내부로 포커스 이동
      const focusableElements = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }

      // ESC 키 이벤트 리스너
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // 스크롤 방지

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        
        // 이전 포커스 요소로 복원
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isOpen, closeOnEscape, onClose]);

  // 오버레이 클릭 핸들러
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // 기본 버튼 핸들러
  const handleConfirm = useCallback(() => {
    onConfirm?.();
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onCancel, onClose]);

  // 기본 버튼 렌더링
  const renderDefaultButtons = () => {
    if (buttons) {
      return buttons.map((button, index) => (
        <button
          key={index}
          className={`${styles.drawer__button} ${styles[`drawer__button--${button.variant || 'secondary'}`]}`}
          onClick={button.onClick}
          disabled={button.disabled || loading}
        >
          {button.loading ? '로딩 중...' : button.label}
        </button>
      ));
    }

    return (
      <>
        <button
          className={`${styles.drawer__button} ${styles['drawer__button--secondary']}`}
          onClick={handleCancel}
          disabled={loading}
        >
          {cancelText}
        </button>
        <button
          className={`${styles.drawer__button} ${styles['drawer__button--primary']}`}
          onClick={handleConfirm}
          disabled={loading}
        >
          {confirmText}
        </button>
      </>
    );
  };

  // 위치별 닫기 아이콘 렌더링
  const renderCloseIcon = () => {
    switch (position) {
      case 'left':
        return <FiChevronLeft size={16} />;
      case 'right':
        return <FiChevronRight size={16} />;
      case 'top':
        return <FiChevronUp size={16} />;
      case 'bottom':
        return <FiChevronDown size={16} />;
      default:
        return <FiX size={16} />;
    }
  };

  // 드로어가 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  const drawerContent = (
    <div 
      className={`${styles.drawer} ${styles['drawer--open']} ${styles[`drawer--${position}`]} ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
      aria-describedby={subtitle ? 'drawer-subtitle' : undefined}
    >
      <div 
        className={`${styles.drawer__overlay} ${overlayClassName}`}
        onClick={handleOverlayClick}
      />
      
      <div 
        ref={drawerRef}
        className={`${styles.drawer__content} ${styles[`drawer__content--${position}`]} ${styles[`drawer__content--${size}`]} ${contentClassName}`}
        role="document"
      >
        {/* 헤더 */}
        {(title || showCloseButton) && (
          <div className={styles.drawer__header}>
            <div>
              {title && (
                <h2 id="drawer-title" className={styles.drawer__title}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p id="drawer-subtitle" className={styles.drawer__subtitle}>
                  {subtitle}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                className={styles.drawer__close}
                onClick={onClose}
                aria-label="드로어 닫기"
                disabled={loading}
              >
                {renderCloseIcon()}
              </button>
            )}
          </div>
        )}

        {/* 바디 */}
        <div className={styles.drawer__body}>
          {loading && (
            <div className={styles.drawer__loading}>
              <div>로딩 중...</div>
            </div>
          )}
          
          {error && (
            <div className={styles.drawer__error}>
              {error}
            </div>
          )}
          
          {!loading && children}
        </div>

        {/* 푸터 */}
        {(footer || buttons) && (
          <div className={`${styles.drawer__footer} ${styles[`drawer__footer--${footerAlign}`]}`}>
            {footer || renderDefaultButtons()}
          </div>
        )}
      </div>
    </div>
  );

  // Portal을 사용하여 body에 렌더링
  return createPortal(drawerContent, document.body);
};

export default Drawer; 