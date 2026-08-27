// app/admin/page.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getAnalytics,
  getRecentCustomers,
  getRecentOrders,
} from "@/lib/supabase/admin-analytics";

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

function formatCurrency(value: number) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function formatOrderId(id: string) {
  return id.length > 10 ? id.slice(0, 8).toUpperCase() : id.toUpperCase();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getStatusLabel(status: string) {
  if (!status) {
    return "Unknown";
  }

  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function getStatusClassName(status: string) {
  switch (status.toLowerCase()) {
    case "delivered":
      return "border-[#314b35]/20 bg-[#314b35]/5 text-[#314b35]";

    case "shipped":
      return "border-[#29465a]/20 bg-[#29465a]/5 text-[#29465a]";

    case "processing":
      return "border-[#76591d]/20 bg-[#76591d]/5 text-[#76591d]";

    case "pending":
      return "border-[#8a541d]/20 bg-[#8a541d]/5 text-[#8a541d]";

    case "cancelled":
      return "border-[#7b2924]/20 bg-[#7b2924]/5 text-[#7b2924]";

    default:
      return "border-[#451713]/15 bg-[#451713]/5 text-[#451713]/60";
  }
}

function LoadingDashboard() {
  return (
    <div className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="animate-pulse">
          <div className="h-2 w-28 bg-[#451713]/10" />

          <div className="mt-7 h-16 w-72 bg-[#451713]/10" />

          <div className="mt-4 h-3 w-96 max-w-full bg-[#451713]/10" />

          <div className="mt-12 grid gap-px border border-[#451713]/10 bg-[#451713]/10 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-36 bg-[#f5ede4] p-6"
              >
                <div className="h-2 w-20 bg-[#451713]/10" />
                <div className="mt-5 h-9 w-28 bg-[#451713]/10" />
                <div className="mt-3 h-2 w-16 bg-[#451713]/10" />
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="h-80 border border-[#451713]/10" />
            <div className="h-80 border border-[#451713]/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [analytics, setAnalytics] =
    useState<Analytics | null>(null);

  const [recentOrders, setRecentOrders] =
    useState<RecentOrder[]>([]);

  const [recentCustomers, setRecentCustomers] =
    useState<RecentCustomer[]>([]);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setError(null);

        const [
          analyticsData,
          ordersData,
          customersData,
        ] = await Promise.all([
          getAnalytics(),
          getRecentOrders(),
          getRecentCustomers(),
        ]);

        if (!mounted) {
          return;
        }

        setAnalytics(analyticsData);
        setRecentOrders(ordersData ?? []);
        setRecentCustomers(customersData ?? []);
      } catch (dashboardError) {
        console.error(
          "Failed to load admin dashboard:",
          dashboardError,
        );

        if (mounted) {
          setError(
            "We couldn't load the dashboard data.",
          );
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  if (!analytics) {
    if (error) {
      return (
        <div className="min-h-screen bg-[#f5ede4] text-[#451713]">
          <div className="mx-auto flex min-h-[70vh] max-w-[1500px] items-center justify-center px-5">
            <div className="max-w-md text-center">
              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/40">
                JENTARA / ADMIN
              </p>

              <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em]">
                Dashboard unavailable
              </h1>

              <p className="mt-4 text-[12px] leading-6 text-[#451713]/55">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-7 inline-flex min-h-11 items-center bg-[#451713] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f5ede4] transition hover:bg-[#5c211b]"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <LoadingDashboard />;
  }

  const metrics = [
    {
      label: "Revenue",
      value: formatCurrency(analytics.totalRevenue),
      detail: "All recorded orders",
    },
    {
      label: "Orders",
      value: analytics.totalOrders.toLocaleString("en-IN"),
      detail: "Total orders",
    },
    {
      label: "Customers",
      value: analytics.totalCustomers.toLocaleString("en-IN"),
      detail: "Registered customers",
    },
    {
      label: "Products",
      value: analytics.totalProducts.toLocaleString("en-IN"),
      detail: "Products in catalogue",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* Header */}
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / ADMINISTRATION
            </p>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-[50px] leading-[0.88] tracking-[-0.065em] sm:text-[72px]">
                Dashboard
              </h1>

              <p className="mt-5 max-w-xl text-[12px] leading-6 text-[#451713]/55">
                A quiet view of everything moving through the JENTARA
                storefront.
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/35">
                Store overview
              </p>

              <p className="mt-2 font-serif text-xl">
                JENTARA
              </p>
            </div>
          </div>
        </header>

        {/* KPI strip */}
        <section className="grid border-b border-[#451713]/15 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.23em] text-[#451713]/40">
                {metric.label}
              </p>

              <p className="mt-4 break-words font-serif text-[36px] leading-none tracking-[-0.05em] sm:text-[42px]">
                {metric.value}
              </p>

              <p className="mt-3 text-[10px] text-[#451713]/40">
                {metric.detail}
              </p>
            </div>
          ))}
        </section>

        {/* Overview */}
        <section className="grid gap-10 py-10 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Revenue visual */}
          <article className="border border-[#451713]/12">
            <div className="flex flex-col justify-between gap-5 border-b border-[#451713]/10 p-6 sm:flex-row sm:items-end sm:p-8">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#451713]/40">
                  Financial overview
                </p>

                <h2 className="mt-2 font-serif text-3xl tracking-[-0.045em]">
                  Revenue
                </h2>
              </div>

              <p className="text-[9px] uppercase tracking-[0.16em] text-[#451713]/35">
                Current total
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex min-h-[230px] items-center justify-center border border-dashed border-[#451713]/15 px-6 text-center">
                <div>
                  <p className="font-serif text-4xl tracking-[-0.05em]">
                    {formatCurrency(
                      analytics.totalRevenue,
                    )}
                  </p>

                  <p className="mx-auto mt-3 max-w-sm text-[11px] leading-5 text-[#451713]/45">
                    Your revenue history can be visualised here once the
                    analytics layer exposes time-series data.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Quick actions */}
          <article className="border border-[#451713]/12">
            <div className="border-b border-[#451713]/10 p-6 sm:p-8">
              <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#451713]/40">
                Workspace
              </p>

              <h2 className="mt-2 font-serif text-3xl tracking-[-0.045em]">
                Quick access
              </h2>
            </div>

            <div className="divide-y divide-[#451713]/10">
              <Link
                href="/admin/products"
                className="group flex items-center justify-between p-6 transition hover:bg-[#451713]/[0.025] sm:p-8"
              >
                <div>
                  <p className="font-serif text-xl">
                    Products
                  </p>

                  <p className="mt-1 text-[10px] text-[#451713]/45">
                    Manage the collection
                  </p>
                </div>

                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/admin/orders"
                className="group flex items-center justify-between p-6 transition hover:bg-[#451713]/[0.025] sm:p-8"
              >
                <div>
                  <p className="font-serif text-xl">
                    Orders
                  </p>

                  <p className="mt-1 text-[10px] text-[#451713]/45">
                    Review customer purchases
                  </p>
                </div>

                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/admin/customers"
                className="group flex items-center justify-between p-6 transition hover:bg-[#451713]/[0.025] sm:p-8"
              >
                <div>
                  <p className="font-serif text-xl">
                    Customers
                  </p>

                  <p className="mt-1 text-[10px] text-[#451713]/45">
                    View your customer base
                  </p>
                </div>

                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </article>
        </section>

        {/* Recent orders */}
        <section className="border-t border-[#451713]/15 pt-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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
              View all orders →
            </Link>
          </div>

          <div className="mt-7 overflow-hidden border border-[#451713]/12">
            {recentOrders.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <p className="font-serif text-2xl">
                  No orders yet.
                </p>

                <p className="mt-3 text-[11px] text-[#451713]/45">
                  New customer orders will appear here.
                </p>
              </div>
            ) : (
              <>
                <div className="hidden grid-cols-[1.1fr_1.4fr_0.8fr_0.7fr] border-b border-[#451713]/10 px-6 py-4 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40 md:grid">
                  <span>Order</span>
                  <span>Customer</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>

                <div className="divide-y divide-[#451713]/10">
                  {recentOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/admin/orders/${order.id}`}
                      className="grid gap-4 px-5 py-5 transition hover:bg-[#451713]/[0.025] md:grid-cols-[1.1fr_1.4fr_0.8fr_0.7fr] md:items-center md:px-6"
                    >
                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/35 md:hidden">
                          Order
                        </p>

                        <p className="mt-1 font-serif text-lg md:mt-0">
                          #{formatOrderId(order.id)}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/35 md:hidden">
                          Customer
                        </p>

                        <p className="mt-1 text-[11px] md:mt-0">
                          {order.customer_name || "Guest customer"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/35 md:hidden">
                          Amount
                        </p>

                        <p className="mt-1 text-[11px] font-semibold md:mt-0">
                          {formatCurrency(order.total_amount)}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/35 md:hidden">
                          Status
                        </p>

                        <span
                          className={`mt-1 inline-flex border px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] md:mt-0 ${getStatusClassName(
                            order.status,
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Recent customers */}
        <section className="border-t border-[#451713]/15 py-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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

          <div className="mt-7 overflow-hidden border border-[#451713]/12">
            {recentCustomers.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <p className="font-serif text-2xl">
                  No customers yet.
                </p>

                <p className="mt-3 text-[11px] text-[#451713]/45">
                  Newly registered customers will appear here.
                </p>
              </div>
            ) : (
              <>
                <div className="hidden grid-cols-[1.5fr_0.7fr_1fr] border-b border-[#451713]/10 px-6 py-4 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40 sm:grid">
                  <span>Customer</span>
                  <span>Role</span>
                  <span>Joined</span>
                </div>

                <div className="divide-y divide-[#451713]/10">
                  {recentCustomers.map((customer) => (
                    <Link
                      key={customer.id}
                      href="/admin/customers"
                      className="grid gap-4 px-5 py-5 transition hover:bg-[#451713]/[0.025] sm:grid-cols-[1.5fr_0.7fr_1fr] sm:items-center sm:px-6"
                    >
                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/35 sm:hidden">
                          Customer
                        </p>

                        <p className="mt-1 break-all text-[11px] sm:mt-0">
                          {customer.email}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/35 sm:hidden">
                          Role
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.12em] sm:mt-0">
                          {customer.role || "Customer"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/35 sm:hidden">
                          Joined
                        </p>

                        <p className="mt-1 text-[11px] sm:mt-0">
                          {formatDate(customer.created_at)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}