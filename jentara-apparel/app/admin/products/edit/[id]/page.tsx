"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getProductById,
  updateProduct,
} from "@/lib/supabase/admin-products";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditProductPage({
  params,
}: Props) {
  const [productId, setProductId] =
    useState("");

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  useEffect(() => {
    (async () => {
      const { id } =
        await params;

      setProductId(id);

      const product =
        await getProductById(id);

      setName(product.name);

      setPrice(
        String(product.price)
      );

      setStock(
        String(product.stock)
      );

      setFeatured(
        product.featured
      );
    })();
  }, [params]);

  async function handleSave() {
    try {
      await updateProduct(
        productId,
        {
          name,
          price:
            Number(price),

          stock:
            Number(stock),

          featured,
        }
      );

      alert(
        "Product Updated"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed To Update Product"
      );
    }
  }

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">
        Edit Product
      </h1>

      <div className="space-y-4 max-w-2xl">
        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          type="number"
          value={stock}
          onChange={(e) =>
            setStock(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <label className="flex gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />

          Featured
        </label>

        <button
          onClick={handleSave}
          className="
            bg-black
            text-white
            px-8
            py-4
            rounded-lg
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}