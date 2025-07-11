import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StarIcon } from 'lucide-react';

const meta: Meta<any> = {
  title: 'UI/Rating',
  component: 'div',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '별점이나 평점을 표시하는 레이팅 컴포넌트입니다. 읽기 전용, 편집 가능, 다양한 크기와 스타일을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '현재 평점',
      control: 'number',
      defaultValue: 3.5
    },
    maxValue: {
      description: '최대 평점',
      control: 'number',
      defaultValue: 5
    },
    size: {
      description: '별 크기',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md'
    },
    readonly: {
      description: '읽기 전용 여부',
      control: 'boolean'
    },
    showValue: {
      description: '평점 값 표시 여부',
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 레이팅
export const Default: Story = {
  render: () => {
    const [rating, setRating] = useState(3.5);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <StarIcon
                className={`w-6 h-6 ${
                  star <= rating ? 'text-yellow-400 fill-current' : ''
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">평점: {rating}/5</p>
      </div>
    );
  }
};

// 읽기 전용 레이팅
export const ReadOnly: Story = {
  render: () => {
    const rating = 4.2;

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="text-gray-300">
              <StarIcon
                className={`w-6 h-6 ${
                  star <= rating ? 'text-yellow-400 fill-current' : ''
                }`}
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">평점: {rating}/5</p>
      </div>
    );
  }
};

// 반별점 레이팅
export const HalfRating: Story = {
  render: () => {
    const [rating, setRating] = useState(3.5);

    const handleStarClick = (starValue: number) => {
      setRating(starValue);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-1">
          {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <StarIcon
                className={`w-6 h-6 ${
                  star <= rating ? 'text-yellow-400 fill-current' : ''
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">평점: {rating}/5</p>
      </div>
    );
  }
};

// 다양한 크기
export const Sizes: Story = {
  render: () => {
    const [rating, setRating] = useState(4);

    const sizes = [
      { name: 'Small', size: 'w-4 h-4' },
      { name: 'Medium', size: 'w-6 h-6' },
      { name: 'Large', size: 'w-8 h-8' }
    ];

    return (
      <div className="space-y-6">
        {sizes.map(({ name, size }) => (
          <div key={name} className="space-y-2">
            <p className="text-sm font-medium text-gray-700">{name}</p>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <StarIcon
                    className={`${size} ${
                      star <= rating ? 'text-yellow-400 fill-current' : ''
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

// 평점과 리뷰 수
export const WithReviewCount: Story = {
  render: () => {
    const rating = 4.3;
    const reviewCount = 128;

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="text-gray-300">
              <StarIcon
                className={`w-6 h-6 ${
                  star <= rating ? 'text-yellow-400 fill-current' : ''
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-medium">{rating}</span>
          <span>/5</span>
          <span className="text-gray-400">•</span>
          <span>{reviewCount}개의 리뷰</span>
        </div>
      </div>
    );
  }
};

// 호버 효과
export const WithHover: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <StarIcon
                className={`w-6 h-6 ${
                  star <= (hoverRating || rating) ? 'text-yellow-400 fill-current' : ''
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          평점: {rating}/5 {hoverRating > 0 && `(호버: ${hoverRating})`}
        </p>
      </div>
    );
  }
};

// 커스텀 아이콘
export const CustomIcons: Story = {
  render: () => {
    const [rating, setRating] = useState(4);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-gray-300 hover:text-red-400 transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  star <= rating
                    ? 'bg-red-400 border-red-400'
                    : 'border-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">평점: {rating}/5</p>
      </div>
    );
  }
};

// 평점 분포
export const RatingDistribution: Story = {
  render: () => {
    const distribution = [
      { rating: 5, count: 45, percentage: 45 },
      { rating: 4, count: 30, percentage: 30 },
      { rating: 3, count: 15, percentage: 15 },
      { rating: 2, count: 7, percentage: 7 },
      { rating: 1, count: 3, percentage: 3 }
    ];

    return (
      <div className="space-y-3">
        {distribution.map(({ rating, count, percentage }) => (
          <div key={rating} className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 w-16">
              <span className="text-sm text-gray-600">{rating}</span>
              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-12 text-right">
              {count}
            </span>
          </div>
        ))}
      </div>
    );
  }
}; 