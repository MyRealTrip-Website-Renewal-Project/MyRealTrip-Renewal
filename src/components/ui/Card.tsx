import React from 'react';
import styles from '@/styles/ui/Card.module.scss';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  height?: string | number;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface CardSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end' | 'space-between';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  style,
}) => {
  const cardClasses = [
    styles.card,
    styles[`card--${variant}`],
    styles[`card--${size}`],
    onClick && styles.cardClickable,
    disabled && styles.cardDisabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardHeader} ${className}`}>
    {children}
  </div>
);

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardBody} ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardFooter} ${className}`}>
    {children}
  </div>
);

export const CardImage: React.FC<CardImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  height 
}) => (
  <div className={`${styles.cardImage} ${className}`}>
    <img 
      src={src} 
      alt={alt} 
      style={height ? { height } : undefined}
    />
  </div>
);

export const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h3' 
}) => (
  <Component className={`${styles.cardTitle} ${className}`}>
    {children}
  </Component>
);

export const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className = '' }) => (
  <div className={`${styles.cardSubtitle} ${className}`}>
    {children}
  </div>
);

export const CardActions: React.FC<CardActionsProps> = ({ 
  children, 
  className = '', 
  align = 'end' 
}) => (
  <div className={`${styles.cardActions} ${styles[`cardActions--${align}`]} ${className}`}>
    {children}
  </div>
); 