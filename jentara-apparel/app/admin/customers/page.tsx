
"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAllCustomers,
  type AdminCustomer,
} from "@/lib/supabase/admin-customers";

function money(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function formatDate(
  value: string | null,
): string {
  if (!value) {
    return "Never";
  }

  return new Date(value).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}

function formatDateTime(
  value: string | null,
): string {
  if (!value) {
    return "Never";
  }

  return new Date(value).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
}

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<AdminCustomer[]>([]);

  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data =
          await getAllCustomers();

        if (!cancelled) {
          setCustomers(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          console.error(
            "Customer loading failed:",
            loadError,
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Customers could not be loaded.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered =
    useMemo(() => {
      const value =
        query.trim().toLowerCase();

      if (!value) {
        return customers;
      }

      return customers.filter(
        (customer) =>
          String(
            customer.email ?? "",
          )
            .toLowerCase()
            .includes(value),
      );
    }, [customers, query]);

  const customerCount =
    customers.length;

  const totalSpent =
    customers.reduce(
      (sum, customer) =>
        sum +
        Number(
          customer.total_spent || 0,
        ),
      0,
    );

  const totalOrders =
    customers.reduce(
      (sum, customer) =>
        sum +
        Number(
          customer.order_count || 0,
        ),
      0,
    );

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
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
          Understand who is buying, how often
          they return and how much they have
          spent.
        </p>
      </header>

      <section className="grid border-b border-[#451713]/15 sm:grid-cols-3">
        <div className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0">
          <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
            Customers
          </p>

          <p className="mt-4 font-serif text-4xl">
            {customerCount.toLocaleString(
              "en-IN",
            )}
          </p>
        </div>

        <div className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0">
          <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
            Orders
          </p>

          <p className="mt-4 font-serif text-4xl">
            {totalOrders.toLocaleString(
              "en-IN",
            )}
          </p>
        </div>

        <div className="px-1 py-8 sm:px-6">
          <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
            Customer spend
          </p>

          <p className="mt-4 font-serif text-4xl">
            {money(totalSpent)}
          </p>
        </div>
      </section>

      <div className="border-b border-[#451713]/10 py-7">
        <input
          value={query}
          onChange={(event) =>
            setQuery(
              event.target.value,
            )
          }
          placeholder="Search customers by email..."
          className="w-full border-b border-[#451713]/25 bg-transparent py-4 text-[12px] outline-none transition placeholder:text-[#451713]/30 focus:border-[#451713] sm:max-w-md"
        />
      </div>

      {error && (
        <div className="border-b border-[#7b2924]/20 bg-[#7b2924]/5 px-5 py-4 text-[10px] text-[#7b2924]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-[9px] uppercase tracking-[0.2em] text-[#451713]/40">
          Loading customers
        </div>
      ) : filtered.length ===
        0 ? (
        <div className="border-y border-[#451713]/12 py-20 text-center">
          <p className="font-serif text-3xl">
            No customers found.
          </p>

          <p className="mt-3 text-[11px] text-[#451713]/45">
            Try another email address.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[#451713]/10 border-b border-[#451713]/12">
          {filtered.map(
            (customer) => (
              <Link
                key={customer.id}
                href={`/admin/customers/${customer.id}`}
                className="group grid gap-5 py-6 transition hover:bg-[#451713]/[0.025] sm:grid-cols-[1.5fr_0.5fr_0.7fr_1fr_auto] sm:items-center sm:px-3"
              >
                <div className="min-w-0">
                  <p className="break-all text-[11px]">
                    {customer.email ||
                      "Email unavailable"}
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">
                    {customer.role ||
                      "customer"}
                  </p>
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">
                    Orders
                  </p>

                  <p className="mt-2 font-serif text-xl">
                    {
                      customer.order_count
                    }
                  </p>
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">
                    Spent
                  </p>

                  <p className="mt-2 font-serif text-xl">
                    {money(
                      customer.total_spent,
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">
                    Last login
                  </p>

                  <p className="mt-2 text-[10px] text-[#451713]/55">
                    {formatDateTime(
                      customer.last_sign_in_at,
                    )}
                  </p>

                  <p className="mt-1 text-[8px] text-[#451713]/30">
                    Joined{" "}
                    {formatDate(
                      customer.created_at,
                    )}
                  </p>
                </div>

                <span className="text-[16px] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ),
          )}
        </div>
      )}
    </main>
  );
}

