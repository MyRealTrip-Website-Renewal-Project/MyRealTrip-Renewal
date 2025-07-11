import React, { useEffect, useRef } from 'react';
import styles from '@/styles/ui/Modal.module.scss';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const Modal = ({ open, onClose, children, className = '', style, ariaLabel }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <div className={`${styles.modal} ${className}`} ref={ref} style={style}>
        <button className={styles.close} onClick={onClose} aria-label="닫기">×</button>
        {children}
      </div>
    </div>
  );
}; 