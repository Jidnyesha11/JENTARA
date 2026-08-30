// lib/supabase/admin-reviews.ts
import { supabase } from "./client";

export interface AdminReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  review: string;
  reviewer_name: string;
  created_at: string;
}

export async function getAdminReviews() {
  const { data, error } = await supabase
    .from("product_reviews")
    .select(
      "id, product_id, user_id, rating, review, reviewer_name, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as AdminReview[];
}

export async function deleteAdminReview(id: string) {
  const { error } = await supabase
    .from("product_reviews")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
