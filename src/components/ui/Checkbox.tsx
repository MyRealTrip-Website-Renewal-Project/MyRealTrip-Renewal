import React from 'react';
import styles from '@/styles/ui/Checkbox.module.scss';

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  className = '',
  style,
  ariaLabel,
}: CheckboxProps) => (
  <label className={`${styles.checkbox} ${className}`} style={style} aria-label={ariaLabel}>
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      disabled={disabled}
      id={id}
      aria-label={ariaLabel}
    />
    <span className={styles.checkmark} />
    {label && <span className={styles.label}>{label}</span>}
  </label>
); 