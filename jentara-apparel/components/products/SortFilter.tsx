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
      onChange={(e) =>
        setSortBy(
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
      <option value="newest">
        Newest
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