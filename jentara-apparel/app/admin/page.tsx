// app/admin/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAnalytics,
  getRecentCustomers,
  getRecentOrders,
  type Analytics,
  type RecentCustomer,
  type RecentOrder,
} from "@/lib/supabase/admin-analytics";

const money = (value: number) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;

function statusClass(status: string | null) {
  switch (String(status).toLowerCase()) {
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

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [customers, setCustomers] = useState<RecentCustomer[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    Promise.all([
      getAnalytics(),
      getRecentOrders(),
      getRecentCustomers(),
    ])
      .then(([metrics, recentOrders, recentCustomers]) => {
        if (!mounted) return;
        setAnalytics(metrics);
        setOrders(recentOrders);
        setCustomers(recentCustomers);
      })
      .catch((loadError) => {
        console.error(loadError);
        if (mounted) setError("Dashboard data could not be loaded.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!analytics && !error) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="animate-pulse">
          <div className="h-2 w-32 bg-[#451713]/10" />
          <div className="mt-7 h-16 w-72 bg-[#451713]/10" />
          <div className="mt-12 grid gap-px border border-[#451713]/10 bg-[#451713]/10 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-36 bg-[#f5ede4] p-6" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-24 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/40">
          JENTARA / ADMIN
        </p>
        <h1 className="mt-5 font-serif text-4xl">Dashboard unavailable.</h1>
        <p className="mt-3 text-[11px] text-[#451713]/50">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-7 bg-[#451713] px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f5ede4]"
        >
          Try again
        </button>
      </div>
    );
  }

  const metrics = [
    ["Revenue", money(analytics.totalRevenue), "All recorded orders"],
    ["Orders", analytics.totalOrders.toLocaleString("en-IN"), "All orders"],
    ["Customers", analytics.totalCustomers.toLocaleString("en-IN"), "Registered customers"],
    ["Products", analytics.totalProducts.toLocaleString("en-IN"), "Catalogue products"],
  ];

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / ADMINISTRATION
          </p>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="font-serif text-[52px] leading-[0.88] tracking-[-0.065em] sm:text-[76px]">
              Dashboard
            </h1>
            <p className="mt-5 max-w-xl text-[12px] leading-6 text-[#451713]/55">
              A quiet view of everything moving through the JENTARA storefront.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/35">
              This month
            </p>
            <p className="mt-2 font-serif text-2xl">{money(analytics.monthRevenue)}</p>
            <p className="mt-1 text-[9px] text-[#451713]/40">
              {analytics.monthOrders} orders
            </p>
          </div>
        </div>
      </header>

      <section className="grid border-b border-[#451713]/15 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value, detail]) => (
          <div
            key={label}
            className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0"
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.23em] text-[#451713]/40">
              {label}
            </p>
            <p className="mt-4 break-words font-serif text-[38px] leading-none tracking-[-0.05em]">
              {value}
            </p>
            <p className="mt-3 text-[10px] text-[#451713]/40">{detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-10 py-10 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="border border-[#451713]/12 p-6 sm:p-8">
          <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#451713]/40">
            Store health
          </p>
          <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em]">
            Current performance
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Monthly revenue", money(analytics.monthRevenue)],
              ["Monthly orders", String(analytics.monthOrders)],
              ["Average order", money(analytics.averageOrderValue)],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-[#451713]/15 pt-5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#451713]/40">
                  {label}
                </p>
                <p className="mt-3 font-serif text-2xl">{value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="border border-[#451713]/12">
          <div className="border-b border-[#451713]/10 p-6 sm:p-8">
            <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#451713]/40">
              Workspace
            </p>
            <h2 className="mt-2 font-serif text-3xl">Quick access</h2>
          </div>

          {[
            ["/admin/products", "Products", "Manage the collection"],
            ["/admin/orders", "Orders", "Review customer purchases"],
            ["/admin/inventory", "Inventory", "Control stock levels"],
            ["/admin/reviews", "Reviews", "Moderate customer feedback"],
          ].map(([href, title, detail]) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between border-b border-[#451713]/10 p-5 transition hover:bg-[#451713]/[0.03]"
            >
              <div>
                <p className="font-serif text-xl">{title}</p>
                <p className="mt-1 text-[10px] text-[#451713]/45">{detail}</p>
              </div>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </article>
      </section>

      <section className="border-t border-[#451713]/15 pt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#451713]/40">
              Latest activity
            </p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">
              Recent Orders
            </h2>
          </div>
          <Link
            href="/admin/orders"
            className="text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        <div className="mt-7 overflow-hidden border border-[#451713]/12">
          {orders.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl">No orders yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#451713]/10">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="grid gap-4 px-5 py-5 transition hover:bg-[#451713]/[0.025] md:grid-cols-[1fr_1.4fr_0.8fr_0.7fr] md:items-center md:px-6"
                >
                  <span className="font-serif text-lg">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="text-[11px]">{order.customer_name || "Guest customer"}</span>
                  <span className="text-[11px] font-semibold">{money(order.total_amount)}</span>
                  <span
                    className={`w-fit border px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] ${statusClass(order.status)}`}
                  >
                    {order.status || "pending"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-[#451713]/15 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#451713]/40">
              Customer activity
            </p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">
              Recent Customers
            </h2>
          </div>
          <Link
            href="/admin/customers"
            className="text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
          >
            View customers →
          </Link>
        </div>

        <div className="mt-7 divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {customers.map((customer) => (
            <div key={customer.id} className="grid gap-3 px-5 py-5 sm:grid-cols-[1.5fr_0.7fr_1fr] sm:px-6">
              <span className="break-all text-[11px]">{customer.email}</span>
              <span className="text-[9px] uppercase tracking-[0.12em]">
                {customer.role || "customer"}
              </span>
              <span className="text-[11px] text-[#451713]/50">
                {new Date(customer.created_at).toLocaleDateString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
