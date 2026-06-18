"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  uploadGalleryImage,
} from "@/lib/supabase/product-images";

import {
  getProductById,
  updateProduct,
} from "@/lib/supabase/admin-products";

import {
  uploadProductImage,
} from "@/lib/supabase/storage";

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

  const [imageUrl, setImageUrl] =
    useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(
      null
    );

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [
  galleryFiles,
  setGalleryFiles,
] = useState<File[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { id } =
          await params;

        const product =
          await getProductById(id);

        if (!mounted) {
          return;
        }

        setProductId(id);

        setName(
          product.name ?? ""
        );

        setPrice(
          String(
            product.price ?? 0
          )
        );

        setStock(
          String(
            product.stock ?? 0
          )
        );

        setFeatured(
          product.featured ??
            false
        );

        setImageUrl(
          product.image_url ??
            ""
        );
      } catch (error) {
        console.error(
          "LOAD PRODUCT ERROR:",
          error
        );
      }
    })();

    return () => {
      mounted = false;
    };
  }, [params]);

  async function handleSave() {
    try {
      let uploadedImageUrl =
        imageUrl;

      if (imageFile) {
        uploadedImageUrl =
          await uploadProductImage(
            imageFile
          );
      }

      await updateProduct(
        productId,
        {
          name,

          price:
            Number(price),

          stock:
            Number(stock),

          featured,

          image_url:
            uploadedImageUrl,
        }
      );
      // upload gallery images after product update
      for (const file of galleryFiles) {
        await uploadGalleryImage(productId, file);
      }

      alert("Product Updated Successfully");
    } catch (error) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        error
      );

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

        {(previewUrl ||
          imageUrl) && (
          <Image
            src={
              previewUrl ||
              imageUrl
            }
            alt={name}
            width={250}
            height={250}
            className="
              rounded-xl
              border
              object-cover
            "
          />
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file =
              e.target
                .files?.[0];

            if (!file) {
              return;
            }

            setImageFile(
              file
            );

            setPreviewUrl(
              URL.createObjectURL(
                file
              )
            );
          }}
          className="
            border
            p-4
            w-full
            rounded-lg
          "
        />
        
        <div className="space-y-2">
  <label className="font-medium">
    Gallery Images
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => {
      const files =
        Array.from(
          e.target.files ?? []
        );

      setGalleryFiles(
        files
      );
    }}
    className="
      border
      p-4
      w-full
      rounded-lg
    "
  />
</div>

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Product Name"
          className="
            border
            p-4
            w-full
            rounded-lg
          "
        />

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          placeholder="Price"
          className="
            border
            p-4
            w-full
            rounded-lg
          "
        />

        <input
          type="number"
          value={stock}
          onChange={(e) =>
            setStock(
              e.target.value
            )
          }
          placeholder="Stock"
          className="
            border
            p-4
            w-full
            rounded-lg
          "
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={
              featured
            }
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />

          Featured Product
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