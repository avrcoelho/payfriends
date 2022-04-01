import create from 'zustand';

interface StoreState {
  userId: string | null;
  onSaveUserId(userId: string): void;
  onDeleteUserId(): void;
}

export const useStore = create<StoreState>(set => ({
  userId: null,
  onSaveUserId: userId => set(_ => ({ userId })),
  onDeleteUserId: () => set({ userId: null }),
}));
