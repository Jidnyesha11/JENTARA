import { supabase } from "./client";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function getProductBySlug(
  slug: string
) {
  console.log("Searching for slug:", slug);

  const { data, error } = await supabase
    .from("products")
    .select("*");

  console.log("ALL PRODUCTS:", data);
  console.log("ERROR:", error);

  const product = data?.find(
    (p) => p.slug === slug
  );

  console.log("MATCHED PRODUCT:", product);

  return product ?? null;
}