"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllProducts,
  exportProducts,
  createProduct,
} from "@/lib/supabase/admin-products";

import Link from "next/link";
import Image from "next/image";
import AdminNavbar from "@/components/admin/AdminNavbar";

import {
  getProductById,
  deleteProduct,
} from "@/lib/supabase/admin-products";

import {
  deleteProductImage,
} from "@/lib/supabase/storage";

type Product = {
  id: string;
  name: string;
  price: number;
  featured: boolean;
  image_url: string;

  size_inventory?: {
    XS?: number;
    S?: number;
    M?: number;
    L?: number;
    XL?: number;
    XXL?: number;
  };
};

export default function AdminProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [csvFile, setCsvFile] =
  useState<File | null>(
    null
  );

  async function loadProducts() {
    try {
      const data =
        await getAllProducts();

      setProducts(data ?? []);
    } catch (error) {
      console.error(
        "LOAD PRODUCTS ERROR:",
        error
      );
    }
  }

  async function handleDelete(
  id: string
) {
  try {
    const confirmed =
      window.confirm(
        "Delete Product?"
      );

    if (!confirmed) {
      return;
    }

    const product =
      await getProductById(
        id
      );

    if (
      product?.image_url
    ) {
      await deleteProductImage(
        product.image_url
      );
    }

    await deleteProduct(id);

    await loadProducts();

    alert(
      "Product Deleted Successfully"
    );
  } catch (error) {
    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );

    alert(
      "Failed To Delete Product"
    );
  }
}
  useEffect(() => {
  let mounted = true;

  getAllProducts()
    .then((data) => {
      if (mounted) {
        setProducts(data ?? []);
      }
    })
    .catch((error) => {
      console.error(
        "LOAD PRODUCTS ERROR:",
        error
      );
    });

  return () => {
    mounted = false;
  };
}, []);

async function handleImport() {
  if (!csvFile) return;

  const text =
    await csvFile.text();

  const rows =
    text.split("\n");

  const data =
    rows
      .slice(1)
      .filter(Boolean)
      .map((row) => {
        const [
          name,
          slug,
          price,
          stock,
        ] = row.split(",");

        return {
          name,
          slug,
          price:
            Number(price),
          stock:
            Number(stock),
        };
      });

  for (const product of data) {
    await createProduct({
      ...product,
      description: "",
      image_url: "",
      category_id: "",
      original_price:
        product.price,
      sizes: "",
      // provide empty size_inventory to satisfy required parameter
      size_inventory: {},
      featured: false,
    });
  }

  await loadProducts();

  alert(
    "Products Imported"
  );
}
async function handleExport() {
  try {
    const products =
      await exportProducts();

    const csvRows = [
      [
        "name",
        "slug",
        "price",
        "stock",
      ].join(","),
    ];

    products.forEach(
      (product) => {
        csvRows.push(
          [
            product.name,
            product.slug,
            product.price,
            product.stock,
          ].join(",")
        );
      }
    );

    const csv =
      csvRows.join("\n");

    const blob =
      new Blob([csv], {
        type:
          "text/csv",
      });

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "products.csv";

    link.click();

    URL.revokeObjectURL(
      url
    );
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">
        Manage Products
      </h1>

      <AdminNavbar />
       
       <input
  type="file"
  accept=".csv"
  onChange={(e) =>
    setCsvFile(
      e.target.files?.[0] ??
        null
    )
  }
  className="
    border
    p-3
    rounded-lg
    mb-4
    block
  "
/>

      <button
  onClick={handleExport}
  className="
    bg-black
    text-white
    px-6
    py-3
    rounded-lg
    mb-6
  "
>
  Export Products
</button>

<button
  onClick={handleImport}
  className="
    bg-green-600
    text-white
    px-6
    py-3
    rounded-lg
    ml-4
  "
>
  Import Products
</button>

      <div className="space-y-6">
        {products.length === 0 ? (
          <div
            className="
              border
              rounded-xl
              p-10
              text-center
            "
          >
            <h2 className="text-2xl font-bold">
              No Products Found
            </h2>

            <p className="mt-2 text-neutral-500">
              Add your first product.
            </p>
          </div>
        ) : (
          products.map(
            (product) => (
              <div
                key={product.id}
                className="
                  border
                  rounded-xl
                  p-6
                "
              >
                <h2 className="font-bold text-xl">
                  {product.name}
                </h2>

                <p className="mt-2">
                  ₹{product.price}
                </p>

                <p className="mt-2 font-medium">
  Total Stock:{" "}
  {Object.values(
    product.size_inventory ?? {}
  ).reduce(
    (total, qty) =>
      total + Number(qty),
    0
  )}
</p>

<div className="mt-2 text-sm text-neutral-600 grid grid-cols-3 gap-2">
  <p>
    XS:{" "}
    {product.size_inventory
      ?.XS ?? 0}
  </p>

  <p>
    S:{" "}
    {product.size_inventory
      ?.S ?? 0}
  </p>

  <p>
    M:{" "}
    {product.size_inventory
      ?.M ?? 0}
  </p>

  <p>
    L:{" "}
    {product.size_inventory
      ?.L ?? 0}
  </p>

  <p>
    XL:{" "}
    {product.size_inventory
      ?.XL ?? 0}
  </p>

  <p>
    XXL:{" "}
    {product.size_inventory
      ?.XXL ?? 0}
  </p>
</div>

                <p>
                  Featured:{" "}
                  {product.featured
                    ? "Yes"
                    : "No"}
                </p>

                {product.image_url && (
                  <div className="mt-4">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={192}
                      height={192}
                      className="w-48 h-48 object-cover rounded-xl border"
                    />
                  </div>
                )}

                <div className="mt-4 flex gap-4">
                  <Link
  href={`/admin/products/edit/${product.id}`}
  className="
    bg-black
    text-white
    px-4
    py-2
    rounded-lg
  "
>
  Edit
</Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        product.id
                      )
                    }
                    className="
                      bg-red-500
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}