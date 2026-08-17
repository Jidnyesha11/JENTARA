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
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const search = useSearchStore(
    (state) => state.search
  );

  const selectedCategory = useCategoryStore(
    (state) => state.selectedCategory
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
        setCategories(categoriesData ?? []);
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
      categories.map((category) => [
        category.id,
        category,
      ])
    );
  }, [categories]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return products.filter((product) => {
      const category = product.category_id
        ? categoryMap.get(product.category_id)
        : null;

      const categoryName =
        category?.name?.toLowerCase() ?? "";

      const categorySlug =
        category?.slug?.toLowerCase() ?? "";

      const productName =
        product.name?.toLowerCase() ?? "";

      const productSlug =
        product.slug?.toLowerCase() ?? "";

      const matchesSearch =
        normalizedSearch === "" ||
        productName.includes(normalizedSearch) ||
        productSlug.includes(normalizedSearch) ||
        categoryName.includes(normalizedSearch) ||
        categorySlug.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "all" ||
        product.category_id === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    products,
    categoryMap,
    search,
    selectedCategory,
  ]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    if (sortBy === "low-high") {
      sorted.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sortBy === "high-low") {
      sorted.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    if (sortBy === "featured") {
      sorted.sort((a, b) => {
        const featuredA = a.featured ? 1 : 0;
        const featuredB = b.featured ? 1 : 0;

        return featuredB - featuredA;
      });
    }

    if (sortBy === "newest") {
      sorted.sort((a, b) => {
        const dateA = new Date(
          a.created_at ?? 0
        ).getTime();

        const dateB = new Date(
          b.created_at ?? 0
        ).getTime();

        return dateB - dateA;
      });
    }

    return sorted;
  }, [filteredProducts, sortBy]);

  function clearFilters() {
    useSearchStore
      .getState()
      .setSearch("");

    useCategoryStore
      .getState()
      .setSelectedCategory("all");

    useSortStore
      .getState()
      .setSortBy("newest");
  }

  const hasFilters =
    search.trim() !== "" ||
    selectedCategory !== "all";

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      {/* =====================================================
          SHOP INTRO
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pb-14 lg:pt-20">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />

          <p className="text-[8px] font-semibold uppercase tracking-[0.35em] text-[#451713]/65">
            JENTARA / COLLECTION
          </p>
        </div>

        <div className="mt-7 grid gap-8 border-b border-[#451713]/15 pb-10 md:grid-cols-[1fr_350px] md:items-end lg:pb-12">
          <div>
            <h1
              className="
                font-serif
                text-[70px]
                leading-[0.76]
                tracking-[-0.08em]
                sm:text-[100px]
                md:text-[125px]
                lg:text-[145px]
              "
            >
              SHOP
            </h1>
          </div>

          <p className="max-w-[350px] text-[10px] leading-6 tracking-[0.08em] text-[#451713]/55 md:pb-2 md:text-right">
            Explore the latest JENTARA
            pieces, drops and everyday
            essentials. Designed for a
            generation that refuses to
            dress like everyone else.
          </p>
        </div>
      </section>

      {/* =====================================================
          FILTER BAR
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="border-y border-[#451713]/15">
          <div className="flex min-h-[58px] items-center justify-between gap-4">
            <p className="hidden text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50 sm:block">
              {loading
                ? "Loading collection"
                : `${sortedProducts.length} ${
                    sortedProducts.length === 1
                      ? "Piece"
                      : "Pieces"
                  }`}
            </p>

            <div className="flex flex-1 items-center justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setFiltersOpen(true)
                }
                className="
                  flex
                  items-center
                  gap-3
                  px-1
                  py-3
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#451713]
                  md:hidden
                "
              >
                Filters

                <span className="text-sm">
                  +
                </span>
              </button>

              <div className="hidden w-[260px] md:block">
                <SearchBar />
              </div>

              <div className="hidden w-[190px] md:block">
                <CategoryFilter
                  categories={categories}
                />
              </div>

              <div className="hidden w-[180px] md:block">
                <SortFilter />
              </div>

              <div className="md:hidden">
                <SortFilter />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}

        <div className="py-4 md:hidden">
          <SearchBar />
        </div>

        {/* Active Search */}

        {search && (
          <div className="flex items-center justify-between border-b border-[#451713]/10 py-4">
            <p className="text-[8px] uppercase tracking-[0.15em] text-[#451713]/45">
              Search results for{" "}
              <span className="font-semibold text-[#451713]">
                “{search}”
              </span>
            </p>

            <button
              type="button"
              onClick={() =>
                useSearchStore
                  .getState()
                  .setSearch("")
              }
              className="text-[8px] font-semibold uppercase tracking-[0.15em] underline underline-offset-4"
            >
              Clear
            </button>
          </div>
        )}
      </section>

      {/* =====================================================
          PRODUCT COLLECTION
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-24 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pb-32">
        {loading ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="animate-pulse"
                >
                  <div className="aspect-[0.78] bg-[#451713]/10" />

                  <div className="mt-5 h-4 w-2/3 bg-[#451713]/10" />

                  <div className="mt-3 h-3 w-1/3 bg-[#451713]/10" />
                </div>
              )
            )}
          </div>
        ) : error ? (
          <div className="border-y border-[#451713]/15 py-24 text-center">
            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/50">
              Collection unavailable
            </p>

            <h2 className="mt-5 font-serif text-4xl tracking-[-0.05em]">
              Something went wrong
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#451713]/55">
              We could not load the collection
              right now. Please refresh and try
              again.
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="
                mt-8
                border
                border-[#451713]
                px-6
                py-3
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.2em]
                transition-colors
                hover:bg-[#451713]
                hover:text-[#f5ede4]
              "
            >
              Try Again
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="border-y border-[#451713]/15 py-24 text-center">
            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/50">
              No Matches
            </p>

            <h2 className="mt-5 font-serif text-5xl tracking-[-0.06em]">
              Nothing Found
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#451713]/55">
              Try another search term or remove
              one of your filters.
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  mt-8
                  border
                  border-[#451713]
                  px-6
                  py-3
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  transition-colors
                  hover:bg-[#451713]
                  hover:text-[#f5ede4]
                "
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between md:hidden">
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/50">
                {sortedProducts.length}{" "}
                {sortedProducts.length === 1
                  ? "Piece"
                  : "Pieces"}
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[8px] font-semibold uppercase tracking-[0.15em] underline underline-offset-4"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-3">
              {sortedProducts.map(
                (product, index) => (
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
                      original_price:
                        product.original_price
                          ? Number(
                              product.original_price
                            )
                          : null,
                      image_url:
                        product.image_url ??
                        "",
                      stock:
                        product.stock,
                      size_inventory:
                        product.size_inventory,
                    }}
                    index={index}
                  />
                )
              )}
            </div>
          </>
        )}
      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

      {filtersOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Shop filters"
        >
          <button
            type="button"
            aria-label="Close filters"
            onClick={() =>
              setFiltersOpen(false)
            }
            className="absolute inset-0 bg-[#451713]/35 backdrop-blur-[2px]"
          />

          <aside
            className="
              absolute
              bottom-0
              left-0
              right-0
              max-h-[85vh]
              overflow-y-auto
              bg-[#f5ede4]
              px-5
              pb-8
              pt-5
              shadow-2xl
            "
          >
            <div className="mx-auto max-w-md">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/50">
                    JENTARA
                  </p>

                  <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">
                    Filters
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFiltersOpen(false)
                  }
                  aria-label="Close filters"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    border
                    border-[#451713]/20
                    text-lg
                  "
                >
                  ×
                </button>
              </div>

              <div className="space-y-7">
                <div>
                  <p className="mb-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/50">
                    Search
                  </p>

                  <SearchBar />
                </div>

                <div>
                  <p className="mb-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/50">
                    Category
                  </p>

                  <CategoryFilter
                    categories={categories}
                  />
                </div>

                <div>
                  <p className="mb-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/50">
                    Sort
                  </p>

                  <SortFilter />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    border
                    border-[#451713]/25
                    px-4
                    py-4
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                  "
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFiltersOpen(false)
                  }
                  className="
                    bg-[#451713]
                    px-4
                    py-4
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#f5ede4]
                  "
                >
                  Show{" "}
                  {sortedProducts.length}{" "}
                  Products
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}