import { api } from '../client';
import type { CurrentUser } from '../types';

export const meApi = {
  // GET only — the backend does not yet expose a write endpoint for profile fields.
  // See handoff notes: PATCH /api/v1/me/ is requested but not built.
  get: () => api.get<CurrentUser>('/api/v1/me/'),
};
