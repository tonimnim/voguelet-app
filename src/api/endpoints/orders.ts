import { api } from '../client';
import type { Order } from '../types';

export const ordersApi = {
  list: () => api.get<Order[]>('/api/v1/orders/'),

  get: (number: string) => api.get<Order>(`/api/v1/orders/${number}/`),
};
