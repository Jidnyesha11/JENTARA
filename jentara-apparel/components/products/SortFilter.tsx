// components/products/SortFilter.tsx

"use client";

import { useSortStore } from "@/store/sortStore";

export default function SortFilter() {
  const sortBy = useSortStore(
    (state) => state.sortBy
  );

  const setSortBy =
    useSortStore(
      (state) => state.setSortBy
    );

  return (
    <select
      value={sortBy}
      onChange={(event) =>
        setSortBy(
          event.target.value
        )
      }
      aria-label="Sort products"
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
  );
}