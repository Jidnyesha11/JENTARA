// app/search/page.tsx

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import SearchBar from "@/components/products/SearchBar";
import { useSearchStore } from "@/store/searchStore";

export default function SearchPage() {
  const router = useRouter();
  const search = useSearchStore((state) => state.search);
  const setSearch = useSearchStore((state) => state.setSearch);
  const [query, setQuery] = useState(search);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = query.trim();
    setSearch(value);
    router.push("/shop");
  }

  return (
    <main className="min-h-[70vh] bg-[#f5ede4] text-[#451713]">
      <section className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
            JENTARA / SEARCH
          </p>
        </div>

        <h1 className="mt-7 font-serif text-[56px] leading-[0.86] tracking-[-0.07em] sm:text-[82px]">
          Find your piece.
        </h1>

        <p className="mt-5 max-w-[520px] text-[12px] leading-6 text-[#451713]/55">
          Search JENTARA by product name, collection or category.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 border-y border-[#451713]/15 py-8">
          <SearchBar />

          <button
            type="submit"
            className="mt-7 inline-flex min-h-12 items-center gap-6 bg-[#451713] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition hover:bg-[#5c211b]"
          >
            Search collection
            <span>→</span>
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setQuery("");
            setSearch("");
          }}
          className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713]/45 underline underline-offset-4 transition hover:text-[#451713]"
        >
          Clear search
        </button>
      </section>
    </main>
  );
}
