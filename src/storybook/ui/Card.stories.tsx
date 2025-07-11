import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  CardImage, 
  CardTitle, 
  CardSubtitle, 
  CardActions 
} from '@/components/ui/Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 레이아웃과 스타일을 지원하는 카드 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined'],
      description: '카드 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '카드 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardSubtitle>Card Subtitle</CardSubtitle>
        </CardHeader>
        <CardBody>
          <p>This is a default card with various content.</p>
        </CardBody>
        <CardFooter>
          <CardActions>
            <button>Cancel</button>
            <button>Confirm</button>
          </CardActions>
        </CardFooter>
      </>
    ),
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <>
        <CardImage 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop" 
          alt="Card image" 
        />
        <CardHeader>
          <CardTitle>Card with Image</CardTitle>
          <CardSubtitle>Card with image example</CardSubtitle>
        </CardHeader>
        <CardBody>
          <p>This is a card with an image. Useful for product cards or profile cards.</p>
        </CardBody>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardSubtitle>With shadow effect</CardSubtitle>
        </CardHeader>
        <CardBody>
          <p>This card has a shadow effect for more emphasis.</p>
        </CardBody>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardHeader>
          <CardTitle>Outlined Card</CardTitle>
          <CardSubtitle>With border</CardSubtitle>
        </CardHeader>
        <CardBody>
          <p>This card has a thick border for clear boundaries.</p>
        </CardBody>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card size="sm" style={{ width: '200px' }}>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
        </CardHeader>
        <CardBody>
          <p>Small size</p>
        </CardBody>
      </Card>
      
      <Card size="md" style={{ width: '200px' }}>
        <CardHeader>
          <CardTitle>Medium Card</CardTitle>
        </CardHeader>
        <CardBody>
          <p>Medium size</p>
        </CardBody>
      </Card>
      
      <Card size="lg" style={{ width: '200px' }}>
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
        </CardHeader>
        <CardBody>
          <p>Large size</p>
        </CardBody>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 카드를 확인할 수 있습니다.',
      },
    },
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => alert('Card clicked!'),
    children: (
      <>
        <CardHeader>
          <CardTitle>Clickable Card</CardTitle>
          <CardSubtitle>With hover effect</CardSubtitle>
        </CardHeader>
        <CardBody>
          <p>This card is clickable with hover effects.</p>
        </CardBody>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Disabled Card</CardTitle>
          <CardSubtitle>Cannot be clicked</CardSubtitle>
        </CardHeader>
        <CardBody>
          <p>This card is disabled and cannot be clicked.</p>
        </CardBody>
      </>
    ),
  },
}; 