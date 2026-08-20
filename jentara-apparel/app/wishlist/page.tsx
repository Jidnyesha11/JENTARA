// app/wishlist/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const items = useWishlistStore(
    (state) => state.items,
  );

  const removeItem = useWishlistStore(
    (state) => state.removeItem,
  );

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14 lg:px-10 lg:pt-16">
        {/* Header */}

        <section className="border-b border-[#451713]/15 pb-10 sm:pb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55 sm:text-[9px]">
              JENTARA / SAVED PIECES
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-serif text-[54px] leading-[0.88] tracking-[-0.065em] sm:text-[76px] lg:text-[92px]">
                Your Wishlist
              </h1>

              <p className="mt-6 max-w-lg text-[12px] leading-6 text-[#451713]/60 sm:text-[13px]">
                A personal edit of the pieces you
                love. Keep them here until you're
                ready to make them yours.
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex items-center gap-3 lg:pb-2">
                <span className="h-px w-6 bg-[#451713]/30" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/50">
                  {items.length}{" "}
                  {items.length === 1
                    ? "Piece"
                    : "Pieces"}{" "}
                  Saved
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Empty state */}

        {items.length === 0 ? (
          <section className="flex min-h-[55vh] flex-col items-center justify-center border-b border-[#451713]/15 py-20 text-center">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#451713]/15">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path
                  d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="font-serif text-4xl tracking-[-0.045em] sm:text-5xl">
              Nothing saved yet.
            </p>

            <p className="mt-5 max-w-md text-[12px] leading-6 text-[#451713]/55">
              Explore the collection and save the
              pieces that speak to you. They'll be
              waiting here whenever you're ready.
            </p>

            <Link
              href="/shop"
              className="
                mt-9
                inline-flex
                min-h-13
                items-center
                gap-8
                bg-[#451713]
                px-8
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#f5ede4]
                transition
                duration-300
                hover:bg-[#5c211b]
              "
            >
              Explore Collection

              <span className="text-sm">
                →
              </span>
            </Link>
          </section>
        ) : (
          <section className="pt-10 sm:pt-14">
            {/* Product grid */}

            <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item, index) => (
                <article
                  key={item.id}
                  className="group min-w-0"
                >
                  {/* Image */}

                  <div className="relative overflow-hidden bg-[#e8ded4]">
                    <Link
                      href={`/product/${encodeURIComponent(
                        item.id,
                      )}`}
                      className="block"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            priority={index < 4}
                            sizes="
                              (max-width: 640px) 100vw,
                              (max-width: 1024px) 50vw,
                              (max-width: 1280px) 33vw,
                              25vw
                            "
                            className="
                              object-cover
                              transition
                              duration-700
                              ease-out
                              group-hover:scale-[1.035]
                            "
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713]/35">
                              Image unavailable
                            </span>
                          </div>
                        )}

                        {/* Image overlay */}

                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#451713]/15 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                      </div>
                    </Link>

                    {/* Remove */}

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.id)
                      }
                      aria-label={`Remove ${item.name} from wishlist`}
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        bg-[#f5ede4]/95
                        text-[#451713]
                        shadow-sm
                        transition
                        duration-300
                        hover:bg-[#451713]
                        hover:text-[#f5ede4]
                      "
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        className="h-[18px] w-[18px]"
                        aria-hidden="true"
                      >
                        <path
                          d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Product number */}

                    <span
                      className="
                        absolute
                        bottom-4
                        left-4
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-[#f5ede4]
                        opacity-0
                        transition
                        duration-500
                        group-hover:opacity-100
                      "
                    >
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>
                  </div>

                  {/* Product information */}

                  <div className="pt-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${encodeURIComponent(
                            item.id,
                          )}`}
                          className="
                            block
                            font-serif
                            text-[22px]
                            leading-tight
                            tracking-[-0.035em]
                            transition-opacity
                            hover:opacity-55
                            sm:text-[24px]
                          "
                        >
                          {item.name}
                        </Link>

                        <p className="mt-2 text-[12px] font-medium text-[#451713]/65">
                          ₹
                          {Number(
                            item.price,
                          ).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>

                      <span
                        className="
                          mt-1
                          shrink-0
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-[#451713]/35
                        "
                      >
                        Saved
                      </span>
                    </div>

                    {/* CTA */}

                    <div className="mt-6 flex items-center justify-between border-t border-[#451713]/12 pt-4">
                      <Link
                        href={`/product/${encodeURIComponent(
                          item.id,
                        )}`}
                        className="
                          inline-flex
                          items-center
                          gap-3
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          transition
                          hover:opacity-55
                        "
                      >
                        View Product

                        <span className="text-sm">
                          →
                        </span>
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.15em]
                          text-[#451713]/40
                          underline
                          underline-offset-4
                          transition
                          hover:text-[#451713]
                        "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Continue shopping */}

            <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-[#451713]/15 pt-8 sm:flex-row sm:items-center">
              <div>
                <p className="font-serif text-2xl tracking-[-0.035em]">
                  Keep exploring.
                </p>

                <p className="mt-1 text-[11px] text-[#451713]/50">
                  There may be another piece waiting
                  for you.
                </p>
              </div>

              <Link
                href="/shop"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  gap-6
                  border
                  border-[#451713]/25
                  px-7
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  transition
                  duration-300
                  hover:bg-[#451713]
                  hover:text-[#f5ede4]
                "
              >
                Continue Shopping

                <span className="text-sm">
                  →
                </span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}