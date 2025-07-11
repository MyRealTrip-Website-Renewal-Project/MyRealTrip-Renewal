import React from 'react';
import styles from '@/styles/ui/Divider.module.scss';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  size = 'md',
  color = 'default',
  className = '',
  style,
  children,
}) => {
  const dividerClasses = [
    styles.divider,
    styles[`divider--${orientation}`],
    styles[`divider--${variant}`],
    styles[`divider--${size}`],
    styles[`divider--${color}`],
    className,
  ].filter(Boolean).join(' ');

  if (children) {
    return (
      <div className={`${styles.dividerWithText} ${styles[`dividerWithText--${orientation}`]}`}>
        <div className={dividerClasses} style={style} />
        <span className={styles.dividerText}>{children}</span>
        <div className={dividerClasses} style={style} />
      </div>
    );
  }

  return <div className={dividerClasses} style={style} />;
}; 