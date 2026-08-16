"use client";

import { useState } from "react";

import AddToWishlistButton from "./AddToWishlistButton";
import AddToCartButton from "@/app/product/[slug]/AddToCartButton";

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };

  sizeInventory: {
    XS?: number;
    S?: number;
    M?: number;
    L?: number;
    XL?: number;
    XXL?: number;
  };
}

export default function ProductActions({
  product,
  sizeInventory,
}: Props) {
  const [
    selectedSize,
    setSelectedSize,
  ] = useState("");

  const allSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ];

  return (
    <>
      <div className="mt-8">
        <h3 className="font-semibold mb-4">
          Select Size
        </h3>

        <div className="flex flex-wrap gap-3">

          {allSizes.map((size) => {
            const quantity =
              Number(
                sizeInventory[
                  size as keyof typeof sizeInventory
                ] ?? 0
              );

            const available =
              quantity > 0;

            return (
              <button
                key={size}
                disabled={!available}
                onClick={() =>
                  setSelectedSize(
                    size
                  )
                }
                className={`
                  w-16
                  h-16
                  border
                  rounded-lg
                  font-medium
                  transition-all

                  ${
                    selectedSize ===
                    size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black"
                  }

                  ${
                    !available
                      ? "opacity-40 cursor-not-allowed bg-neutral-100"
                      : "hover:border-black"
                  }
                `}
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-xs
                  "
                >
                  <span>
                    {size}
                  </span>

                </div>
              </button>
            );
          })}

        </div>

        {selectedSize && (
          <p className="mt-4 text-sm text-neutral-500">
            Selected Size:
            {" "}
            <span className="font-semibold">
              {selectedSize}
            </span>
          </p>
        )}
      </div>

      <div
        className="
          flex
          gap-4
          mt-10
          items-center
        "
      >
        <div className="flex-1">

          <AddToCartButton
            id={product.id}
            name={product.name}
            price={product.price}
            image_url={
              product.image_url
            }
            size={selectedSize}
          />

        </div>

        <AddToWishlistButton
          product={product}
        />
      </div>
    </>
  );
}