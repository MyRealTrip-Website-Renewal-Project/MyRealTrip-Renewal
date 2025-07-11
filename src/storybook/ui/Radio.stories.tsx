import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from '@/components/ui/Radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '라디오 버튼 컴포넌트입니다. 그룹으로 사용할 수 있습니다.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '선택 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    label: {
      control: 'text',
      description: '라디오 버튼 라벨',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const WithLabel: Story = {
  args: {
    checked: false,
    label: 'Option 1',
  },
};

export const CheckedWithLabel: Story = {
  args: {
    checked: true,
    label: 'Selected option',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const DisabledWithLabel: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled option',
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Radio
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
          label="Option 1"
          name="radio-group"
        />
        <Radio
          checked={selected === 'option2'}
          onChange={() => setSelected('option2')}
          label="Option 2"
          name="radio-group"
        />
        <Radio
          checked={selected === 'option3'}
          onChange={() => setSelected('option3')}
          label="Option 3"
          name="radio-group"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '라디오 버튼 그룹 예시입니다. 하나만 선택할 수 있습니다.',
      },
    },
  },
};

export const HorizontalGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');
    
    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        <Radio
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
          label="Option 1"
          name="horizontal-group"
        />
        <Radio
          checked={selected === 'option2'}
          onChange={() => setSelected('option2')}
          label="Option 2"
          name="horizontal-group"
        />
        <Radio
          checked={selected === 'option3'}
          onChange={() => setSelected('option3')}
          label="Option 3"
          name="horizontal-group"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '가로로 배치된 라디오 버튼 그룹입니다.',
      },
    },
  },
}; 