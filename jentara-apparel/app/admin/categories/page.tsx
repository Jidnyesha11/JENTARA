// app/admin/categories/page.tsx

"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  createAdminCategory,
  deleteAdminCategory,
  getAdminCategories,
  updateAdminCategory,
  type AdminCategory,
} from "@/lib/supabase/admin-categories";

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<AdminCategory[]>([]);

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadInitialCategories() {
      try {
        const data =
          await getAdminCategories();

        if (cancelled) {
          return;
        }

        setCategories(data);
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Loading categories failed:",
          loadError,
        );

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Categories could not be loaded.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInitialCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  async function refreshCategories() {
    const data =
      await getAdminCategories();

    setCategories(data);
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setSlug("");
  }

  function startEdit(
    category: AdminCategory,
  ) {
    setEditingId(category.id);
    setName(category.name);
    setSlug(category.slug);
    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanName = name.trim();
    const cleanSlug = slugify(
      slug || name,
    );

    if (!cleanName) {
      setError(
        "Category name is required.",
      );
      return;
    }

    if (!cleanSlug) {
      setError(
        "Please enter a valid category name or slug.",
      );
      return;
    }

    setSaving(true);

    try {
      if (editingId) {
        await updateAdminCategory(
          editingId,
          cleanName,
          cleanSlug,
        );

        setSuccess(
          "Category updated successfully.",
        );
      } else {
        await createAdminCategory(
          cleanName,
          cleanSlug,
        );

        setSuccess(
          "Category created successfully.",
        );
      }

      resetForm();
      await refreshCategories();
    } catch (saveError) {
      console.error(
        "Saving category failed:",
        saveError,
      );

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Category could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(
    category: AdminCategory,
  ) {
    const confirmed =
      window.confirm(
        `Delete "${category.name}"?\n\nOnly categories with no products can be deleted.`,
      );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");
    setDeletingId(category.id);

    try {
      await deleteAdminCategory(
        category.id,
      );

      if (
        editingId === category.id
      ) {
        resetForm();
      }

      setSuccess(
        `"${category.name}" was deleted.`,
      );

      await refreshCategories();
    } catch (deleteError) {
      console.error(
        "Deleting category failed:",
        deleteError,
      );

      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Category could not be deleted.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / COMMERCE
            </p>
          </div>

          <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
            Categories
          </h1>

          <p className="mt-4 max-w-xl text-[12px] leading-6 text-[#451713]/50">
            Organise the collection and storefront
            taxonomy.
          </p>
        </header>

        {(error || success) && (
          <div
            className={`border-b px-1 py-4 text-[10px] leading-5 ${
              error
                ? "border-[#7b2924]/20 text-[#7b2924]"
                : "border-[#314b35]/20 text-[#314b35]"
            }`}
          >
            {error || success}
          </div>
        )}

        <section className="grid gap-10 py-10 lg:grid-cols-[0.75fr_1.25fr]">
          <form
            onSubmit={handleSubmit}
            className="border border-[#451713]/12 p-6 sm:p-8"
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
              {editingId
                ? "Edit category"
                : "New category"}
            </p>

            <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em]">
              {editingId
                ? "Refine the collection."
                : "Add to the collection."}
            </h2>

            <label className="mt-8 block text-[8px] font-semibold uppercase tracking-[0.18em]">
              Name

              <input
                value={name}
                onChange={(event) => {
                  const value =
                    event.target.value;

                  setName(value);

                  if (!editingId) {
                    setSlug(
                      slugify(value),
                    );
                  }
                }}
                className="mt-2 w-full border-b border-[#451713]/25 bg-transparent py-3 text-[12px] outline-none transition focus:border-[#451713]"
                placeholder="Oversized Tees"
                disabled={saving}
              />
            </label>

            <label className="mt-7 block text-[8px] font-semibold uppercase tracking-[0.18em]">
              Slug

              <input
                value={slug}
                onChange={(event) =>
                  setSlug(
                    slugify(
                      event.target.value,
                    ),
                  )
                }
                className="mt-2 w-full border-b border-[#451713]/25 bg-transparent py-3 text-[12px] outline-none transition focus:border-[#451713]"
                placeholder="oversized-tees"
                disabled={saving}
              />
            </label>

            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={saving}
                className="min-h-11 bg-[#451713] px-6 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#f5ede4] transition hover:bg-[#5c211b] disabled:cursor-wait disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save changes"
                    : "Create category"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="min-h-11 border border-[#451713]/20 px-5 text-[9px] font-semibold uppercase tracking-[0.17em] transition hover:bg-[#451713]/5 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <section className="border border-[#451713]/12">
            <div className="border-b border-[#451713]/10 p-6 sm:p-8">
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
                Collection taxonomy
              </p>

              <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em]">
                {categories.length}{" "}
                {categories.length === 1
                  ? "category"
                  : "categories"}
              </h2>
            </div>

            {loading ? (
              <div className="p-10 text-[9px] uppercase tracking-[0.18em] text-[#451713]/40">
                Loading collection
              </div>
            ) : categories.length ===
              0 ? (
              <div className="p-10 text-center">
                <p className="font-serif text-2xl">
                  No categories yet.
                </p>

                <p className="mt-3 text-[11px] text-[#451713]/45">
                  Create your first collection
                  category.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#451713]/10">
                {categories.map(
                  (category) => (
                    <div
                      key={category.id}
                      className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-serif text-xl tracking-[-0.03em]">
                          {category.name}
                        </p>

                        <p className="mt-1 break-all text-[9px] uppercase tracking-[0.14em] text-[#451713]/40">
                          /{category.slug}
                        </p>
                      </div>

                      <div className="flex shrink-0 gap-5">
                        <button
                          type="button"
                          onClick={() =>
                            startEdit(
                              category,
                            )
                          }
                          disabled={
                            deletingId ===
                            category.id
                          }
                          className="text-[9px] font-semibold uppercase tracking-[0.15em] underline underline-offset-4 transition hover:opacity-50 disabled:opacity-30"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            void handleDelete(
                              category,
                            )
                          }
                          disabled={
                            deletingId ===
                            category.id
                          }
                          className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#7b2924] underline underline-offset-4 transition hover:opacity-50 disabled:cursor-wait disabled:opacity-30"
                        >
                          {deletingId ===
                          category.id
                            ? "Checking..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}