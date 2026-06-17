"use client";

import { useEffect, useState } from "react";

import { getCategories } from "@/lib/supabase/categories";
import { createProduct } from "@/lib/supabase/admin-products";

interface Category {
  id: string;
  name: string;
}

export default function AddProductPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [originalPrice, setOriginalPrice] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [sizes, setSizes] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

    useEffect(() => {
  getCategories()
    .then((data) => {
      console.log(
        "CATEGORIES:",
        data
      );

      setCategories(data ?? []);
    })
    .catch((error) => {
      console.error(
        "CATEGORY ERROR:",
        error
      );
    });
}, []);

  async function handleSaveProduct() {
    try {
      console.log(
        "CATEGORY ID:",
        categoryId
      );

      if (!categoryId) {
        alert(
          "Please select a category"
        );
        return;
      }

      console.log({
        name,
        slug,
        description,
        price,
        originalPrice,
        categoryId,
        imageUrl,
        sizes,
        stock,
        featured,
      });

      await createProduct({
        name,
        slug,
        description,

        price:
          Number(price),

        original_price:
          Number(originalPrice),

        category_id:
          categoryId,

        image_url:
          imageUrl,

        sizes,

        stock:
          Number(stock),

        featured,
      });

      alert(
        "Product Created Successfully"
      );

      setName("");
      setSlug("");
      setDescription("");
      setPrice("");
      setOriginalPrice("");
      setCategoryId("");
      setImageUrl("");
      setSizes("");
      setStock("");
      setFeatured(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : JSON.stringify(error);

      console.error(
        "PRODUCT ERROR:",
        errorMessage
      );

      alert(errorMessage);
    }
  }

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">
        Add Product
      </h1>

      <div className="space-y-4 max-w-2xl">
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) =>
            setSlug(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          rows={5}
          className="border p-4 w-full rounded-lg"
        />

        <input
          type="number"
          placeholder="Price"
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
          placeholder="Original Price"
          value={originalPrice}
          onChange={(e) =>
            setOriginalPrice(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <select
          value={categoryId}
          onChange={(e) => {
            console.log(
              "SELECTED CATEGORY:",
              e.target.value
            );

            setCategoryId(
              e.target.value
            );
          }}
          className="border p-4 w-full rounded-lg"
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          placeholder="Sizes (S,M,L,XL)"
          value={sizes}
          onChange={(e) =>
            setSizes(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />

          Featured Product
        </label>

        <button
          onClick={
            handleSaveProduct
          }
          className="
            bg-black
            text-white
            px-8
            py-4
            rounded-lg
          "
        >
          Save Product
        </button>
      </div>
    </div>
  );
}