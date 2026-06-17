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

function getStatusColor(
  status: string
) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "processing":
      return "bg-blue-100 text-blue-700";

    case "shipped":
      return "bg-purple-100 text-purple-700";

    case "delivered":
      return "bg-green-100 text-green-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
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
              
              <div className="mt-3">
  <span
    className={`
      px-3
      py-1
      rounded-full
      text-sm
      font-medium
      ${getStatusColor(
        order.status
      )}
    `}
  >
    {order.status}
  </span>
</div>
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