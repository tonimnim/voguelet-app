import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * On-device cart for signed-out browsing — sellers/backend never see this until
 * it's replayed into the real server cart on sign-in (see mergeGuestCart in
 * src/features/auth/hooks.ts). Denormalizes just enough product/variant info to
 * render the Cart tab without a network call, since there's no anonymous cart
 * endpoint to read it back from.
 */
export interface GuestCartItem {
  variantId: number;
  quantity: number;
  productSlug: string;
  productTitle: string;
  sellerSlug: string;
  sellerName: string;
  unitPrice: string;
  imageUrl?: string;
  optionValues: Record<string, unknown>;
}

interface GuestCartState {
  items: GuestCartItem[];
  addItem: (item: Omit<GuestCartItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  removeItem: (variantId: number) => void;
  clear: () => void;
}

export const useGuestCartStore = create<GuestCartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.variantId === item.variantId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.variantId === variantId ? { ...i, quantity } : i)),
        })),
      removeItem: (variantId) =>
        set((state) => ({ items: state.items.filter((i) => i.variantId !== variantId) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'voguelet-guest-cart',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

/** Mirrors groupCartItemsBySeller (src/features/cart/hooks.ts) for the guest-cart shape. */
export function groupGuestCartItemsBySeller(items: GuestCartItem[]) {
  const groups = new Map<string, { sellerSlug: string; sellerName: string; items: GuestCartItem[] }>();
  for (const item of items) {
    const existing = groups.get(item.sellerSlug);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.set(item.sellerSlug, { sellerSlug: item.sellerSlug, sellerName: item.sellerName, items: [item] });
    }
  }
  return Array.from(groups.values());
}
