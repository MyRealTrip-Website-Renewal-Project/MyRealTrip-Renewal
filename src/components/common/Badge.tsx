import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  icon: React.ReactNode;
  text: string;
  tabIndex?: number;
  role?: string;
}

const Badge: React.FC<BadgeProps> = ({ icon, text, tabIndex = 0, role = 'status' }) => (
  <span className={styles.badge} tabIndex={tabIndex} role={role} aria-label={text}>
    {icon}
    <span>{text}</span>
  </span>
);
export default Badge; 