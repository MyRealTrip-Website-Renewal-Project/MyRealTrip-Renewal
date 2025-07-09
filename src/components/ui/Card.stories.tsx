import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    media: { control: false },
    header: { control: 'text' },
    body: { control: 'text' },
    footer: { control: 'text' },
    hoverable: { control: 'boolean' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    header: '카드 제목',
    body: '카드 본문 내용입니다.',
    footer: '카드 푸터',
  },
};

export const WithMedia: Story = {
  args: {
    media: <img src="https://placehold.co/400x180" alt="미디어" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
    header: '이미지 카드',
    body: '이미지가 포함된 카드입니다.',
    footer: '카드 푸터',
  },
};

export const Hoverable: Story = {
  args: {
    header: '호버 카드',
    body: '마우스를 올리면 효과가 나타납니다.',
    hoverable: true,
  },
};

export const Selected: Story = {
  args: {
    header: '선택된 카드',
    body: '선택 상태의 카드입니다.',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    header: '비활성 카드',
    body: '비활성화된 카드입니다.',
    disabled: true,
  },
}; 