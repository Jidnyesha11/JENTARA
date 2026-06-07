"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/supabase/products";
import SearchBar from "@/components/products/SearchBar";
import { useSearchStore } from "@/store/searchStore";
import CategoryFilter from "@/components/products/CategoryFilter";
import { useCategoryStore } from "@/store/categoryStore";
import SortFilter from "@/components/products/SortFilter";
import { useSortStore } from "@/store/sortStore";
import ProductCard from "@/components/products/ProductCard";

type Product = Awaited<ReturnType<typeof getProducts>> extends Array<infer T> ? T : never;

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const search = useSearchStore((state) => state.search);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const sortBy = useSortStore((state) => state.sortBy);

  useEffect(() => {
    let mounted = true;

    getProducts().then((data) => {
      if (mounted) setProducts(data);
    });

    return () => {
      mounted = false;
    };
  }, []);

 const filteredProducts =
  products.filter((product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
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
  });

const sortedProducts = [
  ...filteredProducts,
];

if (sortBy === "low-high") {
  sortedProducts.sort(
    (a, b) =>
      Number(a.price) -
      Number(b.price)
  );
}

if (sortBy === "high-low") {
  sortedProducts.sort(
    (a, b) =>
      Number(b.price) -
      Number(a.price)
  );
}

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-12">Shop</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
         <SearchBar />

         <CategoryFilter />
         <SortFilter />
      </div>

      {sortedProducts.length === 0 ? (
        <p className="text-center text-neutral-500 py-20">
          No products found.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}