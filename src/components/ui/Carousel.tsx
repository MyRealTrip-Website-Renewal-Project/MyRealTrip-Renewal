import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from '@/styles/ui/Carousel.module.scss';

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
  alt?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showIndicators?: boolean;
  infinite?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  height?: string | number;
  width?: string | number;
  onSlideChange?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  showDots = true,
  showIndicators = true,
  infinite = true,
  size = 'md',
  variant = 'default',
  height,
  width,
  onSlideChange,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 자동 재생 처리
  useEffect(() => {
    if (isPlaying && autoPlay && items.length > 1) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPlaying, autoPlay, autoPlayInterval, items.length]);

  // 마우스 호버 시 자동 재생 일시정지
  const handleMouseEnter = useCallback(() => {
    if (autoPlay) {
      setIsPlaying(false);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }
  }, [autoPlay]);

  const handleMouseLeave = useCallback(() => {
    if (autoPlay) {
      setIsPlaying(true);
    }
  }, [autoPlay]);

  // 다음 슬라이드로 이동
  const goToNext = useCallback(() => {
    if (items.length === 0) return;

    const nextIndex = infinite 
      ? (currentIndex + 1) % items.length
      : Math.min(currentIndex + 1, items.length - 1);
    
    setCurrentIndex(nextIndex);
    onSlideChange?.(nextIndex);
  }, [currentIndex, items.length, infinite, onSlideChange]);

  // 이전 슬라이드로 이동
  const goToPrev = useCallback(() => {
    if (items.length === 0) return;

    const prevIndex = infinite
      ? (currentIndex - 1 + items.length) % items.length
      : Math.max(currentIndex - 1, 0);
    
    setCurrentIndex(prevIndex);
    onSlideChange?.(prevIndex);
  }, [currentIndex, items.length, infinite, onSlideChange]);

  // 특정 슬라이드로 이동
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
      onSlideChange?.(index);
    }
  }, [items.length, onSlideChange]);

  // 키보드 네비게이션
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        goToPrev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        goToNext();
        break;
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(items.length - 1);
        break;
    }
  }, [goToPrev, goToNext, goToSlide, items.length]);

  // 터치/스와이프 지원
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    setTouchStart(event.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    setTouchEnd(event.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, goToNext, goToPrev]);

  // 캐러셀 클래스
  const carouselClasses = [
    styles.carousel,
    styles[`carousel--${size}`],
    styles[`carousel--${variant}`],
    className,
  ].filter(Boolean).join(' ');

  // 컨테이너 스타일
  const containerStyle = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
    ...style,
  };

  if (items.length === 0) {
    return (
      <div className={carouselClasses} style={containerStyle}>
        <div className={styles.carouselEmpty}>
          캐러셀 아이템이 없습니다
        </div>
      </div>
    );
  }

  return (
    <div
      ref={carouselRef}
      className={carouselClasses}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel || '캐러셀'}
      aria-roledescription="carousel"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {/* 슬라이드 컨테이너 */}
      <div className={styles.carouselContainer}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={styles.carouselSlide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${items.length}`}
              aria-hidden={index !== currentIndex}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* 화살표 네비게이션 */}
      {showArrows && items.length > 1 && (
        <>
          <button
            type="button"
            className={styles.carouselArrow}
            onClick={goToPrev}
            aria-label="이전 슬라이드"
            disabled={!infinite && currentIndex === 0}
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.carouselArrow}
            onClick={goToNext}
            aria-label="다음 슬라이드"
            disabled={!infinite && currentIndex === items.length - 1}
          >
            ›
          </button>
        </>
      )}

      {/* 점 인디케이터 */}
      {showDots && items.length > 1 && (
        <div className={styles.carouselDots} role="tablist">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={[
                styles.carouselDot,
                index === currentIndex && styles.carouselDotActive,
              ].filter(Boolean).join(' ')}
              onClick={() => goToSlide(index)}
              aria-label={`${index + 1}번째 슬라이드로 이동`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      )}

      {/* 숫자 인디케이터 */}
      {showIndicators && items.length > 1 && (
        <div className={styles.carouselIndicators}>
          <span className={styles.carouselIndicatorText}>
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      )}

      {/* 자동 재생 컨트롤 */}
      {autoPlay && items.length > 1 && (
        <button
          type="button"
          className={styles.carouselPlayPause}
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? '자동 재생 일시정지' : '자동 재생 시작'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}
    </div>
  );
}; 