import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
import { IconType } from 'react-icons';

export type InputAlign = 'left' | 'center' | 'right';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  align?: InputAlign;
  icon?: IconType;
}

const Input = React.memo(function Input(props: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <div className={styles.inputBox}>
        <input
          className={clsx(
            styles.input,
            styles[`input--${props.align}`],
            { [styles.error]: !!props.error, [styles.disabled]: props.disabled },
            props.className
          )}
          disabled={props.disabled}
          {...props}
        />
        {props.icon && <span className={styles.icon}><props.icon /></span>}
      </div>
      {props.error && <div className={styles['error-message']}>{props.error}</div>}
    </div>
  );
});

export { Input }; 