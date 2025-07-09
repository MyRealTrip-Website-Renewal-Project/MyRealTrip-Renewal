import React from 'react';
import styles from './StepperSimple.module.scss';
import clsx from 'clsx';

interface StepperSimpleProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export const StepperSimple: React.FC<StepperSimpleProps> = ({
  value,
  min = 1,
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
  return (
    <div className={styles.stepperSimpleWrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        aria-label="감소"
      >
        -
      </button>
      <span className={styles.value}>{value}</span>
      <button
        type="button"
        className={styles.button}
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        aria-label="증가"
      >
        +
      </button>
    </div>
  );
}; 