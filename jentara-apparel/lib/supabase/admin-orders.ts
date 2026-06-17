import { supabase } from "./client";

export async function getAllOrders() {
  const { data, error } =
    await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data;
}

export async function updateOrderStatus(
  orderId: string,
  status: string
) {
  console.log(
    "UPDATING:",
    orderId,
    status
  );

  const { data, error } =
    await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", orderId)
      .select();

  console.log(
    "UPDATE DATA:",
    data
  );

  console.log(
    "UPDATE ERROR:",
    error
  );

  if (error) {
    throw error;
  }
}