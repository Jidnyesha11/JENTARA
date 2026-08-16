// components/products/ProductCard.tsx

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
  stock?: number | null;
  size_inventory?: Record<
    string,
    number
  > | null;
}

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  const router = useRouter();

  const sizeInventoryTotal =
    Object.values(
      product.size_inventory ?? {}
    ).reduce<number>(
      (total, quantity) =>
        total + Number(quantity || 0),
      0
    );

  const totalStock =
    product.size_inventory &&
    Object.keys(product.size_inventory)
      .length > 0
      ? sizeInventoryTotal
      : Number(product.stock ?? 0);

  const isInStock =
    totalStock > 0;

  return (
    <article
      className="
        overflow-hidden
        rounded-xl
        border
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      <Link
        href={`/product/${product.slug}`}
        className="block"
      >
        <div
          className="
            relative
            aspect-square
            overflow-hidden
            bg-neutral-100
          "
        >
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                25vw
              "
              className="
                object-cover
                transition-transform
                duration-500
                hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                text-sm
                text-neutral-400
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
              text-lg
              font-semibold
              transition-colors
              hover:text-neutral-600
            "
          >
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-xl font-bold">
          ₹{product.price}
        </p>

        <p
          className={`
            mt-2
            text-sm
            font-medium
            ${
              isInStock
                ? "text-green-600"
                : "text-red-600"
            }
          `}
        >
          {isInStock
            ? "✓ In Stock"
            : "Out Of Stock"}
        </p>

        <div className="mt-4 flex gap-3">
          {isInStock ? (
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/product/${product.slug}`
                )
              }
              className="
                flex-1
                rounded-lg
                border
                border-black
                bg-black
                px-4
                py-3
                font-medium
                text-white
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
              type="button"
              disabled
              className="
                flex-1
                cursor-not-allowed
                rounded-lg
                bg-red-500
                px-4
                py-3
                font-medium
                text-white
                opacity-80
              "
            >
              Out Of Stock
            </button>
          )}

          <AddToWishlistButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image_url: product.image_url,
            }}
          />
        </div>
      </div>
    </article>
  );
}