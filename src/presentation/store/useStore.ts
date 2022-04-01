import create from 'zustand';

interface StoreState {
  userId: string | number | null;
  onSaveUserId(userId: string): void;
  onDeleteUserId(): void;
}

export const useStore = create<StoreState>(set => ({
  userId: '',
  onSaveUserId: userId => {
    set(state => ({ ...state, userId }));
  },
  onDeleteUserId: () => {
    set(state => ({ ...state, userId: null }));
  },
}));
