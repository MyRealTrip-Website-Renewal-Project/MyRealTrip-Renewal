import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Board, BoardColumn } from './Board';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const columns: BoardColumn<User>[] = [
  { key: 'id', title: 'ID', align: 'center' },
  { key: 'name', title: '이름' },
  { key: 'email', title: '이메일' },
  {
    key: 'status',
    title: '상태',
    align: 'center',
    render: (row) => row.status === 'active' ? '활성' : '비활성',
  },
];

const data: User[] = [
  { id: 1, name: '홍길동', email: 'hong@test.com', status: 'active' },
  { id: 2, name: '김철수', email: 'kim@test.com', status: 'inactive' },
  { id: 3, name: '이영희', email: 'lee@test.com', status: 'active' },
];

const meta: Meta<typeof Board> = {
  title: 'UI/Board',
  component: Board,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: false },
    data: { control: false },
    emptyText: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Board>;

export const Default: Story = {
  args: {
    columns: columns as BoardColumn<unknown>[],
    data: data as unknown[],
  },
};

export const Empty: Story = {
  args: {
    columns: columns as BoardColumn<unknown>[],
    data: [],
    emptyText: '게시글이 없습니다.',
  },
}; 