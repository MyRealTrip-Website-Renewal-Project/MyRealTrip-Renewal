import React from 'react';
import styles from './PromotionCard.module.css';

interface PromotionCardProps {
  image: string;
  href?: string;
  alt?: string;
  index?: number;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ image, href = '#', alt = '프로모션 이미지', index }) => {
  return (
    <a className={styles.card} href={href} target="_blank" rel="noopener noreferrer">
      <img
        src={image}
        alt={alt}
        className={index === 1 ? `${styles.image} ${styles.left}` : styles.image}
      />
    </a>
  );
};

export default PromotionCard; 