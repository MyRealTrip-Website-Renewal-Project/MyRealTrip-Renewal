import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import PromotionCard from './PromotionCard';
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
  { image: promotion1, href: '#', alt: '프로모션 1' },
  { image: promotion2, href: '#', alt: '프로모션 2' },
  { image: promotion3, href: '#', alt: '프로모션 3' },
  { image: promotion4, href: '#', alt: '프로모션 4' },
  { image: promotion5, href: '#', alt: '프로모션 5' },
  { image: promotion6, href: '#', alt: '프로모션 6' },
  { image: promotion7, href: '#', alt: '프로모션 7' },
  { image: promotion8, href: '#', alt: '프로모션 8' },
  { image: promotion9, href: '#', alt: '프로모션 9' },
];

const CARDS_PER_PAGE = 3;
const GAP = 24; // px
const TOTAL_PAGES = Math.ceil(promotions.length / CARDS_PER_PAGE);

const PromotionSection: React.FC = () => {
  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [offset, setOffset] = useState(0);

  // 카드 3개씩 묶음의 첫 번째 카드 index
  const firstCardIdx = page * CARDS_PER_PAGE;

  useLayoutEffect(() => {
    if (cardRefs.current[firstCardIdx]) {
      setOffset(cardRefs.current[firstCardIdx]!.offsetLeft);
    }
  }, [page, containerRef.current]);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < TOTAL_PAGES - 1) setPage(page + 1);
  };

  const cardListStyle: React.CSSProperties = {
    transform: `translateX(-${offset}px)` ,
    transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex',
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
          >
            <ArrowDownIcon style={{ transform: 'rotate(90deg)' }} />
          </button>
        )}
        <div className={styles.cardListOuter} ref={containerRef}>
          <div className={styles.cardList} style={cardListStyle}>
            {promotions.map((promo, idx) => (
              <div
                key={idx}
                ref={el => { cardRefs.current[idx] = el; }}
                style={{
                  minWidth: `calc((100% - ${(CARDS_PER_PAGE - 1) * GAP}px) / ${CARDS_PER_PAGE})`,
                  maxWidth: `calc((100% - ${(CARDS_PER_PAGE - 1) * GAP}px) / ${CARDS_PER_PAGE})`,
                  flex: `0 0 calc((100% - ${(CARDS_PER_PAGE - 1) * GAP}px) / ${CARDS_PER_PAGE})`,
                  marginRight: (idx !== promotions.length - 1) ? GAP : 0,
                }}
              >
                <PromotionCard
                  image={promo.image}
                  href={promo.href}
                  alt={promo.alt}
                  index={idx % CARDS_PER_PAGE}
                />
              </div>
            ))}
          </div>
        </div>
        {page < TOTAL_PAGES - 1 && (
          <button
            className={`${styles.slideBtn} ${styles.rightBtn}`}
            onClick={handleNext}
            aria-label="다음 프로모션 보기"
            type="button"
          >
            <ArrowDownIcon style={{ transform: 'rotate(-90deg)' }} />
          </button>
        )}
      </div>
    </section>
  );
};

export default PromotionSection; 