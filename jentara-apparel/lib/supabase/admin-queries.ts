// lib/supabase/admin-queries.ts
import { supabase } from "./client";

export type QueryStatus = "new" | "open" | "in_progress" | "resolved";

export interface CustomerQuery {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: QueryStatus;
  created_at: string;
}

export async function getAdminQueries() {
  const { data, error } = await supabase
    .from("customer_queries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CustomerQuery[];
}

export async function updateQueryStatus(
  id: string,
  status: QueryStatus,
) {
  const { data, error } = await supabase
    .from("customer_queries")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as CustomerQuery;
}
