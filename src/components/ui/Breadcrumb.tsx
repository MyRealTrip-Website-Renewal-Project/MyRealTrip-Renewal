import React from 'react';
import styles from '@/styles/ui/Breadcrumb.module.scss';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
  maxItems?: number;
  className?: string;
  ariaLabel?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  maxItems,
  className = '',
  ariaLabel = 'Breadcrumb',
}) => {
  const visibleItems = maxItems && items.length > maxItems 
    ? [
        ...items.slice(0, 1),
        { label: '...', href: undefined, onClick: undefined },
        ...items.slice(-maxItems + 2)
      ]
    : items;

  const renderSeparator = (index: number) => {
    if (index === visibleItems.length - 1) return null;
    
    return (
      <span className={styles.breadcrumbSeparator} aria-hidden="true">
        {separator}
      </span>
    );
  };

  const renderItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === visibleItems.length - 1;
    const isEllipsis = item.label === '...';
    
    const itemClasses = [
      styles.breadcrumbItem,
      isLast && styles.breadcrumbItemActive,
      isEllipsis && styles.breadcrumbItemEllipsis,
    ].filter(Boolean).join(' ');

    if (isEllipsis) {
      return (
        <li key={`ellipsis-${index}`} className={itemClasses}>
          <span className={styles.breadcrumbLink}>{item.label}</span>
        </li>
      );
    }

    if (item.href) {
      return (
        <li key={`${item.label}-${index}`} className={itemClasses}>
          <a
            href={item.href}
            className={styles.breadcrumbLink}
            onClick={item.onClick}
            aria-current={isLast ? 'page' : undefined}
          >
            {item.label}
          </a>
        </li>
      );
    }

    if (item.onClick) {
      return (
        <li key={`${item.label}-${index}`} className={itemClasses}>
          <button
            type="button"
            className={styles.breadcrumbLink}
            onClick={item.onClick}
            aria-current={isLast ? 'page' : undefined}
          >
            {item.label}
          </button>
        </li>
      );
    }

    return (
      <li key={`${item.label}-${index}`} className={itemClasses}>
        <span 
          className={styles.breadcrumbLink}
          aria-current={isLast ? 'page' : undefined}
        >
          {item.label}
        </span>
      </li>
    );
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={`${styles.breadcrumb} ${className}`} aria-label={ariaLabel}>
      <ol className={styles.breadcrumbList}>
        {visibleItems.map((item, index) => (
          <React.Fragment key={`item-${index}`}>
            {renderItem(item, index)}
            {renderSeparator(index)}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}; 