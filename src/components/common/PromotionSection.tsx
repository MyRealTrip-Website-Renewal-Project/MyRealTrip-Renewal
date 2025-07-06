import React, { useState, useRef, useEffect } from 'react';
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

function getCardWidth() {
  if (window.innerWidth <= 600) return window.innerWidth * 0.92; // 92vw
  if (window.innerWidth <= 900) return window.innerWidth * 0.48; // 48vw
  return 365; // 데스크톱 기본 너비
}

function getCardGap() {
  if (window.innerWidth <= 600) return 12; // var(--spacing-md)
  return 24; // 기본 gap
}

const PromotionSection: React.FC = () => {
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = React.useState(getCardsPerPage());
  const [cardWidth, setCardWidth] = React.useState(getCardWidth());
  const [cardGap, setCardGap] = React.useState(getCardGap());
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
      setCardWidth(getCardWidth());
      setCardGap(getCardGap());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 자동 슬라이드 기능
  useEffect(() => {
    if (!isAutoPlaying) return;
    const TOTAL_PAGES = Math.ceil(promotions.length / cardsPerPage);
    autoPlayRef.current = setInterval(() => {
      setPage((prevPage) => {
        if (prevPage >= TOTAL_PAGES - 1) return 0;
        return prevPage + 1;
      });
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, cardsPerPage]);

  const TOTAL_PAGES = Math.ceil(promotions.length / cardsPerPage);

  // 순환 슬라이드
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPage((prev) => (prev === 0 ? TOTAL_PAGES - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
    setTimeout(() => setIsAnimating(false), 500);
  };
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPage((prev) => (prev === TOTAL_PAGES - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // 터치 제스처 처리
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleCardClick = (promo: typeof promotions[0]) => {
    window.location.href = '#';
  };

  // 중앙 정렬 슬라이드 오프셋 계산
  const totalWidth = cardsPerPage * cardWidth + (cardsPerPage - 1) * cardGap;
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const sidePadding = Math.max((containerWidth - totalWidth) / 2, 0);
  const slideOffset = sidePadding - (page * (cardWidth + cardGap) * cardsPerPage);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>프로모션</h2>
      <div
        className={styles.sliderWrap}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className={`${styles.slideBtn} ${styles.leftBtn} ${isAnimating ? styles.disabled : ''}`}
          onClick={handlePrev}
          aria-label="이전 프로모션 보기"
          type="button"
          aria-controls="promotion-slider"
          aria-disabled={isAnimating}
          disabled={isAnimating}
        >
          <ArrowDownIcon style={{ transform: 'rotate(90deg)' }} />
        </button>
        <div className={styles.cardListOuter} ref={containerRef}>
          <div
            className={`${styles.cardList} ${isAnimating ? styles.animating : ''}`}
            id="promotion-slider"
            style={{
              transform: `translateX(${slideOffset}px)`,
              display: 'flex',
              gap: `${cardGap}px`,
              justifyContent: 'flex-start',
              minWidth: '100vw',
            }}
          >
            {promotions.map((promo, idx) => (
              <div
                key={idx}
                className={styles.cardWrapper}
                style={{
                  flex: `0 0 ${cardWidth}px`,
                  width: `${cardWidth}px`,
                  maxWidth: '98vw',
                }}
              >
                <PromotionCardWide
                  image={promo.image}
                  period={promo.period}
                  tabIndex={0}
                  ariaLabel={promo.period}
                  onClick={() => handleCardClick(promo)}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className={`${styles.slideBtn} ${styles.rightBtn} ${isAnimating ? styles.disabled : ''}`}
          onClick={handleNext}
          aria-label="다음 프로모션 보기"
          type="button"
          aria-controls="promotion-slider"
          aria-disabled={isAnimating}
          disabled={isAnimating}
        >
          <ArrowDownIcon style={{ transform: 'rotate(-90deg)' }} />
        </button>
      </div>
      {/* 페이지 인디케이터 */}
      <div className={styles.pageIndicator}>
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <button
            key={i}
            className={`${styles.indicatorDot} ${i === page ? styles.active : ''}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setPage(i);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            aria-label={`${i + 1}페이지로 이동`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </section>
  );
};

export default PromotionSection; 