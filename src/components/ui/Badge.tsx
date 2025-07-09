import React from 'react';
import styles from './Badge.module.scss';
import clsx from 'clsx';
import { IconType } from 'react-icons';

export type BadgeType = 'gray' | 'red' | 'blue' | 'green' | 'yellow';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  type?: BadgeType;
  size?: BadgeSize;
  icon?: IconType;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  type = 'gray',
  size = 'md',
  icon: Icon,
  children,
  className,
}) => (
  <span className={clsx(styles.badge, styles[type], styles[size], className)}>
    {Icon && <Icon className={styles.icon} />}
    {children}
  </span>
); 