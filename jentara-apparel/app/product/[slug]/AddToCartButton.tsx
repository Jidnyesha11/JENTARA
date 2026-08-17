
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCartStore } from "@/store/cartStore";

interface Props {
  id: string;
  name: string;
  price: number;
  image_url: string;
  size: string;
}

export default function AddToCartButton({
  id,
  name,
  price,
  image_url,
  size,
}: Props) {
  const router = useRouter();

  const [added, setAdded] =
    useState(false);

  const addItem = useCartStore(
    (state) => state.addItem
  );

  function handleAddToCart() {
    if (added) {
      router.push("/cart");
      return;
    }

    if (!size) {
      alert("Please select a size.");
      return;
    }

    addItem({
      id,
      name,
      price,
      image_url,
      size,
    });

    setAdded(true);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={!size && !added}
      className={`
        min-h-[58px]
        w-full
        px-4
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.18em]
        transition-all
        ${
          added
            ? "border border-[#451713] bg-transparent text-[#451713] hover:bg-[#451713] hover:text-[#f5ede4]"
            : size
              ? "border border-[#451713]/30 bg-transparent text-[#451713] hover:border-[#451713] hover:bg-[#451713]/5"
              : "cursor-not-allowed border border-[#451713]/10 bg-[#451713]/5 text-[#451713]/30"
        }
      `}
    >
      {added
        ? "Go To Cart"
        : size
          ? "Add To Cart"
          : "Select Size"}
    </button>
  );
}