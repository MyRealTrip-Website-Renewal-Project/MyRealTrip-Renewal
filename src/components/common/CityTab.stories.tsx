import React from 'react';
import CityTab, { CityTabProps } from './CityTab';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CityTab> = {
  title: 'Common/CityTab',
  component: CityTab,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CityTab>;

export const Default: Story = {
  args: {
    name: '서울',
    selected: true,
    onClick: () => alert('클릭'),
  } as CityTabProps,
};

export const Unselected: Story = {
  args: {
    name: '부산',
    selected: false,
    onClick: () => alert('클릭'),
  } as CityTabProps,
}; 