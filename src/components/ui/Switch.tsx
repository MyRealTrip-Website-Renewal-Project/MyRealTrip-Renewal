import React from 'react';
import styles from './Switch.module.scss';
import clsx from 'clsx';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  error,
  checked,
  disabled,
  className,
  ...props
}) => {
  return (
    <label className={styles.switchWrapper}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <span
        className={clsx(
          styles.track,
          { [styles.checked]: checked, [styles.error]: !!error, [styles.disabled]: disabled }
        )}
        aria-hidden="true"
      >
        <span className={styles.thumb} />
      </span>
      {label && (
        <span className={clsx(styles.label, { [styles.disabled]: disabled })}>{label}</span>
      )}
      {error && <span className={styles['error-message']}>{error}</span>}
    </label>
  );
}; 