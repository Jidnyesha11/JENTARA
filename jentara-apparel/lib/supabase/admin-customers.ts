import { supabase } from "./client";

export async function getAllCustomers() {
  const { data, error } =
    await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data;
}