import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonAlign = 'left' | 'center' | 'right';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  align?: ButtonAlign;
  children: React.ReactNode;
}

const Button = React.memo(function Button(props: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`button--${props.variant}`],
        styles[`button--${props.align}`],
        props.className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
});

export { Button }; 