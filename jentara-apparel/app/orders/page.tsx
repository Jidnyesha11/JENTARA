"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    async function loadOrders() {
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        return;
      }

      setOrders(data || []);
    }

    loadOrders();
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
    <div className="max-w-6xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-6"
            >
              <p>
                <strong>Order ID:</strong>{" "}
                {order.id}
              </p>

              <p>
                <strong>Total:</strong> ₹
                {order.total_amount}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.status}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </p>

              <Link
                href={`/orders/${order.id}`}
                className="
                  inline-block
                  mt-4
                  bg-black
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}