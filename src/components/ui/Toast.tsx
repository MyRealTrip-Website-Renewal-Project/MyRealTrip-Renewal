import React from 'react';
import styles from './Toast.module.scss';
import clsx from 'clsx';
import { MdErrorOutline, MdInfoOutline, MdCheckCircle, MdWarningAmber, MdClose } from 'react-icons/md';

export type ToastType = 'error' | 'warning' | 'info' | 'success';

interface ToastProps {
  type?: ToastType;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const iconMap = {
  error: <MdErrorOutline className={styles.icon} />,
  warning: <MdWarningAmber className={styles.icon} />,
  info: <MdInfoOutline className={styles.icon} />,
  success: <MdCheckCircle className={styles.icon} />,
};

export const Toast: React.FC<ToastProps> = ({
  type = 'error',
  children,
  onClose,
  className,
}) => (
  <div
    className={clsx(styles.toast, styles[type], className)}
    role={type === 'error' ? 'alert' : 'status'}
    aria-live={type === 'error' ? 'assertive' : 'polite'}
  >
    {iconMap[type]}
    <span className={styles.text}>{children}</span>
    {onClose && (
      <button className={styles.close} onClick={onClose} aria-label="닫기">
        <MdClose />
      </button>
    )}
  </div>
); 