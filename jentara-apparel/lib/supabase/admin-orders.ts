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

export interface AdminOrder {
  id: string;
  user_id: string | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  total_amount: number;
  status: string | null;
  created_at: string;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
}

export interface AdminOrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string | null;
  price: number;
  quantity: number;
  size: string | null;
}

export interface AdminOrderDetails {
  order: AdminOrder;
  items: AdminOrderItem[];
}

export async function getAllOrders(): Promise<AdminOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_name, customer_email, customer_phone, total_amount, status, created_at, address_line_1, address_line_2, city, state, pincode",
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as AdminOrder[];
}

export async function getAdminOrder(
  id: string,
): Promise<AdminOrderDetails | null> {
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

  return {
    order: order as AdminOrder,
    items: (items ?? []) as AdminOrderItem[],
  };
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
) : Promise<AdminOrder> {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;
  return data as AdminOrder;
}
