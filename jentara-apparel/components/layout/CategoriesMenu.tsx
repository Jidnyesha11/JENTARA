// components/layout/CategoriesMenu.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getCategories,
  type Category,
} from "@/lib/supabase/categories";

export default function CategoriesMenu() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      try {
        const data =
          await getCategories();

        if (mounted) {
          setCategories(data);
        }
      } catch (error) {
        console.error(
          "NAVBAR CATEGORIES ERROR:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className="relative"
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
          setOpen((value) => !value)
        }
        aria-expanded={open}
        className="
          flex
          items-center
          gap-2
          text-[11px]
          font-medium
          uppercase
          tracking-[0.04em]
          text-[#151a2a]
          transition
          hover:opacity-60
        "
      >
        Categories

        <span
          className={`
            text-[10px]
            transition-transform
            duration-300
            ${
              open
                ? "rotate-180"
                : ""
            }
          `}
        >
          ↓
        </span>
      </button>

      <div
        className={`
          absolute
          left-1/2
          top-full
          z-50
          w-[280px]
          -translate-x-1/2
          pt-5
          transition-all
          duration-200
          ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }
        `}
      >
        <div
          className="
            border
            border-[#451713]/10
            bg-[#faf7f3]
            p-5
            shadow-[0_20px_60px_rgba(69,23,19,0.12)]
          "
        >
          <div className="mb-4 border-b border-[#451713]/10 pb-4">
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#451713]/50
              "
            >
              JENTARA COLLECTIONS
            </p>
          </div>

          {loading ? (
            <div className="space-y-3">
              <div className="h-3 w-32 animate-pulse bg-[#451713]/10" />
              <div className="h-3 w-40 animate-pulse bg-[#451713]/10" />
              <div className="h-3 w-28 animate-pulse bg-[#451713]/10" />
            </div>
          ) : categories.length === 0 ? (
            <p
              className="
                py-4
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-[#451713]/50
              "
            >
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
                      key={
                        category.id
                      }
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
                        <span
                          className="
                            text-[8px]
                            text-[#451713]/30
                            group-hover:text-[#faf7f3]/50
                          "
                        >
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span
                          className="
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.08em]
                          "
                        >
                          {
                            category.name
                          }
                        </span>
                      </div>

                      <span
                        className="
                          text-[11px]
                          opacity-0
                          transition
                          group-hover:translate-x-1
                          group-hover:opacity-100
                        "
                      >
                        →
                      </span>
                    </Link>
                  );
                }
              )}
            </div>
          )}

          <div className="mt-4 border-t border-[#451713]/10 pt-4">
            <Link
              href="/categories"
              onClick={() =>
                setOpen(false)
              }
              className="
                flex
                items-center
                justify-between
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#451713]
                transition
                hover:opacity-60
              "
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