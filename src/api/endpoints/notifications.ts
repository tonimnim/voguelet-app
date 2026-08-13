import { api } from '../client';
import type {
  CursorPaginated,
  MarkedReadResponse,
  Notification,
  NotificationListParams,
  UnreadCountResponse,
} from '../types';

export const notificationsApi = {
  list: (params: NotificationListParams = {}) =>
    api.get<CursorPaginated<Notification>>('/api/v1/notifications/', { params }),

  markRead: (id: number) => api.post<Notification>(`/api/v1/notifications/${id}/read/`),

  markAllRead: () => api.post<MarkedReadResponse>('/api/v1/notifications/read-all/'),

  unreadCount: () => api.get<UnreadCountResponse>('/api/v1/notifications/unread-count/'),
};
