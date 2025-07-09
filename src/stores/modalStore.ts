import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ModalConfig {
  id: string;
  title?: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  loading?: boolean;
  className?: string;
  zIndex?: number;
}

export interface ModalState {
  // 활성 모달들
  modals: ModalConfig[];
  
  // 액션들
  openModal: (config: ModalConfig) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  updateModal: (id: string, updates: Partial<ModalConfig>) => void;
  setModalLoading: (id: string, loading: boolean) => void;
  getModal: (id: string) => ModalConfig | undefined;
  hasModal: (id: string) => boolean;
  getTopModal: () => ModalConfig | undefined;
}

export const useModalStore = create<ModalState>()(
  devtools(
    (set, get) => ({
      modals: [],
      
      openModal: (config: ModalConfig) => set(
        (state) => ({
          modals: [...state.modals, {
            ...config,
            size: config.size || 'md',
            closable: config.closable !== false,
            closeOnOverlayClick: config.closeOnOverlayClick !== false,
            closeOnEscape: config.closeOnEscape !== false,
            showCancel: config.showCancel !== false,
            showConfirm: config.showConfirm !== false,
            loading: config.loading || false,
            zIndex: config.zIndex || 1000 + state.modals.length,
          }],
        }),
        false,
        'modal/openModal'
      ),
      
      closeModal: (id: string) => set(
        (state) => {
          const modal = state.modals.find(m => m.id === id);
          if (modal?.onClose) {
            modal.onClose();
          }
          return {
            modals: state.modals.filter(m => m.id !== id),
          };
        },
        false,
        'modal/closeModal'
      ),
      
      closeAllModals: () => set(
        (state) => {
          state.modals.forEach(modal => {
            if (modal.onClose) {
              modal.onClose();
            }
          });
          return { modals: [] };
        },
        false,
        'modal/closeAllModals'
      ),
      
      updateModal: (id: string, updates: Partial<ModalConfig>) => set(
        (state) => ({
          modals: state.modals.map(modal =>
            modal.id === id ? { ...modal, ...updates } : modal
          ),
        }),
        false,
        'modal/updateModal'
      ),
      
      setModalLoading: (id: string, loading: boolean) => set(
        (state) => ({
          modals: state.modals.map(modal =>
            modal.id === id ? { ...modal, loading } : modal
          ),
        }),
        false,
        'modal/setModalLoading'
      ),
      
      getModal: (id: string) => {
        const state = get();
        return state.modals.find(modal => modal.id === id);
      },
      
      hasModal: (id: string) => {
        const state = get();
        return state.modals.some(modal => modal.id === id);
      },
      
      getTopModal: () => {
        const state = get();
        return state.modals[state.modals.length - 1];
      },
    }),
    {
      name: 'modal-store',
    }
  )
); 