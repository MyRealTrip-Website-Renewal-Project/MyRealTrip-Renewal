import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '이미지나 콘텐츠를 슬라이드 형태로 표시하는 캐러셀 컴포넌트입니다. 자동 재생, 수동 네비게이션, 반응형 디자인을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    opts: {
      description: '캐러셀 옵션 설정',
      control: 'object'
    },
    orientation: {
      description: '캐러셀 방향',
      control: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal'
    },
    setApi: {
      description: '캐러셀 API 설정 함수',
      action: 'api set'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 캐러셀
export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 bg-gray-100 rounded-lg">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
};

// 이미지 캐러셀
export const ImageCarousel: Story = {
  render: () => (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {[
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
        ].map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
};

// 자동 재생 캐러셀
export const Autoplay: Story = {
  render: () => (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 bg-blue-100 rounded-lg">
                <span className="text-2xl font-semibold text-blue-600">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
};

// 세로 방향 캐러셀
export const Vertical: Story = {
  render: () => (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 bg-green-100 rounded-lg">
                <span className="text-2xl font-semibold text-green-600">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
};

// 카드 캐러셀
export const CardCarousel: Story = {
  render: () => (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-5xl"
    >
      <CarouselContent>
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-semibold text-purple-600">{index + 1}</span>
                </div>
                <h3 className="font-semibold mb-2">카드 제목 {index + 1}</h3>
                <p className="text-gray-600 text-sm">
                  이것은 캐러셀에 표시되는 카드 콘텐츠입니다. 다양한 정보를 담을 수 있습니다.
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
};

// 반응형 캐러셀
export const Responsive: Story = {
  render: () => (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-6xl"
    >
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg">
                <span className="text-2xl font-semibold text-purple-600">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}; 