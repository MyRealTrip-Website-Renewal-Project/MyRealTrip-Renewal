import React from 'react';
import styles from './Tab.module.scss';
import clsx from 'clsx';
import { IconType } from 'react-icons';

export interface TabItem {
  label: string;
  value: string | number;
  icon?: IconType;
  disabled?: boolean;
}

interface TabProps {
  tabs: TabItem[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({ tabs, value, onChange, className }) => {
  return (
    <div className={clsx(styles.tabs, className)} role="tablist">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.value}
            className={clsx(styles.tab, {
              active: value === tab.value,
              [styles.active]: value === tab.value,
              [styles.disabled]: tab.disabled,
            })}
            onClick={() => !tab.disabled && onChange(tab.value)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={value === tab.value}
            tabIndex={tab.disabled ? -1 : 0}
          >
            {Icon && <Icon className={styles.icon} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}; 