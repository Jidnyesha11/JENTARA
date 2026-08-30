// app/admin/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAnalytics,
  getOrdersByMonth,
  getRevenueByMonth,
  getTopProducts,
  type Analytics,
  type OrderPoint,
  type RevenuePoint,
  type TopProduct,
} from "@/lib/supabase/admin-analytics";

const money = (value: number) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

function BarChart({
  points,
  value,
  formatter,
}: {
  points: Array<{ month: string }>;
  value: (index: number) => number;
  formatter: (value: number) => string;
}) {
  const values = points.map((_, index) => value(index));
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-64 items-end gap-2 border-b border-[#451713]/15 px-2 pb-0 sm:gap-4">
      {points.map((point, index) => {
        const current = values[index];
        const height = Math.max(4, (current / max) * 100);

        return (
          <div key={`${point.month}-${index}`} className="group flex h-full flex-1 items-end">
            <div className="relative w-full">
              <div
                className="w-full bg-[#451713] transition-opacity group-hover:opacity-70"
                style={{ height: `${height}%` }}
                title={`${point.month}: ${formatter(current)}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [orders, setOrders] = useState<OrderPoint[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getAnalytics(),
      getRevenueByMonth(),
      getOrdersByMonth(),
      getTopProducts(),
    ])
      .then(([metrics, revenueData, orderData, products]) => {
        setAnalytics(metrics);
        setRevenue(revenueData);
        setOrders(orderData);
        setTopProducts(products);
      })
      .catch((loadError) => {
        console.error(loadError);
        setError("Analytics could not be loaded.");
      });
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-24 text-center">
        <p className="font-serif text-3xl">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 border-b border-[#451713] pb-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
        >
          Try again →
        </button>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="animate-pulse">
          <div className="h-2 w-32 bg-[#451713]/10" />
          <div className="mt-7 h-16 w-64 bg-[#451713]/10" />
          <div className="mt-12 h-80 border border-[#451713]/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / ANALYTICS
          </p>
        </div>
        <h1 className="mt-6 font-serif text-[52px] leading-[0.9] tracking-[-0.06em] sm:text-[72px]">
          Analytics
        </h1>
        <p className="mt-4 max-w-xl text-[12px] leading-6 text-[#451713]/55">
          Twelve months of revenue and order movement, with the products driving the collection.
        </p>
      </header>

      <section className="grid border-b border-[#451713]/15 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Revenue", money(analytics.totalRevenue)],
          ["Orders", analytics.totalOrders.toLocaleString("en-IN")],
          ["Average order", money(analytics.averageOrderValue)],
          ["Customers", analytics.totalCustomers.toLocaleString("en-IN")],
        ].map(([label, value]) => (
          <div key={label} className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">{label}</p>
            <p className="mt-4 font-serif text-4xl tracking-[-0.05em]">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-10 py-10 lg:grid-cols-2">
        <article className="border border-[#451713]/12 p-6 sm:p-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">Financial overview</p>
              <h2 className="mt-2 font-serif text-3xl">Revenue</h2>
            </div>
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#451713]/35">12 months</span>
          </div>

          <div className="mt-8">
            <BarChart
              points={revenue}
              value={(index) => revenue[index]?.revenue ?? 0}
              formatter={money}
            />
            <div className="mt-3 flex justify-between text-[8px] uppercase tracking-[0.14em] text-[#451713]/35">
              {revenue.map((point, index) => (
                <span key={`${point.month}-${index}`}>{point.month}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="border border-[#451713]/12 p-6 sm:p-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">Order activity</p>
              <h2 className="mt-2 font-serif text-3xl">Orders</h2>
            </div>
            <span className="text-[9px] uppercase tracking-[0.14em] text-[#451713]/35">12 months</span>
          </div>

          <div className="mt-8">
            <BarChart
              points={orders}
              value={(index) => orders[index]?.orders ?? 0}
              formatter={(value) => `${value} orders`}
            />
            <div className="mt-3 flex justify-between text-[8px] uppercase tracking-[0.14em] text-[#451713]/35">
              {orders.map((point, index) => (
                <span key={`${point.month}-${index}`}>{point.month}</span>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="border-t border-[#451713]/15 py-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">Product performance</p>
            <h2 className="mt-2 font-serif text-4xl">Top Products</h2>
          </div>
          <Link href="/admin/products" className="text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4">
            Manage products →
          </Link>
        </div>

        <div className="mt-7 divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {topProducts.length === 0 ? (
            <div className="py-16 text-center text-[11px] text-[#451713]/45">No product sales yet.</div>
          ) : (
            topProducts.map((product, index) => (
              <div key={product.productName} className="grid gap-3 px-5 py-5 sm:grid-cols-[50px_1fr_100px_130px] sm:items-center sm:px-6">
                <span className="font-serif text-2xl text-[#451713]/35">0{index + 1}</span>
                <span className="text-[12px]">{product.productName}</span>
                <span className="text-[10px] text-[#451713]/50">{product.quantity} sold</span>
                <span className="text-[11px] font-semibold sm:text-right">{money(product.revenue)}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
