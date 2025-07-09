import React, { useState } from 'react';
import styles from './PasswordInput.module.scss';
import clsx from 'clsx';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  className,
  disabled,
  ...props
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.passwordInputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputBox}>
        <input
          type={show ? 'text' : 'password'}
          className={clsx(
            styles.input,
            { [styles.error]: !!error, [styles.disabled]: disabled },
            className
          )}
          disabled={disabled}
          {...props}
        />
        <button
          type="button"
          className={styles.icon}
          tabIndex={-1}
          onClick={() => setShow(v => !v)}
          aria-label={show ? '비밀번호 숨기기' : '비밀번호 보기'}
          disabled={disabled}
        >
          {show ? <MdVisibilityOff /> : <MdVisibility />}
        </button>
      </div>
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
}; 