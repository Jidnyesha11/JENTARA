"use client";

import { useEffect, useState } from "react";
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
  const [mounted, setMounted] =
    useState(false);

  const addItem =
    useWishlistStore(
      (state) => state.addItem
    );

  const removeItem =
    useWishlistStore(
      (state) => state.removeItem
    );

  const isWishlisted =
    useWishlistStore(
      (state) =>
        state.isWishlisted(
          product.id
        )
    );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!mounted) {
    return (
      <button
        className="
          border
          rounded-lg
          px-4
          py-3
        "
      >
        <Heart
          size={20}
        />
      </button>
    );
  }

  function handleWishlist() {
    if (isWishlisted) {
      removeItem(product.id);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url:
        product.image_url || "",
    });
  }

  return (
    <button
      onClick={handleWishlist}
      className="
        border
        rounded-lg
        px-4
        py-3
      "
    >
      <Heart
        size={20}
        fill={
          isWishlisted
            ? "red"
            : "none"
        }
        color={
          isWishlisted
            ? "red"
            : "black"
        }
      />
    </button>
  );
}