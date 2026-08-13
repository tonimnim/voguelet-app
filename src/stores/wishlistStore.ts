import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * "Liked" products — no favourites/wishlist endpoint exists on the backend yet,
 * so this never leaves the device (for guests or signed-in users). Flag to
 * backend if likes should sync across sign-in/devices.
 */
export interface WishlistItem {
  productSlug: string;
  productTitle: string;
  sellerName: string;
  priceFrom: string;
  imageUrl?: string;
}

interface WishlistState {
  items: Record<string, WishlistItem>;
  toggle: (item: WishlistItem) => void;
  isLiked: (slug: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: {},
      toggle: (item) =>
        set((state) => {
          const next = { ...state.items };
          if (next[item.productSlug]) {
            delete next[item.productSlug];
          } else {
            next[item.productSlug] = item;
          }
          return { items: next };
        }),
      isLiked: (slug) => !!get().items[slug],
    }),
    {
      name: 'voguelet-wishlist',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
