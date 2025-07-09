import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  preferences: {
    language: string;
    timezone: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  createdAt: string;
  lastLoginAt: string;
}

export interface UserState {
  // 사용자 정보
  user: User | null;
  
  // 인증 상태
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // 세션 정보
  session: {
    token: string | null;
    expiresAt: number | null;
    refreshToken: string | null;
  };
  
  // 액션들
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setSession: (session: Partial<UserState['session']>) => void;
  updateUser: (updates: Partial<User>) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
  logout: () => void;
  refreshSession: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  session: {
    token: null,
    expiresAt: null,
    refreshToken: null,
  },
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        setUser: (user: User | null) => set(
          { user, isAuthenticated: !!user },
          false,
          'user/setUser'
        ),
        
        setAuthenticated: (authenticated: boolean) => set(
          { isAuthenticated: authenticated },
          false,
          'user/setAuthenticated'
        ),
        
        setLoading: (loading: boolean) => set(
          { isLoading: loading },
          false,
          'user/setLoading'
        ),
        
        setSession: (session: Partial<UserState['session']>) => set(
          (state) => ({
            session: { ...state.session, ...session },
          }),
          false,
          'user/setSession'
        ),
        
        updateUser: (updates: Partial<User>) => set(
          (state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
          }),
          false,
          'user/updateUser'
        ),
        
        updatePreferences: (preferences: Partial<User['preferences']>) => set(
          (state) => ({
            user: state.user
              ? {
                  ...state.user,
                  preferences: { ...state.user.preferences, ...preferences },
                }
              : null,
          }),
          false,
          'user/updatePreferences'
        ),
        
        logout: () => set(
          initialState,
          false,
          'user/logout'
        ),
        
        refreshSession: async () => {
          const state = get();
          if (!state.session.refreshToken) {
            throw new Error('No refresh token available');
          }
          
          try {
            set({ isLoading: true }, false, 'user/refreshSession-start');
            
            // 실제 API 호출을 여기에 구현
            // const response = await api.refreshToken(state.session.refreshToken);
            // set({ session: response.session }, false, 'user/refreshSession-success');
            
            // 임시 구현
            await new Promise(resolve => setTimeout(resolve, 1000));
            set({ isLoading: false }, false, 'user/refreshSession-end');
          } catch (error) {
            set({ isLoading: false }, false, 'user/refreshSession-error');
            throw error;
          }
        },
        
        checkAuth: async () => {
          const state = get();
          if (!state.session.token) {
            return false;
          }
          
          if (state.session.expiresAt && Date.now() > state.session.expiresAt) {
            try {
              await get().refreshSession();
              return true;
            } catch {
              get().logout();
              return false;
            }
          }
          
          return true;
        },
      }),
      {
        name: 'user-store',
        partialize: (state) => ({
          user: state.user,
          session: state.session,
        }),
      }
    ),
    {
      name: 'user-store',
    }
  )
); 