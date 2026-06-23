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

  function getStatusColor(status: string) {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-orange-100 text-orange-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "processing":
        return "bg-yellow-100 text-yellow-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Orders...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold text-[#4a0f0f]">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Track and manage your purchases.
          </p>

        </div>

        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md p-16 text-center">

            <div className="text-7xl mb-4">
              📦
            </div>

            <h2 className="text-3xl font-semibold mb-4">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mb-8">
              Start shopping and your orders will appear here.
            </p>

            <Link
              href="/shop"
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

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-md
                  p-8
                  hover:shadow-lg
                  transition
                "
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  {/* Order Info */}
                  <div>

                    <div className="flex items-center gap-3 mb-3">

                      <h3 className="text-xl font-bold">
                        Order #{order.id.slice(0, 8)}
                      </h3>

                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${getStatusColor(order.status)}
                        `}
                      >
                        {order.status}
                      </span>

                    </div>

                    <div className="space-y-1">
  <p>
    <strong>Date:</strong>{" "}
    {new Date(
      order.created_at
    ).toLocaleDateString()}
  </p>

  <p>
    <strong>Total:</strong>{" "}
    ₹{order.total_amount}
  </p>
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
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  </div>
  );
}