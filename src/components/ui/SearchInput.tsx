import React from 'react';
import styles from './SearchInput.module.scss';
import clsx from 'clsx';
import { MdSearch, MdClose } from 'react-icons/md';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  label,
  error,
  className,
  disabled,
  value,
  onChange,
  onClear,
  ...props
}) => {
  return (
    <div className={styles.searchInputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputBox}>
        <MdSearch className={styles.searchIcon} />
        <input
          className={clsx(
            styles.input,
            { [styles.error]: !!error, [styles.disabled]: disabled },
            className
          )}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...props}
        />
        {!!value && !disabled && (
          <button
            type="button"
            className={styles.clearButton}
            tabIndex={-1}
            onClick={onClear}
            aria-label="입력 지우기"
          >
            <MdClose />
          </button>
        )}
      </div>
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
}; 