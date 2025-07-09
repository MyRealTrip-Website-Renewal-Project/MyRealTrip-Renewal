import React from 'react';
import styles from './Radio.module.scss';
import clsx from 'clsx';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  error,
  checked,
  disabled,
  className,
  ...props
}) => {
  return (
    <label className={styles.radioWrapper}>
      <input
        type="radio"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <span
        className={clsx(
          styles.circle,
          { [styles.checked]: checked, [styles.error]: !!error, [styles.disabled]: disabled }
        )}
        aria-hidden="true"
      >
        <span className={clsx(styles.dot, { [styles.checked]: checked })} />
      </span>
      {label && (
        <span className={clsx(styles.label, { [styles.disabled]: disabled })}>{label}</span>
      )}
      {error && <span className={styles['error-message']}>{error}</span>}
    </label>
  );
}; 