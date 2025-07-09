import React from 'react';
import styles from './List.module.scss';
import clsx from 'clsx';
import { IconType } from 'react-icons';

export interface ListItem {
  key: string | number;
  label: React.ReactNode;
  icon?: IconType;
  disabled?: boolean;
}

interface ListProps {
  items: ListItem[];
  selected?: string | number;
  onItemClick?: (key: string | number) => void;
  className?: string;
}

export const List: React.FC<ListProps> = ({ items, selected, onItemClick, className }) => (
  <div className={clsx(styles.list, className)} role="list">
    {items.map(item => {
      const Icon = item.icon;
      return (
        <div
          key={item.key}
          className={clsx(styles.item, {
            [styles.selected]: selected === item.key,
            [styles.disabled]: item.disabled,
          })}
          onClick={() => !item.disabled && onItemClick?.(item.key)}
          role="listitem"
          tabIndex={item.disabled ? -1 : 0}
          aria-selected={selected === item.key}
          aria-disabled={item.disabled}
        >
          {Icon && <Icon className={styles.icon} />}
          {item.label}
        </div>
      );
    })}
  </div>
); 