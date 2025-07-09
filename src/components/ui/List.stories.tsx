import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from './List';
import { MdHome, MdFavorite, MdPerson } from 'react-icons/md';

const items: ListItem[] = [
  { key: 'home', label: '홈', icon: MdHome },
  { key: 'fav', label: '즐겨찾기', icon: MdFavorite },
  { key: 'my', label: '마이', icon: MdPerson },
  { key: 'disabled', label: '비활성', disabled: true },
];

const meta: Meta<typeof List> = {
  title: 'UI/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    items: { control: false },
    selected: { control: false },
    onItemClick: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<typeof List>;

const Template = (args: any) => {
  const [selected, setSelected] = useState('home');
  return <List {...args} items={items} selected={selected} onItemClick={setSelected} />;
};

export const Default: Story = {
  render: Template,
}; 