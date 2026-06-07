import { create } from "zustand";

interface SortStore {
  sortBy: string;

  setSortBy: (
    value: string
  ) => void;
}

export const useSortStore =
  create<SortStore>((set) => ({
    sortBy: "newest",

    setSortBy: (value) =>
      set({
        sortBy: value,
      }),
  }));