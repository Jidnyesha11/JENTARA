// lib/supabase/admin-customers.ts
import { supabase } from "./client";

export async function getAllCustomers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getCustomerOrderSummary() {
  const { data, error } = await supabase
    .from("orders")
    .select("user_id, total_amount");

  if (error) throw error;

  const summary = new Map<string, { orders: number; spent: number }>();

  for (const order of data ?? []) {
    if (!order.user_id) continue;

    const current = summary.get(order.user_id) ?? {
      orders: 0,
      spent: 0,
    };

    summary.set(order.user_id, {
      orders: current.orders + 1,
      spent: current.spent + Number(order.total_amount ?? 0),
    });
  }

  return summary;
}
