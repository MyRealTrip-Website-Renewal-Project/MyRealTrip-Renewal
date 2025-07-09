import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UIState {
  // 사이드바 상태
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // 헤더 상태
  headerVisible: boolean;
  headerHeight: number;
  
  // 로딩 상태
  loading: boolean;
  loadingText: string;
  
  // 오버레이 상태
  overlayVisible: boolean;
  overlayType: 'loading' | 'modal' | 'drawer' | null;
  
  // 스크롤 상태
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  
  // 화면 크기
  screenSize: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
  
  // 포커스 상태
  focusedElement: string | null;
  
  // 애니메이션 상태
  animationsEnabled: boolean;
  
  // 액션들
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setHeaderVisible: (visible: boolean) => void;
  setHeaderHeight: (height: number) => void;
  setLoading: (loading: boolean, text?: string) => void;
  setOverlay: (visible: boolean, type?: UIState['overlayType']) => void;
  setScrollY: (scrollY: number) => void;
  setScreenSize: (width: number, height: number) => void;
  setFocusedElement: (elementId: string | null) => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  resetUI: () => void;
}

const initialState = {
  sidebarOpen: false,
  sidebarCollapsed: false,
  headerVisible: true,
  headerHeight: 64,
  loading: false,
  loadingText: '로딩 중...',
  overlayVisible: false,
  overlayType: null,
  scrollY: 0,
  scrollDirection: null,
  screenSize: {
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  },
  focusedElement: null,
  animationsEnabled: true,
};

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        toggleSidebar: () => set(
          (state) => ({ sidebarOpen: !state.sidebarOpen }),
          false,
          'ui/toggleSidebar'
        ),
        
        setSidebarOpen: (open: boolean) => set(
          { sidebarOpen: open },
          false,
          'ui/setSidebarOpen'
        ),
        
        setSidebarCollapsed: (collapsed: boolean) => set(
          { sidebarCollapsed: collapsed },
          false,
          'ui/setSidebarCollapsed'
        ),
        
        setHeaderVisible: (visible: boolean) => set(
          { headerVisible: visible },
          false,
          'ui/setHeaderVisible'
        ),
        
        setHeaderHeight: (height: number) => set(
          { headerHeight: height },
          false,
          'ui/setHeaderHeight'
        ),
        
        setLoading: (loading: boolean, text: string = '로딩 중...') => set(
          { loading, loadingText: text },
          false,
          'ui/setLoading'
        ),
        
        setOverlay: (visible: boolean, type: UIState['overlayType'] = null) => set(
          { overlayVisible: visible, overlayType: type },
          false,
          'ui/setOverlay'
        ),
        
        setScrollY: (scrollY: number) => {
          const state = get();
          const direction = scrollY > state.scrollY ? 'down' : 'up';
          set(
            { scrollY, scrollDirection: direction },
            false,
            'ui/setScrollY'
          );
        },
        
        setScreenSize: (width: number, height: number) => {
          const isMobile = width < 768;
          const isTablet = width >= 768 && width < 1024;
          const isDesktop = width >= 1024;
          
          set(
            {
              screenSize: {
                width,
                height,
                isMobile,
                isTablet,
                isDesktop,
              },
            },
            false,
            'ui/setScreenSize'
          );
        },
        
        setFocusedElement: (elementId: string | null) => set(
          { focusedElement: elementId },
          false,
          'ui/setFocusedElement'
        ),
        
        setAnimationsEnabled: (enabled: boolean) => set(
          { animationsEnabled: enabled },
          false,
          'ui/setAnimationsEnabled'
        ),
        
        resetUI: () => set(
          initialState,
          false,
          'ui/resetUI'
        ),
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({
          sidebarCollapsed: state.sidebarCollapsed,
          headerHeight: state.headerHeight,
          animationsEnabled: state.animationsEnabled,
        }),
      }
    ),
    {
      name: 'ui-store',
    }
  )
); 