import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel, CarouselItem } from '../../components/ui/Carousel';

// 타이머 모킹
jest.useFakeTimers();

const sampleItems: CarouselItem[] = [
  {
    id: 'slide1',
    content: <div data-testid="slide-1">첫 번째 슬라이드</div>,
  },
  {
    id: 'slide2',
    content: <div data-testid="slide-2">두 번째 슬라이드</div>,
  },
  {
    id: 'slide3',
    content: <div data-testid="slide-3">세 번째 슬라이드</div>,
  },
];

const imageItems: CarouselItem[] = [
  {
    id: 'image1',
    content: <img src="test1.jpg" alt="테스트 이미지 1" data-testid="image-1" />,
    alt: '테스트 이미지 1',
  },
  {
    id: 'image2',
    content: <img src="test2.jpg" alt="테스트 이미지 2" data-testid="image-2" />,
    alt: '테스트 이미지 2',
  },
];

describe('Carousel', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('기본 렌더링이 올바르게 작동한다', () => {
    render(<Carousel items={sampleItems} />);
    
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    expect(screen.queryByTestId('slide-2')).not.toBeInTheDocument();
  });

  it('기본적으로 첫 번째 슬라이드가 표시된다', () => {
    render(<Carousel items={sampleItems} />);
    
    expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    expect(screen.queryByTestId('slide-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('slide-3')).not.toBeInTheDocument();
  });

  it('화살표 버튼으로 슬라이드가 변경된다', async () => {
    const user = userEvent.setup();
    const onSlideChange = jest.fn();
    
    render(<Carousel items={sampleItems} onSlideChange={onSlideChange} />);
    
    // 다음 슬라이드 버튼 클릭
    const nextButton = screen.getByLabelText('다음 슬라이드');
    await user.click(nextButton);
    
    expect(onSlideChange).toHaveBeenCalledWith(1);
    
    // 두 번째 슬라이드가 표시되어야 함
    await waitFor(() => {
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
    });
  });

  it('이전 슬라이드 버튼으로 슬라이드가 변경된다', async () => {
    const user = userEvent.setup();
    const onSlideChange = jest.fn();
    
    render(<Carousel items={sampleItems} onSlideChange={onSlideChange} />);
    
    // 먼저 다음 슬라이드로 이동
    const nextButton = screen.getByLabelText('다음 슬라이드');
    await user.click(nextButton);
    
    // 이전 슬라이드 버튼 클릭
    const prevButton = screen.getByLabelText('이전 슬라이드');
    await user.click(prevButton);
    
    expect(onSlideChange).toHaveBeenCalledWith(0);
    
    // 첫 번째 슬라이드가 표시되어야 함
    await waitFor(() => {
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    });
  });

  it('점 인디케이터로 특정 슬라이드로 이동한다', async () => {
    const user = userEvent.setup();
    const onSlideChange = jest.fn();
    
    render(<Carousel items={sampleItems} onSlideChange={onSlideChange} />);
    
    // 세 번째 슬라이드 점 클릭
    const dots = screen.getAllByRole('tab');
    await user.click(dots[2]); // 세 번째 점
    
    expect(onSlideChange).toHaveBeenCalledWith(2);
    
    // 세 번째 슬라이드가 표시되어야 함
    await waitFor(() => {
      expect(screen.getByTestId('slide-3')).toBeInTheDocument();
    });
  });

  it('자동 재생이 올바르게 작동한다', async () => {
    const onSlideChange = jest.fn();
    
    render(<Carousel items={sampleItems} autoPlay={true} autoPlayInterval={1000} onSlideChange={onSlideChange} />);
    
    // 1초 후 자동으로 다음 슬라이드로 이동
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(onSlideChange).toHaveBeenCalledWith(1);
    
    // 두 번째 슬라이드가 표시되어야 함
    await waitFor(() => {
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
    });
  });

  it('마우스 호버 시 자동 재생이 일시정지된다', async () => {
    const onSlideChange = jest.fn();
    
    render(<Carousel items={sampleItems} autoPlay={true} autoPlayInterval={1000} onSlideChange={onSlideChange} />);
    
    const carousel = screen.getByRole('region');
    
    // 마우스 진입
    fireEvent.mouseEnter(carousel);
    
    // 1초 후에도 슬라이드가 변경되지 않아야 함
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(onSlideChange).not.toHaveBeenCalled();
    
    // 마우스 이탈
    fireEvent.mouseLeave(carousel);
    
    // 다시 자동 재생 시작
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('키보드 네비게이션이 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onSlideChange = jest.fn();
    
    render(<Carousel items={sampleItems} onSlideChange={onSlideChange} />);
    
    const carousel = screen.getByRole('region');
    carousel.focus();
    
    // ArrowRight 키로 다음 슬라이드로 이동
    await user.keyboard('{ArrowRight}');
    expect(onSlideChange).toHaveBeenCalledWith(1);
    
    // ArrowLeft 키로 이전 슬라이드로 이동
    await user.keyboard('{ArrowLeft}');
    expect(onSlideChange).toHaveBeenCalledWith(0);
    
    // Home 키로 첫 번째 슬라이드로 이동
    await user.keyboard('{Home}');
    expect(onSlideChange).toHaveBeenCalledWith(0);
    
    // End 키로 마지막 슬라이드로 이동
    await user.keyboard('{End}');
    expect(onSlideChange).toHaveBeenCalledWith(2);
  });

  it('터치/스와이프가 올바르게 작동한다', async () => {
    const onSlideChange = jest.fn();
    
    render(<Carousel items={sampleItems} onSlideChange={onSlideChange} />);
    
    const carousel = screen.getByRole('region');
    
    // 왼쪽 스와이프 (다음 슬라이드)
    fireEvent.touchStart(carousel, { targetTouches: [{ clientX: 200 }] });
    fireEvent.touchMove(carousel, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchEnd(carousel);
    
    expect(onSlideChange).toHaveBeenCalledWith(1);
    
    // 오른쪽 스와이프 (이전 슬라이드)
    fireEvent.touchStart(carousel, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchMove(carousel, { targetTouches: [{ clientX: 200 }] });
    fireEvent.touchEnd(carousel);
    
    expect(onSlideChange).toHaveBeenCalledWith(0);
  });

  it('무한 루프가 올바르게 작동한다', async () => {
    const user = userEvent.setup();
    const onSlideChange = jest.fn();
    
    render(<Carousel items={sampleItems} infinite={true} onSlideChange={onSlideChange} />);
    
    // 마지막 슬라이드에서 다음으로 이동
    const nextButton = screen.getByLabelText('다음 슬라이드');
    await user.click(nextButton);
    await user.click(nextButton);
    await user.click(nextButton); // 첫 번째 슬라이드로 돌아감
    
    expect(onSlideChange).toHaveBeenCalledWith(0);
  });

  it('무한 루프가 비활성화되면 마지막 슬라이드에서 다음 버튼이 비활성화된다', async () => {
    const user = userEvent.setup();
    const onSlideChange = jest.fn();
    
    render(<Carousel items={sampleItems} infinite={false} onSlideChange={onSlideChange} />);
    
    // 마지막 슬라이드로 이동
    const nextButton = screen.getByLabelText('다음 슬라이드');
    await user.click(nextButton);
    await user.click(nextButton);
    
    // 마지막 슬라이드에서 다음 버튼이 비활성화되어야 함
    expect(nextButton).toBeDisabled();
  });

  it('화살표가 숨겨질 수 있다', () => {
    render(<Carousel items={sampleItems} showArrows={false} />);
    
    expect(screen.queryByLabelText('이전 슬라이드')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('다음 슬라이드')).not.toBeInTheDocument();
  });

  it('점 인디케이터가 숨겨질 수 있다', () => {
    render(<Carousel items={sampleItems} showDots={false} />);
    
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  it('숫자 인디케이터가 숨겨질 수 있다', () => {
    render(<Carousel items={sampleItems} showIndicators={false} />);
    
    expect(screen.queryByText('1 / 3')).not.toBeInTheDocument();
  });

  it('자동 재생 컨트롤이 표시된다', async () => {
    const user = userEvent.setup();
    
    render(<Carousel items={sampleItems} autoPlay={true} />);
    
    const playPauseButton = screen.getByLabelText('자동 재생 일시정지');
    expect(playPauseButton).toBeInTheDocument();
    
    // 일시정지 버튼 클릭
    await user.click(playPauseButton);
    expect(screen.getByLabelText('자동 재생 시작')).toBeInTheDocument();
  });

  it('다양한 크기로 렌더링된다', () => {
    const { rerender } = render(<Carousel items={sampleItems} size="sm" />);
    expect(screen.getByRole('region')).toHaveClass('carousel--sm');
    
    rerender(<Carousel items={sampleItems} size="md" />);
    expect(screen.getByRole('region')).toHaveClass('carousel--md');
    
    rerender(<Carousel items={sampleItems} size="lg" />);
    expect(screen.getByRole('region')).toHaveClass('carousel--lg');
  });

  it('다양한 변형으로 렌더링된다', () => {
    const { rerender } = render(<Carousel items={sampleItems} variant="default" />);
    expect(screen.getByRole('region')).toHaveClass('carousel--default');
    
    rerender(<Carousel items={sampleItems} variant="outlined" />);
    expect(screen.getByRole('region')).toHaveClass('carousel--outlined');
    
    rerender(<Carousel items={sampleItems} variant="filled" />);
    expect(screen.getByRole('region')).toHaveClass('carousel--filled');
  });

  it('커스텀 높이와 너비가 적용된다', () => {
    render(<Carousel items={sampleItems} height="500px" width="800px" />);
    
    const carousel = screen.getByRole('region');
    expect(carousel).toHaveStyle({ height: '500px', width: '800px' });
  });

  it('빈 아이템 배열로 렌더링된다', () => {
    render(<Carousel items={[]} />);
    
    expect(screen.getByText('캐러셀 아이템이 없습니다')).toBeInTheDocument();
  });

  it('단일 아이템으로 렌더링된다', () => {
    render(<Carousel items={[sampleItems[0]]} />);
    
    expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    expect(screen.queryByLabelText('다음 슬라이드')).toBeDisabled();
  });

  it('접근성 속성이 올바르게 설정된다', () => {
    render(<Carousel items={sampleItems} aria-label="테스트 캐러셀" />);
    
    const carousel = screen.getByRole('region');
    expect(carousel).toHaveAttribute('aria-label', '테스트 캐러셀');
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    expect(carousel).toHaveAttribute('aria-live', 'polite');
  });

  it('슬라이드의 접근성 속성이 올바르게 설정된다', () => {
    render(<Carousel items={sampleItems} />);
    
    const slides = screen.getAllByRole('group');
    expect(slides).toHaveLength(3);
    
    // 첫 번째 슬라이드만 보여야 함
    expect(slides[0]).not.toHaveAttribute('aria-hidden');
    expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
    expect(slides[2]).toHaveAttribute('aria-hidden', 'true');
  });

  it('점 인디케이터의 접근성 속성이 올바르게 설정된다', () => {
    render(<Carousel items={sampleItems} />);
    
    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(3);
    
    // 첫 번째 점이 선택되어야 함
    expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    expect(dots[1]).toHaveAttribute('aria-selected', 'false');
    expect(dots[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('이미지 아이템이 올바르게 렌더링된다', () => {
    render(<Carousel items={imageItems} />);
    
    expect(screen.getByTestId('image-1')).toBeInTheDocument();
    expect(screen.queryByTestId('image-2')).not.toBeInTheDocument();
  });

  it('items가 변경되면 캐러셀이 업데이트된다', () => {
    const { rerender } = render(<Carousel items={sampleItems} />);
    
    expect(screen.getByTestId('slide-1')).toBeInTheDocument();
    
    const newItems: CarouselItem[] = [
      {
        id: 'new1',
        content: <div data-testid="new-slide-1">새 슬라이드 1</div>,
      },
      {
        id: 'new2',
        content: <div data-testid="new-slide-2">새 슬라이드 2</div>,
      },
    ];
    
    rerender(<Carousel items={newItems} />);
    
    expect(screen.queryByTestId('slide-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('new-slide-1')).toBeInTheDocument();
    expect(screen.getByTestId('new-slide-2')).toBeInTheDocument();
  });

  it('자동 재생이 중단되면 타이머가 정리된다', () => {
    const onSlideChange = jest.fn();
    
    const { unmount } = render(
      <Carousel items={sampleItems} autoPlay={true} autoPlayInterval={1000} onSlideChange={onSlideChange} />
    );
    
    // 컴포넌트 언마운트
    unmount();
    
    // 타이머가 정리되어야 함
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(onSlideChange).not.toHaveBeenCalled();
  });
}); 