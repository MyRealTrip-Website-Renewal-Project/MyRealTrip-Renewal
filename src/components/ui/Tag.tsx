import React from 'react';
import styles from '@/styles/ui/Tag.module.scss';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  closable?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  closable = false,
  disabled = false,
  className = '',
  style,
  onClose,
  onClick,
}) => {
  const tagClasses = [
    styles.tag,
    styles[`tag--${variant}`],
    styles[`tag--${size}`],
    closable && styles.tagClosable,
    disabled && styles.tagDisabled,
    onClick && styles.tagClickable,
    className,
  ].filter(Boolean).join(' ');

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onClose) {
      onClose();
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <span className={tagClasses} style={style} onClick={handleClick}>
      <span className={styles.tagContent}>{children}</span>
      {closable && (
        <button
          type="button"
          className={styles.tagClose}
          onClick={handleClose}
          disabled={disabled}
          aria-label="태그 제거"
        >
          ×
        </button>
      )}
    </span>
  );
}; 