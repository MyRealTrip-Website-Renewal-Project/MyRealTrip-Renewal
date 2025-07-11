import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from '@/components/ui/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '드롭다운 선택 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
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

const sampleOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option',
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: 'option2',
    placeholder: 'Select an option',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Choose your option',
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    disabled: true,
    placeholder: 'Disabled dropdown',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Select an option"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '상태 변경이 가능한 인터랙티브 드롭다운입니다.',
      },
    },
  },
};

export const CountrySelector: Story = {
  render: () => {
    const [country, setCountry] = useState('');
    
    const countries = [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
      { label: 'Japan', value: 'jp' },
      { label: 'South Korea', value: 'kr' },
    ];
    
    return (
      <Dropdown
        options={countries}
        value={country}
        onChange={setCountry}
        placeholder="Select your country"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '국가 선택 드롭다운 예시입니다.',
      },
    },
  },
};

export const LanguageSelector: Story = {
  render: () => {
    const [language, setLanguage] = useState('');
    
    const languages = [
      { label: 'English', value: 'en' },
      { label: '한국어', value: 'ko' },
      { label: '日本語', value: 'ja' },
      { label: '中文', value: 'zh' },
      { label: 'Español', value: 'es' },
      { label: 'Français', value: 'fr' },
      { label: 'Deutsch', value: 'de' },
    ];
    
    return (
      <Dropdown
        options={languages}
        value={language}
        onChange={setLanguage}
        placeholder="Select language"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '언어 선택 드롭다운 예시입니다.',
      },
    },
  },
};

export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    const manyOptions = Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option${i + 1}`,
    }));
    
    return (
      <Dropdown
        options={manyOptions}
        value={value}
        onChange={setValue}
        placeholder="Select from many options"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '많은 옵션이 있는 드롭다운 예시입니다.',
      },
    },
  },
}; 