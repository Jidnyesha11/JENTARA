"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore(
    (state) => state.items
  );

  const getTotal = useCartStore(
    (state) => state.getTotal
  );

  const increaseQuantity =
    useCartStore(
      (state) => state.increaseQuantity
    );

  const decreaseQuantity =
    useCartStore(
      (state) => state.decreaseQuantity
    );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <p className="text-lg">
          Cart is empty
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="mt-2">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      className="px-3 py-1 border"
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      className="px-3 py-1 border"
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="text-red-500"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 text-2xl font-bold">
            Total: ₹{getTotal()}
          </div>
          <Link
  href="/checkout"
  className="
    inline-block
    mt-6
    bg-black
    text-white
    px-8
    py-4
    rounded-lg
  "
>
  Proceed To Checkout
</Link>
        </>
      )}
    </div>
  );
}