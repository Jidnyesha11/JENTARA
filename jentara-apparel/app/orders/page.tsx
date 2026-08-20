// app/orders/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
}

const TRACKING_STEPS = [
  {
    key: "pending",
    label: "Order Placed",
    description: "Your order has been received.",
  },
  {
    key: "processing",
    label: "Processing",
    description: "Your JENTARA pieces are being prepared.",
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order is on its way.",
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Your order has reached you.",
  },
];

const STATUS_ORDER = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    async function loadOrders() {
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Failed to load orders:", error);
        return;
      }

      const loadedOrders = data ?? [];

      setOrders(loadedOrders);

      if (loadedOrders.length > 0) {
        setSelectedOrderId(loadedOrders[0].id);
      }
    }

    loadOrders();
  }, [user, loading, router]);

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order.id === selectedOrderId) ?? null;
  }, [orders, selectedOrderId]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatStatus(status: string) {
    if (!status) return "Unknown";

    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  function getStatusStyles(status: string) {
    switch (status?.toLowerCase()) {
      case "pending":
        return "border-[#c98a3d]/30 bg-[#f8ead8] text-[#8a5a20]";

      case "processing":
        return "border-[#b28b4b]/30 bg-[#f3ead5] text-[#795d26]";

      case "shipped":
        return "border-[#6f8295]/30 bg-[#e8eef3] text-[#4c6378]";

      case "delivered":
        return "border-[#668267]/30 bg-[#e7efe8] text-[#4f6c53]";

      case "cancelled":
        return "border-[#a85d5d]/30 bg-[#f3e2e2] text-[#8a4141]";

      default:
        return "border-[#451713]/15 bg-[#f5ede4] text-[#451713]/70";
    }
  }

  function getTrackingIndex(status: string) {
    const normalizedStatus = status?.toLowerCase();

    const index = STATUS_ORDER.indexOf(normalizedStatus);

    if (index === -1) {
      return 0;
    }

    return index;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50">
            Loading orders
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        {/* Header */}
        <section className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
              JENTARA / ACCOUNT
            </p>
          </div>

          <div className="mt-6">
            <h1 className="font-serif text-[52px] leading-[0.88] tracking-[-0.07em] sm:text-[76px]">
              My Orders
            </h1>

            <p className="mt-5 max-w-lg text-[12px] leading-6 text-[#451713]/55">
              Your JENTARA purchases, all in one place.
            </p>
          </div>
        </section>

        {orders.length === 0 ? (
          <section className="border-b border-[#451713]/15 py-24 text-center sm:py-32">
            <p className="font-serif text-5xl tracking-[-0.05em]">
              No orders yet.
            </p>

            <p className="mx-auto mt-5 max-w-md text-[12px] leading-6 text-[#451713]/55">
              Your purchases will appear here once you place your first
              order.
            </p>

            <Link
              href="/shop"
              className="
                mt-8
                inline-flex
                min-h-12
                items-center
                gap-6
                bg-[#451713]
                px-7
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#f5ede4]
                transition
                hover:bg-[#5c211b]
              "
            >
              Explore collection
              <span>→</span>
            </Link>
          </section>
        ) : (
          <>
            {/* Orders */}
            <section className="py-10 sm:py-12">
              <div className="mb-7 flex items-end justify-between gap-5">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/45">
                    Your purchases
                  </p>

                  <h2 className="mt-2 font-serif text-3xl tracking-[-0.05em] sm:text-4xl">
                    Order history
                  </h2>
                </div>

                <p className="text-[9px] uppercase tracking-[0.18em] text-[#451713]/40">
                  {orders.length}{" "}
                  {orders.length === 1 ? "order" : "orders"}
                </p>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <article
                    key={order.id}
                    className="
                      border
                      border-[#451713]/12
                      bg-[#f8f3ed]
                      p-5
                      sm:p-7
                    "
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                            Order
                          </span>

                          <span className="font-mono text-[10px] text-[#451713]/70">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>

                          <span
                            className={`
                              border
                              px-3
                              py-1.5
                              text-[8px]
                              font-semibold
                              uppercase
                              tracking-[0.16em]
                              ${getStatusStyles(order.status)}
                            `}
                          >
                            {formatStatus(order.status)}
                          </span>
                        </div>

                        <h3 className="mt-4 font-serif text-2xl tracking-[-0.04em]">
                          JENTARA purchase
                        </h3>

                        <div className="mt-3 flex flex-col gap-1 text-[11px] text-[#451713]/55 sm:flex-row sm:gap-6">
                          <span>
                            {formatDate(order.created_at)}
                          </span>

                          <span>
                            ₹
                            {Number(order.total_amount).toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/orders/${order.id}`}
                        className="
                          inline-flex
                          min-h-11
                          items-center
                          justify-center
                          gap-5
                          bg-[#451713]
                          px-6
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-[#f5ede4]
                          transition
                          hover:bg-[#5c211b]
                        "
                      >
                        View Details
                        <span>→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Tracking */}
            <section className="border-t border-[#451713]/15 pt-12 sm:pt-16">
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#451713]" />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
                    JENTARA / DELIVERY
                  </p>
                </div>

                <h2 className="mt-5 font-serif text-[42px] leading-none tracking-[-0.06em] sm:text-[58px]">
                  Track your order
                </h2>

                <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/55">
                  Select an order below to see its current journey.
                </p>
              </div>

              {/* Order selector */}
              <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {orders.map((order) => {
                  const isSelected = order.id === selectedOrderId;

                  return (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => setSelectedOrderId(order.id)}
                      className={`
                        text-left
                        border
                        p-5
                        transition
                        ${
                          isSelected
                            ? "border-[#451713] bg-[#451713] text-[#f5ede4]"
                            : "border-[#451713]/15 bg-[#f8f3ed] text-[#451713] hover:border-[#451713]/35"
                        }
                      `}
                    >
                      <p
                        className={`
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.2em]
                          ${
                            isSelected
                              ? "text-[#f5ede4]/55"
                              : "text-[#451713]/45"
                          }
                        `}
                      >
                        Order
                      </p>

                      <p className="mt-2 font-mono text-[11px]">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>

                      <div
                        className={`
                          mt-4
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          ${
                            isSelected
                              ? "text-[#f5ede4]/70"
                              : "text-[#451713]/55"
                          }
                        `}
                      >
                        {formatStatus(order.status)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tracking panel */}
              {selectedOrder && (
                <div className="border border-[#451713]/15 bg-[#f8f3ed] p-6 sm:p-9 lg:p-12">
                  <div className="flex flex-col gap-5 border-b border-[#451713]/12 pb-7 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/45">
                        Currently tracking
                      </p>

                      <p className="mt-2 font-mono text-[12px]">
                        #{selectedOrder.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>

                    <span
                      className={`
                        self-start
                        border
                        px-4
                        py-2
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        sm:self-auto
                        ${getStatusStyles(selectedOrder.status)}
                      `}
                    >
                      {formatStatus(selectedOrder.status)}
                    </span>
                  </div>

                  {selectedOrder.status?.toLowerCase() === "cancelled" ? (
                    <div className="py-14 text-center">
                      <p className="font-serif text-3xl tracking-[-0.04em]">
                        Order cancelled
                      </p>

                      <p className="mx-auto mt-3 max-w-md text-[11px] leading-6 text-[#451713]/55">
                        This order is no longer being processed.
                      </p>
                    </div>
                  ) : (
                    <div className="py-10 sm:py-14">
                      <div className="grid gap-8 md:grid-cols-4 md:gap-0">
                        {TRACKING_STEPS.map((step, index) => {
                          const currentIndex = getTrackingIndex(
                            selectedOrder.status
                          );

                          const completed = index <= currentIndex;

                          return (
                            <div
                              key={step.key}
                              className="relative flex gap-5 md:block md:pr-8"
                            >
                              {index < TRACKING_STEPS.length - 1 && (
                                <div
                                  className={`
                                    absolute
                                    left-[9px]
                                    top-6
                                    h-[calc(100%+2rem)]
                                    w-px
                                    md:left-0
                                    md:right-0
                                    md:top-[9px]
                                    md:h-px
                                    md:w-full
                                    ${
                                      index < currentIndex
                                        ? "bg-[#451713]"
                                        : "bg-[#451713]/12"
                                    }
                                  `}
                                />
                              )}

                              <div
                                className={`
                                  relative
                                  z-10
                                  flex
                                  h-5
                                  w-5
                                  shrink-0
                                  items-center
                                  justify-center
                                  border
                                  ${
                                    completed
                                      ? "border-[#451713] bg-[#451713]"
                                      : "border-[#451713]/25 bg-[#f8f3ed]"
                                  }
                                `}
                              >
                                {completed && (
                                  <span className="h-1.5 w-1.5 bg-[#f5ede4]" />
                                )}
                              </div>

                              <div className="pb-2 md:mt-8">
                                <p
                                  className={`
                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    ${
                                      completed
                                        ? "text-[#451713]"
                                        : "text-[#451713]/35"
                                    }
                                  `}
                                >
                                  {step.label}
                                </p>

                                <p className="mt-2 max-w-[190px] text-[10px] leading-5 text-[#451713]/45">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 border-t border-[#451713]/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
                        Order total
                      </p>

                      <p className="mt-1 font-serif text-2xl">
                        ₹
                        {Number(
                          selectedOrder.total_amount
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <Link
                      href={`/orders/${selectedOrder.id}`}
                      className="
                        inline-flex
                        min-h-11
                        items-center
                        justify-center
                        gap-5
                        border
                        border-[#451713]
                        px-6
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        transition
                        hover:bg-[#451713]
                        hover:text-[#f5ede4]
                      "
                    >
                      Full order details
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}