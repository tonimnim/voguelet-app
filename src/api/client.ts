import { authEvents } from '@/src/lib/authEvents';
import { env } from '@/src/lib/env';
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken } from '@/src/lib/secureStore';
import type { ApiErrorBody, TokenRefreshResponse } from './types';

export class ApiError extends Error {
  readonly status: number;
  readonly body: ApiErrorBody | null;

  constructor(status: number, body: ApiErrorBody | null) {
    super(extractDetail(body) ?? `Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

function extractDetail(body: ApiErrorBody | null): string | undefined {
  if (!body) return undefined;
  if ('detail' in body && typeof body.detail === 'string') return body.detail;
  const firstField = Object.values(body)[0];
  if (Array.isArray(firstField)) return firstField[0];
  if (typeof firstField === 'string') return firstField;
  return undefined;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  /** Set false for endpoints that don't require (or must not send) a bearer token. */
  auth?: boolean;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

function buildUrl(path: string, params?: RequestOptions['params']): string {
  const url = new URL(env.apiBaseUrl + path);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

// Single in-flight refresh, shared across concurrent 401s, so a burst of requests
// doesn't fire multiple refresh calls and race the rotating refresh token.
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = await getRefreshToken();
  if (!refresh) return null;
  try {
    const response = await fetch(buildUrl('/api/v1/auth/token/refresh/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!response.ok) return null;
    const data: TokenRefreshResponse = await response.json();
    await setAccessToken(data.access);
    return data.access;
  } catch {
    return null;
  }
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, params, auth = true, signal, headers = {} } = options;

  const doFetch = async (accessToken: string | null): Promise<Response> => {
    const finalHeaders: Record<string, string> = { Accept: 'application/json', ...headers };
    if (body !== undefined) finalHeaders['Content-Type'] = 'application/json';
    if (auth && accessToken) finalHeaders.Authorization = `Bearer ${accessToken}`;

    return fetch(buildUrl(path, params), {
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  };

  const token = auth ? await getAccessToken() : null;
  let response = await doFetch(token);

  if (response.status === 401 && auth) {
    refreshPromise = refreshPromise ?? refreshAccessToken();
    const newToken = await refreshPromise;
    refreshPromise = null;

    if (!newToken) {
      await clearTokens();
      authEvents.emitSessionExpired();
      throw new ApiError(401, { detail: 'Session expired. Please sign in again.' });
    }

    response = await doFetch(newToken);
  }

  if (!response.ok) {
    const errorBody = (await parseBody(response)) as ApiErrorBody | null;
    throw new ApiError(response.status, errorBody ?? null);
  }

  return (await parseBody(response)) as T;
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...options, method: 'POST', body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
