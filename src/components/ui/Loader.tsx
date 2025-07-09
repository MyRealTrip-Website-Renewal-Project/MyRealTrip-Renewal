import React from 'react';
import styles from './Loader.module.scss';
import clsx from 'clsx';

export type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps {
  size?: LoaderSize;
  className?: string;
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  className,
  label = '로딩 중',
}) => (
  <div className={styles.loaderWrapper}>
    <span className={clsx(styles.loader, styles[size], className)} aria-live="polite" aria-busy="true" />
    <span className={styles.srOnly}>{label}</span>
  </div>
); 