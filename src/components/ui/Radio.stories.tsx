import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: false },
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof Radio>;

const Template = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <Radio
      {...args}
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: '선택',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: '필수 선택',
    error: '필수 항목입니다',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: '비활성 라디오',
    disabled: true,
  },
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <Radio label="A" checked={value === 'a'} onChange={() => setValue('a')} />
        <Radio label="B" checked={value === 'b'} onChange={() => setValue('b')} />
        <Radio label="C" checked={value === 'c'} onChange={() => setValue('c')} />
      </div>
    );
  },
}; 