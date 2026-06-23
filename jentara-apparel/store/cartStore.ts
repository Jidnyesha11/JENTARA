import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (
    item: Omit<CartItem, "quantity">
  ) => void;

  removeItem: (
    id: string,
    size: string
  ) => void;

  increaseQuantity: (
    id: string,
    size: string
  ) => void;

  decreaseQuantity: (
    id: string,
    size: string
  ) => void;

  clearCart: () => void;

  getTotal: () => number;
}

export const useCartStore =
  create<CartStore>()(
    persist(
      (set, get) => ({
        items: [],

        addItem: (item) =>
          set((state) => {
            const existing =
              state.items.find(
                (i) =>
                  i.id === item.id &&
                  i.size === item.size
              );

            if (existing) {
              return {
                items: state.items.map(
                  (i) =>
                    i.id === item.id &&
                    i.size === item.size
                      ? {
                          ...i,
                          quantity:
                            i.quantity + 1,
                        }
                      : i
                ),
              };
            }

            return {
              items: [
                ...state.items,
                {
                  ...item,
                  quantity: 1,
                },
              ],
            };
          }),

        removeItem: (
          id,
          size
        ) =>
          set((state) => ({
            items:
              state.items.filter(
                (item) =>
                  !(
                    item.id === id &&
                    item.size ===
                      size
                  )
              ),
          })),

        increaseQuantity: (
          id,
          size
        ) =>
          set((state) => ({
            items: state.items.map(
              (item) =>
                item.id === id &&
                item.size === size
                  ? {
                      ...item,
                      quantity:
                        item.quantity + 1,
                    }
                  : item
            ),
          })),

        decreaseQuantity: (
          id,
          size
        ) =>
          set((state) => ({
            items: state.items
              .map((item) =>
                item.id === id &&
                item.size === size
                  ? {
                      ...item,
                      quantity:
                        item.quantity - 1,
                    }
                  : item
              )
              .filter(
                (item) =>
                  item.quantity > 0
              ),
          })),

        clearCart: () =>
          set({
            items: [],
          }),

        getTotal: () =>
          get().items.reduce(
            (total, item) =>
              total +
              item.price *
                item.quantity,
            0
          ),
      }),
      {
        name: "jentara-cart-v3",
      }
    )
  );