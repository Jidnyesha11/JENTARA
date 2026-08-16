// components/products/SearchBar.tsx

"use client";

import { Search } from "lucide-react";

import { useSearchStore } from "@/store/searchStore";

export default function SearchBar() {
  const search =
    useSearchStore(
      (state) => state.search
    );

  const setSearch =
    useSearchStore(
      (state) => state.setSearch
    );

  return (
    <div className="relative">
      <Search
        size={17}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[#451713]/50
        "
      />

      <input
        type="search"
        value={search}
        onChange={(event) =>
          setSearch(
            event.target.value
          )
        }
        placeholder="Search products, collections..."
        aria-label="Search products"
        className="
          w-full
          rounded-xl
          border
          border-[#451713]/15
          bg-[#faf5ef]
          py-3
          pl-11
          pr-4
          text-sm
          text-[#151a2a]
          outline-none
          placeholder:text-[#151a2a]/40
          transition
          focus:border-[#451713]
        "
      />
    </div>
  );
}