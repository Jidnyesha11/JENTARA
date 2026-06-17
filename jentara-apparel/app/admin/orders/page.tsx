"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "@/lib/supabase/admin-orders";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  async function loadOrders() {
    const data =
      await getAllOrders();

    setOrders(data ?? []);
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data ?? []);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">
        Manage Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              border
              rounded-xl
              p-6
            "
          >
            <p>
              <strong>ID:</strong>{" "}
              {order.id}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {order.customer_name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.customer_email}
            </p>

            <p>
              <strong>Total:</strong> ₹
              {order.total_amount}
            </p>
            
            <div className="mt-3">
  <select
    value={order.status}
    onChange={async (e) => {
  try {
    await updateOrderStatus(
      order.id,
      e.target.value
    );

    alert(
      "Status Updated"
    );

    await loadOrders();
  } catch (error) {
    console.error(error);
  }
}}
    className="
      border
      p-2
      rounded-lg
    "
  >
    <option value="pending">
      Pending
    </option>

    <option value="processing">
      Processing
    </option>

    <option value="shipped">
      Shipped
    </option>

    <option value="delivered">
      Delivered
    </option>

    <option value="cancelled">
      Cancelled
    </option>
  </select>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}