"use client";

import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cartStore";

interface Props {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export default function AddToCartButton({
  id,
  name,
  price,
  image_url,
}: Props) {
  const router = useRouter();

  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  function handleAddToCart() {
    addItem({
      id,
      name,
      price,
      image_url,
    });

    router.push("/cart");
  }

  return (
    <button
      onClick={handleAddToCart}
      className="
        mt-8
        bg-black
        text-white
        px-8
        py-4
        rounded-lg
      "
    >
      Add To Cart
    </button>
  );
}