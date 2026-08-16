// components/products/CategoryFilter.tsx

"use client";

import { useEffect, useState } from "react";

import {
  getCategories,
  type Category,
} from "@/lib/supabase/categories";

import { useCategoryStore } from "@/store/categoryStore";

export default function CategoryFilter() {
  const [
    categories,
    setCategories,
  ] = useState<Category[]>([]);

  const selectedCategory =
    useCategoryStore(
      (state) =>
        state.selectedCategory
    );

  const setSelectedCategory =
    useCategoryStore(
      (state) =>
        state.setSelectedCategory
    );

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      try {
        const data =
          await getCategories();

        if (mounted) {
          setCategories(data);
        }
      } catch (error) {
        console.error(
          "CATEGORY FILTER ERROR:",
          error
        );
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <select
      value={selectedCategory}
      onChange={(event) =>
        setSelectedCategory(
          event.target.value
        )
      }
      aria-label="Filter by category"
      className="
        w-full
        rounded-xl
        border
        border-[#451713]/15
        bg-[#faf5ef]
        px-4
        py-3
        text-sm
        text-[#151a2a]
        outline-none
        transition
        focus:border-[#451713]
      "
    >
      <option value="all">
        All Categories
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
  );
}