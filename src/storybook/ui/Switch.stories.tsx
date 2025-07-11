import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '@/components/ui/Switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '토글 스위치 컴포넌트입니다. on/off 상태를 표시합니다.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '스위치 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    label: {
      control: 'text',
      description: '스위치 라벨',
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
    label: 'Enable notifications',
  },
};

export const CheckedWithLabel: Story = {
  args: {
    checked: true,
    label: 'Dark mode',
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
    label: 'Disabled switch',
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <Switch
        checked={checked}
        onChange={setChecked}
        label="Interactive switch"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '상태 변경이 가능한 인터랙티브 스위치입니다.',
      },
    },
  },
};

export const MultipleSwitches: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: false,
      darkMode: true,
      autoSave: false,
    });
    
    const handleChange = (key: string) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Switch
          checked={settings.notifications}
          onChange={handleChange('notifications')}
          label="Enable notifications"
        />
        <Switch
          checked={settings.darkMode}
          onChange={handleChange('darkMode')}
          label="Dark mode"
        />
        <Switch
          checked={settings.autoSave}
          onChange={handleChange('autoSave')}
          label="Auto save"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '여러 스위치를 함께 사용하는 예시입니다.',
      },
    },
  },
}; 