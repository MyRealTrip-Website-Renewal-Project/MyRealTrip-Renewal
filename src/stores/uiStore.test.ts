import { act } from 'react-dom/test-utils';
import { useUIStore } from './uiStore';

describe('useUIStore', () => {
  beforeEach(() => {
    act(() => {
      useUIStore.getState().resetUI();
    });
  });

  it('초기값을 반환한다', () => {
    const state = useUIStore.getState();
    expect(state.sidebarOpen).toBe(false);
    expect(state.headerVisible).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('toggleSidebar 동작', () => {
    act(() => {
      useUIStore.getState().toggleSidebar();
    });
    expect(useUIStore.getState().sidebarOpen).toBe(true);
  });

  it('setSidebarOpen 동작', () => {
    act(() => {
      useUIStore.getState().setSidebarOpen(true);
    });
    expect(useUIStore.getState().sidebarOpen).toBe(true);
  });

  it('setLoading 동작', () => {
    act(() => {
      useUIStore.getState().setLoading(true, '로딩중');
    });
    const state = useUIStore.getState();
    expect(state.loading).toBe(true);
    expect(state.loadingText).toBe('로딩중');
  });

  it('setScreenSize 동작', () => {
    act(() => {
      useUIStore.getState().setScreenSize(500, 800);
    });
    const state = useUIStore.getState();
    expect(state.screenSize.width).toBe(500);
    expect(state.screenSize.isMobile).toBe(true);
    expect(state.screenSize.isDesktop).toBe(false);
  });
}); 