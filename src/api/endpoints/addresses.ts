import { api } from '../client';
import type { Address, AddressPayload, County } from '../types';

export const addressesApi = {
  list: () => api.get<Address[]>('/api/v1/addresses/'),

  create: (payload: AddressPayload) => api.post<Address>('/api/v1/addresses/', payload),

  get: (id: number) => api.get<Address>(`/api/v1/addresses/${id}/`),

  update: (id: number, payload: Partial<AddressPayload>) =>
    api.patch<Address>(`/api/v1/addresses/${id}/`, payload),

  remove: (id: number) => api.delete<void>(`/api/v1/addresses/${id}/`),

  makeDefault: (id: number) => api.post<Address>(`/api/v1/addresses/${id}/default/`),

  counties: () => api.get<County[]>('/api/v1/addresses/counties/'),
};
