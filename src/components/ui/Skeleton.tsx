import React from 'react';
import styles from '@/styles/ui/Skeleton.module.scss';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export interface SkeletonTextProps {
  lines?: number;
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className = '',
  style,
}) => {
  const skeletonClasses = [
    styles.skeleton,
    styles[`skeleton--${variant}`],
    styles[`skeleton--${animation}`],
    className,
  ].filter(Boolean).join(' ');

  const skeletonStyle: React.CSSProperties = {
    width: width,
    height: height,
    ...style,
  };

  return <div className={skeletonClasses} style={skeletonStyle} />;
};

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 1,
  width,
  height,
  animation = 'pulse',
  className = '',
  style,
}) => {
  return (
    <div className={`${styles.skeletonText} ${className}`} style={style}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? width || '60%' : '100%'}
          height={height}
          animation={animation}
        />
      ))}
    </div>
  );
}; 