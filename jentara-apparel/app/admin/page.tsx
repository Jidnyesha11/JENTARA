"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  getAnalytics,
  getRecentOrders,
  getRecentCustomers,
} from "@/lib/supabase/admin-analytics";

import AdminNavbar from "@/components/admin/AdminNavbar";

interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

interface RecentOrder {
  id: string;
  customer_name: string;
  total_amount: number;
  status: string;
}

interface RecentCustomer {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminPage() {
  const [analytics, setAnalytics] =
    useState<Analytics | null>(
      null
    );

  const [recentOrders, setRecentOrders] =
    useState<RecentOrder[]>([]);

  const [
  recentCustomers,
  setRecentCustomers,
] = useState<RecentCustomer[]>([]);

  useEffect(() => {
    let mounted = true;

    getAnalytics()
      .then((data) => {
        if (mounted) {
          setAnalytics(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    getRecentOrders()
      .then((data) => {
        if (mounted) {
          setRecentOrders(data ?? []);
        }
      })
      .catch(console.error);

    getRecentCustomers()
      .then((data) => {
        if (mounted) {
          setRecentCustomers(data ?? []);
        }
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  if (!analytics) {
    return (
      <div className="container-custom py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <AdminNavbar />

      <div
        className="
          grid
          md:grid-cols-4
          gap-6
        "
      >
        <div
          className="
            border
            rounded-xl
            p-6
          "
        >
          <p className="text-sm text-neutral-500">
            Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹
            {analytics.totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div
          className="
            border
            rounded-xl
            p-6
          "
        >
          <p className="text-sm text-neutral-500">
            Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              analytics.totalOrders
            }
          </h2>
        </div>

        <div
          className="
            border
            rounded-xl
            p-6
          "
        >
          <p className="text-sm text-neutral-500">
            Customers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              analytics.totalCustomers
            }
          </h2>
        </div>

        <div
          className="
            border
            rounded-xl
            p-6
          "
        >
          <p className="text-sm text-neutral-500">
            Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              analytics.totalProducts
            }
          </h2>
        </div>

        <div className="mt-12">
  <h2 className="text-3xl font-bold mb-6">
    Recent Orders
  </h2>

  <div className="space-y-4">
    {recentOrders.map(
      (order) => (
        <div
          key={order.id}
          className="
            border
            rounded-xl
            p-6
          "
        >
          <p>
            <strong>
              Order:
            </strong>{" "}
            {order.id}
          </p>

          <p>
            <strong>
              Customer:
            </strong>{" "}
            {
              order.customer_name
            }
          </p>

          <p>
            <strong>
              Amount:
            </strong>{" "}
            ₹
            {
              order.total_amount
            }
          </p>

          <p>
            <strong>
              Status:
            </strong>{" "}
            {order.status}
          </p>
        </div>
      )
    )}
  </div>
</div>
<div className="mt-12">
  <h2 className="text-3xl font-bold mb-6">
    Recent Customers
  </h2>

  <div className="space-y-4">
    {recentCustomers.map(
      (customer) => (
        <div
          key={customer.id}
          className="
            border
            rounded-xl
            p-6
          "
        >
          <p>
            <strong>
              Email:
            </strong>{" "}
            {customer.email}
          </p>

          <p>
            <strong>
              Role:
            </strong>{" "}
            {customer.role}
          </p>

          <p>
            <strong>
              Joined:
            </strong>{" "}
            {new Date(
              customer.created_at
            ).toLocaleDateString()}
          </p>
        </div>
      )
    )}
  </div>
</div>
      </div>
    </div>
  );
}