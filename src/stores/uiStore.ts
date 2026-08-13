import { create } from 'zustand';

interface UiState {
  hasSeenWelcome: boolean;
  markWelcomeSeen: () => void;
}

/** Small local UI state only — never server data or tokens. */
export const useUiStore = create<UiState>((set) => ({
  hasSeenWelcome: false,
  markWelcomeSeen: () => set({ hasSeenWelcome: true }),
}));
