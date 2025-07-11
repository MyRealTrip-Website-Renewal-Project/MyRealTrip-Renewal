import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '체크박스 컴포넌트입니다. 라벨과 함께 사용할 수 있습니다.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    label: {
      control: 'text',
      description: '체크박스 라벨',
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
    label: 'Accept terms and conditions',
  },
};

export const CheckedWithLabel: Story = {
  args: {
    checked: true,
    label: 'Subscribe to newsletter',
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
    label: 'Disabled checkbox',
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label="Interactive checkbox"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '상태 변경이 가능한 인터랙티브 체크박스입니다.',
      },
    },
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [options, setOptions] = useState({
      option1: false,
      option2: false,
      option3: false,
    });
    
    const handleChange = (key: string) => (checked: boolean) => {
      setOptions(prev => ({ ...prev, [key]: checked }));
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Checkbox
          checked={options.option1}
          onChange={handleChange('option1')}
          label="Option 1"
        />
        <Checkbox
          checked={options.option2}
          onChange={handleChange('option2')}
          label="Option 2"
        />
        <Checkbox
          checked={options.option3}
          onChange={handleChange('option3')}
          label="Option 3"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '여러 체크박스를 함께 사용하는 예시입니다.',
      },
    },
  },
}; 