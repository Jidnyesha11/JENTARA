"use client";

import { useEffect, useState } from "react";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const [mounted, setMounted] =
    useState(false);

  const items = useWishlistStore(
    (state) => state.items
  );

  const removeItem =
    useWishlistStore(
      (state) => state.removeItem
    );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  if (!mounted) {
    return (
      <div className="container-custom py-20">
        Loading Wishlist...
      </div>
    );
  }

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">
        Wishlist
      </h1>

      {items.length === 0 ? (
        <p>No wishlist items.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-6"
            >
              <div className="aspect-square bg-neutral-100 rounded-lg mb-4" />

              <h3 className="font-semibold text-xl">
                {item.name}
              </h3>

              <p className="mt-2">
                ₹{item.price}
              </p>

              <button
                onClick={() =>
                  removeItem(item.id)
                }
                className="mt-4 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}