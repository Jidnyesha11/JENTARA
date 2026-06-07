"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  };
}

export default function AddToWishlistButton({
  product,
}: Props) {
  const addItem =
    useWishlistStore(
      (state) => state.addItem
    );

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image_url:
            product.image_url || "",
        })
      }
      className="border rounded-lg px-4 py-3"
    >
      <Heart size={18} />
    </button>
  );
}