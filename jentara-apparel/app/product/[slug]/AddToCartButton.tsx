"use client";

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
  const addItem = useCartStore(
    (state) => state.addItem
  );

  return (
    <button
      onClick={() => {
        console.log("ADDING PRODUCT ID:", id);

        addItem({
          id,
          name,
          price,
          image_url,
        });

        console.log(
          "STORE:",
          useCartStore.getState().items
        );
      }}
      className="mt-8 bg-black text-white px-8 py-4 rounded-lg"
    >
      Add To Cart
    </button>
  );
}