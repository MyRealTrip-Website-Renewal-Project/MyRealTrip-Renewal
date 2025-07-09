import React from 'react';
import styles from './Stepper.module.scss';
import clsx from 'clsx';
import { MdRemove, MdAdd } from 'react-icons/md';

interface StepperProps {
  label?: string;
  error?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  label,
  error,
  value,
  min = 0,
  max = 99,
  step = 1,
  disabled,
  onChange,
}) => {
  const handleDecrease = () => {
    if (!disabled && value > min) onChange(value - step);
  };
  const handleIncrease = () => {
    if (!disabled && value < max) onChange(value + step);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (!isNaN(v) && v >= min && v <= max) onChange(v);
  };
  return (
    <div className={styles.stepperWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.stepperBox}>
        <button
          type="button"
          className={styles.button}
          onClick={handleDecrease}
          disabled={disabled || value <= min}
          aria-label="감소"
        >
          <MdRemove />
        </button>
        <input
          type="number"
          className={clsx(
            styles.input,
            { [styles.error]: !!error, [styles.disabled]: disabled }
          )}
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={handleInput}
        />
        <button
          type="button"
          className={styles.button}
          onClick={handleIncrease}
          disabled={disabled || value >= max}
          aria-label="증가"
        >
          <MdAdd />
        </button>
      </div>
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
}; 