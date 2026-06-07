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
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
        "
      />

      <input
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        placeholder="Search products..."
        className="
          border
          rounded-xl
          pl-12
          pr-4
          py-3
          w-full
        "
      />
    </div>
  );
}