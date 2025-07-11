import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '탭 컴포넌트로 콘텐츠를 구분하여 표시합니다. 여러 탭 중 하나를 선택하여 해당 콘텐츠를 보여줍니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      description: '기본 선택될 탭의 값',
      control: 'text'
    },
    value: {
      description: '현재 선택된 탭의 값 (제어 컴포넌트)',
      control: 'text'
    },
    onValueChange: {
      description: '탭 선택 변경 시 호출되는 콜백',
      action: 'value changed'
    },
    orientation: {
      description: '탭의 방향',
      control: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal'
    },
    disabled: {
      description: '탭 비활성화 여부',
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 탭
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password">비밀번호</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">계정 정보</h3>
          <p className="text-gray-600">사용자 계정 정보를 관리할 수 있습니다.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">비밀번호 변경</h3>
          <p className="text-gray-600">비밀번호를 안전하게 변경하세요.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">설정</h3>
          <p className="text-gray-600">앱 설정을 관리합니다.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
};

// 세로 방향 탭
export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password">비밀번호</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-0">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">계정 정보</h3>
          <p className="text-gray-600">사용자 계정 정보를 관리할 수 있습니다.</p>
        </div>
      </TabsContent>
      <TabsContent value="password" className="mt-0">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">비밀번호 변경</h3>
          <p className="text-gray-600">비밀번호를 안전하게 변경하세요.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="mt-0">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">설정</h3>
          <p className="text-gray-600">앱 설정을 관리합니다.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
};

// 비활성화된 탭
export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password" disabled>비밀번호</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">계정 정보</h3>
          <p className="text-gray-600">사용자 계정 정보를 관리할 수 있습니다.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">비밀번호 변경</h3>
          <p className="text-gray-600">비밀번호를 안전하게 변경하세요.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">설정</h3>
          <p className="text-gray-600">앱 설정을 관리합니다.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
};

// 제어 컴포넌트 예시
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('account');
    
    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">계정</TabsTrigger>
          <TabsTrigger value="password">비밀번호</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">계정 정보</h3>
            <p className="text-gray-600">사용자 계정 정보를 관리할 수 있습니다.</p>
            <p className="text-sm text-blue-600 mt-2">현재 탭: {activeTab}</p>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">비밀번호 변경</h3>
            <p className="text-gray-600">비밀번호를 안전하게 변경하세요.</p>
            <p className="text-sm text-blue-600 mt-2">현재 탭: {activeTab}</p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">설정</h3>
            <p className="text-gray-600">앱 설정을 관리합니다.</p>
            <p className="text-sm text-blue-600 mt-2">현재 탭: {activeTab}</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  }
};

// 아이콘이 있는 탭
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          계정
        </TabsTrigger>
        <TabsTrigger value="password">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          비밀번호
        </TabsTrigger>
        <TabsTrigger value="settings">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          설정
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">계정 정보</h3>
          <p className="text-gray-600">사용자 계정 정보를 관리할 수 있습니다.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">비밀번호 변경</h3>
          <p className="text-gray-600">비밀번호를 안전하게 변경하세요.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">설정</h3>
          <p className="text-gray-600">앱 설정을 관리합니다.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}; 