// app/shop/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import { getProducts } from "@/lib/supabase/products";
import {
  getCategories,
  type Category,
} from "@/lib/supabase/categories";

import SearchBar from "@/components/products/SearchBar";
import CategoryFilter from "@/components/products/CategoryFilter";
import SortFilter from "@/components/products/SortFilter";
import ProductCard from "@/components/products/ProductCard";

import { useSearchStore } from "@/store/searchStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useSortStore } from "@/store/sortStore";

type Product = Awaited<
  ReturnType<typeof getProducts>
>[number];

export default function ShopPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const search = useSearchStore(
    (state) => state.search
  );

  const selectedCategory =
    useCategoryStore(
      (state) =>
        state.selectedCategory
    );

  const sortBy = useSortStore(
    (state) => state.sortBy
  );

  useEffect(() => {
    let mounted = true;

    async function loadShop() {
      try {
        setLoading(true);
        setError(false);

        const [
          productsData,
          categoriesData,
        ] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        if (!mounted) {
          return;
        }

        setProducts(productsData ?? []);
        setCategories(
          categoriesData ?? []
        );
      } catch (loadError) {
        console.error(
          "SHOP LOAD ERROR:",
          loadError
        );

        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadShop();

    return () => {
      mounted = false;
    };
  }, []);

  const categoryMap = useMemo(() => {
    return new Map(
      categories.map(
        (category) => [
          category.id,
          category,
        ]
      )
    );
  }, [categories]);

  const sortedProducts =
    useMemo(() => {
      const normalizedSearch =
        search.trim().toLowerCase();

      const filtered =
        products.filter(
          (product) => {
            const category =
              product.category_id
                ? categoryMap.get(
                    product.category_id
                  )
                : null;

            const categoryName =
              category?.name
                ?.toLowerCase() ?? "";

            const categorySlug =
              category?.slug
                ?.toLowerCase() ?? "";

            const productName =
              product.name
                ?.toLowerCase() ?? "";

            const productSlug =
              product.slug
                ?.toLowerCase() ?? "";

            const matchesSearch =
              normalizedSearch === "" ||
              productName.includes(
                normalizedSearch
              ) ||
              productSlug.includes(
                normalizedSearch
              ) ||
              categoryName.includes(
                normalizedSearch
              ) ||
              categorySlug.includes(
                normalizedSearch
              );

            const matchesCategory =
              selectedCategory ===
                "all" ||
              product.category_id ===
                selectedCategory;

            return (
              matchesSearch &&
              matchesCategory
            );
          }
        );

      const sorted = [
        ...filtered,
      ];

      if (
        sortBy === "low-high"
      ) {
        sorted.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );
      }

      if (
        sortBy === "high-low"
      ) {
        sorted.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );
      }

      if (
        sortBy === "featured"
      ) {
        sorted.sort(
          (a, b) => {
            const featuredA =
              a.featured ? 1 : 0;

            const featuredB =
              b.featured ? 1 : 0;

            return (
              featuredB -
              featuredA
            );
          }
        );
      }

      if (
        sortBy === "newest"
      ) {
        sorted.sort(
          (a, b) => {
            const dateA =
              new Date(
                a.created_at ?? 0
              ).getTime();

            const dateB =
              new Date(
                b.created_at ?? 0
              ).getTime();

            return dateB - dateA;
          }
        );
      }

      return sorted;
    }, [
      products,
      categoryMap,
      search,
      selectedCategory,
      sortBy,
    ]);

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#151a2a]">
      <section className="mx-auto max-w-[1500px] px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />

          <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#451713]">
            JENTARA / SHOP
          </p>
        </div>

        <div className="flex flex-col gap-8 border-b border-[#451713]/15 pb-12 md:flex-row md:items-end md:justify-between">
          <h1 className="font-serif text-[68px] leading-[0.82] tracking-[-0.07em] sm:text-[90px] md:text-[120px]">
            SHOP
          </h1>

          <p className="max-w-[390px] pb-2 text-[10px] uppercase leading-6 tracking-[0.14em] text-[#151a2a]/50 md:text-right">
            Explore the latest JENTARA
            pieces, drops and everyday
            essentials.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10">
        <div className="mb-10 grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
          <SearchBar />

          <CategoryFilter />

          <SortFilter />
        </div>

        <div className="mb-8 flex items-center justify-between border-b border-[#451713]/15 pb-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/60">
            {loading
              ? "Loading"
              : `${sortedProducts.length} ${
                  sortedProducts.length ===
                  1
                    ? "PRODUCT"
                    : "PRODUCTS"
                }`}
          </p>

          {search && (
            <p className="text-[9px] uppercase tracking-[0.14em] text-[#151a2a]/45">
              Search:{" "}
              <span className="text-[#451713]">
                {search}
              </span>
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  aspect-[3/4]
                  animate-pulse
                  rounded-xl
                  bg-[#451713]/10
                "
              />
            ))}
          </div>
        ) : error ? (
          <div className="border border-red-900/10 bg-white px-8 py-20 text-center">
            <h2 className="font-serif text-4xl">
              Unable to Load Products
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#151a2a]/55">
              Something went wrong while
              loading the JENTARA collection.
              Please refresh and try again.
            </p>
          </div>
        ) : sortedProducts.length ===
          0 ? (
          <div className="border border-[#451713]/15 bg-[#faf5ef] px-8 py-24 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/50">
              NO MATCHES
            </p>

            <h2 className="mt-5 font-serif text-4xl tracking-[-0.05em]">
              Nothing Found
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#151a2a]/55">
              Try another search term or
              remove one of your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    slug:
                      product.slug ?? "",
                    price: Number(
                      product.price
                    ),
                    image_url:
                      product.image_url ??
                      "",
                    stock:
                      product.stock,
                    size_inventory:
                      product.size_inventory,
                  }}
                />
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}