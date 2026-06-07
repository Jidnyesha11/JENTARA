"use client";

import { useEffect, useState } from "react";

import { getCategories } from "@/lib/supabase/categories";
import { useCategoryStore } from "@/store/categoryStore";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoryFilter() {
  const [categories, setCategories] =
    useState<Category[]>([]);

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
    getCategories().then(
      (data) =>
        setCategories(
          data as Category[]
        )
    );
  }, []);

  return (
    <select
      value={selectedCategory}
      onChange={(e) =>
        setSelectedCategory(
          e.target.value
        )
      }
      className="
        border
        rounded-xl
        px-4
        py-3
        w-full
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