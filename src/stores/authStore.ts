import { create } from 'zustand';

import type { CurrentUser } from '@/src/api/types';

export type AuthStatus = 'loading' | 'signedOut' | 'signedIn';

interface AuthState {
  status: AuthStatus;
  user: CurrentUser | null;
  setSignedIn: (user: CurrentUser) => void;
  setSignedOut: () => void;
  setUser: (user: CurrentUser) => void;
}

/**
 * Holds the session's routing status + the current user snapshot from the last
 * /me/ or OTP-verify response. This is UI/routing state, not a cache of server
 * data — the authoritative, always-fresh copy of `CurrentUser` lives in TanStack
 * Query (see useCurrentUser). Kept in Zustand because the router needs to read it
 * synchronously to decide (auth) vs (tabs) before any query has resolved.
 */
export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  user: null,
  setSignedIn: (user) => set({ status: 'signedIn', user }),
  setSignedOut: () => set({ status: 'signedOut', user: null }),
  setUser: (user) => set({ user }),
}));
