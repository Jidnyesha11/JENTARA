// lib/supabase/admin-categories.ts

import { supabase } from "./client";

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string | null;
}

function normalizeCategoryName(
  name: string,
): string {
  return name.trim();
}

function normalizeCategorySlug(
  slug: string,
): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getErrorMessage(
  error: unknown,
): string {
  if (
    error &&
    typeof error === "object"
  ) {
    const value =
      error as Record<string, unknown>;

    if (
      typeof value.message === "string"
    ) {
      return value.message;
    }
  }

  return "An unexpected database error occurred.";
}

function logError(
  operation: string,
  error: unknown,
): void {
  const details =
    error &&
    typeof error === "object"
      ? error as Record<string, unknown>
      : {};

  console.error(
    `${operation} failed`,
    {
      message: details.message,
      details: details.details,
      hint: details.hint,
      code: details.code,
    },
  );
}

export async function getAdminCategories(): Promise<
  AdminCategory[]
> {
  const { data, error } =
    await supabase
      .from("categories")
      .select(
        "id, name, slug, created_at",
      )
      .order("name", {
        ascending: true,
      });

  if (error) {
    logError(
      "Loading categories",
      error,
    );

    throw new Error(
      getErrorMessage(error),
    );
  }

  return (data ??
    []) as AdminCategory[];
}

export async function createAdminCategory(
  name: string,
  slug: string,
): Promise<AdminCategory> {
  const cleanName =
    normalizeCategoryName(name);

  const cleanSlug =
    normalizeCategorySlug(slug);

  if (!cleanName) {
    throw new Error(
      "Category name is required.",
    );
  }

  if (!cleanSlug) {
    throw new Error(
      "Category slug is required.",
    );
  }

  const { data: existingName } =
    await supabase
      .from("categories")
      .select("id")
      .ilike("name", cleanName)
      .limit(1);

  if (existingName?.length) {
    throw new Error(
      "A category with this name already exists.",
    );
  }

  const { data: existingSlug } =
    await supabase
      .from("categories")
      .select("id")
      .eq("slug", cleanSlug)
      .limit(1);

  if (existingSlug?.length) {
    throw new Error(
      "A category with this slug already exists.",
    );
  }

  const { data, error } =
    await supabase
      .from("categories")
      .insert({
        name: cleanName,
        slug: cleanSlug,
      })
      .select(
        "id, name, slug, created_at",
      )
      .single();

  if (error) {
    logError(
      "Creating category",
      error,
    );

    throw new Error(
      getErrorMessage(error),
    );
  }

  return data as AdminCategory;
}

export async function updateAdminCategory(
  id: string,
  name: string,
  slug: string,
): Promise<AdminCategory> {
  const cleanName =
    normalizeCategoryName(name);

  const cleanSlug =
    normalizeCategorySlug(slug);

  if (!id) {
    throw new Error(
      "Category ID is required.",
    );
  }

  if (!cleanName) {
    throw new Error(
      "Category name is required.",
    );
  }

  if (!cleanSlug) {
    throw new Error(
      "Category slug is required.",
    );
  }

  const { data: existingName } =
    await supabase
      .from("categories")
      .select("id")
      .ilike("name", cleanName)
      .neq("id", id)
      .limit(1);

  if (existingName?.length) {
    throw new Error(
      "Another category already uses this name.",
    );
  }

  const { data: existingSlug } =
    await supabase
      .from("categories")
      .select("id")
      .eq("slug", cleanSlug)
      .neq("id", id)
      .limit(1);

  if (existingSlug?.length) {
    throw new Error(
      "Another category already uses this slug.",
    );
  }

  const { data, error } =
    await supabase
      .from("categories")
      .update({
        name: cleanName,
        slug: cleanSlug,
      })
      .eq("id", id)
      .select(
        "id, name, slug, created_at",
      )
      .single();

  if (error) {
    logError(
      "Updating category",
      error,
    );

    throw new Error(
      getErrorMessage(error),
    );
  }

  return data as AdminCategory;
}

export async function deleteAdminCategory(
  id: string,
): Promise<void> {
  if (!id) {
    throw new Error(
      "Category ID is required.",
    );
  }

  const { count, error: productError } =
    await supabase
      .from("products")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("category_id", id);

  if (productError) {
    logError(
      "Checking category products",
      productError,
    );

    throw new Error(
      getErrorMessage(productError),
    );
  }

  if ((count ?? 0) > 0) {
    throw new Error(
      `This category is used by ${count} ${
        count === 1
          ? "product"
          : "products"
      }. Reassign the products before deleting the category.`,
    );
  }

  const { error } =
    await supabase
      .from("categories")
      .delete()
      .eq("id", id);

  if (error) {
    logError(
      "Deleting category",
      error,
    );

    throw new Error(
      getErrorMessage(error),
    );
  }
}