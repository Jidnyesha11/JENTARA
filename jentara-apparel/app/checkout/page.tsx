"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabase/client";

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

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [placing, setPlacing] =
    useState(false);
  
  const [addressLine1, setAddressLine1] =
  useState("");

const [addressLine2, setAddressLine2] =
  useState("");

const [city, setCity] =
  useState("");

const [stateName, setStateName] =
  useState("");

const [pincode, setPincode] =
  useState("");

  async function placeOrder() {
  try {
    setPlacing(true);

    console.log(
      "USER:",
      JSON.stringify(user, null, 2)
    );

    console.log(
      "CART FULL:",
      JSON.stringify(items, null, 2)
    );

    console.log(
      "TOTAL:",
      getTotal()
    );

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .insert({
  user_id: user?.id,

  customer_name: name,
  customer_email: email,
  customer_phone: phone,

  address_line_1:
    addressLine1,

  address_line_2:
    addressLine2,

  city,

  state:
    stateName,

  pincode,

  total_amount: getTotal(),
})
      .select()
      .single();

    console.log(
      "ORDER:",
      JSON.stringify(order, null, 2)
    );

    console.log(
      "ORDER ERROR:",
      orderError
    );

    if (orderError) {
      throw orderError;
    }

    if (!order) {
      throw new Error(
        "Order was not created"
      );
    }

    const payload = items.map(
      (item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })
    );

    console.log(
      "ORDER ITEMS PAYLOAD FULL:"
    );

    payload.forEach(
      (item, index) => {
        console.log(
          `ITEM ${index}:`,
          JSON.stringify(
            item,
            null,
            2
          )
        );
      }
    );

    const {
      error: itemError,
    } = await supabase
      .from("order_items")
      .insert(payload);

    console.log(
      "ITEM ERROR:",
      itemError
    );

    if (itemError) {
      throw itemError;
    }

    console.log(
      "ORDER ITEMS INSERTED SUCCESSFULLY"
    );

    clearCart();

    router.push(
      `/order-success?id=${order.id}`
    );
  } catch (error: unknown) {
    console.error(
      "PLACE ORDER ERROR:",
      error
    );

    alert(
      JSON.stringify(error)
    );
  } finally {
    setPlacing(false);
  }
}
    useEffect(() => {
  if (!loading && !user) {
    router.push("/login");
  }
}, [user, loading, router]);

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

      <div className="space-y-4">

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Full Name"
          className="border p-4 w-full rounded-lg"
        />

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="border p-4 w-full rounded-lg"
        />

        <input
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          placeholder="Phone"
          className="border p-4 w-full rounded-lg"
        />
        <input
  value={addressLine1}
  onChange={(e) =>
    setAddressLine1(e.target.value)
  }
  placeholder="Address Line 1"
  className="border p-4 w-full rounded-lg"
/>

<input
  value={addressLine2}
  onChange={(e) =>
    setAddressLine2(e.target.value)
  }
  placeholder="Address Line 2"
  className="border p-4 w-full rounded-lg"
/>

<input
  value={city}
  onChange={(e) =>
    setCity(e.target.value)
  }
  placeholder="City"
  className="border p-4 w-full rounded-lg"
/>

<input
  value={stateName}
  onChange={(e) =>
    setStateName(e.target.value)
  }
  placeholder="State"
  className="border p-4 w-full rounded-lg"
/>

<input
  value={pincode}
  onChange={(e) =>
    setPincode(e.target.value)
  }
  placeholder="Pincode"
  className="border p-4 w-full rounded-lg"
/>
      </div>

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