import React, { useState, useEffect, useRef, ReactNode } from 'react';
import styles from './Carousel.module.scss';

export interface CarouselSlide {
  /** 슬라이드 이미지 URL */
  image: string;
  /** 슬라이드 제목 */
  title?: string;
  /** 슬라이드 설명 */
  description?: string;
  /** 슬라이드 링크 */
  link?: string;
  /** 커스텀 콘텐츠 */
  content?: ReactNode;
}

export interface CarouselProps {
  /** 캐러셀 슬라이드들 */
  slides: CarouselSlide[];
  /** 캐러셀 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 캐러셀 테마 */
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** 자동 재생 여부 */
  autoPlay?: boolean;
  /** 자동 재생 간격 (ms) */
  autoPlayInterval?: number;
  /** 무한 루프 여부 */
  infinite?: boolean;
  /** 네비게이션 버튼 표시 여부 */
  showNavigation?: boolean;
  /** 인디케이터 표시 여부 */
  showIndicators?: boolean;
  /** 자동 재생 컨트롤 표시 여부 */
  showControls?: boolean;
  /** 애니메이션 타입 */
  animation?: 'slide' | 'fade';
  /** 커스텀 클래스명 */
  className?: string;
  /** 슬라이드 변경 콜백 */
  onSlideChange?: (index: number) => void;
}

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  size = 'md',
  theme = 'default',
  autoPlay = false,
  autoPlayInterval = 3000,
  infinite = true,
  showNavigation = true,
  showIndicators = true,
  showControls = false,
  animation = 'slide',
  className = '',
  onSlideChange
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    onSlideChange?.(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const nextSlide = () => {
    if (infinite || currentSlide < totalSlides - 1) {
      const nextIndex = infinite 
        ? (currentSlide + 1) % totalSlides 
        : Math.min(currentSlide + 1, totalSlides - 1);
      goToSlide(nextIndex);
    }
  };

  const prevSlide = () => {
    if (infinite || currentSlide > 0) {
      const prevIndex = infinite 
        ? (currentSlide - 1 + totalSlides) % totalSlides 
        : Math.max(currentSlide - 1, 0);
      goToSlide(prevIndex);
    }
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleIndicatorClick = (index: number) => {
    goToSlide(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextSlide();
        break;
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(totalSlides - 1);
        break;
    }
  };

  useEffect(() => {
    if (isPlaying && autoPlay) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPlaying, autoPlay, autoPlayInterval, currentSlide, infinite, totalSlides]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  const getCarouselClasses = () => {
    const classes = [
      styles.carousel,
      styles[size],
      theme !== 'default' && styles[theme],
      className
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getContainerClasses = () => {
    const classes = [
      styles.carouselContainer,
      animation === 'slide' && styles.sliding,
      animation === 'fade' && styles.fade
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getSlideClasses = (index: number) => {
    const classes = [
      styles.carouselSlide,
      animation === 'fade' && index === currentSlide && styles.active
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getNavClasses = (direction: 'prev' | 'next') => {
    const classes = [
      styles.carouselNav,
      styles[direction],
      direction === 'prev' && (infinite || currentSlide > 0) ? '' : styles.disabled,
      direction === 'next' && (infinite || currentSlide < totalSlides - 1) ? '' : styles.disabled
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getIndicatorClasses = (index: number) => {
    const classes = [
      styles.carouselIndicator,
      index === currentSlide && styles.active
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const transformStyle = animation === 'slide' 
    ? { transform: `translateX(-${currentSlide * 100}%)` }
    : {};

  return (
    <div 
      className={getCarouselClasses()}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="캐러셀"
      aria-live="polite"
    >
      <div 
        ref={containerRef}
        className={getContainerClasses()}
        style={transformStyle}
      >
        {slides.map((slide, index) => (
          <div key={index} className={getSlideClasses(index)}>
            <img src={slide.image} alt={slide.title || `슬라이드 ${index + 1}`} />
            {(slide.title || slide.description || slide.content) && (
              <div className={styles.carouselContent}>
                {slide.content || (
                  <>
                    {slide.title && <h3>{slide.title}</h3>}
                    {slide.description && <p>{slide.description}</p>}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showNavigation && (
        <>
          <button
            className={getNavClasses('prev')}
            onClick={prevSlide}
            aria-label="이전 슬라이드"
            disabled={!infinite && currentSlide === 0}
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>
          <button
            className={getNavClasses('next')}
            onClick={nextSlide}
            aria-label="다음 슬라이드"
            disabled={!infinite && currentSlide === totalSlides - 1}
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </>
      )}

      {showIndicators && (
        <div className={styles.carouselIndicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={getIndicatorClasses(index)}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`슬라이드 ${index + 1}로 이동`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>
      )}

      {showControls && (
        <div className={styles.carouselControls}>
          <button
            className={styles.carouselControl}
            onClick={toggleAutoPlay}
            aria-label={isPlaying ? '자동 재생 중지' : '자동 재생 시작'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel; 