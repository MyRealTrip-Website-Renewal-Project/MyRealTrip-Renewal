import React from 'react';
import styles from './Checkbox.module.scss';
import clsx from 'clsx';
import { MdCheck } from 'react-icons/md';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  checked,
  disabled,
  className,
  ...props
}) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <span
        className={clsx(
          styles.box,
          { [styles.checked]: checked, [styles.error]: !!error, [styles.disabled]: disabled }
        )}
        aria-hidden="true"
      >
        <MdCheck className={clsx(styles.checkIcon, { [styles.checked]: checked })} />
      </span>
      {label && (
        <span className={clsx(styles.label, { [styles.disabled]: disabled })}>{label}</span>
      )}
      {error && <span className={styles['error-message']}>{error}</span>}
    </label>
  );
}; 