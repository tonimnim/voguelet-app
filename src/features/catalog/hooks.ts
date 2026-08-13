import { useQuery } from '@tanstack/react-query';

import { catalogApi } from '@/src/api/endpoints/catalog';
import { queryKeys } from '@/src/api/queryKeys';
import type { ProductListParams } from '@/src/api/types';

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => catalogApi.categories(),
    staleTime: 5 * 60_000,
  });
}

export function useProducts(params: ProductListParams = {}, options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: queryKeys.products(params),
    queryFn: ({ signal }) => catalogApi.products(params, signal),
    enabled: options.enabled ?? true,
  });
}

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.product(slug ?? ''),
    queryFn: ({ signal }) => catalogApi.product(slug as string, signal),
    enabled: !!slug,
  });
}
