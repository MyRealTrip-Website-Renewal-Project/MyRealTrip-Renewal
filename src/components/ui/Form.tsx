import React from 'react';
import styles from '@/styles/ui/Form.module.scss';

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const Form = ({ className = '', style, children, ...props }: FormProps) => (
  <form className={`${styles.form} ${className}`} style={style} {...props}>
    {children}
  </form>
); 