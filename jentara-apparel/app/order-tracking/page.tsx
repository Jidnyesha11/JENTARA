// app/order-tracking/page.tsx

"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
}

const statuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

const statusLabels: Record<
  string,
  string
> = {
  pending: "Order Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
};

export default function OrderTrackingPage() {
  const router = useRouter();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [orderId, setOrderId] =
    useState("");

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (
      !authLoading &&
      !user
    ) {
      router.push("/login");
    }
  }, [
    authLoading,
    user,
    router,
  ]);

  async function handleSearch(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    const trimmedId =
      orderId.trim();

    if (!trimmedId) {
      setError(
        "Please enter your order ID."
      );
      setOrder(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

      const {
        data,
        error: orderError,
      } = await supabase
        .from("orders")
        .select(
          `
          id,
          total_amount,
          status,
          created_at,
          address_line_1,
          address_line_2,
          city,
          state,
          pincode
        `
        )
        .eq("id", trimmedId)
        .eq("user_id", user.id)
        .single();

      if (orderError) {
        console.error(
          "ORDER TRACKING ERROR:",
          orderError
        );

        setError(
          "We couldn't find an order with that ID."
        );

        return;
      }

      setOrder(data);
    } catch (trackingError) {
      console.error(
        "ORDER TRACKING ERROR:",
        trackingError
      );

      setError(
        "Something went wrong while finding your order."
      );
    } finally {
      setLoading(false);
    }
  }

  function getStatusIndex(
    status: string
  ) {
    const normalized =
      status.toLowerCase();

    const index =
      statuses.indexOf(
        normalized
      );

    return index >= 0
      ? index
      : 0;
  }

  function formatDate(
    date: string
  ) {
    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  }

  function formatOrderId(
    id: string
  ) {
    return id.slice(0, 8).toUpperCase();
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#f5ede4]">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#451713]">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const currentStatus =
    order?.status?.toLowerCase() ??
    "";

  const currentStatusIndex =
    getStatusIndex(
      currentStatus
    );

  const isCancelled =
    currentStatus ===
    "cancelled";

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#151a2a]">
      {/* Hero */}

      <section className="mx-auto max-w-[1500px] px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />

          <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#451713]">
            JENTARA / ORDERS
          </p>
        </div>

        <div className="grid gap-10 border-b border-[#451713]/15 pb-14 md:grid-cols-[1fr_420px] md:items-end">
          <h1 className="font-serif text-[62px] leading-[0.82] tracking-[-0.07em] sm:text-[86px] md:text-[112px]">
            TRACK
            <br />
            ORDER
          </h1>

          <p className="max-w-md text-sm leading-7 text-[#151a2a]/55 md:pb-2">
            Enter your order ID to view
            the latest status of your
            JENTARA purchase.
          </p>
        </div>
      </section>

      {/* Search */}

      <section className="mx-auto max-w-[1000px] px-6 pb-20 md:px-10 md:pb-28">
        <form
          onSubmit={handleSearch}
          className="
            border
            border-[#451713]/15
            bg-[#faf6f1]
            p-6
            md:p-8
          "
        >
          <label
            htmlFor="order-id"
            className="
              block
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#451713]
            "
          >
            ORDER ID
          </label>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              id="order-id"
              type="text"
              value={orderId}
              onChange={(event) =>
                setOrderId(
                  event.target.value
                )
              }
              placeholder="Enter your order ID"
              autoComplete="off"
              className="
                min-w-0
                flex-1
                border
                border-[#451713]/15
                bg-[#f5ede4]
                px-5
                py-4
                text-sm
                outline-none
                transition
                placeholder:text-[#151a2a]/35
                focus:border-[#451713]
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                bg-[#451713]
                px-8
                py-4
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white
                transition
                hover:bg-[#32100d]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Searching..."
                : "Track Order"}
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="
                mt-4
                text-sm
                text-red-700
              "
            >
              {error}
            </p>
          )}

          <p className="mt-4 text-[9px] uppercase tracking-[0.12em] text-[#151a2a]/40">
            Your order ID can be found
            in your order details.
          </p>
        </form>
      </section>

      {/* Result */}

      {order && (
        <section className="mx-auto max-w-[1100px] px-6 pb-28 md:px-10">
          {/* Order Header */}

          <div className="mb-8 flex flex-col gap-5 border-b border-[#451713]/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50">
                ORDER
              </p>

              <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">
                #{formatOrderId(
                  order.id
                )}
              </h2>
            </div>

            <div className="sm:text-right">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#151a2a]/40">
                Placed
              </p>

              <p className="mt-1 text-sm">
                {formatDate(
                  order.created_at
                )}
              </p>
            </div>
          </div>

          {isCancelled ? (
            <div className="border border-red-900/10 bg-red-50 p-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-red-700">
                ORDER CANCELLED
              </p>

              <h3 className="mt-3 font-serif text-3xl text-red-900">
                This order has been
                cancelled.
              </h3>
            </div>
          ) : (
            <div className="border border-[#451713]/15 bg-[#faf6f1] p-6 md:p-10">
              <div className="grid gap-8 md:grid-cols-4">
                {statuses.map(
                  (
                    status,
                    index
                  ) => {
                    const completed =
                      index <=
                      currentStatusIndex;

                    const active =
                      status ===
                      currentStatus;

                    return (
                      <div
                        key={status}
                        className="relative"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              border
                              text-xs
                              font-semibold
                              transition
                              ${
                                completed
                                  ? "border-[#451713] bg-[#451713] text-white"
                                  : "border-[#451713]/20 text-[#451713]/30"
                              }
                            `}
                          >
                            {completed
                              ? "✓"
                              : String(
                                  index +
                                    1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                          </div>

                          <div>
                            <p
                              className={`
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                ${
                                  active
                                    ? "text-[#451713]"
                                    : "text-[#151a2a]/45"
                                }
                              `}
                            >
                              {
                                statusLabels[
                                  status
                                ]
                              }
                            </p>

                            {active && (
                              <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#451713]/50">
                                Current Status
                              </p>
                            )}
                          </div>
                        </div>

                        {index <
                          statuses.length -
                            1 && (
                          <div
                            className={`
                              absolute
                              left-5
                              top-10
                              hidden
                              h-px
                              w-[calc(100%-20px)]
                              md:block
                              ${
                                index <
                                currentStatusIndex
                                  ? "bg-[#451713]"
                                  : "bg-[#451713]/10"
                              }
                            `}
                          />
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* Information */}

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Delivery */}

            <div className="border border-[#451713]/15 bg-[#faf6f1] p-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]">
                DELIVERY ADDRESS
              </p>

              <div className="mt-6 space-y-1 text-sm leading-6 text-[#151a2a]/65">
                <p>
                  {
                    order.address_line_1
                  }
                </p>

                {order.address_line_2 && (
                  <p>
                    {
                      order.address_line_2
                    }
                  </p>
                )}

                <p>
                  {order.city},{" "}
                  {order.state}
                </p>

                <p>
                  {
                    order.pincode
                  }
                </p>
              </div>
            </div>

            {/* Summary */}

            <div className="border border-[#451713]/15 bg-[#faf6f1] p-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]">
                ORDER SUMMARY
              </p>

              <div className="mt-6 flex items-end justify-between">
                <span className="text-sm text-[#151a2a]/55">
                  Total
                </span>

                <span className="font-serif text-4xl tracking-[-0.04em] text-[#451713]">
                  ₹
                  {Number(
                    order.total_amount
                  ).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="mt-5 border-t border-[#451713]/10 pt-5">
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#151a2a]/40">
                  Status
                </p>

                <p className="mt-2 text-sm font-medium capitalize">
                  {order.status}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/orders/${order.id}`}
              className="
                inline-flex
                items-center
                justify-center
                bg-[#451713]
                px-7
                py-4
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
                transition
                hover:bg-[#32100d]
              "
            >
              View Order Details
            </Link>

            <Link
              href="/shop"
              className="
                inline-flex
                items-center
                justify-center
                border
                border-[#451713]/20
                px-7
                py-4
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#451713]
                transition
                hover:bg-[#451713]
                hover:text-white
              "
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      )}

      {/* Empty state */}

      {!order &&
        !loading &&
        !error && (
          <section className="mx-auto max-w-[900px] px-6 pb-28 text-center md:px-10">
            <div className="border border-[#451713]/10 py-20">
              <p className="font-serif text-4xl tracking-[-0.05em] md:text-5xl">
                Where is my order?
              </p>

              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#151a2a]/50">
                Enter your order ID above
                and we will show you the
                latest available status.
              </p>
            </div>
          </section>
        )}
    </main>
  );
}