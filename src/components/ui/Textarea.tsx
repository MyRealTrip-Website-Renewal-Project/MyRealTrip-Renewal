import React from 'react';
import styles from './Textarea.module.scss';
import clsx from 'clsx';
import { IconType } from 'react-icons';

export type TextareaAlign = 'left' | 'center' | 'right';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  align?: TextareaAlign;
  icon?: IconType;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  align = 'left',
  className,
  disabled,
  icon: Icon,
  ...props
}) => {
  return (
    <div className={styles.textareaWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.textareaBox}>
        <textarea
          className={clsx(
            styles.textarea,
            styles[`textarea--${align}`],
            { [styles.error]: !!error, [styles.disabled]: disabled },
            className
          )}
          disabled={disabled}
          {...props}
        />
        {Icon && <span className={styles.icon}><Icon /></span>}
      </div>
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
}; 