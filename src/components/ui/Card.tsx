import React from 'react';
import styles from './Card.module.scss';
import clsx from 'clsx';

interface CardProps {
  media?: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Card = React.memo(function Card(props: CardProps) {
  const {
    media,
    header,
    body,
    footer,
    hoverable,
    selected,
    disabled,
    className,
    children,
  } = props;

  return (
    <div
      className={clsx(
        styles.card,
        { [styles.hoverable]: hoverable, [styles.selected]: selected, [styles.disabled]: disabled },
        className
      )}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {media && <div className={styles.media}>{media}</div>}
      {header && <div className={styles.header}>{header}</div>}
      {body && <div className={styles.body}>{body}</div>}
      {children}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
});

export { Card }; 