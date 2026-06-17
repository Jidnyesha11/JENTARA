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

  const { user, loading } =
    useAuth();

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
    useState<Address | null>(
      null
    );

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
    } catch (error) {
      console.error(error);
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

      const {
        data: order,
        error: orderError,
      } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,

          address_id:
            address.id,

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

          city:
            address.city,

          state:
            address.state,

          pincode:
            address.pincode,

          total_amount:
            getTotal(),

          status: "pending",
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      if (!order) {
        throw new Error(
          "Order creation failed"
        );
      }

      const payload =
        items.map((item) => ({
          order_id: order.id,

          product_id:
            item.id,

          product_name:
            item.name,

          price:
            item.price,

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
      <div className="p-20">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      {!address ? (
        <div className="border rounded-xl p-6">
          <p className="mb-4">
            No default address found
          </p>

          <button
            onClick={() =>
              router.push(
                "/profile/addresses"
              )
            }
            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-lg
            "
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="border rounded-xl p-6">
          <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-4">
            Default Address
          </div>

          <h3 className="text-xl font-bold">
            {address.full_name}
          </h3>

          <p>{address.phone}</p>

          <p className="mt-4">
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

          <button
            onClick={() =>
              router.push(
                "/profile/addresses"
              )
            }
            className="
              mt-4
              text-blue-600
              font-medium
            "
          >
            Change Address
          </button>
        </div>
      )}

      <div className="mt-8 text-2xl font-bold">
        Total: ₹{getTotal()}
      </div>

      <button
        onClick={placeOrder}
        disabled={placing}
        className="
          mt-8
          bg-black
          text-white
          px-8
          py-4
          rounded-lg
        "
      >
        {placing
          ? "Placing Order..."
          : "Place Order"}
      </button>
    </div>
  );
}