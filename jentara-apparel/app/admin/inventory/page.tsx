// app/admin/inventory/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getInventory,
  updateInventory,
  type InventoryProduct,
} from "@/lib/supabase/admin-inventory";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function InventoryPage() {
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [query, setQuery] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadInventory = async () => {
      try {
        const inventory = await getInventory();

        if (isMounted) {
          setProducts(inventory);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadInventory();

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value
      ? products.filter((product) => product.name.toLowerCase().includes(value))
      : products;
  }, [products, query]);

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock ?? 0),
    0,
  );

  const lowStock = products.filter((product) => {
    const stock = Number(product.stock ?? 0);
    return stock > 0 && stock <= 5;
  }).length;

  const outOfStock = products.filter(
    (product) => Number(product.stock ?? 0) <= 0,
  ).length;

  async function saveProduct(product: InventoryProduct) {
    setSavingId(product.id);

    try {
      const updated = await updateInventory(
        product.id,
        product.size_inventory ?? {},
      );

      setProducts((current) =>
        current.map((item) =>
          item.id === product.id
            ? (updated as InventoryProduct)
            : item,
        ),
      );
    } catch (error) {
      console.error(error);
      window.alert("Inventory could not be updated.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / COMMERCE
          </p>
        </div>
        <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
          Inventory
        </h1>
        <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/50">
          Monitor stock at product and size level. Every save recalculates total stock.
        </p>
      </header>

      <section className="grid border-b border-[#451713]/15 sm:grid-cols-3">
        {[
          ["Total stock", totalStock],
          ["Low stock", lowStock],
          ["Out of stock", outOfStock],
        ].map(([label, value]) => (
          <div key={label} className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">{label}</p>
            <p className="mt-4 font-serif text-4xl">{value}</p>
          </div>
        ))}
      </section>

      <div className="py-8">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search inventory..."
          className="w-full border-b border-[#451713]/25 bg-transparent py-4 text-[12px] outline-none placeholder:text-[#451713]/30 focus:border-[#451713] sm:max-w-md"
        />
      </div>

      {loading ? (
        <div className="border-y border-[#451713]/12 py-20 text-center text-[9px] uppercase tracking-[0.2em] text-[#451713]/40">
          Loading inventory
        </div>
      ) : (
        <div className="divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {filtered.map((product) => {
            const inventory = product.size_inventory ?? {};
            const stock = Number(product.stock ?? 0);

            return (
              <article key={product.id} className="py-7">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                  <div>
                    <h2 className="font-serif text-2xl">{product.name}</h2>
                    <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-[#451713]/45">
                      {stock} total units
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={savingId === product.id}
                    onClick={() => void saveProduct(product)}
                    className="min-h-10 bg-[#451713] px-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#f5ede4] disabled:opacity-50"
                  >
                    {savingId === product.id ? "Saving..." : "Save stock"}
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-px border border-[#451713]/10 bg-[#451713]/10 sm:grid-cols-3 lg:grid-cols-6">
                  {sizes.map((size) => (
                    <label key={size} className="bg-[#f5ede4] p-4">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/45">
                        {size}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={Number(inventory[size] ?? 0)}
                        onChange={(event) => {
                          const quantity = Math.max(
                            0,
                            Number(event.target.value) || 0,
                          );

                          setProducts((current) =>
                            current.map((item) =>
                              item.id === product.id
                                ? {
                                    ...item,
                                    size_inventory: {
                                      ...(item.size_inventory ?? {}),
                                      [size]: quantity,
                                    },
                                  }
                                : item,
                            ),
                          );
                        }}
                        className="mt-3 w-full border-b border-[#451713]/20 bg-transparent py-2 font-serif text-2xl outline-none focus:border-[#451713]"
                      />
                    </label>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
