import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface AppSettings {
  // 언어 설정
  language: string;
  
  // 시간대 설정
  timezone: string;
  
  // 날짜 형식
  dateFormat: 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY';
  timeFormat: '12h' | '24h';
  
  // 통화 설정
  currency: {
    code: string;
    symbol: string;
    position: 'before' | 'after';
  };
  
  // 알림 설정
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    desktop: boolean;
    sound: boolean;
    vibration: boolean;
  };
  
  // 개인정보 설정
  privacy: {
    shareAnalytics: boolean;
    shareLocation: boolean;
    allowCookies: boolean;
    allowTracking: boolean;
  };
  
  // 성능 설정
  performance: {
    enableAnimations: boolean;
    enableTransitions: boolean;
    enableHoverEffects: boolean;
    enableParallax: boolean;
    imageQuality: 'low' | 'medium' | 'high';
    autoPlayVideos: boolean;
  };
  
  // 접근성 설정
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
    keyboardNavigation: boolean;
    focusIndicators: boolean;
  };
  
  // 개발자 설정
  developer: {
    enableDebugMode: boolean;
    enableLogging: boolean;
    enablePerformanceMonitoring: boolean;
    enableErrorReporting: boolean;
  };
}

export interface SettingsState {
  // 앱 설정
  settings: AppSettings;
  
  // 설정 변경 이력
  changeHistory: Array<{
    timestamp: number;
    key: string;
    oldValue: any;
    newValue: any;
  }>;
  
  // 액션들
  updateSetting: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => void;
  
  updateNestedSetting: <K extends keyof AppSettings, SK extends keyof AppSettings[K]>(
    key: K,
    subKey: SK,
    value: AppSettings[K][SK]
  ) => void;
  
  resetSettings: () => void;
  resetSection: <K extends keyof AppSettings>(section: K) => void;
  
  // 설정 가져오기/내보내기
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
  
  // 설정 이력
  getChangeHistory: () => SettingsState['changeHistory'];
  clearChangeHistory: () => void;
  
  // 설정 검증
  validateSettings: () => boolean;
  
  // 기본값 가져오기
  getDefaultSettings: () => AppSettings;
}

const defaultSettings: AppSettings = {
  language: 'ko',
  timezone: 'Asia/Seoul',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: '24h',
  currency: {
    code: 'KRW',
    symbol: '₩',
    position: 'before',
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    desktop: true,
    sound: true,
    vibration: false,
  },
  privacy: {
    shareAnalytics: true,
    shareLocation: false,
    allowCookies: true,
    allowTracking: false,
  },
  performance: {
    enableAnimations: true,
    enableTransitions: true,
    enableHoverEffects: true,
    enableParallax: false,
    imageQuality: 'medium',
    autoPlayVideos: false,
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
  },
  developer: {
    enableDebugMode: false,
    enableLogging: false,
    enablePerformanceMonitoring: false,
    enableErrorReporting: true,
  },
};

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set, get) => ({
        settings: defaultSettings,
        changeHistory: [],
        
        updateSetting: <K extends keyof AppSettings>(
          key: K,
          value: AppSettings[K]
        ) => set(
          (state) => {
            const oldValue = state.settings[key];
            return {
              settings: {
                ...state.settings,
                [key]: value,
              },
              changeHistory: [
                {
                  timestamp: Date.now(),
                  key: key as string,
                  oldValue,
                  newValue: value,
                },
                ...state.changeHistory.slice(0, 99), // 최대 100개 유지
              ],
            };
          },
          false,
          'settings/updateSetting'
        ),
        
        updateNestedSetting: <K extends keyof AppSettings, SK extends keyof AppSettings[K]>(
          key: K,
          subKey: SK,
          value: AppSettings[K][SK]
        ) => set(
          (state) => {
            const oldValue = state.settings[key][subKey];
            return {
              settings: {
                ...state.settings,
                [key]: {
                  ...state.settings[key],
                  [subKey]: value,
                },
              },
              changeHistory: [
                {
                  timestamp: Date.now(),
                  key: `${key as string}.${subKey as string}`,
                  oldValue,
                  newValue: value,
                },
                ...state.changeHistory.slice(0, 99),
              ],
            };
          },
          false,
          'settings/updateNestedSetting'
        ),
        
        resetSettings: () => set(
          {
            settings: defaultSettings,
            changeHistory: [],
          },
          false,
          'settings/resetSettings'
        ),
        
        resetSection: <K extends keyof AppSettings>(section: K) => set(
          (state) => ({
            settings: {
              ...state.settings,
              [section]: defaultSettings[section],
            },
            changeHistory: [
              {
                timestamp: Date.now(),
                key: `reset-${section as string}`,
                oldValue: state.settings[section],
                newValue: defaultSettings[section],
              },
              ...state.changeHistory.slice(0, 99),
            ],
          }),
          false,
          'settings/resetSection'
        ),
        
        exportSettings: () => {
          const state = get();
          return JSON.stringify(state.settings, null, 2);
        },
        
        importSettings: (settingsJson: string) => {
          try {
            const importedSettings = JSON.parse(settingsJson);
            const isValid = get().validateSettings();
            
            if (isValid) {
              set(
                (state) => ({
                  settings: importedSettings,
                  changeHistory: [
                    {
                      timestamp: Date.now(),
                      key: 'import',
                      oldValue: state.settings,
                      newValue: importedSettings,
                    },
                    ...state.changeHistory.slice(0, 99),
                  ],
                }),
                false,
                'settings/importSettings'
              );
              return true;
            }
            return false;
          } catch {
            return false;
          }
        },
        
        getChangeHistory: () => {
          const state = get();
          return state.changeHistory;
        },
        
        clearChangeHistory: () => set(
          { changeHistory: [] },
          false,
          'settings/clearChangeHistory'
        ),
        
        validateSettings: () => {
          const state = get();
          // 기본적인 설정 검증 로직
          const requiredKeys: (keyof AppSettings)[] = [
            'language',
            'timezone',
            'dateFormat',
            'timeFormat',
            'currency',
            'notifications',
            'privacy',
            'performance',
            'accessibility',
            'developer',
          ];
          
          return requiredKeys.every(key => key in state.settings);
        },
        
        getDefaultSettings: () => defaultSettings,
      }),
      {
        name: 'settings-store',
        partialize: (state) => ({
          settings: state.settings,
        }),
      }
    ),
    {
      name: 'settings-store',
    }
  )
); 