import React, { useState, useRef } from 'react';
import PromotionCardWide from './PromotionCardWide';
import styles from './PromotionSection.module.css';
import ArrowDownIcon from './ArrowDownIcon';

import promotion1 from '../../stories/assets/promotion1.jpg';
import promotion2 from '../../stories/assets/promotion2.jpg';
import promotion3 from '../../stories/assets/promotion3.jpg';
import promotion4 from '../../stories/assets/promotion1.jpg';
import promotion5 from '../../stories/assets/promotion2.jpg';
import promotion6 from '../../stories/assets/promotion3.jpg';
import promotion7 from '../../stories/assets/promotion1.jpg';
import promotion8 from '../../stories/assets/promotion2.jpg';
import promotion9 from '../../stories/assets/promotion3.jpg';

const promotions = [
  { image: promotion1, period: '7.7 - 7.10' },
  { image: promotion2, period: '7.11 - 7.14' },
  { image: promotion3, period: '7.15 - 7.18' },
  { image: promotion4, period: '7.19 - 7.22' },
  { image: promotion5, period: '7.23 - 7.26' },
  { image: promotion6, period: '7.27 - 7.30' },
  { image: promotion7, period: '8.1 - 8.4' },
  { image: promotion8, period: '8.5 - 8.8' },
  { image: promotion9, period: '8.9 - 8.12' },
];

function getCardsPerPage() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

const PromotionSection: React.FC = () => {
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = React.useState(getCardsPerPage());
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => setCardsPerPage(getCardsPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const TOTAL_PAGES = Math.ceil(promotions.length / cardsPerPage);
  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < TOTAL_PAGES - 1) setPage(page + 1);
  };

  const startIdx = page * cardsPerPage;
  const visiblePromos = promotions.slice(startIdx, startIdx + cardsPerPage);

  const handleCardClick = (promo: typeof promotions[0]) => {
    window.location.href = '#';
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>프로모션</h2>
      <div className={styles.sliderWrap}>
        {page > 0 && (
          <button
            className={`${styles.slideBtn} ${styles.leftBtn}`}
            onClick={handlePrev}
            aria-label="이전 프로모션 보기"
            type="button"
            aria-controls="promotion-slider"
            aria-disabled={page === 0}
          >
            <ArrowDownIcon style={{ transform: 'rotate(90deg)' }} />
          </button>
        )}
        <div className={styles.cardListOuter} ref={containerRef}>
          <div
            className={styles.cardList}
            id="promotion-slider"
            style={{ display: 'flex', justifyContent: 'center', gap: 24 }}
          >
            {visiblePromos.map((promo, idx) => (
              <PromotionCardWide
                key={idx}
                image={promo.image}
                period={promo.period}
                tabIndex={0}
                ariaLabel={promo.period}
                onClick={() => handleCardClick(promo)}
              />
            ))}
          </div>
        </div>
        {page < TOTAL_PAGES - 1 && (
          <button
            className={`${styles.slideBtn} ${styles.rightBtn}`}
            onClick={handleNext}
            aria-label="다음 프로모션 보기"
            type="button"
            aria-controls="promotion-slider"
            aria-disabled={page === TOTAL_PAGES - 1}
          >
            <ArrowDownIcon style={{ transform: 'rotate(-90deg)' }} />
          </button>
        )}
      </div>
    </section>
  );
};

export default PromotionSection; 