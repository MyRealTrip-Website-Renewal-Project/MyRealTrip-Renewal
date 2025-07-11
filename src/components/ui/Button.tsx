import React from 'react';
import styles from '@/styles/ui/Button.module.scss';

export type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  as?: 'button' | 'a';
  href?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  as = 'button',
  href,
  ariaLabel,
  className = '',
  style,
  onClick,
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) return;
    onClick?.(e);
  };
  const content = loading ? <span className={styles.spinner} aria-hidden="true" /> : children;
  const btnClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;
  if (as === 'a' && href) {
    return (
      <a
        href={href}
        className={btnClass}
        aria-label={ariaLabel}
        style={style}
        aria-disabled={disabled || loading}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={btnClass}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      style={style}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}; 