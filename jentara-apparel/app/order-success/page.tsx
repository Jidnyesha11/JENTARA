// app/order-success/page.tsx

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function OrderSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1500px] items-center px-5 py-16 sm:px-8 lg:px-10">
        <section className="w-full border-y border-[#451713]/15 py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1000px] text-center">
            {/* Label */}

            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#451713]" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.35em] text-[#451713]/60">
                JENTARA / ORDER CONFIRMED
              </p>

              <span className="h-px w-10 bg-[#451713]" />
            </div>

            {/* Mark */}

            <div className="mx-auto mt-12 flex h-16 w-16 items-center justify-center border border-[#451713]/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path
                  d="M5 12.5 9.5 17 19 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Heading */}

            <h1 className="mt-10 font-serif text-[60px] leading-[0.84] tracking-[-0.07em] sm:text-[90px] lg:text-[120px]">
              ORDER
              <br />
              PLACED
            </h1>

            <p className="mx-auto mt-8 max-w-xl text-[12px] leading-7 text-[#451713]/55 sm:text-[13px]">
              Thank you for choosing JENTARA. Your order has
              been received and is now being prepared with
              care.
            </p>

            {/* Divider */}

            <div className="mx-auto mt-12 max-w-2xl border-t border-[#451713]/15 pt-8">
              <div className="grid gap-6 text-center sm:grid-cols-3 sm:text-left">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
                    NEXT
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-[#451713]/65">
                    Your order will move into processing.
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
                    DELIVERY
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-[#451713]/65">
                    We will prepare it for dispatch.
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
                    CARE
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-[#451713]/65">
                    Your purchase is now part of your JENTARA
                    story.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}

            <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/orders"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  gap-6
                  bg-[#451713]
                  px-8
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#f5ede4]
                  transition
                  hover:bg-[#32100d]
                "
              >
                View my orders
                <ArrowIcon />
              </Link>

              <Link
                href="/shop"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  border
                  border-[#451713]/20
                  px-8
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#451713]
                  transition
                  hover:border-[#451713]
                  hover:bg-[#451713]
                  hover:text-[#f5ede4]
                "
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}