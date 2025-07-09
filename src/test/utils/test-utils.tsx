import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';

// 테스트용 Provider 컴포넌트
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <div data-testid="test-provider">
        {children}
      </div>
    </ThemeProvider>
  );
};

// 커스텀 렌더 함수
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// 테스트 데이터 생성 함수들
export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user' as const,
  preferences: {
    language: 'ko',
    timezone: 'Asia/Seoul',
    emailNotifications: true,
    pushNotifications: false,
  },
  createdAt: '2024-01-01T00:00:00Z',
  lastLoginAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createMockNotification = (overrides = {}) => ({
  id: 'test-notification-id',
  type: 'info' as const,
  title: 'Test Notification',
  message: 'This is a test notification',
  duration: 5000,
  closable: true,
  createdAt: Date.now(),
  ...overrides,
});

export const createMockModalConfig = (overrides = {}) => ({
  id: 'test-modal-id',
  title: 'Test Modal',
  content: <div>Test content</div>,
  size: 'md' as const,
  closable: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  ...overrides,
});

// 이벤트 시뮬레이션 헬퍼
export const fireEvent = {
  click: (element: Element) => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  },
  change: (element: Element, value: string) => {
    (element as HTMLInputElement).value = value;
    element.dispatchEvent(new Event('change', { bubbles: true }));
  },
  keyDown: (element: Element, key: string) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  },
  keyUp: (element: Element, key: string) => {
    element.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }));
  },
  focus: (element: Element) => {
    element.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
  },
  blur: (element: Element) => {
    element.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  },
};

// 비동기 작업 대기 헬퍼
export const waitFor = (callback: () => void, timeout = 1000) => {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now();
    
    const check = () => {
      try {
        callback();
        resolve();
      } catch (error) {
        if (Date.now() - startTime > timeout) {
          reject(error);
        } else {
          setTimeout(check, 10);
        }
      }
    };
    
    check();
  });
};

// 스냅샷 테스트 헬퍼
export const expectSnapshot = (component: ReactElement) => {
  const { container } = customRender(component);
  expect(container.firstChild).toMatchSnapshot();
};

export * from '@testing-library/react';
export { customRender, customRender as render }; 