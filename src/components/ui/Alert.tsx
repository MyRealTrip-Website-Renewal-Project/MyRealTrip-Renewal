import React from 'react';
import styles from '@/styles/ui/Alert.module.scss';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  closable = false,
  onClose,
  className = '',
  icon,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const getDefaultIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  const alertClasses = [
    styles.alert,
    styles[`alert--${type}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={alertClasses} role="alert">
      <div className={styles.alertContent}>
        {(icon || getDefaultIcon()) && (
          <div className={styles.alertIcon}>
            {icon || getDefaultIcon()}
          </div>
        )}
        
        <div className={styles.alertBody}>
          {title && (
            <div className={styles.alertTitle}>
              {title}
            </div>
          )}
          <div className={styles.alertMessage}>
            {children}
          </div>
        </div>
        
        {closable && (
          <button
            type="button"
            className={styles.alertClose}
            onClick={handleClose}
            aria-label="알림 닫기"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}; 