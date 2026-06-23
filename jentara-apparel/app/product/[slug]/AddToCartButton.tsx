"use client";

import { useRouter } from "next/navigation";

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

  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  function handleAddToCart() {
    if (!size) {
      alert(
        "Please select a size"
      );

      return;
    }

    addItem({
      id,
      name,
      price,
      image_url,
      size,
    });

    router.push("/cart");
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={!size}
      className={`
        mt-8
        w-full
        px-8
        py-4
        rounded-lg
        font-medium
        transition-all

        ${
          size
            ? "bg-black text-white hover:opacity-90"
            : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
        }
      `}
    >
      {size
        ? "Add To Cart"
        : "Select Size"}
    </button>
  );
}