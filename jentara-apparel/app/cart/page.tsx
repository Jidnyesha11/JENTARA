"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

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
    <div className="min-h-screen bg-[#f8f5f2] py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#4a0f0f]">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-2">
            Review your selected items
          </p>
        </div>

        {items.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

            <h2 className="text-3xl font-semibold mb-4">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t added any products yet.
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

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-3xl
                    shadow-md
                    p-6
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div className="flex items-center gap-6">

                    {/*
                    Product Image Section
                    Uncomment after adding image field to cart item

                    <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    */}

                    {/* Product Details */}
                    <div>

                      <h2 className="text-2xl font-semibold">
                        {item.name}
                      </h2>

                      <p className="text-lg text-gray-500 mt-2">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-4 mt-5">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="
                            w-10 h-10
                            rounded-full
                            border
                            border-gray-300
                            hover:bg-gray-100
                          "
                        >
                          -
                        </button>

                        <span className="text-lg font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="
                            w-10 h-10
                            rounded-full
                            border
                            border-gray-300
                            hover:bg-gray-100
                          "
                        >
                          +
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="
                      text-red-500
                      hover:text-red-700
                      font-medium
                    "
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* Order Summary */}
            <div>

              <div className="bg-white rounded-3xl shadow-md p-8 sticky top-10">

                <h2 className="text-3xl font-bold mb-8">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4">
                  <span>Total Items</span>
                  <span>{items.length}</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span>Shipping</span>
                  <span className="text-green-600">
                    Free
                  </span>
                </div>

                <div className="flex justify-between mb-4">
                  <span>Tax</span>
                  <span>Included</span>
                </div>

                <div className="border-t mt-6 pt-6">

                  <div className="flex justify-between text-2xl font-bold">

                    <span>Total</span>

                    <span className="text-[#4a0f0f]">
                      ₹{getTotal()}
                    </span>

                  </div>

                </div>

                <Link
                  href="/checkout"
                  className="
                    block
                    mt-8
                    text-center
                    bg-[#4a0f0f]
                    text-white
                    py-4
                    rounded-xl
                    text-lg
                    font-semibold
                    hover:bg-[#5d1818]
                    transition
                  "
                >
                  Proceed To Checkout
                </Link>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}