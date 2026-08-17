// components/products/ProductCard.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AddToWishlistButton from "./AddToWishlistButton";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number | null;
  image_url: string;
  stock?: number | null;
  size_inventory?: Record<
    string,
    number
  > | null;
}

interface Props {
  product: Product;
  index?: number;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat(
    "en-IN"
  ).format(value);
}

function getTotalStock(
  product: Product
) {
  if (
    product.size_inventory &&
    Object.keys(product.size_inventory)
      .length > 0
  ) {
    return Object.values(
      product.size_inventory
    ).reduce(
      (total, quantity) =>
        total + Number(quantity || 0),
      0
    );
  }

  return Number(
    product.stock ?? 0
  );
}

export default function ProductCard({
  product,
  index = 0,
}: Props) {
  const totalStock =
    getTotalStock(product);

  const isInStock =
    totalStock > 0;

  const hasSale =
    product.original_price != null &&
    Number(product.original_price) >
      Number(product.price);

  const productHref =
    `/product/${product.slug}`;

  return (
    <article className="group min-w-0">
      {/* =====================================================
          PRODUCT VISUAL
      ===================================================== */}

      <div className="relative">
        <Link
          href={productHref}
          className="block"
        >
          <div
            className="
              relative
              aspect-[0.78]
              overflow-hidden
              bg-[#ddd6cf]
            "
          >
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="
                  (max-width: 640px) 50vw,
                  (max-width: 1024px) 50vw,
                  33vw
                "
                className="
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.035]
                "
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-5xl tracking-[-0.08em] text-[#451713]/20">
                    J
                  </p>

                  <p className="mt-2 text-[7px] font-semibold uppercase tracking-[0.3em] text-[#451713]/30">
                    JENTARA
                  </p>
                </div>
              </div>
            )}

            {/* Product number */}

            <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
              <span className="font-serif text-lg tracking-[-0.04em] text-[#451713]/55">
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>
            </div>

            {/* Sale badge */}

            {hasSale && (
              <span
                className="
                  absolute
                  bottom-3
                  left-3
                  bg-[#451713]
                  px-2.5
                  py-1.5
                  text-[6px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#f5ede4]
                  sm:bottom-4
                  sm:left-4
                "
              >
                Sale
              </span>
            )}

            {/* Stock */}

            {!isInStock && (
              <span
                className="
                  absolute
                  bottom-3
                  left-3
                  bg-[#f5ede4]/90
                  px-2.5
                  py-1.5
                  text-[6px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#451713]
                  backdrop-blur-sm
                  sm:bottom-4
                  sm:left-4
                "
              >
                Sold Out
              </span>
            )}

            {/* Product arrow */}

            <span
              className="
                absolute
                bottom-3
                right-3
                flex
                h-9
                w-9
                translate-y-2
                items-center
                justify-center
                rounded-full
                bg-[#f5ede4]
                text-[#451713]
                opacity-0
                shadow-lg
                transition-all
                duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
                sm:bottom-4
                sm:right-4
                sm:h-10
                sm:w-10
              "
            >
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
              />
            </span>
          </div>
        </Link>

        {/* Wishlist */}

        <div
          className="
            absolute
            right-3
            top-3
            z-10
            sm:right-4
            sm:top-4
          "
        >
          <AddToWishlistButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image_url:
                product.image_url,
            }}
          />
        </div>
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <div className="pt-4 sm:pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={productHref}>
              <h2
                className="
                  font-serif
                  text-[19px]
                  leading-[0.95]
                  tracking-[-0.035em]
                  text-[#451713]
                  transition-opacity
                  hover:opacity-55
                  sm:text-[23px]
                "
              >
                {product.name}
              </h2>
            </Link>

            <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
              <span className="text-[10px] font-semibold text-[#451713] sm:text-[12px]">
                ₹
                {formatPrice(
                  Number(product.price)
                )}
              </span>

              {hasSale && (
                <span className="text-[8px] text-[#451713]/35 line-through sm:text-[10px]">
                  ₹
                  {formatPrice(
                    Number(
                      product.original_price
                    )
                  )}
                </span>
              )}
            </div>
          </div>

          <span
            className={`
              hidden
              shrink-0
              pt-1
              text-[6px]
              font-semibold
              uppercase
              tracking-[0.16em]
              sm:block
              ${
                isInStock
                  ? "text-[#451713]/40"
                  : "text-[#451713]"
              }
            `}
          >
            {isInStock
              ? "Available"
              : "Sold Out"}
          </span>
        </div>

        {/* Product link */}

        <Link
          href={productHref}
          className="
            group/link
            mt-4
            inline-flex
            items-center
            gap-2
            border-b
            border-[#451713]/20
            pb-1.5
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#451713]
            transition-colors
            hover:border-[#451713]
            sm:mt-5
          "
        >
          View Product

          <ArrowUpRight
            size={11}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}