// app/admin/analytics/page.tsx

"use client";

import Link from "next/link";

const metrics = [
  {
    label: "Revenue",
    value: "₹0",
    detail: "This month",
  },
  {
    label: "Orders",
    value: "0",
    detail: "This month",
  },
  {
    label: "Customers",
    value: "0",
    detail: "Total",
  },
  {
    label: "Average order",
    value: "₹0",
    detail: "Current period",
  },
];

const chartBars = [22, 38, 31, 56, 44, 68, 52, 74, 61, 82, 70, 91];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / ANALYTICS
            </p>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-[48px] leading-[0.9] tracking-[-0.06em] sm:text-[68px]">
                Analytics
              </h1>

              <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/55">
                Understand the movement of the JENTARA store through sales,
                orders and customer behaviour.
              </p>
            </div>

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
              Current period
            </span>
          </div>
        </header>

        <section className="grid border-b border-[#451713]/15 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
                {metric.label}
              </p>

              <p className="mt-4 font-serif text-4xl tracking-[-0.05em]">
                {metric.value}
              </p>

              <p className="mt-2 text-[10px] text-[#451713]/45">
                {metric.detail}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="border border-[#451713]/12 bg-[#f5ede4]">
            <div className="flex items-end justify-between border-b border-[#451713]/10 p-6">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/40">
                  Performance
                </p>

                <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em]">
                  Revenue
                </h2>
              </div>

              <span className="text-[9px] uppercase tracking-[0.15em] text-[#451713]/40">
                12 periods
              </span>
            </div>

            <div className="flex h-[300px] items-end gap-2 px-5 pb-6 pt-10 sm:gap-4 sm:px-8">
              {chartBars.map((height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 items-end"
                >
                  <div
                    className="w-full bg-[#451713]/80 transition hover:bg-[#451713]"
                    style={{ height: `${height}%` }}
                    title={`Period ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t border-[#451713]/10 px-6 py-4 text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">
              <span>Earlier</span>
              <span>Now</span>
            </div>
          </div>

          <div className="border border-[#451713]/12">
            <div className="border-b border-[#451713]/10 p-6">
              <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/40">
                Sales
              </p>

              <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em]">
                Categories
              </h2>
            </div>

            <div className="p-6">
              <div className="flex min-h-[240px] items-center justify-center border border-dashed border-[#451713]/15">
                <div className="max-w-xs text-center">
                  <p className="font-serif text-2xl">
                    No sales data yet.
                  </p>

                  <p className="mt-3 text-[11px] leading-5 text-[#451713]/50">
                    Category performance will appear here once orders begin
                    flowing through the store.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-[#451713]/15 pt-8">
          <Link
            href="/admin/orders"
            className="inline-flex min-h-11 items-center bg-[#451713] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f5ede4] transition hover:bg-[#5c211b]"
          >
            View orders →
          </Link>

          <Link
            href="/admin/products"
            className="inline-flex min-h-11 items-center border border-[#451713]/20 px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713] transition hover:bg-[#451713]/5"
          >
            View products
          </Link>
        </div>
      </div>
    </div>
  );
}