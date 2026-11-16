import { supabase } from "./client";

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category_id: string | null;
  image_url: string | null;
  sizes: string | null;
  size_inventory: Record<string, number> | null;
  stock: number | null;
  featured: boolean | null;
  created_at: string | null;
}

export async function getAllProducts(): Promise<AdminProduct[]> {
  const { data, error } =
    await supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return (data ?? []) as AdminProduct[];
}

export async function createProduct(
  product: {
    name: string;
    description: string;
    price: number;
    original_price: number;
    category_id: string;
    image_url: string;
    sizes: string;
    size_inventory: Record<string, number>;
    stock: number;
    slug: string;
    featured: boolean;
  }
) {
  const { data, error } =
    await supabase
      .from("products")
      .insert(product)
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data as AdminProduct;
}

export async function getProductById(
  id: string,
): Promise<AdminProduct> {
  const { data, error } =
    await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    throw error;
  }

  return data as AdminProduct;
}

export async function updateProduct(
  id: string,
  product: Record<string, unknown>
) {
  const { error } =
    await supabase
      .from("products")
      .update(product)
      .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteProduct(
  id: string
) {
  const { error } =
    await supabase
      .from("products")
      .delete()
      .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function exportProducts() {
  const { data, error } =
    await supabase
      .from("products")
      .select("*");

  if (error) {
    throw error;
  }

  return data;
}
