
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getCategories,
  type Category,
} from "@/lib/supabase/categories";

interface CategoriesMenuProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function CategoriesMenu({
  mobile = false,
  onNavigate,
}: CategoriesMenuProps) {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  async function loadCategories(
    showLoading = false,
  ) {
    try {
      if (showLoading) {
        setLoading(true);
      }

      const data =
        await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(
        "NAVBAR CATEGORIES ERROR:",
        error,
      );
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadInitial() {
      try {
        const data =
          await getCategories();

        if (!cancelled) {
          setCategories(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "NAVBAR CATEGORIES ERROR:",
            error,
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInitial();

    function handleCategoryUpdate() {
      void loadCategories();
    }

    function handleVisibilityChange() {
      if (
        document.visibilityState ===
        "visible"
      ) {
        void loadCategories();
      }
    }

    window.addEventListener(
      "jentara:categories-updated",
      handleCategoryUpdate,
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      cancelled = true;

      window.removeEventListener(
        "jentara:categories-updated",
        handleCategoryUpdate,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  function handleNavigate() {
    setOpen(false);
    onNavigate?.();
  }

  const categoryLinks =
    categories.map(
      (category, index) => {
        const slug =
          category.slug ||
          category.id;

        return (
          <Link
            key={category.id}
            href={`/categories/${slug}`}
            onClick={handleNavigate}
            className="
              group
              flex
              min-h-11
              items-center
              justify-between
              border-b
              border-[#451713]/8
              px-3
              transition-colors
              hover:bg-[#451713]
              hover:text-[#faf7f3]
            "
          >
            <span className="flex items-center gap-3">
              <span className="text-[8px] text-[#451713]/30 group-hover:text-[#faf7f3]/50">
                {String(
                  index + 1,
                ).padStart(2, "0")}
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.08em]">
                {category.name}
              </span>
            </span>

            <span className="text-[12px] text-[#451713]/30 transition-transform group-hover:translate-x-1 group-hover:text-[#faf7f3]">
              →
            </span>
          </Link>
        );
      },
    );

  if (mobile) {
    return (
      <div className="md:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-categories"
          onClick={() =>
            setOpen(
              (value) => !value,
            )
          }
          className="
            grid
            min-h-12
            w-full
            grid-cols-3
            items-center
            border-b
            border-[#451713]/10
            px-2
            text-[#451713]
          "
        >
          <span className="justify-self-start text-[10px] text-[#451713]/45">
            03
          </span>

          <span className="justify-self-center text-[10px] font-semibold uppercase tracking-[0.18em]">
            Categories
          </span>

          <span
            className={`justify-self-end flex h-6 w-6 items-center justify-center text-lg transition-transform duration-300 ${
              open
                ? "rotate-45"
                : ""
            }`}
          >
            +
          </span>
        </button>

        <div
          id="mobile-categories"
          className={`overflow-hidden transition-all duration-300 ${
            open
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-b border-[#451713]/10 py-2 pl-7 pr-2">
            {loading ? (
              <div className="space-y-2 py-3">
                <div className="h-10 animate-pulse bg-[#451713]/5" />
                <div className="h-10 animate-pulse bg-[#451713]/5" />
                <div className="h-10 animate-pulse bg-[#451713]/5" />
              </div>
            ) : categories.length ===
              0 ? (
              <p className="py-4 text-[9px] uppercase tracking-[0.15em] text-[#451713]/45">
                No categories available
              </p>
            ) : (
              <div>
                {categoryLinks}

                <Link
                  href="/categories"
                  onClick={handleNavigate}
                  className="
                    flex
                    min-h-12
                    items-center
                    justify-between
                    px-3
                    pt-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#451713]
                    transition-opacity
                    hover:opacity-60
                  "
                >
                  <span>
                    View All Categories
                  </span>

                  <span>→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() =>
        setOpen(true)
      }
      onMouseLeave={() =>
        setOpen(false)
      }
    >
      <button
        type="button"
        onClick={() =>
          setOpen(
            (value) => !value,
          )
        }
        aria-expanded={open}
        className="
          relative
          flex
          items-center
          gap-2
          whitespace-nowrap
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.13em]
          text-[#451713]/55
          transition-all
          duration-300
          hover:text-[#451713]
        "
      >
        Categories

        <span
          className={`text-[10px] transition-transform duration-300 ${
            open
              ? "rotate-180"
              : ""
          }`}
        >
          ↓
        </span>
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 pt-5 transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="border border-[#451713]/10 bg-[#faf7f3] p-5 shadow-[0_20px_60px_rgba(69,23,19,0.12)]">
          <div className="mb-4 border-b border-[#451713]/10 pb-4">
            <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#451713]/50">
              JENTARA COLLECTIONS
            </p>
          </div>

          {loading ? (
            <div className="space-y-3">
              <div className="h-3 w-32 animate-pulse bg-[#451713]/10" />
              <div className="h-3 w-40 animate-pulse bg-[#451713]/10" />
              <div className="h-3 w-28 animate-pulse bg-[#451713]/10" />
            </div>
          ) : categories.length ===
            0 ? (
            <p className="py-4 text-[9px] uppercase tracking-[0.14em] text-[#451713]/50">
              No categories available
            </p>
          ) : (
            <div className="space-y-1">
              {categories.map(
                (category, index) => {
                  const slug =
                    category.slug ||
                    category.id;

                  return (
                    <Link
                      key={category.id}
                      href={`/categories/${slug}`}
                      onClick={() =>
                        setOpen(false)
                      }
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        px-2
                        py-3
                        transition
                        hover:bg-[#451713]
                        hover:text-[#faf7f3]
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] text-[#451713]/30 group-hover:text-[#faf7f3]/50">
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <span className="text-[10px] font-medium uppercase tracking-[0.08em]">
                          {
                            category.name
                          }
                        </span>
                      </div>

                      <span className="text-[11px] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  );
                },
              )}
            </div>
          )}

          <div className="mt-4 border-t border-[#451713]/10 pt-4">
            <Link
              href="/categories"
              onClick={() =>
                setOpen(false)
              }
              className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-[#451713] transition hover:opacity-60"
            >
              <span>
                View All Categories
              </span>

              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

