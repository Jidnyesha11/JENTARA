"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  uploadProductImage,
} from "@/lib/supabase/storage";
import { getCategories } from "@/lib/supabase/categories";
import { createProduct } from "@/lib/supabase/admin-products";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

export default function AddProductPage() {
  const router = useRouter();

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


  const [stock, setStock] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [imageFile, setImageFile] =
  useState<File | null>(
    null
  );

  const [previewUrl, setPreviewUrl] =
  useState("");

  const [
  sizeInventory,
  setSizeInventory,
] = useState({
  XS: 0,
  S: 0,
  M: 0,
  L: 0,
  XL: 0,
  XXL: 0,
});

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
        size_inventory:
  sizeInventory,
        stock,
        featured,
      });
      
      let uploadedImageUrl =
  "";

if (imageFile) {
  uploadedImageUrl =
    await uploadProductImage(
      imageFile
    );
}

      const product =
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
          uploadedImageUrl,

        sizes:
          Object.entries(sizeInventory)
            .filter(([, qty]) => qty > 0)
            .map(([size]) => size)
            .join(","),

        size_inventory:
          sizeInventory,

        stock:
          Number(stock),

        featured,
      });

      router.push(
  `/product/${product.slug}`
);

      setName("");
      setSlug("");
      setDescription("");
      setPrice("");
      setOriginalPrice("");
      setCategoryId("");
      setImageUrl("");
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
  type="file"
  accept="image/*"
  onChange={(e) => {
  const file =
    e.target.files?.[0];

  if (!file) return;

  setImageFile(file);

  setPreviewUrl(
    URL.createObjectURL(file)
  );
}}
  className="
    border
    p-4
    w-full
    rounded-lg
  "
/>

{previewUrl && (
  <Image
    src={previewUrl}
    alt="Preview"
    width={192}
    height={192}
    className="
      w-48
      h-48
      object-cover
      rounded-xl
      border
    "
  />
)}

      <div className="space-y-4">

  <h3 className="font-semibold">
    Size Inventory
  </h3>

  {Object.entries(
    sizeInventory
  ).map(
    ([size, qty]) => (
      <div
        key={size}
        className="
          flex
          items-center
          gap-4
        "
      >
        <label
          className="
            w-16
            font-medium
          "
        >
          {size}
        </label>

        <input
          type="number"
          min="0"
          value={qty}
          onChange={(e) =>
            setSizeInventory(
              (
                prev
              ) => ({
                ...prev,
                [size]:
                  Number(
                    e.target
                      .value
                  ),
              })
            )
          }
          className="
            border
            p-3
            rounded-lg
            w-32
          "
        />
      </div>
    )
  )}
</div>

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