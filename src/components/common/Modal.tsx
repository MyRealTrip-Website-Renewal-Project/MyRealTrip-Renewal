import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import {
  ModalOverlay,
  ModalContent,
  modalOverlayVariants,
  modalContentVariants,
} from './Modal.styled';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  showCloseButton = true,
}) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // 오버레이 클릭으로 모달 닫기
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <ModalOverlay
        variants={modalOverlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={handleOverlayClick}
      >
        <ModalContent
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {title && (
            <div style={{
              padding: '1rem 1.5rem',
              borderBottom: '1px solid #f0f0f0',
              fontSize: '1.25rem',
              fontWeight: 600,
            }}>
              {title}
            </div>
          )}
          <div style={{ padding: '1.5rem' }}>
            {children}
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666',
                padding: '0.25rem',
                borderRadius: '4px',
              }}
              aria-label="닫기"
            >
              ×
            </button>
          )}
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>,
    document.body
  );
};

export default Modal; 