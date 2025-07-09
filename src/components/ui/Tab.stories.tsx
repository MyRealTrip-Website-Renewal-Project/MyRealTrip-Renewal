import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab, TabItem } from './Tab';
import { MdHome, MdFavorite, MdPerson } from 'react-icons/md';

const tabList: TabItem[] = [
  { label: '홈', value: 'home', icon: MdHome },
  { label: '즐겨찾기', value: 'fav', icon: MdFavorite },
  { label: '마이', value: 'my', icon: MdPerson },
  { label: '비활성', value: 'disabled', disabled: true },
];

const meta: Meta<typeof Tab> = {
  title: 'UI/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    value: { control: false },
    onChange: { action: 'changed' },
    tabs: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Tab>;

const Template = (args: any) => {
  const [value, setValue] = useState('home');
  return <Tab {...args} tabs={tabList} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: Template,
}; 