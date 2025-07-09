import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '캐러셀 컴포넌트입니다. 이미지나 콘텐츠를 슬라이드 형태로 표시합니다.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '캐러셀 크기'
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: '캐러셀 테마'
    },
    autoPlay: {
      control: 'boolean',
      description: '자동 재생 여부'
    },
    autoPlayInterval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: '자동 재생 간격 (ms)'
    },
    infinite: {
      control: 'boolean',
      description: '무한 루프 여부'
    },
    showNavigation: {
      control: 'boolean',
      description: '네비게이션 버튼 표시 여부'
    },
    showIndicators: {
      control: 'boolean',
      description: '인디케이터 표시 여부'
    },
    showControls: {
      control: 'boolean',
      description: '자동 재생 컨트롤 표시 여부'
    },
    animation: {
      control: { type: 'select' },
      options: ['slide', 'fade'],
      description: '애니메이션 타입'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '800px', width: '100%' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 이미지 데이터
const sampleSlides = [
  {
    image: 'https://picsum.photos/800/300?random=1',
    title: '첫 번째 슬라이드',
    description: '첫 번째 슬라이드의 설명입니다.'
  },
  {
    image: 'https://picsum.photos/800/300?random=2',
    title: '두 번째 슬라이드',
    description: '두 번째 슬라이드의 설명입니다.'
  },
  {
    image: 'https://picsum.photos/800/300?random=3',
    title: '세 번째 슬라이드',
    description: '세 번째 슬라이드의 설명입니다.'
  },
  {
    image: 'https://picsum.photos/800/300?random=4',
    title: '네 번째 슬라이드',
    description: '네 번째 슬라이드의 설명입니다.'
  }
];

// 기본 캐러셀
export const Default: Story = {
  args: {
    slides: sampleSlides
  }
};

// 자동 재생 캐러셀
export const AutoPlay: Story = {
  args: {
    slides: sampleSlides,
    autoPlay: true,
    autoPlayInterval: 3000,
    showControls: true
  }
};

// 크기별 캐러셀
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Small Size</h3>
        <Carousel
          size="sm"
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Medium Size (Default)</h3>
        <Carousel
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Large Size</h3>
        <Carousel
          size="lg"
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
    </div>
  )
};

// 테마별 캐러셀
export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Default Theme</h3>
        <Carousel
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Primary Theme</h3>
        <Carousel
          theme="primary"
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Success Theme</h3>
        <Carousel
          theme="success"
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Warning Theme</h3>
        <Carousel
          theme="warning"
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Error Theme</h3>
        <Carousel
          theme="error"
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
    </div>
  )
};

// 애니메이션 타입
export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Slide Animation (Default)</h3>
        <Carousel
          animation="slide"
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
      <div>
        <h3>Fade Animation</h3>
        <Carousel
          animation="fade"
          slides={sampleSlides.slice(0, 2)}
        />
      </div>
    </div>
  )
};

// 네비게이션 없음
export const NoNavigation: Story = {
  args: {
    slides: sampleSlides,
    showNavigation: false
  }
};

// 인디케이터 없음
export const NoIndicators: Story = {
  args: {
    slides: sampleSlides,
    showIndicators: false
  }
};

// 무한 루프 없음
export const NoInfinite: Story = {
  args: {
    slides: sampleSlides,
    infinite: false
  }
};

// 커스텀 콘텐츠
export const CustomContent: Story = {
  args: {
    slides: [
      {
        image: 'https://picsum.photos/800/300?random=1',
        content: (
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}>
            <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>커스텀 콘텐츠</h2>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>완전히 커스터마이징된 슬라이드</p>
            <button style={{
              background: '#2196f3',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              marginTop: '1rem',
              cursor: 'pointer'
            }}>
              버튼 예시
            </button>
          </div>
        )
      },
      {
        image: 'https://picsum.photos/800/300?random=2',
        content: (
          <div style={{ 
            position: 'absolute', 
            bottom: '2rem', 
            left: '2rem',
            background: 'rgba(0,0,0,0.7)',
            padding: '1rem',
            borderRadius: '8px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>왼쪽 하단 콘텐츠</h3>
            <p style={{ margin: 0 }}>위치를 자유롭게 조정할 수 있습니다.</p>
          </div>
        )
      }
    ]
  }
};

// 단일 슬라이드
export const SingleSlide: Story = {
  args: {
    slides: [sampleSlides[0]],
    showNavigation: false,
    showIndicators: false
  }
};

// 많은 슬라이드
export const ManySlides: Story = {
  args: {
    slides: [
      ...sampleSlides,
      {
        image: 'https://picsum.photos/800/300?random=5',
        title: '다섯 번째 슬라이드',
        description: '다섯 번째 슬라이드의 설명입니다.'
      },
      {
        image: 'https://picsum.photos/800/300?random=6',
        title: '여섯 번째 슬라이드',
        description: '여섯 번째 슬라이드의 설명입니다.'
      },
      {
        image: 'https://picsum.photos/800/300?random=7',
        title: '일곱 번째 슬라이드',
        description: '일곱 번째 슬라이드의 설명입니다.'
      }
    ]
  }
};

// 접근성 테스트
export const Accessibility: Story = {
  args: {
    slides: sampleSlides,
    showNavigation: true,
    showIndicators: true,
    showControls: true
  },
  parameters: {
    docs: {
      description: {
        story: '키보드 네비게이션을 지원합니다. 화살표 키로 슬라이드를 이동하고, Home/End 키로 처음/마지막 슬라이드로 이동할 수 있습니다.'
      }
    }
  }
}; 