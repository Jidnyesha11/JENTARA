// components/sections/HomeAddToCartButton.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cartStore";

interface Props {
  id: string;
  name: string;
  price: number;
  image_url: string;
  sizes: string[];
  disabled?: boolean;
}

export default function HomeAddToCartButton({
  id,
  name,
  price,
  image_url,
  sizes,
  disabled = false,
}: Props) {
  const router = useRouter();

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const [selectedSize, setSelectedSize] =
    useState("");

  function handleAddToCart() {
    if (disabled) {
      return;
    }

    if (sizes.length > 0 && !selectedSize) {
      return;
    }

    addItem({
      id,
      name,
      price,
      image_url,
      size: selectedSize || "One Size",
    });

    router.push("/cart");
  }

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className="
          mt-5
          flex
          w-full
          items-center
          justify-center
          border
          border-[#451713]/10
          px-4
          py-3.5
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-[#451713]/30
        "
      >
        Out Of Stock
      </button>
    );
  }

  return (
    <div className="mt-5">
      {sizes.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-[7px] font-semibold uppercase tracking-[0.18em] text-[#451713]/50">
            Select Size
          </p>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const selected =
                selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={`
                    min-w-10
                    border
                    px-3
                    py-2
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    transition-all
                    duration-200
                    ${
                      selected
                        ? "border-[#451713] bg-[#451713] text-[#f5ede4]"
                        : "border-[#451713]/20 text-[#451713] hover:border-[#451713]"
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={
          sizes.length > 0 &&
          !selectedSize
        }
        className={`
          group
          flex
          w-full
          items-center
          justify-between
          border
          px-4
          py-3.5
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.18em]
          transition-all
          duration-300
          ${
            sizes.length === 0 ||
            selectedSize
              ? "border-[#451713]/25 text-[#451713] hover:bg-[#451713] hover:text-[#f5ede4]"
              : "cursor-not-allowed border-[#451713]/10 text-[#451713]/30"
          }
        `}
      >
        <span>
          {sizes.length > 0 &&
          !selectedSize
            ? "Select Size"
            : "Add To Cart"}
        </span>

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </div>
  );
}