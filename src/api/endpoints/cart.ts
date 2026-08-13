import { api } from '../client';
import type { Cart, CartItemUpdatePayload, CartItemWritePayload } from '../types';

export const cartApi = {
  get: () => api.get<Cart>('/api/v1/cart/'),

  addItem: (payload: CartItemWritePayload) => api.post<Cart>('/api/v1/cart/items/', payload),

  updateItem: (itemId: number, payload: CartItemUpdatePayload) =>
    api.patch<Cart>(`/api/v1/cart/items/${itemId}/`, payload),

  removeItem: (itemId: number) => api.delete<void>(`/api/v1/cart/items/${itemId}/`),
};
