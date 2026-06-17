"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllProducts,
  deleteProduct,
} from "@/lib/supabase/admin-products";

import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  featured: boolean;
};

export default function AdminProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

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

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">
        Manage Products
      </h1>

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

                <p>
                  Stock:{" "}
                  {product.stock}
                </p>

                <p>
                  Featured:{" "}
                  {product.featured
                    ? "Yes"
                    : "No"}
                </p>

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