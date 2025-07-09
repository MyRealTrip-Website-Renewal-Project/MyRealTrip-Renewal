import React from 'react';
import styles from './Select.module.scss';
import clsx from 'clsx';

export type SelectAlign = 'left' | 'center' | 'right';

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  align?: SelectAlign;
  options: Option[];
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  align = 'left',
  className,
  disabled,
  options,
  required,
  ...props
}) => {
  return (
    <div className={styles.selectWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={clsx(
          styles.select,
          styles[`select--${align}`],
          { [styles.error]: !!error, [styles.disabled]: disabled },
          className
        )}
        disabled={disabled}
        required={required}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
}; 