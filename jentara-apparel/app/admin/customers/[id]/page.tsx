
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import {
  getCustomerDetails,
  type CustomerDetails,
} from "@/lib/supabase/admin-customers";

function money(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function dateTime(
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

function statusLabel(
  status: string | null,
): string {
  return (
    status ||
    "pending"
  )
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

export default function CustomerDetailsPage() {
  const params = useParams<{
    id: string;
  }>();

  const [customer, setCustomer] =
    useState<CustomerDetails | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data =
          await getCustomerDetails(
            params.id,
          );

        if (!cancelled) {
          setCustomer(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          console.error(
            "Customer details loading failed:",
            loadError,
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Customer could not be loaded.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (params.id) {
      void load();
    }

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-24 text-center">
        <p className="font-serif text-3xl">
          Loading customer
        </p>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-24 text-center">
        <p className="font-serif text-3xl">
          {error ||
            "Customer not found."}
        </p>

        <Link
          href="/admin/customers"
          className="mt-6 inline-block border-b border-[#451713] pb-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
        >
          ← Back to customers
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <Link
          href="/admin/customers"
          className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#451713]/45 transition hover:text-[#451713]"
        >
          ← Customers
        </Link>

        <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/40">
              CUSTOMER PROFILE
            </p>

            <h1 className="mt-4 break-all font-serif text-[44px] leading-[0.9] tracking-[-0.06em] sm:text-[64px]">
              {customer.email ||
                "Customer"}
            </h1>

            <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-[#451713]/40">
              {customer.role ||
                "customer"}
            </p>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-[8px] uppercase tracking-[0.18em] text-[#451713]/35">
              Last login
            </p>

            <p className="mt-2 text-[11px]">
              {dateTime(
                customer.last_sign_in_at,
              )}
            </p>

            <p className="mt-2 text-[8px] uppercase tracking-[0.12em] text-[#451713]/30">
              Joined{" "}
              {dateTime(
                customer.created_at,
              )}
            </p>
          </div>
        </div>
      </header>

      <section className="grid border-b border-[#451713]/15 sm:grid-cols-3">
        <div className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0">
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
            Orders
          </p>

          <p className="mt-4 font-serif text-4xl">
            {customer.order_count}
          </p>
        </div>

        <div className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0">
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
            Total spent
          </p>

          <p className="mt-4 font-serif text-4xl">
            {money(
              customer.total_spent,
            )}
          </p>
        </div>

        <div className="px-1 py-8 sm:px-6">
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
            Average order
          </p>

          <p className="mt-4 font-serif text-4xl">
            {money(
              customer.order_count
                ? customer.total_spent /
                    customer.order_count
                : 0,
            )}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
              Purchase history
            </p>

            <h2 className="mt-2 font-serif text-4xl">
              Orders
            </h2>
          </div>

          <span className="text-[9px] uppercase tracking-[0.14em] text-[#451713]/35">
            {customer.orders.length}{" "}
            records
          </span>
        </div>

        <div className="mt-7 divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {customer.orders.length ===
          0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl">
                No orders yet.
              </p>
            </div>
          ) : (
            customer.orders.map(
              (order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="group block py-7 transition hover:bg-[#451713]/[0.025] sm:px-3"
                >
                  <div className="grid gap-5 lg:grid-cols-[1fr_180px_160px_120px_auto] lg:items-center">
                    <div>
                      <p className="font-mono text-[9px]">
                        ORDER #
                        {order.id.slice(
                          0,
                          8,
                        )}
                      </p>

                      <p className="mt-2 text-[9px] text-[#451713]/40">
                        {dateTime(
                          order.created_at,
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-[0.14em] text-[#451713]/35">
                        Amount
                      </p>

                      <p className="mt-2 font-serif text-xl">
                        {money(
                          Number(
                            order.total_amount,
                          ),
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-[0.14em] text-[#451713]/35">
                        Status
                      </p>

                      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.12em]">
                        {statusLabel(
                          order.status,
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-[0.14em] text-[#451713]/35">
                        Delivery
                      </p>

                      <p className="mt-2 text-[9px] text-[#451713]/55">
                        {order.city ||
                          "—"}
                      </p>
                    </div>

                    <span className="text-[16px] transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ),
            )
          )}
        </div>
      </section>
    </main>
  );
}
