import React from 'react';
import styles from './ErrorMessage.module.scss';
import clsx from 'clsx';
import { MdErrorOutline, MdInfoOutline, MdCheckCircle, MdWarningAmber } from 'react-icons/md';

export type ErrorMessageType = 'error' | 'warning' | 'info' | 'success';

interface ErrorMessageProps {
  type?: ErrorMessageType;
  children: React.ReactNode;
  className?: string;
}

const iconMap = {
  error: <MdErrorOutline className={styles.icon} />,
  warning: <MdWarningAmber className={styles.icon} />,
  info: <MdInfoOutline className={styles.icon} />,
  success: <MdCheckCircle className={styles.icon} />,
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  type = 'error',
  children,
  className,
}) => (
  <div
    className={clsx(styles.errorMessage, styles[type], className)}
    role={type === 'error' ? 'alert' : 'status'}
    aria-live={type === 'error' ? 'assertive' : 'polite'}
  >
    {iconMap[type]}
    <span className={styles.text}>{children}</span>
  </div>
); 