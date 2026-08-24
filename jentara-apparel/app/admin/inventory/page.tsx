// app/admin/inventory/page.tsx

"use client";

import Link from "next/link";

const metrics = [
  ["Total stock", "—"],
  ["Low stock", "—"],
  ["Out of stock", "—"],
];

export default function InventoryPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / COMMERCE
            </p>
          </div>

          <h1 className="mt-6 font-serif text-[48px] leading-[0.9] tracking-[-0.06em] sm:text-[68px]">
            Inventory
          </h1>

          <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/50">
            Monitor stock levels across the collection, including size-level
            availability.
          </p>
        </header>

        <section className="grid border-b border-[#451713]/15 sm:grid-cols-3">
          {metrics.map(([label, value]) => (
            <div
              key={label}
              className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 sm:border-b-0"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
                {label}
              </p>

              <p className="mt-4 font-serif text-4xl tracking-[-0.05em]">
                {value}
              </p>
            </div>
          ))}
        </section>

        <section className="py-10">
          <div className="border border-[#451713]/12">
            <div className="flex flex-col gap-4 border-b border-[#451713]/10 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
                  Stock control
                </p>

                <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em]">
                  Product inventory
                </h2>
              </div>

              <Link
                href="/admin/products"
                className="text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
              >
                Manage products →
              </Link>
            </div>

            <div className="flex min-h-[300px] items-center justify-center p-8 text-center">
              <div>
                <p className="font-serif text-3xl">
                  Inventory data will appear here.
                </p>

                <p className="mx-auto mt-3 max-w-md text-[11px] leading-5 text-[#451713]/50">
                  This section is ready for the existing product stock data to
                  be connected.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}