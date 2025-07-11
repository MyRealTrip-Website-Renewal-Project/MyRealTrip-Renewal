import React, { useEffect } from 'react';
import styles from '@/styles/ui/Toast.module.scss';

export type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export const Toast = ({ message, type = 'info', duration = 3000, onClose, className = '', style }: ToastProps) => {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);
  return (
    <div className={`${styles.toast} ${styles[type]} ${className}`} style={style} role="status">
      {message}
      {onClose && <button className={styles.close} onClick={onClose} aria-label="닫기">×</button>}
    </div>
  );
}; 