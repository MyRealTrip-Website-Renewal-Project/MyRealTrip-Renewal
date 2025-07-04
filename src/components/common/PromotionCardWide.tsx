import React from 'react';
import styles from './PromotionCardWide.module.css';

export interface PromotionCardWideProps {
  image: string;
  period?: string;
  tabIndex?: number;
  role?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const PromotionCardWide: React.FC<PromotionCardWideProps> = ({
  image, period, tabIndex = 0, role = 'button', onClick, ariaLabel
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <div
      className={styles.banner}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel || period || '프로모션'}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <img src={image} alt={ariaLabel || period || '프로모션'} className={styles.img} />
      {period && <div className={styles.period}>{period}</div>}
    </div>
  );
};

export default PromotionCardWide; 