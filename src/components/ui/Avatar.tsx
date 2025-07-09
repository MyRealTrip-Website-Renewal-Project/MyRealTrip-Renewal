import React from 'react';
import styles from './Avatar.module.scss';
import clsx from 'clsx';

export type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  src?: string;
  alt?: string;
  initial?: string;
  size?: AvatarSize;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initial,
  size = 'md',
  selected,
  disabled,
  className,
}) => (
  <span
    className={clsx(
      styles.avatar,
      styles[size],
      { [styles.selected]: selected, [styles.disabled]: disabled },
      className
    )}
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : 0}
    role="img"
    aria-label={alt || initial || '아바타'}
  >
    {src ? (
      <img src={src} alt={alt} className={styles.img} />
    ) : (
      <span className={styles.initial}>{initial || 'A'}</span>
    )}
  </span>
); 