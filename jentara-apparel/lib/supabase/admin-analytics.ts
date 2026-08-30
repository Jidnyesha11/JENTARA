// lib/supabase/admin-analytics.ts

import { supabase } from "./client";

export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;

  monthRevenue: number;
  monthOrders: number;

  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;

  averageOrderValue: number;

  lowStockProducts: number;
  outOfStockProducts: number;

  featuredProducts: number;
}

export interface RecentOrder {
  id: string;
  customer_name: string;
  customer_email: string | null;
  total_amount: number;
  status: string;
  created_at: string;
  user_id: string | null;
}

export interface RecentCustomer {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface AnalyticsOrder {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  total_amount: number;
  status: string | null;
  created_at: string;
  user_id: string | null;
}

export interface AnalyticsOrderItem {
  id: string;
  order_id: string | null;
  product_id: string | null;
  product_name: string | null;
  price: number | null;
  quantity: number | null;
}

export interface AnalyticsProduct {
  id: string;
  name: string;
  price: number;
  stock: number | null;
  featured: boolean | null;
}

export interface AnalyticsCustomer {
  id: string;
  email: string | null;
  role: string | null;
  created_at: string;
}

export interface AnalyticsDataset {
  orders: AnalyticsOrder[];
  orderItems: AnalyticsOrderItem[];
  products: AnalyticsProduct[];
  customers: AnalyticsCustomer[];
}

function normalizeStatus(
  status: string | null | undefined,
): string {
  return String(status ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}

function isSameMonth(
  dateValue: string | null | undefined,
  now: Date,
): boolean {
  if (!dateValue) {
    return false;
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

/**
 * Loads the complete dataset used by the advanced analytics dashboard.
 */
export async function getAnalyticsDataset(): Promise<AnalyticsDataset> {
  const [
    ordersResult,
    orderItemsResult,
    productsResult,
    customersResult,
  ] = await Promise.all([
    supabase
      .from("orders")
      .select(
        "id, customer_name, customer_email, total_amount, status, created_at, user_id",
      )
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("order_items")
      .select(
        "id, order_id, product_id, product_name, price, quantity",
      ),

    supabase
      .from("products")
      .select(
        "id, name, price, stock, featured",
      ),

    supabase
      .from("profiles")
      .select(
        "id, email, role, created_at",
      ),
  ]);

  if (ordersResult.error) {
    throw ordersResult.error;
  }

  if (orderItemsResult.error) {
    throw orderItemsResult.error;
  }

  if (productsResult.error) {
    throw productsResult.error;
  }

  if (customersResult.error) {
    throw customersResult.error;
  }

  return {
    orders:
      (ordersResult.data ??
        []) as AnalyticsOrder[],

    orderItems:
      (orderItemsResult.data ??
        []) as AnalyticsOrderItem[],

    products:
      (productsResult.data ??
        []) as AnalyticsProduct[],

    customers:
      (customersResult.data ??
        []) as AnalyticsCustomer[],
  };
}

/**
 * Calculates dashboard KPIs from the current Supabase dataset.
 */
export async function getAnalytics(): Promise<Analytics> {
  const dataset =
    await getAnalyticsDataset();

  const now = new Date();

  const totalRevenue =
    dataset.orders.reduce(
      (sum, order) =>
        sum +
        Number(
          order.total_amount || 0,
        ),
      0,
    );

  const monthOrders =
    dataset.orders.filter((order) =>
      isSameMonth(
        order.created_at,
        now,
      ),
    );

  const monthRevenue =
    monthOrders.reduce(
      (sum, order) =>
        sum +
        Number(
          order.total_amount || 0,
        ),
      0,
    );

  const statusCounts =
    dataset.orders.reduce<
      Record<string, number>
    >((counts, order) => {
      const status =
        normalizeStatus(
          order.status,
        );

      counts[status] =
        (counts[status] ?? 0) + 1;

      return counts;
    }, {});

  const lowStockProducts =
    dataset.products.filter(
      (product) => {
        const stock =
          Number(
            product.stock ?? 0,
          );

        return stock > 0 && stock <= 5;
      },
    ).length;

  const outOfStockProducts =
    dataset.products.filter(
      (product) =>
        Number(
          product.stock ?? 0,
        ) <= 0,
    ).length;

  const featuredProducts =
    dataset.products.filter(
      (product) =>
        product.featured === true,
    ).length;

  const averageOrderValue =
    dataset.orders.length > 0
      ? totalRevenue /
        dataset.orders.length
      : 0;

  return {
    totalRevenue,

    totalOrders:
      dataset.orders.length,

    totalProducts:
      dataset.products.length,

    totalCustomers:
      dataset.customers.length,

    monthRevenue,

    monthOrders:
      monthOrders.length,

    pendingOrders:
      statusCounts.pending ?? 0,

    processingOrders:
      statusCounts.processing ?? 0,

    shippedOrders:
      statusCounts.shipped ?? 0,

    deliveredOrders:
      statusCounts.delivered ?? 0,

    cancelledOrders:
      statusCounts.cancelled ?? 0,

    averageOrderValue,

    lowStockProducts,

    outOfStockProducts,

    featuredProducts,
  };
}

/**
 * Loads the five most recent orders.
 */
export async function getRecentOrders(): Promise<
  RecentOrder[]
> {
  const { data, error } =
    await supabase
      .from("orders")
      .select(
        "id, customer_name, customer_email, total_amount, status, created_at, user_id",
      )
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

  if (error) {
    throw error;
  }

  return (
    data?.map((order) => ({
      id: String(order.id),

      customer_name:
        String(
          order.customer_name ??
            "Customer",
        ),

      customer_email:
        order.customer_email ??
        null,

      total_amount:
        Number(
          order.total_amount ?? 0,
        ),

      status:
        String(
          order.status ??
            "pending",
        ),

      created_at:
        String(
          order.created_at ??
            "",
        ),

      user_id:
        order.user_id ??
        null,
    })) ?? []
  );
}

/**
 * Loads the five most recently created profiles.
 */
export async function getRecentCustomers(): Promise<
  RecentCustomer[]
> {
  const { data, error } =
    await supabase
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

  return (
    data?.map((customer) => ({
      id: String(customer.id),

      email:
        customer.email ??
        "Email unavailable",

      role:
        customer.role ??
        "customer",

      created_at:
        customer.created_at ??
        "",
    })) ?? []
  );
}