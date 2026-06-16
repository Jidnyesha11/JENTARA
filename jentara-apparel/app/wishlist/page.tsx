"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import Link from "next/link";

export default function WishlistPage() {
  const items = useWishlistStore(
    (state) => state.items
  );

  const removeItem = useWishlistStore(
    (state) => state.removeItem
  );

  return (
    <div className="min-h-screen bg-[#f8f5f2] py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#4a0f0f]">
            My Wishlist
          </h1>

          <p className="text-gray-500 mt-2">
            Save your favourite fashion pieces.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

            <div className="text-7xl mb-4">
              ♡
            </div>

            <h2 className="text-3xl font-semibold mb-4">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mb-8">
              Explore our latest collection and add your favourite products.
            </p>

            <Link
              href="/products"
              className="
                inline-block
                bg-[#4a0f0f]
                text-white
                px-8
                py-4
                rounded-xl
                hover:bg-[#5d1818]
                transition
              "
            >
              Continue Shopping
            </Link>

          </div>
        ) : (
          <>
            <p className="mb-8 text-gray-600">
              {items.length} item(s) saved
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-3xl
                    shadow-md
                    overflow-hidden
                    hover:shadow-xl
                    transition-all
                  "
                >

                  {/* Image Placeholder */}
                  <div className="aspect-square bg-neutral-100 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">
                      Product Image
                    </span>
                  </div>

                  <div className="p-6">

                    <div className="flex justify-between items-start">

                      <h3 className="font-semibold text-2xl">
                        {item.name}
                      </h3>

                      <span className="text-red-500 text-2xl">
                        ♥
                      </span>

                    </div>

                    <p className="mt-3 text-xl font-medium text-[#4a0f0f]">
                      ₹{item.price}
                    </p>

                    <div className="flex gap-3 mt-6">

                      <button
                        className="
                          flex-1
                          bg-[#4a0f0f]
                          text-white
                          py-3
                          rounded-xl
                          hover:bg-[#5d1818]
                          transition
                        "
                      >
                        Move to Cart
                      </button>

                      <button
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="
                          px-5
                          border
                          border-red-500
                          text-red-500
                          rounded-xl
                          hover:bg-red-50
                          transition
                        "
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </div>
  );
}