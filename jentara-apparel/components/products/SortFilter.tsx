// components/products/SortFilter.tsx

"use client";

import {
  ChevronDown,
} from "lucide-react";

import {
  useSortStore,
} from "@/store/sortStore";

export default function SortFilter() {
  const sortBy = useSortStore(
    (state) => state.sortBy
  );

  const setSortBy = useSortStore(
    (state) => state.setSortBy
  );

  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(event) =>
          setSortBy(
            event.target.value
          )
        }
        aria-label="Sort products"
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
        <option value="newest">
          Newest
        </option>

        <option value="featured">
          Featured
        </option>

        <option value="low-high">
          Price Low → High
        </option>

        <option value="high-low">
          Price High → Low
        </option>
      </select>

      <ChevronDown
        size={13}
        strokeWidth={1.5}
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