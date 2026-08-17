
"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

import AddToWishlistButton from "./AddToWishlistButton";
import AddToCartButton from "@/app/product/[slug]/AddToCartButton";

import { useCartStore } from "@/store/cartStore";

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };

  sizeInventory: Record<string, number>;
}

const SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
];

export default function ProductActions({
  product,
  sizeInventory,
}: Props) {
  const router = useRouter();

  const [
    selectedSize,
    setSelectedSize,
  ] = useState("");

  const addItem = useCartStore(
    (state) => state.addItem
  );

  function handleBuyNow() {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      size: selectedSize,
    });

    router.push("/checkout");
  }

  return (
    <div className="mt-9">
      {/* Size header */}

      <div className="flex items-end justify-between border-b border-[#451713]/20 pb-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            Select Size
          </p>

          <p className="mt-1.5 text-[10px] text-[#451713]/45">
            {selectedSize
              ? `Size ${selectedSize} selected`
              : "Choose your usual fit"}
          </p>
        </div>

        <a
          href="/size-guide"
          className="text-[9px] font-semibold uppercase tracking-[0.15em] underline underline-offset-4"
        >
          Size Guide
        </a>
      </div>

      {/* Sizes */}

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {SIZES.map((size) => {
          const quantity = Number(
            sizeInventory[size] ?? 0
          );

          const available = quantity > 0;
          const selected =
            selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              disabled={!available}
              onClick={() =>
                setSelectedSize(size)
              }
              aria-label={`Select size ${size}`}
              aria-pressed={selected}
              className={`
                relative
                h-12
                border
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.08em]
                transition-all
                sm:h-14
                ${
                  selected
                    ? "border-[#451713] bg-[#451713] text-[#f5ede4]"
                    : available
                      ? "border-[#451713]/20 bg-transparent hover:border-[#451713]"
                      : "cursor-not-allowed border-[#451713]/10 bg-[#451713]/5 text-[#451713]/25"
                }
              `}
            >
              {size}

              {!available && (
                <span className="absolute left-1/2 top-1/2 h-px w-12 -translate-x-1/2 -rotate-[25deg] bg-[#451713]/25" />
              )}
            </button>
          );
        })}
      </div>

      {/* Primary CTA */}

      <div className="mt-6">
        <button
          type="button"
          disabled={!selectedSize}
          onClick={handleBuyNow}
          className={`
            flex
            min-h-[58px]
            w-full
            items-center
            justify-center
            gap-3
            px-6
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.22em]
            transition-all
            ${
              selectedSize
                ? "bg-[#451713] text-[#f5ede4] hover:bg-[#5c211b]"
                : "cursor-not-allowed bg-[#451713]/12 text-[#451713]/35"
            }
          `}
        >
          Buy Now

          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Secondary CTA + wishlist */}

      <div className="mt-2 grid grid-cols-[1fr_58px] gap-2">
        <AddToCartButton
          id={product.id}
          name={product.name}
          price={product.price}
          image_url={product.image_url}
          size={selectedSize}
        />

        <AddToWishlistButton
          product={product}
        />
      </div>

      {/* CTA reassurance */}

      <p className="mt-4 text-center text-[9px] leading-5 text-[#451713]/45">
        Secure payment · Easy returns ·
        Free shipping above ₹999
      </p>
    </div>
  );
}

