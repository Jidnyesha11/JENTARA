// lib/supabase/admin-analytics.ts
import { supabase } from "./client";

export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  monthRevenue: number;
  monthOrders: number;
  averageOrderValue: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface OrderPoint {
  month: string;
  orders: number;
}

export interface TopProduct {
  productName: string;
  quantity: number;
  revenue: number;
}

export interface RecentOrder {
  id: string;
  customer_name: string | null;
  total_amount: number;
  status: string | null;
  created_at: string;
}

export interface RecentCustomer {
  id: string;
  email: string;
  role: string | null;
  created_at: string;
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", { month: "short" }).format(date);
}

function lastMonths(count: number): Date[] {
  const now = new Date();

  return Array.from({ length: count }, (_, index) => {
    const offset = count - 1 - index;
    return new Date(now.getFullYear(), now.getMonth() - offset, 1);
  });
}

export async function getAnalytics(): Promise<Analytics> {
  const [ordersResult, productsResult, customersResult] = await Promise.all([
    supabase.from("orders").select("total_amount, created_at"),
    supabase.from("products").select("id"),
    supabase.from("profiles").select("id"),
  ]);

  if (ordersResult.error) throw ordersResult.error;
  if (productsResult.error) throw productsResult.error;
  if (customersResult.error) throw customersResult.error;

  const orders = ordersResult.data ?? [];
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${now.getMonth()}`;

  let totalRevenue = 0;
  let monthRevenue = 0;
  let monthOrders = 0;

  for (const order of orders) {
    const amount = Number(order.total_amount ?? 0);
    const date = new Date(order.created_at);

    totalRevenue += amount;

    if (`${date.getFullYear()}-${date.getMonth()}` === currentMonth) {
      monthRevenue += amount;
      monthOrders += 1;
    }
  }

  return {
    totalRevenue,
    totalOrders: orders.length,
    totalProducts: productsResult.data?.length ?? 0,
    totalCustomers: customersResult.data?.length ?? 0,
    monthRevenue,
    monthOrders,
    averageOrderValue: orders.length ? totalRevenue / orders.length : 0,
  };
}

export async function getRecentOrders(): Promise<RecentOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("id, customer_name, total_amount, status, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) throw error;
  return (data ?? []) as RecentOrder[];
}

export async function getRecentCustomers(): Promise<RecentCustomer[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) throw error;
  return (data ?? []) as RecentCustomer[];
}

export async function getRevenueByMonth(monthCount = 12): Promise<RevenuePoint[]> {
  const months = lastMonths(monthCount);
  const startDate = months[0];

  const { data, error } = await supabase
    .from("orders")
    .select("total_amount, created_at")
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: true });

  if (error) throw error;

  const totals = new Map(months.map((month) => [monthKey(month), 0]));

  for (const order of data ?? []) {
    const key = monthKey(new Date(order.created_at));

    if (totals.has(key)) {
      totals.set(key, (totals.get(key) ?? 0) + Number(order.total_amount ?? 0));
    }
  }

  return months.map((month) => ({
    month: monthLabel(month),
    revenue: totals.get(monthKey(month)) ?? 0,
  }));
}

export async function getOrdersByMonth(monthCount = 12): Promise<OrderPoint[]> {
  const months = lastMonths(monthCount);
  const startDate = months[0];

  const { data, error } = await supabase
    .from("orders")
    .select("created_at")
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: true });

  if (error) throw error;

  const totals = new Map(months.map((month) => [monthKey(month), 0]));

  for (const order of data ?? []) {
    const key = monthKey(new Date(order.created_at));

    if (totals.has(key)) {
      totals.set(key, (totals.get(key) ?? 0) + 1);
    }
  }

  return months.map((month) => ({
    month: monthLabel(month),
    orders: totals.get(monthKey(month)) ?? 0,
  }));
}

export async function getTopProducts(limit = 5): Promise<TopProduct[]> {
  const { data, error } = await supabase
    .from("order_items")
    .select("product_name, price, quantity");

  if (error) throw error;

  const totals = new Map<string, { quantity: number; revenue: number }>();

  for (const item of data ?? []) {
    const name = String(item.product_name ?? "Unknown product");
    const quantity = Number(item.quantity ?? 0);
    const revenue = Number(item.price ?? 0) * quantity;
    const current = totals.get(name) ?? { quantity: 0, revenue: 0 };

    totals.set(name, {
      quantity: current.quantity + quantity,
      revenue: current.revenue + revenue,
    });
  }

  return Array.from(totals.entries())
    .map(([productName, values]) => ({ productName, ...values }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
}
