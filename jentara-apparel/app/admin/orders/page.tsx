// app/admin/orders/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getAllOrders,
  ORDER_STATUSES,
  updateOrderStatus,
  type OrderStatus,
} from "@/lib/supabase/admin-orders";

const money = (value: number) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

function statusClass(status: string) {
  switch (status) {
    case "delivered":
      return "border-[#314b35]/20 bg-[#314b35]/5 text-[#314b35]";
    case "shipped":
      return "border-[#29465a]/20 bg-[#29465a]/5 text-[#29465a]";
    case "processing":
      return "border-[#76591d]/20 bg-[#76591d]/5 text-[#76591d]";
    case "cancelled":
      return "border-[#7b2924]/20 bg-[#7b2924]/5 text-[#7b2924]";
    default:
      return "border-[#8a541d]/20 bg-[#8a541d]/5 text-[#8a541d]";
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      setOrders(await getAllOrders());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        filter === "all" || String(order.status).toLowerCase() === filter;

      const matchesQuery =
        !value ||
        String(order.id).toLowerCase().includes(value) ||
        String(order.customer_name ?? "").toLowerCase().includes(value) ||
        String(order.customer_email ?? "").toLowerCase().includes(value);

      return matchesStatus && matchesQuery;
    });
  }, [filter, orders, query]);

  async function changeStatus(id: string, status: OrderStatus) {
    try {
      await updateOrderStatus(id, status);
      setOrders((current) =>
        current.map((order) =>
          order.id === id ? { ...order, status } : order,
        ),
      );
    } catch (error) {
      console.error(error);
      window.alert("Order status could not be updated.");
    }
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / COMMERCE
          </p>
        </div>
        <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
          Orders
        </h1>
        <p className="mt-4 text-[12px] text-[#451713]/50">
          Keep every purchase moving from confirmation to delivery.
        </p>
      </header>

      <section className="flex flex-col gap-4 border-b border-[#451713]/15 py-6 md:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search order, customer or email..."
          className="min-h-11 flex-1 border-b border-[#451713]/25 bg-transparent px-0 text-[11px] outline-none focus:border-[#451713]"
        />
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="min-h-11 border border-[#451713]/15 bg-transparent px-4 text-[9px] font-semibold uppercase tracking-[0.15em] outline-none"
        >
          <option value="all">All statuses</option>
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </section>

      {loading ? (
        <div className="py-20 text-center text-[9px] uppercase tracking-[0.2em] text-[#451713]/40">
          Loading orders
        </div>
      ) : filtered.length === 0 ? (
        <div className="border-y border-[#451713]/12 py-20 text-center">
          <p className="font-serif text-3xl">No matching orders.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {filtered.map((order) => (
            <article key={order.id} className="grid gap-5 py-6 lg:grid-cols-[1fr_1.3fr_0.7fr_0.8fr_auto] lg:items-center">
              <Link href={`/admin/orders/${order.id}`} className="font-serif text-xl hover:opacity-60">
                #{order.id.slice(0, 8).toUpperCase()}
              </Link>

              <div>
                <p className="text-[11px]">{order.customer_name || "Guest customer"}</p>
                <p className="mt-1 break-all text-[9px] text-[#451713]/45">{order.customer_email}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold">{money(order.total_amount)}</p>
                <p className="mt-1 text-[9px] text-[#451713]/40">
                  {new Date(order.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>

              <span className={`w-fit border px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] ${statusClass(String(order.status))}`}>
                {order.status || "pending"}
              </span>

              <div className="flex flex-wrap gap-3">
                <select
                  value={order.status || "pending"}
                  onChange={(event) =>
                    void changeStatus(order.id, event.target.value as OrderStatus)
                  }
                  className="min-h-9 border border-[#451713]/15 bg-transparent px-3 text-[8px] font-semibold uppercase tracking-[0.12em]"
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="inline-flex min-h-9 items-center border border-[#451713]/15 px-3 text-[8px] font-semibold uppercase tracking-[0.12em]"
                >
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
