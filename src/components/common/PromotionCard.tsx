import React from 'react';
import styles from './PromotionCard.module.css';

export interface PromotionCardProps {
  image: string;
  title: string;
  buttonText: string;
  buttonUrl: string;
  tabIndex?: number;
  role?: string;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  image, title, buttonText, buttonUrl, tabIndex = 0, role = 'article'
}) => (
  <div className={styles.card} tabIndex={tabIndex} role={role} aria-label={title}>
    <img src={image} alt={title} className={styles.img} />
    <div className={styles.info}>
      <div className={styles.title}>{title}</div>
      <a href={buttonUrl} className={styles.btn} aria-label={buttonText}>{buttonText}</a>
    </div>
  </div>
);

export default PromotionCard; 