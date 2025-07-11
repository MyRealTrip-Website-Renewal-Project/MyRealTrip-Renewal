import React from 'react';
import styles from '@/styles/ui/Loader.module.scss';

export type LoaderProps = {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const Loader = ({ size = 32, color = '#0078ff', className = '', style, ariaLabel = '로딩중' }: LoaderProps) => (
  <span
    className={`${styles.loader} ${className}`}
    style={{ width: size, height: size, borderColor: color, ...style }}
    role="status"
    aria-label={ariaLabel}
  />
); 