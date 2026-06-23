"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";

import { supabase } from "@/lib/supabase/client";
import { getDefaultAddress } from "@/lib/supabase/addresses";

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const items = useCartStore(
    (state) => state.items
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const getTotal = useCartStore(
    (state) => state.getTotal
  );

  const [address, setAddress] =
    useState<Address | null>(null);

  const [placing, setPlacing] =
    useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (!user) return;

    (async () => {
      try {
        const data =
          await getDefaultAddress(
            user.id
          );

        setAddress(data);
      } catch (error: unknown) {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error(
    "PLACE ORDER ERROR:",
    err
  );

  console.error(
    "MESSAGE:",
    err.message
  );

  console.error(
    "FULL:",
    JSON.stringify(error)
  );

  alert(
    err.message ??
      JSON.stringify(error)
  );
}
    })();
  }, [user, loading, router]);

  async function placeOrder() {
    if (!user) return;

    if (!address) {
      alert(
        "Please set a default address first"
      );

      router.push(
        "/profile/addresses"
      );

      return;
    }

    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setPlacing(true);

      for (const item of items) {
  const {
    data: product,
    error,
  } = await supabase
    .from("products")
    .select(
      "name,size_inventory"
    )
    .eq("id", item.id)
    .single();

  if (error) {
    throw error;
  }

  const inventory =
    (product.size_inventory ??
      {}) as Record<
      string,
      number
    >;

  const availableStock =
    Number(
      inventory[item.size] ??
        0
    );

  if (
    availableStock <
    item.quantity
  ) {
    alert(
      `${product.name} (${item.size}) is out of stock`
    );

    return;
  }
}

      const {
        data: order,
        error: orderError,
      } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,

          address_id: address.id,

          customer_name:
            address.full_name,

          customer_email:
            user.email,

          customer_phone:
            address.phone,

          address_line_1:
            address.address_line_1,

          address_line_2:
            address.address_line_2,

          city: address.city,

          state: address.state,

          pincode:
            address.pincode,

          total_amount:
            getTotal(),

          status: "pending",
        })
        .select()
        .single();

      if (orderError)
        throw orderError;

      if (!order) {
        throw new Error(
          "Order creation failed"
        );
      }

      const payload =
  items.map((item) => ({
    order_id: order.id,

    product_id: item.id,

    product_name:
      item.name,

    size: item.size,

    price: item.price,

    quantity:
      item.quantity,
  }));

      const {
  error: itemError,
} = await supabase
  .from("order_items")
  .insert(payload);

if (itemError) {
  throw itemError;
}

for (const item of items) {
  const {
    data: product,
    error: productError,
  } = await supabase
    .from("products")
    .select(
      "size_inventory"
    )
    .eq("id", item.id)
    .single();

  if (productError) {
    throw productError;
  }

  const inventory = {
    ...((product.size_inventory ??
      {}) as Record<
      string,
      number
    >),
  };

  inventory[item.size] =
    Math.max(
      0,
      Number(
        inventory[item.size] ??
          0
      ) - item.quantity
    );

  const {
    error: updateError,
  } = await supabase
    .from("products")
    .update({
      size_inventory:
        inventory,
    })
    .eq("id", item.id);

  if (updateError) {
    throw updateError;
  }
}
      clearCart();

      router.push(
        `/order-success?id=${order.id}`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to place order"
      );
    } finally {
      setPlacing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8f5f2] py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold text-[#4a0f0f]">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your order securely.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Address Section */}
          <div className="lg:col-span-2">

            {!address ? (
              <div className="bg-white rounded-3xl shadow-md p-8">

                <h2 className="text-2xl font-bold mb-4">
                  Delivery Address
                </h2>

                <p className="text-gray-500 mb-6">
                  No default address found.
                </p>

                <button
                  onClick={() =>
                    router.push(
                      "/profile/addresses"
                    )
                  }
                  className="
                    bg-[#4a0f0f]
                    text-white
                    px-8
                    py-4
                    rounded-xl
                    hover:bg-[#5d1818]
                    transition
                  "
                >
                  Add Address
                </button>

              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-md p-8">

                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-2xl font-bold">
                    Delivery Address
                  </h2>

                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    Default Address
                  </span>

                </div>

                <h3 className="text-xl font-semibold">
                  {address.full_name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {address.phone}
                </p>

                <div className="mt-4 text-gray-600 space-y-1">

                  <p>
                    {address.address_line_1}
                  </p>

                  <p>
                    {address.address_line_2}
                  </p>

                  <p>
                    {address.city},{" "}
                    {address.state}
                  </p>

                  <p>
                    {address.pincode}
                  </p>

                </div>

                <button
                  onClick={() =>
                    router.push(
                      "/profile/addresses"
                    )
                  }
                  className="
                    mt-6
                    text-[#4a0f0f]
                    font-semibold
                    hover:underline
                  "
                >
                  Change Address
                </button>

              </div>
            )}

          </div>

          {/* Order Summary */}
          <div>

            <div className="bg-white rounded-3xl shadow-md p-8 sticky top-10">

              <h2 className="text-3xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>
                    {
  items.reduce(
    (
      total,
      item
    ) =>
      total +
      item.quantity,
    0
  )
}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">
                    Free
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Included</span>
                </div>

              </div>

              <div className="border-t mt-6 pt-6">

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-[#4a0f0f]">
                    ₹{getTotal()}
                  </span>

                </div>

              </div>

              <button
                onClick={placeOrder}
                disabled={placing}
                className="
                  w-full
                  mt-8
                  bg-[#4a0f0f]
                  text-white
                  py-4
                  rounded-xl
                  text-lg
                  font-semibold
                  hover:bg-[#5d1818]
                  transition
                  disabled:opacity-50
                "
              >
                {placing
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              <div className="mt-6 text-sm text-gray-500 space-y-2">

                <p>🔒 Secure Checkout</p>
                <p>🚚 Free Shipping</p>
                <p>↩️ Easy Returns</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}