import React from 'react';
import styles from '@/styles/ui/Timeline.module.scss';

export interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: 'pending' | 'active' | 'completed' | 'error';
  disabled?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  showDates?: boolean;
  showConnectors?: boolean;
  clickable?: boolean;
  onItemClick?: (itemIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = 'vertical',
  size = 'md',
  variant = 'default',
  showDates = true,
  showConnectors = true,
  clickable = false,
  onItemClick,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const handleItemClick = (itemIndex: number, item: TimelineItem) => {
    if (clickable && onItemClick && !item.disabled) {
      onItemClick(itemIndex);
    }
  };

  const getItemStatus = (item: TimelineItem): string => {
    if (item.status) return item.status;
    return 'pending';
  };

  const getDefaultIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'error':
        return '✕';
      case 'active':
        return '●';
      default:
        return '○';
    }
  };

  const getItemLabel = (item: TimelineItem, status: string) => {
    const baseLabel = item.title;
    
    if (status === 'completed') {
      return `${baseLabel} 완료`;
    }
    
    if (status === 'error') {
      return `${baseLabel} 오류`;
    }
    
    if (status === 'active') {
      return `${baseLabel} 진행 중`;
    }
    
    return baseLabel;
  };

  const timelineClasses = [
    styles.timeline,
    styles[`timeline--${orientation}`],
    styles[`timeline--${size}`],
    styles[`timeline--${variant}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={timelineClasses}
      style={style}
      role="list"
      aria-label={ariaLabel || '타임라인'}
    >
      {items.map((item, index) => {
        const status = getItemStatus(item);
        const isLast = index === items.length - 1;
        
        const itemClasses = [
          styles.timelineItem,
          styles[`timelineItem--${status}`],
          styles[`timelineItem--${size}`],
          styles[`timelineItem--${variant}`],
          clickable && !item.disabled && styles.timelineItemClickable,
          item.disabled && styles.timelineItemDisabled,
        ].filter(Boolean).join(' ');

        const iconClasses = [
          styles.timelineIcon,
          styles[`timelineIcon--${status}`],
          styles[`timelineIcon--${size}`],
          styles[`timelineIcon--${variant}`],
        ].filter(Boolean).join(' ');

        const contentClasses = [
          styles.timelineContent,
          styles[`timelineContent--${size}`],
        ].filter(Boolean).join(' ');

        return (
          <div key={index} className={styles.timelineItemContainer}>
            <div
              className={itemClasses}
              onClick={() => handleItemClick(index, item)}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable && !item.disabled ? 0 : undefined}
              aria-label={getItemLabel(item, status)}
              aria-disabled={item.disabled}
            >
              <div className={iconClasses}>
                {item.icon || getDefaultIcon(status)}
              </div>
              
              <div className={contentClasses}>
                <div className={styles.timelineTitle}>
                  {item.title}
                </div>
                {item.description && (
                  <div className={styles.timelineDescription}>
                    {item.description}
                  </div>
                )}
                {showDates && item.date && (
                  <div className={styles.timelineDate}>
                    {item.date}
                  </div>
                )}
              </div>
            </div>
            
            {showConnectors && !isLast && (
              <div className={styles.timelineConnector}>
                <div className={styles.timelineConnectorLine} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 