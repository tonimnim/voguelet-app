import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';

import { authApi } from '@/src/api/endpoints/auth';
import { cartApi } from '@/src/api/endpoints/cart';
import { meApi } from '@/src/api/endpoints/me';
import { queryKeys } from '@/src/api/queryKeys';
import type { OtpRequestPayload, OtpVerifyPayload } from '@/src/api/types';
import { authEvents } from '@/src/lib/authEvents';
import { clearTokens, getRefreshToken, getTokens, setTokens } from '@/src/lib/secureStore';
import { useAuthStore } from '@/src/stores/authStore';
import { useGuestCartStore } from '@/src/stores/guestCartStore';

/**
 * Runs once at app start: checks SecureStore for a token pair and, if present,
 * validates it against /me/ (which transparently refreshes once via the API
 * client). Also subscribes to session-expiry events raised later during normal
 * use, so a revoked/expired token anywhere in the app routes back to sign-in.
 */
export function useAuthBootstrap() {
  const queryClient = useQueryClient();
  const setSignedIn = useAuthStore((s) => s.setSignedIn);
  const setSignedOut = useAuthStore((s) => s.setSignedOut);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const tokens = await getTokens();
      if (!tokens) {
        if (!cancelled) setSignedOut();
        return;
      }
      try {
        const user = await meApi.get();
        if (cancelled) return;
        queryClient.setQueryData(queryKeys.me, user);
        setSignedIn(user);
      } catch {
        if (!cancelled) setSignedOut();
      }
    })();

    const unsubscribe = authEvents.onSessionExpired(() => setSignedOut());

    return () => {
      cancelled = true;
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useRequestOtp() {
  return useMutation({
    mutationFn: (payload: OtpRequestPayload) => authApi.requestOtp(payload),
  });
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();
  const setSignedIn = useAuthStore((s) => s.setSignedIn);

  return useMutation({
    mutationFn: (payload: OtpVerifyPayload) => authApi.verifyOtp(payload),
    onSuccess: async (data) => {
      await setTokens(data.tokens);
      queryClient.setQueryData(queryKeys.me, data.user);
      setSignedIn(data.user);
      await mergeGuestCart(queryClient);
    },
  });
}

/**
 * Replays the on-device guest cart (added while signed out — see
 * src/stores/guestCartStore.ts) into the real server cart right after sign-in,
 * then clears the local copy. Best-effort per line: one failed item (e.g. now
 * out of stock) doesn't block the rest or block sign-in itself.
 */
async function mergeGuestCart(queryClient: QueryClient) {
  const { items, clear } = useGuestCartStore.getState();
  if (items.length === 0) return;

  for (const item of items) {
    try {
      await cartApi.addItem({ variant_id: item.variantId, quantity: item.quantity });
    } catch {
      // Best-effort — move on to the next line rather than blocking sign-in.
    }
  }
  clear();
  queryClient.invalidateQueries({ queryKey: queryKeys.cart });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const setSignedOut = useAuthStore((s) => s.setSignedOut);

  return useMutation({
    mutationFn: async () => {
      const refresh = await getRefreshToken();
      if (refresh) {
        try {
          await authApi.logout(refresh);
        } catch {
          // Best-effort — the client still clears local tokens below.
        }
      }
    },
    onSettled: async () => {
      await clearTokens();
      queryClient.clear();
      setSignedOut();
    },
  });
}

export function useCurrentUser(enabled: boolean) {
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const user = await meApi.get();
      setUser(user);
      return user;
    },
    enabled,
    staleTime: 60_000,
  });
}
