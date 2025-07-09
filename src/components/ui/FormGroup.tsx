import React from 'react';
import styles from './FormGroup.module.scss';
import clsx from 'clsx';

interface FormGroupProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  description,
  error,
  required,
  children,
  className,
}) => {
  return (
    <div className={clsx(styles.formGroup, className)}>
      {label && (
        <div className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </div>
      )}
      {description && <div className={styles.description}>{description}</div>}
      {children}
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
}; 