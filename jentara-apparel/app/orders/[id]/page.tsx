"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";

interface OrderItem {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
  size: string;
  image_url?: string | null;
}

interface Order {
  id: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
  status: string;
  created_at?: string;
}

const ORDER_STEPS = [
  {
    key: "confirmed",
    label: "Confirmed",
    description: "Your order has been received.",
  },
  {
    key: "processing",
    label: "Processing",
    description: "We are preparing your pieces.",
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order is on its way.",
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Your JENTARA pieces have arrived.",
  },
] as const;

function getOrderReference(id: string) {
  return `JNT-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

function normalizeStatus(status: string) {
  const value = status?.toLowerCase().trim();

  if (value === "pending") {
    return "confirmed";
  }

  if (
    value === "processing" ||
    value === "confirmed" ||
    value === "shipped" ||
    value === "delivered" ||
    value === "cancelled"
  ) {
    return value;
  }

  return "processing";
}

function getStatusLabel(status: string) {
  switch (normalizeStatus(status)) {
    case "confirmed":
      return "Confirmed";

    case "processing":
      return "Processing";

    case "shipped":
      return "Shipped";

    case "delivered":
      return "Delivered";

    case "cancelled":
      return "Cancelled";

    default:
      return "Processing";
  }
}

function getStatusBadgeClass(status: string) {
  switch (normalizeStatus(status)) {
    case "confirmed":
      return "bg-[#eee5d8] text-[#76513d]";

    case "processing":
      return "bg-[#f3e4c8] text-[#8a5a12]";

    case "shipped":
      return "bg-[#e3e9e7] text-[#315c54]";

    case "delivered":
      return "bg-[#dfeadd] text-[#3e6847]";

    case "cancelled":
      return "bg-[#f2dddd] text-[#8b3434]";

    default:
      return "bg-[#ece7e1] text-[#665f59]";
  }
}

function getActiveStepIndex(status: string) {
  const normalizedStatus = normalizeStatus(status);

  switch (normalizedStatus) {
    case "confirmed":
      return 0;

    case "processing":
      return 1;

    case "shipped":
      return 2;

    case "delivered":
      return 3;

    default:
      return 1;
  }
}

function formatDate(date?: string) {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(value: number) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();

  const [items, setItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const orderId = String(params.id);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const userId = user?.id;

    if (!userId) {
      router.replace("/login");
      return;
    }

    let cancelled = false;

    async function loadOrder() {
      setLoading(true);

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select(
          `
            id,
            address_line_1,
            address_line_2,
            city,
            state,
            pincode,
            status,
            created_at
          `
        )
        .eq("id", orderId)
        .eq("user_id", userId)
        .single();

      if (orderError) {
        console.error("Failed to load order:", orderError);

        if (!cancelled) {
          setOrder(null);
          setItems([]);
          setLoading(false);
        }

        return;
      }

      const { data: itemData, error: itemError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

      if (itemError) {
        console.error("Failed to load order items:", itemError);
      }

      if (!cancelled) {
        setOrder(orderData ?? null);
        setItems(itemData ?? []);
        setLoading(false);
      }
    }

    loadOrder();

    return () => {
      cancelled = true;
    };
  }, [authLoading, orderId, router, user]);

  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      ),
    [items]
  );

  const totalAmount = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          Number(item.price || 0) * Number(item.quantity || 0),
        0
      ),
    [items]
  );

  async function handleCopyReference() {
    if (!order) {
      return;
    }

    try {
      await navigator.clipboard.writeText(getOrderReference(order.id));
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch (error) {
      console.error("Unable to copy order reference:", error);
    }
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#451713]/45">
            Loading order
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / ORDERS
          </p>

          <h1 className="mt-6 font-serif text-5xl tracking-[-0.06em]">
            Order not found
          </h1>

          <p className="mx-auto mt-5 max-w-md text-[12px] leading-6 text-[#451713]/55">
            We could not find this order in your account.
          </p>

          <Link
            href="/orders"
            className="mt-8 inline-flex items-center gap-5 bg-[#451713] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition hover:bg-[#5c211b]"
          >
            Back to orders
            <span>→</span>
          </Link>
        </div>
      </main>
    );
  }

  const normalizedStatus = normalizeStatus(order.status);
  const activeStep = getActiveStepIndex(order.status);
  const isCancelled = normalizedStatus === "cancelled";

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
              JENTARA / ORDER
            </p>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                Order reference
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <h1 className="font-serif text-[48px] leading-[0.9] tracking-[-0.07em] sm:text-[68px]">
                  {getOrderReference(order.id)}
                </h1>

                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4 transition hover:opacity-55"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {order.created_at && (
                <p className="mt-4 text-[11px] text-[#451713]/50">
                  Placed on {formatDate(order.created_at)}
                </p>
              )}
            </div>

            <span
              className={`w-fit px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] ${getStatusBadgeClass(
                order.status
              )}`}
            >
              {getStatusLabel(order.status)}
            </span>
          </div>
        </header>

        <section className="border-b border-[#451713]/15 py-10 sm:py-14">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                Order journey
              </p>

              <h2 className="mt-3 font-serif text-3xl tracking-[-0.05em] sm:text-4xl">
                Your pieces are on their way.
              </h2>
            </div>

            {!isCancelled && (
              <p className="hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713]/40 sm:block">
                {activeStep + 1} / {ORDER_STEPS.length}
              </p>
            )}
          </div>

          {isCancelled ? (
            <div className="mt-10 border border-[#8b3434]/20 bg-[#f2dddd]/50 p-6 sm:p-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8b3434]">
                Order cancelled
              </p>

              <p className="mt-3 max-w-xl text-[12px] leading-6 text-[#451713]/60">
                This order has been cancelled. If you believe this is a
                mistake, please contact JENTARA support.
              </p>
            </div>
          ) : (
            <div className="mt-10">
              <div className="hidden lg:grid lg:grid-cols-4">
                {ORDER_STEPS.map((step, index) => {
                  const complete = index <= activeStep;
                  const current = index === activeStep;

                  return (
                    <div key={step.key} className="relative pr-8">
                      {index < ORDER_STEPS.length - 1 && (
                        <div
                          className={`absolute left-7 right-0 top-3 h-px ${
                            index < activeStep
                              ? "bg-[#451713]"
                              : "bg-[#451713]/15"
                          }`}
                        />
                      )}

                      <div className="relative">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                            complete
                              ? "border-[#451713] bg-[#451713] text-[#f5ede4]"
                              : "border-[#451713]/25 bg-[#f5ede4] text-transparent"
                          }`}
                        >
                          {complete && (
                            <span className="text-[10px]">✓</span>
                          )}
                        </div>

                        <p
                          className={`mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                            current
                              ? "text-[#451713]"
                              : "text-[#451713]/55"
                          }`}
                        >
                          {step.label}
                        </p>

                        <p className="mt-2 max-w-[190px] text-[11px] leading-5 text-[#451713]/45">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:hidden">
                {ORDER_STEPS.map((step, index) => {
                  const complete = index <= activeStep;
                  const current = index === activeStep;

                  return (
                    <div
                      key={step.key}
                      className="relative flex gap-5 pb-8 last:pb-0"
                    >
                      {index < ORDER_STEPS.length - 1 && (
                        <div
                          className={`absolute left-[11px] top-6 h-full w-px ${
                            index < activeStep
                              ? "bg-[#451713]"
                              : "bg-[#451713]/15"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                          complete
                            ? "border-[#451713] bg-[#451713] text-[#f5ede4]"
                            : "border-[#451713]/25 bg-[#f5ede4] text-transparent"
                        }`}
                      >
                        {complete && (
                          <span className="text-[10px]">✓</span>
                        )}
                      </div>

                      <div className="pt-0.5">
                        <p
                          className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                            current
                              ? "text-[#451713]"
                              : "text-[#451713]/55"
                          }`}
                        >
                          {step.label}
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-[#451713]/45">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
          <div>
            <div className="flex items-end justify-between border-b border-[#451713]/15 pb-5">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                  Your selection
                </p>

                <h2 className="mt-2 font-serif text-3xl tracking-[-0.05em]">
                  Ordered pieces
                </h2>
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713]/40">
                {totalItems}{" "}
                {totalItems === 1 ? "piece" : "pieces"}
              </p>
            </div>

            <div className="divide-y divide-[#451713]/15">
              {items.length === 0 ? (
                <p className="py-10 text-[12px] text-[#451713]/50">
                  No items found for this order.
                </p>
              ) : (
                items.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-5 py-7 sm:gap-7"
                  >
                    <div className="relative h-32 w-24 shrink-0 overflow-hidden bg-[#e8ded4] sm:h-40 sm:w-32">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.product_name}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center px-3 text-center text-[8px] uppercase tracking-[0.15em] text-[#451713]/30">
                          JENTARA
                        </div>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                      <div className="flex justify-between gap-5">
                        <div className="min-w-0">
                          <h3 className="font-serif text-xl leading-tight tracking-[-0.03em] sm:text-2xl">
                            {item.product_name}
                          </h3>

                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#451713]/45">
                            <span>Size {item.size}</span>
                            <span>Qty {item.quantity}</span>
                          </div>
                        </div>

                        <p className="shrink-0 text-sm font-medium">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex justify-between border-t border-[#451713]/10 pt-3">
                        <span className="text-[9px] uppercase tracking-[0.16em] text-[#451713]/40">
                          Subtotal
                        </span>

                        <span className="text-sm font-medium">
                          {formatPrice(
                            Number(item.price) *
                              Number(item.quantity)
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <section className="border border-[#451713]/15 p-6 sm:p-8">
              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                Delivery
              </p>

              <h2 className="mt-3 font-serif text-2xl tracking-[-0.04em]">
                Shipping address
              </h2>

              <div className="mt-6 space-y-1 text-[12px] leading-6 text-[#451713]/60">
                <p>{order.address_line_1}</p>

                {order.address_line_2 && (
                  <p>{order.address_line_2}</p>
                )}

                <p>
                  {order.city}, {order.state}
                </p>

                <p>{order.pincode}</p>
              </div>
            </section>

            <section className="border border-[#451713]/15 p-6 sm:p-8">
              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                Summary
              </p>

              <h2 className="mt-3 font-serif text-2xl tracking-[-0.04em]">
                Order total
              </h2>

              <div className="mt-7 space-y-4 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#451713]/50">
                    Items
                  </span>

                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#451713]/50">
                    Shipping
                  </span>

                  <span>Free</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#451713]/50">
                    Tax
                  </span>

                  <span>Included</span>
                </div>
              </div>

              <div className="mt-7 border-t border-[#451713]/15 pt-6">
                <div className="flex items-end justify-between gap-5">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713]/45">
                    Total
                  </span>

                  <span className="font-serif text-3xl tracking-[-0.04em]">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>
            </section>

            <Link
              href="/orders"
              className="flex w-full items-center justify-between border border-[#451713] px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] transition hover:bg-[#451713] hover:text-[#f5ede4]"
            >
              <span>Back to orders</span>
              <span>→</span>
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}