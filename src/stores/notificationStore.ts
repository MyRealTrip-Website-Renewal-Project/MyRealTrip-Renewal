import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  closable?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  createdAt: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

export interface NotificationState {
  // 알림 목록
  notifications: Notification[];
  
  // 설정
  settings: {
    maxNotifications: number;
    defaultDuration: number;
    defaultPosition: Notification['position'];
    stackNotifications: boolean;
  };
  
  // 액션들
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  clearNotificationsByType: (type: NotificationType) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
  setSettings: (settings: Partial<NotificationState['settings']>) => void;
  getNotification: (id: string) => Notification | undefined;
  getNotificationsByType: (type: NotificationType) => Notification[];
}

const defaultSettings = {
  maxNotifications: 5,
  defaultDuration: 5000,
  defaultPosition: 'top-right' as const,
  stackNotifications: true,
};

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set, get) => ({
      notifications: [],
      settings: defaultSettings,
      
      addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => {
        const state = get();
        const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newNotification: Notification = {
          ...notification,
          id,
          createdAt: Date.now(),
          duration: notification.duration ?? state.settings.defaultDuration,
          closable: notification.closable !== false,
          position: notification.position ?? state.settings.defaultPosition,
        };
        
        set(
          (state) => {
            const notifications = state.settings.stackNotifications
              ? [...state.notifications, newNotification]
              : [newNotification];
            
            // 최대 알림 수 제한
            if (notifications.length > state.settings.maxNotifications) {
              notifications.splice(0, notifications.length - state.settings.maxNotifications);
            }
            
            return { notifications };
          },
          false,
          'notification/addNotification'
        );
        
        // 자동 제거
        if (newNotification.duration && newNotification.duration > 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, newNotification.duration);
        }
        
        return id;
      },
      
      removeNotification: (id: string) => set(
        (state) => {
          const notification = state.notifications.find(n => n.id === id);
          if (notification?.onClose) {
            notification.onClose();
          }
          return {
            notifications: state.notifications.filter(n => n.id !== id),
          };
        },
        false,
        'notification/removeNotification'
      ),
      
      clearNotifications: () => set(
        (state) => {
          state.notifications.forEach(notification => {
            if (notification.onClose) {
              notification.onClose();
            }
          });
          return { notifications: [] };
        },
        false,
        'notification/clearNotifications'
      ),
      
      clearNotificationsByType: (type: NotificationType) => set(
        (state) => {
          const notificationsToRemove = state.notifications.filter(n => n.type === type);
          notificationsToRemove.forEach(notification => {
            if (notification.onClose) {
              notification.onClose();
            }
          });
          return {
            notifications: state.notifications.filter(n => n.type !== type),
          };
        },
        false,
        'notification/clearNotificationsByType'
      ),
      
      updateNotification: (id: string, updates: Partial<Notification>) => set(
        (state) => ({
          notifications: state.notifications.map(notification =>
            notification.id === id ? { ...notification, ...updates } : notification
          ),
        }),
        false,
        'notification/updateNotification'
      ),
      
      setSettings: (settings: Partial<NotificationState['settings']>) => set(
        (state) => ({
          settings: { ...state.settings, ...settings },
        }),
        false,
        'notification/setSettings'
      ),
      
      getNotification: (id: string) => {
        const state = get();
        return state.notifications.find(notification => notification.id === id);
      },
      
      getNotificationsByType: (type: NotificationType) => {
        const state = get();
        return state.notifications.filter(notification => notification.type === type);
      },
    }),
    {
      name: 'notification-store',
    }
  )
); 