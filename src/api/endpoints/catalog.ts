import { api } from '../client';
import type { Category, PagePaginated, ProductListParams, PublicProductDetail, PublicProductList } from '../types';

export const catalogApi = {
  categories: () => api.get<Category[]>('/api/v1/catalog/categories/', { auth: false }),

  products: (params: ProductListParams = {}, signal?: AbortSignal) =>
    api.get<PagePaginated<PublicProductList>>('/api/v1/catalog/products/', {
      auth: false,
      params,
      signal,
    }),

  product: (slug: string, signal?: AbortSignal) =>
    api.get<PublicProductDetail>(`/api/v1/catalog/products/${encodeURIComponent(slug)}/`, {
      auth: false,
      signal,
    }),
};
