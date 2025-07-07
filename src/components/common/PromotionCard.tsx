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
  image, tabIndex = 0, role = 'article'
}) => (
  <div className={styles.card} tabIndex={tabIndex} role={role}>
    <img src={image} alt="프로모션 이미지" className={styles.img} />
  </div>
);

export default PromotionCard; 