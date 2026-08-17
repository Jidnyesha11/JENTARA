// components/products/SearchBar.tsx

"use client";

import { Search, X } from "lucide-react";

import { useSearchStore } from "@/store/searchStore";

export default function SearchBar() {
  const search = useSearchStore(
    (state) => state.search
  );

  const setSearch = useSearchStore(
    (state) => state.setSearch
  );

  return (
    <div className="relative">
      <Search
        size={14}
        strokeWidth={1.5}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          text-[#451713]/55
        "
      />

      <input
        type="search"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Search the collection"
        aria-label="Search products"
        className="
          h-[42px]
          w-full
          border-b
          border-[#451713]/20
          bg-transparent
          py-2
          pl-7
          pr-7
          text-[9px]
          uppercase
          tracking-[0.08em]
          text-[#451713]
          outline-none
          placeholder:text-[#451713]/35
          transition-colors
          focus:border-[#451713]
        "
      />

      {search && (
        <button
          type="button"
          onClick={() =>
            setSearch("")
          }
          aria-label="Clear search"
          className="
            absolute
            right-0
            top-1/2
            flex
            h-7
            w-7
            -translate-y-1/2
            items-center
            justify-center
            text-[#451713]/55
            transition-colors
            hover:text-[#451713]
          "
        >
          <X
            size={13}
            strokeWidth={1.5}
          />
        </button>
      )}
    </div>
  );
}