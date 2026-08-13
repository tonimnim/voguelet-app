import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const ACCESS_KEY = 'voguelet.auth.access';
const REFRESH_KEY = 'voguelet.auth.refresh';

export interface TokenPair {
  access: string;
  refresh: string;
}

// expo-secure-store has no web implementation. The app's real targets are iOS
// and Android — web is only used for quick UI preview during development — so
// this falls back to localStorage on web rather than crashing. That storage is
// not secure and must never be treated as a production web auth strategy.
const isWeb = Platform.OS === 'web';

async function getItem(key: string): Promise<string | null> {
  if (isWeb) return typeof localStorage === 'undefined' ? null : localStorage.getItem(key);
  return SecureStore.getItemAsync(key);
}

async function setItem(key: string, value: string): Promise<void> {
  if (isWeb) {
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function deleteItem(key: string): Promise<void> {
  if (isWeb) {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export async function getTokens(): Promise<TokenPair | null> {
  const [access, refresh] = await Promise.all([getItem(ACCESS_KEY), getItem(REFRESH_KEY)]);
  if (!access || !refresh) return null;
  return { access, refresh };
}

export async function getAccessToken(): Promise<string | null> {
  return getItem(ACCESS_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return getItem(REFRESH_KEY);
}

export async function setTokens(tokens: TokenPair): Promise<void> {
  await Promise.all([setItem(ACCESS_KEY, tokens.access), setItem(REFRESH_KEY, tokens.refresh)]);
}

export async function setAccessToken(access: string): Promise<void> {
  await setItem(ACCESS_KEY, access);
}

export async function clearTokens(): Promise<void> {
  await Promise.all([deleteItem(ACCESS_KEY), deleteItem(REFRESH_KEY)]);
}
