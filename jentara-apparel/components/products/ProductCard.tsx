"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AddToWishlistButton from "./AddToWishlistButton";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string;
  size_inventory?: Record<
    string,
    number
  >;
}

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  const router = useRouter();

  const totalStock =
    Object.values(
      product.size_inventory ?? {}
    ).reduce<number>(
      (total, qty) =>
        total + Number(qty),
      0
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

        <p
          className={`
            mt-2
            text-sm
            font-medium
            ${
              totalStock > 0
                ? "text-green-600"
                : "text-red-600"
            }
          `}
        >
          {totalStock > 0
            ? "✓ In Stock"
            : "Out Of Stock"}
        </p>

        <div
          className="
            flex
            gap-3
            mt-4
          "
        >
          {totalStock > 0 ? (
            <button
              onClick={() =>
                router.push(
                  `/product/${product.slug}`
                )
              }
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
              View Product
            </button>
          ) : (
            <button
              disabled
              className="
                flex-1
                bg-red-500
                text-white
                px-4
                py-3
                rounded-lg
                cursor-not-allowed
                opacity-80
              "
            >
              Out Of Stock
            </button>
          )}

          <AddToWishlistButton
            product={product}
          />
        </div>
      </div>
    </div>
  );
}