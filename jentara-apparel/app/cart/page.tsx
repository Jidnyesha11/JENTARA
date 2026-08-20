// app/cart/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "@/store/cartStore";

function formatPrice(value: number) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const total = getTotal();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
        <div className="mx-auto max-w-[1500px] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14 lg:px-12">
          <header className="border-b border-[#451713]/15 pb-10 sm:pb-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#451713]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
                JENTARA / CART
              </p>
            </div>

            <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h1 className="font-serif text-[56px] leading-[0.9] tracking-[-0.06em] sm:text-[76px]">
                  Your cart
                </h1>

                <p className="mt-5 max-w-md text-[13px] leading-6 text-[#451713]/60">
                  Your selected pieces will appear here when
                  you are ready to make them yours.
                </p>
              </div>

              <Link
                href="/shop"
                className="inline-flex w-fit items-center gap-5 border-b border-[#451713] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-55"
              >
                Continue shopping
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </header>

          <section className="flex min-h-[55vh] flex-col items-center justify-center py-24 text-center">
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#451713]/20">
              <span className="text-xl">♡</span>
            </div>

            <p className="font-serif text-[38px] tracking-[-0.04em] sm:text-[48px]">
              Nothing here yet.
            </p>

            <p className="mt-4 max-w-sm text-[12px] leading-6 text-[#451713]/55">
              Explore the collection and find something that
              belongs with you.
            </p>

            <Link
              href="/shop"
              className="mt-9 inline-flex min-h-12 items-center justify-center gap-7 bg-[#451713] px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition-colors hover:bg-[#5c211b]"
            >
              Explore collection
              <span aria-hidden="true">↗</span>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14 lg:px-12">
        <header className="border-b border-[#451713]/15 pb-9 sm:pb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
              JENTARA / CART
            </p>
          </div>

          <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-[54px] leading-[0.9] tracking-[-0.06em] sm:text-[72px]">
                Your cart
              </h1>

              <p className="mt-4 text-[12px] leading-6 text-[#451713]/55">
                {totalItems}{" "}
                {totalItems === 1 ? "piece" : "pieces"} selected
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex w-fit items-center gap-5 border-b border-[#451713]/60 pb-2 text-[9px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-55"
            >
              Continue shopping
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-20">
          <section className="min-w-0">
            <div className="flex items-center justify-between border-b border-[#451713]/15 py-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/55">
                Selected pieces
              </p>

              <p className="text-[9px] uppercase tracking-[0.18em] text-[#451713]/40">
                {items.length}{" "}
                {items.length === 1 ? "item" : "items"}
              </p>
            </div>

            <div>
              {items.map((item, index) => (
                <article
                  key={`${item.id}-${item.size}`}
                  className="grid grid-cols-[110px_minmax(0,1fr)] gap-5 border-b border-[#451713]/15 py-7 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-7 sm:py-9 lg:grid-cols-[175px_minmax(0,1fr)]"
                >
                  <Link
                    href={`/product/${encodeURIComponent(item.id)}`}
                    className="group relative block aspect-[4/5] overflow-hidden bg-[#e8ded4]"
                  >
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 110px, (max-width: 1024px) 150px, 175px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-3 text-center text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">
                        Image unavailable
                      </div>
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/45">
                          JENTARA
                        </p>

                        <Link
                          href={`/product/${encodeURIComponent(item.id)}`}
                          className="block font-serif text-[24px] leading-[1] tracking-[-0.035em] transition-opacity hover:opacity-55 sm:text-[30px]"
                        >
                          {item.name}
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.id, item.size)
                        }
                        aria-label={`Remove ${item.name} from cart`}
                        className="shrink-0 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#451713]/45 underline decoration-[#451713]/30 underline-offset-4 transition-colors hover:text-[#451713]"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <p className="text-[11px] text-[#451713]/60">
                        Size{" "}
                        <span className="font-semibold text-[#451713]">
                          {item.size}
                        </span>
                      </p>

                      <span className="h-3 w-px bg-[#451713]/20" />

                      <p className="text-[11px] text-[#451713]/60">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="mt-auto flex flex-col gap-5 pt-8 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/45">
                          Quantity
                        </p>

                        <div className="flex h-10 w-fit items-center border border-[#451713]/20">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.id,
                                item.size
                              )
                            }
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="flex h-full w-10 items-center justify-center text-[16px] transition-colors hover:bg-[#451713]/5"
                          >
                            −
                          </button>

                          <span
                            aria-live="polite"
                            className="flex h-full min-w-9 items-center justify-center border-x border-[#451713]/15 text-[11px] font-semibold"
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.id,
                                item.size
                              )
                            }
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex h-full w-10 items-center justify-center text-[16px] transition-colors hover:bg-[#451713]/5"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <p className="font-serif text-[22px] tracking-[-0.025em] sm:text-right">
                        {formatPrice(
                          item.price * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid border-b border-[#451713]/15 sm:grid-cols-3">
              <div className="border-b border-[#451713]/15 py-7 sm:border-b-0 sm:border-r sm:pr-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Secure checkout
                </p>

                <p className="mt-2 text-[11px] leading-5 text-[#451713]/50">
                  Safe and secure payment.
                </p>
              </div>

              <div className="border-b border-[#451713]/15 py-7 sm:border-b-0 sm:border-r sm:px-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Easy returns
                </p>

                <p className="mt-2 text-[11px] leading-5 text-[#451713]/50">
                  7 day return window.
                </p>
              </div>

              <div className="py-7 sm:pl-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                  JENTARA
                </p>

                <p className="mt-2 text-[11px] leading-5 text-[#451713]/50">
                  Designed with purpose.
                </p>
              </div>
            </div>
          </section>

          <aside className="lg:pt-5">
            <div className="lg:sticky lg:top-8">
              <div className="border-y border-[#451713]/20 py-7 sm:py-9">
                <div className="flex items-center gap-3">
                  <span className="h-px w-7 bg-[#451713]" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/55">
                    Summary
                  </p>
                </div>

                <h2 className="mt-6 font-serif text-[36px] leading-none tracking-[-0.045em]">
                  Almost yours.
                </h2>

                <div className="mt-9 space-y-4 border-b border-[#451713]/15 pb-7">
                  <div className="flex items-center justify-between gap-5 text-[11px]">
                    <span className="text-[#451713]/55">
                      Items
                    </span>

                    <span>{totalItems}</span>
                  </div>

                  <div className="flex items-center justify-between gap-5 text-[11px]">
                    <span className="text-[#451713]/55">
                      Subtotal
                    </span>

                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="flex items-center justify-between gap-5 text-[11px]">
                    <span className="text-[#451713]/55">
                      Shipping
                    </span>

                    <span className="font-semibold">
                      Free
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-5 text-[11px]">
                    <span className="text-[#451713]/55">
                      Taxes
                    </span>

                    <span>Included</span>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-5 py-7">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                      Total
                    </p>

                    <p className="mt-2 text-[10px] text-[#451713]/45">
                      Inclusive of applicable taxes
                    </p>
                  </div>

                  <p className="font-serif text-[32px] leading-none tracking-[-0.035em]">
                    {formatPrice(total)}
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="group flex min-h-14 w-full items-center justify-between bg-[#451713] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition-colors hover:bg-[#5c211b]"
                >
                  <span>Proceed to checkout</span>

                  <span
                    aria-hidden="true"
                    className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <p className="mt-4 text-center text-[9px] leading-5 text-[#451713]/40">
                  You can review your delivery details before
                  placing your order.
                </p>
              </div>

              <Link
                href="/shop"
                className="flex items-center justify-between border-b border-[#451713]/15 py-5 text-[9px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-55"
              >
                <span>Continue exploring JENTARA</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}