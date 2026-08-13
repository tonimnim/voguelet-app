import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cartApi } from '@/src/api/endpoints/cart';
import { queryKeys } from '@/src/api/queryKeys';
import type { CartItem, CartItemUpdatePayload, CartItemWritePayload } from '@/src/api/types';

export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: () => cartApi.get(),
  });
}

/** Groups cart items by seller for the "split by seller" cart layout requirement. */
export function groupCartItemsBySeller(items: CartItem[]) {
  const groups = new Map<string, { sellerSlug: string; sellerName: string; items: CartItem[] }>();
  for (const item of items) {
    const existing = groups.get(item.seller_slug);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.set(item.seller_slug, { sellerSlug: item.seller_slug, sellerName: item.seller_name, items: [item] });
    }
  }
  return Array.from(groups.values());
}

export function useAddCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CartItemWritePayload) => cartApi.addItem(payload),
    onSuccess: (cart) => queryClient.setQueryData(queryKeys.cart, cart),
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, payload }: { itemId: number; payload: CartItemUpdatePayload }) =>
      cartApi.updateItem(itemId, payload),
    onSuccess: (cart) => queryClient.setQueryData(queryKeys.cart, cart),
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) => cartApi.removeItem(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart }),
  });
}
