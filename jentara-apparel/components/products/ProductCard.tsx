"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cartStore";
import AddToWishlistButton from "./AddToWishlistButton";

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

  const router = useRouter();

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
  onClick={() => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url:
        product.image_url,
    });

    router.push("/cart");
  }}
  className="
    flex-1
    border
    border-black
    bg-black
    text-white
    px-4
    py-3
    rounded-lg
    font-medium
    transition-all
    duration-300
    hover:bg-white
    hover:text-black
  "
>
  Add To Cart
</button>

          <AddToWishlistButton
  product={product}
/>
        </div>

      </div>
    </div>
  );
}