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

interface Order {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
}

export default function OrderDetailsPage() {
  const params = useParams();

  const [items, setItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      const { data, error } =
        await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", params.id);

      if (error) {
        console.error(error);
      }

      const { data: orderData, error: orderError } =
        await supabase
          .from("orders")
          .select(
            "address_line_1,address_line_2,city,state,pincode"
          )
          .eq("id", params.id)
          .single();

      if (orderError) {
        console.error(orderError);
      }

      setItems(data || []);
      setOrder(orderData || null);
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
            
            {order && (
              <div className="mt-6">
                <p>{order.address_line_1}</p>
                <p>{order.address_line_2}</p>
                <p>
                  {order.city},{" "}
                  {order.state}
                </p>
                <p>{order.pincode}</p>
              </div>
            )}
          </div>
        ))}

      </div>

    </div>
  );
}