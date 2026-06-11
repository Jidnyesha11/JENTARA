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

  async function placeOrder() {
    try {
        console.log("USER:", user);
console.log("ITEMS:", items);
console.log("TOTAL:", getTotal());

    setPlacing(true);

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

  total_amount: getTotal(),
})
  .select()
  .single();

console.log("ORDER:", order);
console.log("ORDER ERROR:", orderError);

if (orderError) {
  throw orderError;
}

      if (!order) return;

     const payload = items.map((item) => ({
  order_id: order.id,
  product_id: item.id,
  product_name: item.name,
  price: item.price,
  quantity: item.quantity,
}));

console.log(
  "ORDER ITEMS PAYLOAD:",
  payload
);

const {
  error: itemError,
} = await supabase
  .from("order_items")
  .insert(payload);
console.log("ITEM ERROR:", itemError);

if (itemError) {
  throw itemError;
}
console.log(
  "ORDER ITEMS INSERTED SUCCESSFULLY"
);

alert(
  "ORDER CREATED SUCCESSFULLY"
);
      clearCart();

      router.push(
        `/order-success?id=${order.id}`
      );
    } 
    catch (error: unknown) {
  const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
  console.error(
    "PLACE ORDER ERROR:",
    errorMessage
  );

  alert(errorMessage);
}
    finally {
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