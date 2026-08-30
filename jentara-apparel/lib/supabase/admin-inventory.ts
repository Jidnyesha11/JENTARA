// lib/supabase/admin-inventory.ts
import { supabase } from "./client";

export interface InventoryProduct {
  id: string;
  name: string;
  image_url: string | null;
  stock: number | null;
  size_inventory: Record<string, number> | null;
}

export async function getInventory() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, image_url, stock, size_inventory")
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as InventoryProduct[];
}

export async function updateInventory(
  productId: string,
  sizeInventory: Record<string, number>,
) {
  const stock = Object.values(sizeInventory).reduce(
    (total, value) => total + Math.max(0, Number(value) || 0),
    0,
  );

  const { data, error } = await supabase
    .from("products")
    .update({
      size_inventory: sizeInventory,
      stock,
      sizes: Object.entries(sizeInventory)
        .filter(([, quantity]) => quantity > 0)
        .map(([size]) => size)
        .join(","),
    })
    .eq("id", productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
