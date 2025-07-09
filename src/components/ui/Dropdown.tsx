import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import clsx from 'clsx';

export type DropdownAlign = 'left' | 'center' | 'right';

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface DropdownProps {
  label?: string;
  error?: string;
  align?: DropdownAlign;
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  error,
  align = 'left',
  options,
  value,
  onChange,
  disabled,
  required,
  placeholder = '선택하세요',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(opt => opt.value === value);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={styles.dropdownWrapper} ref={ref}>
      {label && <label className={styles.label}>{label}{required && ' *'}</label>}
      <button
        type="button"
        className={clsx(
          styles.dropdown,
          styles[`dropdown--${align}`],
          { [styles.error]: !!error, [styles.disabled]: disabled, active: open }
        )}
        onClick={() => !disabled && setOpen(v => !v)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected ? selected.label : <span style={{ color: '#aaa' }}>{placeholder}</span>}</span>
        <span style={{ marginLeft: 8, fontSize: 12 }}>▼</span>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              className={clsx(styles.menuItem, {
                active: value === opt.value,
                [styles.disabled]: opt.disabled,
              })}
              onClick={() => {
                if (!opt.disabled && onChange) {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
              aria-selected={value === opt.value}
              role="option"
              tabIndex={-1}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
}; 