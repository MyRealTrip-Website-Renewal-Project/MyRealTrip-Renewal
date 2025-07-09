import React, { ReactNode } from 'react';
import styles from './Timeline.module.scss';

export interface TimelineItem {
  /** 아이템 키 */
  key: string;
  /** 아이템 제목 */
  title: string;
  /** 아이템 설명 */
  description?: string;
  /** 아이템 시간 */
  time?: string;
  /** 아이템 상태 */
  status?: 'active' | 'completed' | 'error' | 'warning' | 'disabled';
  /** 아이템 태그들 */
  tags?: string[];
  /** 아이템 아이콘 */
  icon?: ReactNode;
  /** 아이템 액션들 */
  actions?: TimelineAction[];
  /** 아이템 데이터 */
  data?: any;
}

export interface TimelineAction {
  /** 액션 키 */
  key: string;
  /** 액션 라벨 */
  label: string;
  /** 액션 타입 */
  type?: 'primary' | 'danger' | 'default';
  /** 액션 핸들러 */
  onClick: (item: TimelineItem) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface TimelineProps {
  /** 타임라인 아이템들 */
  items: TimelineItem[];
  /** 타임라인 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 타임라인 테마 */
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** 타임라인 레이아웃 */
  layout?: 'vertical' | 'alternate';
  /** 애니메이션 활성화 여부 */
  animated?: boolean;
  /** 아이템 클릭 핸들러 */
  onItemClick?: (item: TimelineItem) => void;
  /** 커스텀 클래스명 */
  className?: string;
  /** 빈 상태 메시지 */
  emptyText?: string;
  /** 로딩 상태 */
  loading?: boolean;
}

export const Timeline = ({
  items,
  size = 'md',
  theme = 'default',
  layout = 'vertical',
  animated = false,
  onItemClick,
  className = '',
  emptyText = '타임라인 데이터가 없습니다',
  loading = false
}: TimelineProps) => {
  const getContainerClasses = () => {
    const classes = [
      styles.timelineContainer,
      styles[size],
      theme !== 'default' && styles[theme],
      layout !== 'vertical' && styles[layout],
      className
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getItemClasses = (item: TimelineItem) => {
    const classes = [
      styles.timelineItem,
      item.status && styles[item.status],
      animated && styles.animated
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getDotClasses = (item: TimelineItem) => {
    const classes = [
      styles.timelineDot,
      item.icon && styles.custom
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const handleItemClick = (item: TimelineItem) => {
    if (item.status === 'disabled') return;
    onItemClick?.(item);
  };

  const renderTimelineItem = (item: TimelineItem) => (
    <div
      key={item.key}
      className={getItemClasses(item)}
      onClick={() => handleItemClick(item)}
      style={{ cursor: onItemClick ? 'pointer' : 'default' }}
    >
      <div className={getDotClasses(item)}>
        {item.icon ? (
          <div className={styles.customIcon}>
            {item.icon}
          </div>
        ) : null}
      </div>
      
      <div className={styles.timelineContent}>
        <div className={styles.timelineHeader}>
          <h4 className={styles.timelineTitle}>{item.title}</h4>
          {item.time && (
            <span className={styles.timelineTime}>{item.time}</span>
          )}
        </div>
        
        {item.description && (
          <div className={styles.timelineDescription}>
            {item.description}
          </div>
        )}
        
        {(item.tags || item.status) && (
          <div className={styles.timelineMeta}>
            {item.tags?.map(tag => (
              <span key={tag} className={styles.timelineTag}>
                {tag}
              </span>
            ))}
            {item.status && item.status !== 'active' && (
              <span className={`${styles.timelineStatus} ${styles[item.status]}`}>
                {item.status === 'completed' && '완료'}
                {item.status === 'error' && '오류'}
                {item.status === 'warning' && '경고'}
                {item.status === 'disabled' && '비활성'}
              </span>
            )}
          </div>
        )}
        
        {item.actions && (
          <div className={styles.timelineActions}>
            {item.actions.map(action => (
              <button
                key={action.key}
                className={`${styles.timelineAction} ${action.type ? styles[action.type] : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick(item);
                }}
                disabled={action.disabled}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
      {loading ? '로딩 중...' : emptyText}
    </div>
  );

  return (
    <div className={getContainerClasses()}>
      {items.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className={styles.timeline}>
          {items.map(renderTimelineItem)}
        </div>
      )}
    </div>
  );
};

export default Timeline; 