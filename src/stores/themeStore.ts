import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';

export interface ThemeState {
  // 테마 모드
  mode: ThemeMode;
  
  // 테마 색상
  color: ThemeColor;
  
  // 폰트 크기
  fontSize: 'small' | 'medium' | 'large';
  
  // 폰트 패밀리
  fontFamily: 'default' | 'mono' | 'serif';
  
  // 애니메이션 설정
  animations: {
    enabled: boolean;
    duration: 'fast' | 'normal' | 'slow';
    reducedMotion: boolean;
  };
  
  // 접근성 설정
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    focusVisible: boolean;
  };
  
  // 커스텀 색상
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  
  // 액션들
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  setFontSize: (size: ThemeState['fontSize']) => void;
  setFontFamily: (family: ThemeState['fontFamily']) => void;
  setAnimations: (animations: Partial<ThemeState['animations']>) => void;
  setAccessibility: (accessibility: Partial<ThemeState['accessibility']>) => void;
  setCustomColors: (colors: Partial<ThemeState['customColors']>) => void;
  resetTheme: () => void;
  toggleMode: () => void;
}

const initialState = {
  mode: 'auto' as ThemeMode,
  color: 'blue' as ThemeColor,
  fontSize: 'medium' as const,
  fontFamily: 'default' as const,
  animations: {
    enabled: true,
    duration: 'normal' as const,
    reducedMotion: false,
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    focusVisible: true,
  },
  customColors: {
    primary: '#2196f3',
    secondary: '#757575',
    accent: '#ff9800',
  },
};

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        setMode: (mode: ThemeMode) => set(
          { mode },
          false,
          'theme/setMode'
        ),
        
        setColor: (color: ThemeColor) => set(
          { color },
          false,
          'theme/setColor'
        ),
        
        setFontSize: (fontSize: ThemeState['fontSize']) => set(
          { fontSize },
          false,
          'theme/setFontSize'
        ),
        
        setFontFamily: (fontFamily: ThemeState['fontFamily']) => set(
          { fontFamily },
          false,
          'theme/setFontFamily'
        ),
        
        setAnimations: (animations: Partial<ThemeState['animations']>) => set(
          (state) => ({
            animations: { ...state.animations, ...animations },
          }),
          false,
          'theme/setAnimations'
        ),
        
        setAccessibility: (accessibility: Partial<ThemeState['accessibility']>) => set(
          (state) => ({
            accessibility: { ...state.accessibility, ...accessibility },
          }),
          false,
          'theme/setAccessibility'
        ),
        
        setCustomColors: (customColors: Partial<ThemeState['customColors']>) => set(
          (state) => ({
            customColors: { ...state.customColors, ...customColors },
          }),
          false,
          'theme/setCustomColors'
        ),
        
        resetTheme: () => set(
          initialState,
          false,
          'theme/resetTheme'
        ),
        
        toggleMode: () => set(
          (state) => {
            const modes: ThemeMode[] = ['light', 'dark', 'auto'];
            const currentIndex = modes.indexOf(state.mode);
            const nextIndex = (currentIndex + 1) % modes.length;
            return { mode: modes[nextIndex] };
          },
          false,
          'theme/toggleMode'
        ),
      }),
      {
        name: 'theme-store',
        partialize: (state) => ({
          mode: state.mode,
          color: state.color,
          fontSize: state.fontSize,
          fontFamily: state.fontFamily,
          animations: state.animations,
          accessibility: state.accessibility,
          customColors: state.customColors,
        }),
      }
    ),
    {
      name: 'theme-store',
    }
  )
); 