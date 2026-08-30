
import { supabase } from "./client";

export interface Category {
  id: string;
  name: string;
  created_at: string | null;
  slug: string | null;
}

export interface CategoryProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category_id: string | null;
  image_url: string | null;
  sizes: string | null;
  stock: number | null;
  created_at: string | null;
  slug: string | null;
  featured: boolean | null;
  size_inventory: Record<
    string,
    number
  > | null;
}

export async function getCategories(): Promise<
  Category[]
> {
  const { data, error } =
    await supabase
      .from("categories")
      .select("*")
      .order("name", {
        ascending: true,
      });

  if (error) {
    console.error(
      "GET CATEGORIES ERROR:",
      error,
    );

    throw error;
  }

  return (data ??
    []) as Category[];
}

export function notifyCategoriesUpdated(): void {
  if (
    typeof window !==
    "undefined"
  ) {
    window.dispatchEvent(
      new CustomEvent(
        "jentara:categories-updated",
      ),
    );
  }
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const { data, error } =
    await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

  if (error) {
    console.error(
      "GET CATEGORY BY SLUG ERROR:",
      error,
    );

    throw error;
  }

  return data as Category | null;
}

export async function getProductsByCategorySlug(
  slug: string,
): Promise<CategoryProduct[]> {
  const category =
    await getCategoryBySlug(slug);

  if (!category) {
    return [];
  }

  const { data, error } =
    await supabase
      .from("products")
      .select("*")
      .eq("category_id", category.id)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(
      "GET CATEGORY PRODUCTS ERROR:",
      error,
    );

    throw error;
  }

  return (data ??
    []) as CategoryProduct[];
}

