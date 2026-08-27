// lib/supabase/admin-analytics.ts

import { supabase } from "./client";

export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
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
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export interface RecentCustomer {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface OrderRecord {
  id: string;
  total_amount: number | string | null;
  status: string | null;
  created_at: string;
  customer_name?: string | null;
}

interface OrderItemRecord {
  order_id: string;
  product_name: string | null;
  price: number | string | null;
  quantity: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ProductRecord {
  id: string;
  name?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ProfileRecord {
  id: string;
  email: string;
  role: string | null;
  created_at: string;
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}`;
}

function getMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
  }).format(date);
}

function getLastMonths(count: number): Date[] {
  const months: Date[] = [];
  const now = new Date();

  for (let index = count - 1; index >= 0; index -= 1) {
    months.push(
      new Date(
        now.getFullYear(),
        now.getMonth() - index,
        1,
      ),
    );
  }

  return months;
}

export async function getAnalytics(): Promise<Analytics> {
  const [
    ordersResult,
    productsResult,
    customersResult,
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("total_amount"),

    supabase
      .from("products")
      .select("id"),

    supabase
      .from("profiles")
      .select("id"),
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

  const totalRevenue = (
    ordersResult.data ?? []
  ).reduce(
    (sum, order) =>
      sum + Number(order.total_amount ?? 0),
    0,
  );

  return {
    totalRevenue,
    totalOrders: ordersResult.data?.length ?? 0,
    totalProducts: productsResult.data?.length ?? 0,
    totalCustomers: customersResult.data?.length ?? 0,
  };
}

export async function getRecentOrders(): Promise<
  RecentOrder[]
> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, customer_name, total_amount, status, created_at",
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  if (error) {
    throw error;
  }

  return (data ?? []) as RecentOrder[];
}

export async function getRecentCustomers(): Promise<
  RecentCustomer[]
> {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, email, role, created_at",
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  if (error) {
    throw error;
  }

  return (data ?? []) as RecentCustomer[];
}

export async function getRevenueByMonth(
  monthCount = 12,
): Promise<RevenuePoint[]> {
  const months = getLastMonths(monthCount);

  const startDate = months[0];

  const { data, error } = await supabase
    .from("orders")
    .select("total_amount, created_at")
    .gte(
      "created_at",
      startDate.toISOString(),
    )
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  const revenueMap = new Map<
    string,
    number
  >();

  for (const month of months) {
    revenueMap.set(
      getMonthKey(month),
      0,
    );
  }

  for (const order of data ?? []) {
    const date = new Date(order.created_at);
    const key = getMonthKey(date);

    if (!revenueMap.has(key)) {
      continue;
    }

    revenueMap.set(
      key,
      (revenueMap.get(key) ?? 0) +
        Number(order.total_amount ?? 0),
    );
  }

  return months.map((month) => ({
    month: getMonthLabel(month),
    revenue:
      revenueMap.get(
        getMonthKey(month),
      ) ?? 0,
  }));
}

export async function getOrdersByMonth(
  monthCount = 12,
): Promise<OrderPoint[]> {
  const months = getLastMonths(monthCount);

  const startDate = months[0];

  const { data, error } = await supabase
    .from("orders")
    .select("created_at")
    .gte(
      "created_at",
      startDate.toISOString(),
    )
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  const orderMap = new Map<
    string,
    number
  >();

  for (const month of months) {
    orderMap.set(
      getMonthKey(month),
      0,
    );
  }

  for (const order of data ?? []) {
    const date = new Date(order.created_at);
    const key = getMonthKey(date);

    if (!orderMap.has(key)) {
      continue;
    }

    orderMap.set(
      key,
      (orderMap.get(key) ?? 0) + 1,
    );
  }

  return months.map((month) => ({
    month: getMonthLabel(month),
    orders:
      orderMap.get(
        getMonthKey(month),
      ) ?? 0,
  }));
}

export async function getTopProducts(
  limit = 5,
): Promise<TopProduct[]> {
  const { data, error } = await supabase
    .from("order_items")
    .select(
      "order_id, product_name, price, quantity",
    );

  if (error) {
    throw error;
  }

  const productMap = new Map<
    string,
    {
      quantity: number;
      revenue: number;
    }
  >();

  for (const item of (data ??
    []) as OrderItemRecord[]) {
    const name =
      item.product_name?.trim() ||
      "Unknown product";

    const quantity = Number(
      item.quantity ?? 0,
    );

    const price = Number(
      item.price ?? 0,
    );

    const existing =
      productMap.get(name) ?? {
        quantity: 0,
        revenue: 0,
      };

    productMap.set(name, {
      quantity:
        existing.quantity + quantity,
      revenue:
        existing.revenue +
        price * quantity,
    });
  }

  return Array.from(
    productMap.entries(),
  )
    .map(
      ([productName, values]) => ({
        productName,
        quantity: values.quantity,
        revenue: values.revenue,
      }),
    )
    .sort(
      (a, b) =>
        b.quantity - a.quantity,
    )
    .slice(0, limit);
}

export async function getProductCount(): Promise<number> {
  const { count, error } = await supabase
    .from("products")
    .select("id", {
      count: "exact",
      head: true,
    });

  if (error) {
    throw error;
  }

  return count ?? 0;
}