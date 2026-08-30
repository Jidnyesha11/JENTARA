// app/admin/products/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  deleteProduct,
  exportProducts,
  getAllProducts,
} from "@/lib/supabase/admin-products";
import { deleteProductImage } from "@/lib/supabase/storage";

type Product = {
  id: string;
  name: string;
  slug?: string | null;
  price: number;
  original_price?: number | null;
  featured: boolean;
  image_url: string | null;
  stock?: number | null;
  size_inventory?: Record<string, number> | null;
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setError("");
      const data = await getAllProducts();
      setProducts((data ?? []) as Product[]);
    } catch (loadError) {
      console.error(loadError);
      setError("Products could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const init = async () => {
      await loadProducts();
    };
    void init();
  }, []);

  async function handleDelete(product: Product) {
    if (!window.confirm(`Delete "${product.name}"?`)) return;

    try {
      if (product.image_url) {
        await deleteProductImage(product.image_url);
      }

      await deleteProduct(product.id);
      await loadProducts();
    } catch (deleteError) {
      console.error(deleteError);
      window.alert("Product could not be deleted.");
    }
  }

  async function handleExport() {
    try {
      const data = (await exportProducts()) ?? [];
      const headers = ["name", "slug", "price", "stock"];
      const rows = data.map((product) =>
        [product.name, product.slug, product.price, product.stock]
          .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
          .join(","),
      );

      const blob = new Blob([[headers.join(","), ...rows].join("\n")], {
        type: "text/csv;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "jentara-products.csv";
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (exportError) {
      console.error(exportError);
      window.alert("Export failed.");
    }
  }

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        String(product.slug ?? "").toLowerCase().includes(value),
    );
  }, [products, query]);

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock ?? 0),
    0,
  );

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="flex flex-col justify-between gap-6 border-b border-[#451713]/15 pb-10 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />
            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / COMMERCE
            </p>
          </div>
          <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
            Products
          </h1>
          <p className="mt-4 text-[12px] text-[#451713]/50">
            Shape the collection, pricing and availability.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="min-h-11 border border-[#451713]/20 px-5 text-[9px] font-semibold uppercase tracking-[0.16em]"
          >
            Export
          </button>
          <Link
            href="/admin/products/add"
            className="inline-flex min-h-11 items-center bg-[#451713] px-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#f5ede4]"
          >
            + Add product
          </Link>
        </div>
      </header>

      <section className="grid border-b border-[#451713]/15 sm:grid-cols-3">
        {[
          ["Products", products.length],
          ["Stock units", totalStock],
          ["Featured", products.filter((product) => product.featured).length],
        ].map(([label, value]) => (
          <div key={label} className="border-b border-[#451713]/10 px-1 py-7 sm:border-r sm:px-6 sm:border-b-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">{label}</p>
            <p className="mt-3 font-serif text-4xl">{value}</p>
          </div>
        ))}
      </section>

      <section className="py-8">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products..."
          className="w-full border-b border-[#451713]/25 bg-transparent px-0 py-4 text-[12px] outline-none placeholder:text-[#451713]/30 focus:border-[#451713] sm:max-w-md"
        />
      </section>

      {loading ? (
        <div className="border-y border-[#451713]/12 py-20 text-center text-[9px] uppercase tracking-[0.2em] text-[#451713]/45">
          Loading products
        </div>
      ) : error ? (
        <div className="border border-[#451713]/12 p-10 text-center">
          <p className="font-serif text-2xl">{error}</p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              void loadProducts();
            }}
            className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
          >
            Try again →
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="border-y border-[#451713]/12 py-20 text-center">
          <p className="font-serif text-3xl">No products found.</p>
          <Link href="/admin/products/add" className="mt-5 inline-block text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4">
            Add a product →
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {filteredProducts.map((product) => {
            const inventory = product.size_inventory ?? {};
            const stock = Number(product.stock ?? 0);

            return (
              <article key={product.id} className="grid gap-5 px-0 py-6 md:grid-cols-[100px_1fr_auto] md:items-center md:gap-7">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e8ded4]">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[8px] uppercase tracking-[0.12em] text-[#451713]/35">
                      No image
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-serif text-2xl tracking-[-0.03em]">{product.name}</h2>
                    {product.featured && (
                      <span className="border border-[#451713]/15 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.14em]">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-[11px] text-[#451713]/55">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[9px] uppercase tracking-[0.1em] text-[#451713]/45">
                    {sizes.map((size) => (
                      <span key={size}>
                        {size} {Number(inventory[size] ?? 0)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="inline-flex min-h-10 items-center border border-[#451713]/20 px-4 text-[9px] font-semibold uppercase tracking-[0.15em]"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleDelete(product)}
                    className="min-h-10 border border-[#7b2924]/20 px-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#7b2924]"
                  >
                    Delete
                  </button>
                </div>

                <div className="text-[9px] uppercase tracking-[0.15em] text-[#451713]/45 md:hidden">
                  {stock} total units
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
