"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  const addItem = useCartStore(
    (state) => state.addItem
  );

  const addWishlist =
    useWishlistStore(
      (state) => state.addItem
    );

  return (
    <div
      className="
      border
      rounded-xl
      overflow-hidden
      bg-white
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
    "
    >
      <Link
        href={`/product/${product.slug}`}
      >
        <div
          className="
          relative
          aspect-square
          bg-neutral-100
          overflow-hidden
        "
        >
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className="
                w-full
                h-full
                flex
                items-center
                justify-center
              "
            >
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">

        <Link
          href={`/product/${product.slug}`}
        >
          <h3
            className="
            font-semibold
            text-lg
            hover:text-neutral-600
          "
          >
            {product.name}
          </h3>
        </Link>

        <p
          className="
          text-xl
          font-bold
          mt-2
        "
        >
          ₹{product.price}
        </p>

        <div
          className="
          flex
          gap-3
          mt-4
        "
        >
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url:
                  product.image_url,
              })
            }
            className="
              flex-1
              bg-black
              text-white
              py-3
              rounded-lg
            "
          >
            Add To Cart
          </button>

          <button
            onClick={() =>
              addWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url:
                  product.image_url,
              })
            }
            className="
              border
              px-4
              rounded-lg
            "
          >
            <Heart size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}