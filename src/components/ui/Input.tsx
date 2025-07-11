import React, { useId } from 'react';
import styles from '@/styles/ui/Input.module.scss';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', style, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id || autoId;
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div className={styles.inputWrapper} style={style}>
        {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
        <input
          ref={ref}
          id={inputId}
          className={`${styles.input} ${className}`}
          aria-invalid={!!error}
          aria-describedby={errorId}
          {...props}
        />
        {error && <span className={styles.error} id={errorId}>{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input'; 