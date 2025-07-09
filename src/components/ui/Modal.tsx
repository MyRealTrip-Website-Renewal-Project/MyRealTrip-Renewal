import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import styles from './Modal.module.scss';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalType = 'default' | 'alert' | 'confirm' | 'success';
export type ModalFooterAlign = 'left' | 'center' | 'right' | 'space-between';

export interface ModalButton {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  size?: ModalSize;
  type?: ModalType;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  loading?: boolean;
  error?: string;
  footer?: React.ReactNode;
  footerAlign?: ModalFooterAlign;
  buttons?: ModalButton[];
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
  type = 'default',
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
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // 포커스 트랩 설정
  useEffect(() => {
    if (isOpen) {
      // 이전 포커스 요소 저장
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // 모달 내부로 포커스 이동
      const focusableElements = modalRef.current?.querySelectorAll(
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
          className={`${styles.modal__button} ${styles[`modal__button--${button.variant || 'secondary'}`]}`}
          onClick={button.onClick}
          disabled={button.disabled || loading}
        >
          {button.loading ? '로딩 중...' : button.label}
        </button>
      ));
    }

    if (type === 'confirm') {
      return (
        <>
          <button
            className={`${styles.modal__button} ${styles['modal__button--secondary']}`}
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={`${styles.modal__button} ${styles['modal__button--danger']}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {confirmText}
          </button>
        </>
      );
    }

    if (type === 'alert') {
      return (
        <button
          className={`${styles.modal__button} ${styles['modal__button--primary']}`}
          onClick={onClose}
          disabled={loading}
        >
          확인
        </button>
      );
    }

    return null;
  };

  // 타입별 아이콘 렌더링
  const renderTypeIcon = () => {
    switch (type) {
      case 'alert':
        return <FiAlertTriangle className={styles.modal__icon} />;
      case 'confirm':
        return <FiAlertTriangle className={styles.modal__icon} />;
      case 'success':
        return <FiCheckCircle className={styles.modal__icon} />;
      default:
        return <FiInfo className={styles.modal__icon} />;
    }
  };

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  const modalContent = (
    <div 
      className={`${styles.modal} ${styles['modal--open']} ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={subtitle ? 'modal-subtitle' : undefined}
    >
      <div 
        className={`${styles.modal__overlay} ${overlayClassName}`}
        onClick={handleOverlayClick}
      />
      
      <div 
        ref={modalRef}
        className={`${styles.modal__content} ${styles[`modal__content--${size}`]} ${styles[`modal__content--${type}`]} ${contentClassName}`}
        role="document"
      >
        {/* 헤더 */}
        {(title || showCloseButton) && (
          <div className={styles.modal__header}>
            <div>
              {type !== 'default' && renderTypeIcon()}
              {title && (
                <h2 id="modal-title" className={styles.modal__title}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p id="modal-subtitle" className={styles.modal__subtitle}>
                  {subtitle}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                className={styles.modal__close}
                onClick={onClose}
                aria-label="모달 닫기"
                disabled={loading}
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        )}

        {/* 바디 */}
        <div className={styles.modal__body}>
          {loading && (
            <div className={styles.modal__loading}>
              <div>로딩 중...</div>
            </div>
          )}
          
          {error && (
            <div className={styles.modal__error}>
              {error}
            </div>
          )}
          
          {!loading && children}
        </div>

        {/* 푸터 */}
        {(footer || buttons || type === 'confirm' || type === 'alert') && (
          <div className={`${styles.modal__footer} ${styles[`modal__footer--${footerAlign}`]}`}>
            {footer || renderDefaultButtons()}
          </div>
        )}
      </div>
    </div>
  );

  // Portal을 사용하여 body에 렌더링
  return createPortal(modalContent, document.body);
};

export default Modal; 