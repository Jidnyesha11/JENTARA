"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

interface OrderItem {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
}

export default function OrderDetailsPage() {
  const params = useParams();

  const [items, setItems] =
    useState<OrderItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadOrder() {
      const { data, error } =
        await supabase
          .from("order_items")
          .select("*")
          .eq(
            "order_id",
            params.id
          );

      if (error) {
        console.error(error);
      }

      setItems(data || []);
      setLoading(false);
    }

    loadOrder();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">

      <h1 className="text-5xl font-bold mb-10">
        Order Details
      </h1>

      <div className="space-y-6">

        {items.map((item) => (
          <div
            key={item.id}
            className="
              border
              rounded-xl
              p-6
            "
          >
            <h3 className="text-xl font-semibold">
              {item.product_name}
            </h3>

            <p>
              Quantity:
              {" "}
              {item.quantity}
            </p>

            <p>
              Price:
              {" "}
              ₹{item.price}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}