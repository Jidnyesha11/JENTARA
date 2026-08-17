// components/products/CategoryFilter.tsx

"use client";

import { ChevronDown } from "lucide-react";

import type { Category } from "@/lib/supabase/categories";
import { useCategoryStore } from "@/store/categoryStore";

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({
  categories,
}: CategoryFilterProps) {
  const selectedCategory = useCategoryStore(
    (state) => state.selectedCategory
  );

  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  return (
    <div className="relative">
      <select
        value={selectedCategory}
        onChange={(event) => {
          setSelectedCategory(event.target.value);
        }}
        aria-label="Filter products by category"
        className="
          h-[42px]
          w-full
          appearance-none
          border-b
          border-[#451713]/20
          bg-transparent
          px-0
          pr-7
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-[#451713]
          outline-none
          transition-colors
          focus:border-[#451713]
        "
      >
        <option value="all">
          All Categories
        </option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <ChevronDown
        size={13}
        strokeWidth={1.5}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          text-[#451713]/55
        "
      />
    </div>
  );
}