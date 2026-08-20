"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";

import { supabase } from "@/lib/supabase/client";
import { getDefaultAddress } from "@/lib/supabase/addresses";

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
}

type PaymentMethod = "card" | "upi" | "cod";

function formatPrice(value: number): string {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function AddressBlock({
  address,
}: {
  address: Address;
}) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/45">
            Deliver to
          </p>

          <h3 className="mt-3 font-serif text-[28px] leading-none tracking-[-0.04em]">
            {address.full_name}
          </h3>
        </div>

        <span className="w-fit border border-[#451713]/20 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-[#451713]/55">
          Default
        </span>
      </div>

      <div className="mt-6 grid gap-2 text-[12px] leading-6 text-[#451713]/65">
        <p>{address.address_line_1}</p>

        {address.address_line_2 && (
          <p>{address.address_line_2}</p>
        )}

        <p>
          {address.city}, {address.state} —{" "}
          {address.pincode}
        </p>

        <p className="pt-2 text-[#451713]/80">
          {address.phone}
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const items = useCartStore(
    (state) => state.items
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const getTotal = useCartStore(
    (state) => state.getTotal
  );

  const [address, setAddress] =
    useState<Address | null>(null);

  const [placing, setPlacing] =
    useState(false);

  const [loadingAddress, setLoadingAddress] =
    useState(true);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("upi");

  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const userId = user.id;

    let cancelled = false;

    async function loadAddress() {
      try {
        setLoadingAddress(true);

        const data =
          await getDefaultAddress(userId);

        if (!cancelled) {
          setAddress(data);
        }
      } catch (error) {
        console.error(
          "CHECKOUT ADDRESS ERROR:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoadingAddress(false);
        }
      }
    }

    loadAddress();

    return () => {
      cancelled = true;
    };
  }, [user, loading, router]);

  const itemCount = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.price *
            item.quantity,
        0
      ),
    [items]
  );

  const shipping = 0;
  const total = subtotal + shipping;

  async function placeOrder() {
    if (!user) return;

    if (!address) {
      alert(
        "Please select a delivery address first."
      );

      router.push(
        "/profile/addresses"
      );

      return;
    }

    if (items.length === 0) {
      alert(
        "Your cart is empty."
      );

      router.push("/cart");

      return;
    }

    try {
      setPlacing(true);

      for (const item of items) {
        const {
          data: product,
          error,
        } = await supabase
          .from("products")
          .select(
            "name,size_inventory"
          )
          .eq("id", item.id)
          .single();

        if (error) {
          throw error;
        }

        const inventory =
          (product?.size_inventory ??
            {}) as Record<
            string,
            number
          >;

        const availableStock =
          Number(
            inventory[item.size] ??
              0
          );

        if (
          availableStock <
          item.quantity
        ) {
          alert(
            `${product.name} (${item.size}) does not have enough stock.`
          );

          return;
        }
      }

      const {
        data: order,
        error: orderError,
      } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,

          address_id: address.id,

          customer_name:
            address.full_name,

          customer_email:
            user.email,

          customer_phone:
            address.phone,

          address_line_1:
            address.address_line_1,

          address_line_2:
            address.address_line_2,

          city: address.city,

          state: address.state,

          pincode:
            address.pincode,

          total_amount: total,

          status: "pending",
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      if (!order) {
        throw new Error(
          "Order creation failed."
        );
      }

      const orderItems =
        items.map((item) => ({
          order_id: order.id,

          product_id: item.id,

          product_name:
            item.name,

          size: item.size,

          price: item.price,

          quantity:
            item.quantity,
        }));

      const {
        error: itemError,
      } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemError) {
        throw itemError;
      }

      for (const item of items) {
        const {
          data: product,
          error:
            productError,
        } = await supabase
          .from("products")
          .select(
            "size_inventory"
          )
          .eq("id", item.id)
          .single();

        if (productError) {
          throw productError;
        }

        const inventory = {
          ...((product?.size_inventory ??
            {}) as Record<
            string,
            number
          >),
        };

        inventory[item.size] =
          Math.max(
            0,
            Number(
              inventory[
                item.size
              ] ?? 0
            ) -
              item.quantity
          );

        const {
          error: updateError,
        } = await supabase
          .from("products")
          .update({
            size_inventory:
              inventory,
          })
          .eq(
            "id",
            item.id
          );

        if (updateError) {
          throw updateError;
        }
      }

      clearCart();

      router.push(
        `/order-success?id=${order.id}`
      );
    } catch (error) {
      console.error(
        "PLACE ORDER ERROR:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to place your order.";

      alert(message);
    } finally {
      setPlacing(false);
    }
  }

  if (
    loading ||
    !hydrated
  ) {
    return (
      <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <span className="mx-auto mb-5 block h-px w-10 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/50">
              JENTARA / CHECKOUT
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
        <div className="mx-auto flex min-h-[70vh] max-w-[1500px] items-center justify-center px-6">
          <section className="max-w-lg text-center">
            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / CHECKOUT
            </p>

            <h1 className="mt-6 font-serif text-[52px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
              Your cart is empty.
            </h1>

            <p className="mt-5 text-[12px] leading-6 text-[#451713]/55">
              There is nothing to checkout yet.
              Find your next piece in the collection.
            </p>

            <Link
              href="/shop"
              className="group mt-9 inline-flex min-h-12 items-center gap-8 bg-[#451713] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition-colors hover:bg-[#5c211b]"
            >
              Explore collection

              <span className="text-base transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-10 sm:px-8 sm:pt-14 lg:px-10 lg:pt-16">
        {/* HEADER */}
        <header className="border-b border-[#451713]/15 pb-10 sm:pb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#451713]/55">
              JENTARA / CHECKOUT
            </p>
          </div>

          <div className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-[55px] leading-[0.88] tracking-[-0.065em] sm:text-[76px] lg:text-[88px]">
                Complete your order.
              </h1>

              <p className="mt-5 max-w-lg text-[12px] leading-6 text-[#451713]/55 sm:text-[13px]">
                One final step before your JENTARA
                pieces make their way to you.
              </p>
            </div>

            <Link
              href="/cart"
              className="w-fit text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/55 underline underline-offset-4 transition-colors hover:text-[#451713]"
            >
              ← Back to cart
            </Link>
          </div>
        </header>

        <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 lg:pt-12">
          {/* LEFT */}
          <div className="min-w-0">
            {/* 01 ADDRESS */}
            <section className="border-b border-[#451713]/15 pb-10">
              <div className="mb-7 flex items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#451713]" />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.25em]">
                    Delivery address
                  </p>
                </div>

                <span className="font-serif text-xl text-[#451713]/30">
                  01
                </span>
              </div>

              {loadingAddress ? (
                <div className="border border-[#451713]/10 bg-[#efe4d9]/40 p-7">
                  <div className="h-4 w-32 animate-pulse bg-[#451713]/10" />
                  <div className="mt-5 h-3 w-64 animate-pulse bg-[#451713]/10" />
                  <div className="mt-2 h-3 w-48 animate-pulse bg-[#451713]/10" />
                </div>
              ) : address ? (
                <div className="border border-[#451713]/15 bg-[#efe4d9]/45 p-6 sm:p-8">
                  <AddressBlock
                    address={address}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/profile/addresses"
                      )
                    }
                    className="mt-7 border-b border-[#451713] pb-1 text-[8px] font-semibold uppercase tracking-[0.2em]"
                  >
                    Change address
                  </button>
                </div>
              ) : (
                <div className="border border-[#451713]/15 p-6 sm:p-8">
                  <p className="font-serif text-[28px] tracking-[-0.04em]">
                    Choose where we should deliver.
                  </p>

                  <p className="mt-3 max-w-md text-[11px] leading-6 text-[#451713]/55">
                    Add an address to continue with
                    checkout.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/profile/addresses"
                      )
                    }
                    className="group mt-6 inline-flex items-center gap-6 bg-[#451713] px-6 py-4 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4]"
                  >
                    Add address

                    <span className="text-base transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              )}
            </section>

            {/* 02 DELIVERY */}
            <section className="border-b border-[#451713]/15 py-10">
              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#451713]" />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.25em]">
                    Delivery
                  </p>
                </div>

                <span className="font-serif text-xl text-[#451713]/30">
                  02
                </span>
              </div>

              <div className="border border-[#451713]/20 bg-[#efe4d9]/35 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[11px] font-semibold">
                      Standard delivery
                    </p>

                    <p className="mt-2 text-[10px] leading-5 text-[#451713]/55">
                      Delivery within 5–7 working days.
                    </p>
                  </div>

                  <span className="text-[8px] font-semibold uppercase tracking-[0.15em]">
                    Free
                  </span>
                </div>
              </div>
            </section>

            {/* 03 PAYMENT */}
            <section className="border-b border-[#451713]/15 py-10">
              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#451713]" />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.25em]">
                    Payment
                  </p>
                </div>

                <span className="font-serif text-xl text-[#451713]/30">
                  03
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    id: "upi" as const,
                    title: "UPI",
                    description:
                      "Fast & simple",
                  },
                  {
                    id: "card" as const,
                    title: "Card",
                    description:
                      "Credit / debit",
                  },
                  {
                    id: "cod" as const,
                    title: "COD",
                    description:
                      "If available",
                  },
                ].map((method) => {
                  const selected =
                    paymentMethod ===
                    method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() =>
                        setPaymentMethod(
                          method.id
                        )
                      }
                      className={`min-h-[92px] border p-4 text-left transition-colors ${
                        selected
                          ? "border-[#451713] bg-[#451713] text-[#f5ede4]"
                          : "border-[#451713]/15 bg-transparent hover:border-[#451713]/40"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                          {method.title}
                        </span>

                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            selected
                              ? "border-[#f5ede4]"
                              : "border-[#451713]/35"
                          }`}
                        >
                          {selected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          )}
                        </span>
                      </div>

                      <p
                        className={`mt-3 text-[9px] ${
                          selected
                            ? "text-[#f5ede4]/60"
                            : "text-[#451713]/45"
                        }`}
                      >
                        {method.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-[9px] leading-5 text-[#451713]/45">
                Payment options shown here are based on
                your available checkout flow. You will
                complete payment through the next step
                when applicable.
              </p>
            </section>

            {/* 04 ITEMS */}
            <section className="pt-10">
              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#451713]" />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.25em]">
                    Your pieces
                  </p>
                </div>

                <span className="font-serif text-xl text-[#451713]/30">
                  04
                </span>
              </div>

              <div className="divide-y divide-[#451713]/15 border-y border-[#451713]/15">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-5 py-5 sm:gap-6"
                  >
                    <Link
                      href={`/product/${encodeURIComponent(
                        item.id
                      )}`}
                      className="relative h-28 w-24 shrink-0 overflow-hidden bg-[#e8ded4] sm:h-32 sm:w-28"
                    >
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[7px] uppercase tracking-[0.12em] text-[#451713]/35">
                          No image
                        </div>
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <Link
                            href={`/product/${encodeURIComponent(
                              item.id
                            )}`}
                            className="font-serif text-[20px] leading-tight tracking-[-0.035em] hover:opacity-60"
                          >
                            {item.name}
                          </Link>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#451713]/45">
                            <span>
                              Size {item.size}
                            </span>

                            <span>
                              Qty {item.quantity}
                            </span>
                          </div>
                        </div>

                        <p className="shrink-0 text-[11px] font-medium">
                          {formatPrice(
                            item.price *
                              item.quantity
                          )}
                        </p>
                      </div>

                      <p className="text-[9px] uppercase tracking-[0.15em] text-[#451713]/40">
                        {formatPrice(
                          item.price
                        )}{" "}
                        each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SUMMARY */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="border border-[#451713]/15 bg-[#efe4d9]/45 p-6 sm:p-8 lg:p-9">
              <div className="flex items-center justify-between border-b border-[#451713]/15 pb-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em]">
                  Order summary
                </p>

                <span className="text-[8px] uppercase tracking-[0.15em] text-[#451713]/40">
                  {itemCount}{" "}
                  {itemCount === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div className="space-y-5 py-7">
                <div className="flex justify-between gap-5 text-[11px]">
                  <span className="text-[#451713]/60">
                    Subtotal
                  </span>

                  <span>
                    {formatPrice(
                      subtotal
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-5 text-[11px]">
                  <span className="text-[#451713]/60">
                    Delivery
                  </span>

                  <span className="text-[8px] font-semibold uppercase tracking-[0.15em]">
                    Complimentary
                  </span>
                </div>

                <div className="flex justify-between gap-5 text-[11px]">
                  <span className="text-[#451713]/60">
                    Taxes
                  </span>

                  <span className="text-[#451713]/55">
                    Included
                  </span>
                </div>
              </div>

              <div className="border-t border-[#451713]/20 pt-6">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                      Total
                    </p>

                    <p className="mt-2 font-serif text-[37px] leading-none tracking-[-0.05em]">
                      {formatPrice(total)}
                    </p>
                  </div>

                  <span className="pb-1 text-[8px] uppercase tracking-[0.15em] text-[#451713]/40">
                    INR
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={placeOrder}
                disabled={
                  placing ||
                  loadingAddress ||
                  !address
                }
                className="group mt-8 flex min-h-14 w-full items-center justify-between bg-[#451713] px-6 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition-colors hover:bg-[#5c211b] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>
                  {placing
                    ? "Placing order..."
                    : "Pay & place order"}
                </span>

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <div className="mt-7 space-y-3 border-t border-[#451713]/10 pt-5">
                <div className="flex gap-3">
                  <span className="text-[9px]">
                    01
                  </span>

                  <p className="text-[9px] leading-5 text-[#451713]/50">
                    Your order is protected by
                    JENTARA&apos;s secure checkout.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-[9px]">
                    02
                  </span>

                  <p className="text-[9px] leading-5 text-[#451713]/50">
                    Easy returns according to our
                    return policy.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="text-[9px]">
                    03
                  </span>

                  <p className="text-[9px] leading-5 text-[#451713]/50">
                    Standard delivery within the
                    estimated delivery window.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/cart"
              className="mt-6 flex items-center justify-between border-b border-[#451713]/20 pb-4 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/55 hover:text-[#451713]"
            >
              <span>Review your selection</span>
              <span>←</span>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}