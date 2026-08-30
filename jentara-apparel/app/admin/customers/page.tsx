// app/admin/customers/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getAllCustomers,
  getCustomerOrderSummary,
} from "@/lib/supabase/admin-customers";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [summary, setSummary] = useState<Map<string, { orders: number; spent: number }>>(new Map());
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllCustomers(), getCustomerOrderSummary()])
      .then(([customerData, orderSummary]) => {
        setCustomers(customerData);
        setSummary(orderSummary);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value
      ? customers.filter((customer) =>
          String(customer.email).toLowerCase().includes(value),
        )
      : customers;
  }, [customers, query]);

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / CUSTOMERS
          </p>
        </div>
        <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
          Customers
        </h1>
        <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/50">
          Understand who is buying, how often and how much they have spent.
        </p>
      </header>

      <div className="py-7">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by email..."
          className="w-full border-b border-[#451713]/25 bg-transparent py-4 text-[12px] outline-none focus:border-[#451713] sm:max-w-md"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center text-[9px] uppercase tracking-[0.2em] text-[#451713]/40">
          Loading customers
        </div>
      ) : (
        <div className="divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {filtered.map((customer) => {
            const data = summary.get(customer.id) ?? { orders: 0, spent: 0 };

            return (
              <article key={customer.id} className="grid gap-4 py-6 sm:grid-cols-[1.5fr_0.6fr_0.7fr_0.8fr] sm:items-center">
                <div>
                  <p className="break-all text-[11px]">{customer.email}</p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">
                    {customer.role || "customer"}
                  </p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">Orders</p>
                  <p className="mt-2 font-serif text-xl">{data.orders}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">Spent</p>
                  <p className="mt-2 font-serif text-xl">₹{data.spent.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">Joined</p>
                  <p className="mt-2 text-[10px] text-[#451713]/55">
                    {new Date(customer.created_at).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
