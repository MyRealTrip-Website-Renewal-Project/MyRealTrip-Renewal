import React from 'react';
import styles from '@/styles/ui/Switch.module.scss';

export type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const Switch = ({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  className = '',
  style,
  ariaLabel,
}: SwitchProps) => (
  <label className={`${styles.switch} ${className}`} style={style} aria-label={ariaLabel}>
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      disabled={disabled}
      id={id}
      aria-label={ariaLabel}
    />
    <span className={styles.slider} />
    {label && <span className={styles.label}>{label}</span>}
  </label>
); 