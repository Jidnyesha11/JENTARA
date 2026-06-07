import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

interface WishlistStore {
  items: WishlistItem[];

  addItem: (
    item: WishlistItem
  ) => void;

  removeItem: (
    id: string
  ) => void;

  isWishlisted: (
    id: string
  ) => boolean;
}

export const useWishlistStore =
  create<WishlistStore>()(
    persist(
      (set, get) => ({
        items: [],

        addItem: (item) => {
          const exists =
            get().items.some(
              (i) => i.id === item.id
            );

          if (exists) return;

          set((state) => ({
            items: [
              ...state.items,
              item,
            ],
          }));
        },

        removeItem: (id) =>
          set((state) => ({
            items:
              state.items.filter(
                (i) =>
                  i.id !== id
              ),
          })),

        isWishlisted: (id) =>
          get().items.some(
            (i) => i.id === id
          ),
      }),
      {
        name: "jentara-wishlist",
      }
    )
  );