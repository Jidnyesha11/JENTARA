import { supabase } from "./client";

export async function getAnalytics() {
  const [
    ordersResult,
    productsResult,
    customersResult,
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("*"),

    supabase
      .from("products")
      .select("*"),

    supabase
      .from("profiles")
      .select("*"),
  ]);

  if (ordersResult.error) {
    throw ordersResult.error;
  }

  if (productsResult.error) {
    throw productsResult.error;
  }

  if (customersResult.error) {
    throw customersResult.error;
  }

  const totalRevenue =
    ordersResult.data.reduce(
      (sum, order) =>
        sum +
        Number(
          order.total_amount
        ),
      0
    );

  return {
    totalRevenue,

    totalOrders:
      ordersResult.data.length,

    totalProducts:
      productsResult.data.length,

    totalCustomers:
      customersResult.data.length,
  };
}

export async function getRecentOrders() {
  const { data, error } =
    await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

  if (error) {
    throw error;
  }

  return data;
}

export async function getRecentCustomers() {
  const { data, error } =
    await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

  if (error) {
    throw error;
  }

  return data;
}