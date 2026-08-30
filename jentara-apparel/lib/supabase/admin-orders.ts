// lib/supabase/admin-orders.ts
import { supabase } from "./client";

export const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export async function getAllOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_name, customer_email, customer_phone, total_amount, status, created_at, address_line_1, address_line_2, city, state, pincode",
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getAdminOrder(id: string) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_name, customer_email, customer_phone, total_amount, status, created_at, address_line_1, address_line_2, city, state, pincode",
    )
    .eq("id", id)
    .maybeSingle();

  if (orderError) throw orderError;
  if (!order) return null;

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("id, order_id, product_id, product_name, price, quantity, size")
    .eq("order_id", id);

  if (itemsError) throw itemsError;

  return { order, items: items ?? [] };
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
