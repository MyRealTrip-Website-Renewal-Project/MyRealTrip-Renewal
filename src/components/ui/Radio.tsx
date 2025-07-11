import React from 'react';
import styles from '@/styles/ui/Radio.module.scss';

export type RadioProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const Radio = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  name,
  className = '',
  style,
  ariaLabel,
}: RadioProps) => (
  <label className={`${styles.radio} ${className}`} style={style} aria-label={ariaLabel}>
    <input
      type="radio"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      id={id}
      name={name}
      aria-label={ariaLabel}
    />
    <span className={styles.checkmark} />
    {label && <span className={styles.label}>{label}</span>}
  </label>
); 