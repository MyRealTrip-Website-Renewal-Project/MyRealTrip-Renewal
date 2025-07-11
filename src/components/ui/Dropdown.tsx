import React from 'react';
import styles from '@/styles/ui/Dropdown.module.scss';

export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  disabled = false,
  className = '',
  style,
  ariaLabel,
}: DropdownProps) => (
  <select
    className={`${styles.dropdown} ${className}`}
    value={value}
    onChange={e => onChange?.(e.target.value)}
    disabled={disabled}
    style={style}
    aria-label={ariaLabel}
  >
    <option value="" disabled hidden>{placeholder}</option>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
); 