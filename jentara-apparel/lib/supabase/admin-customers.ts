// lib/supabase/admin-customers.ts

import { supabase } from "./client";

export interface AdminCustomer {
  id: string;
  email: string | null;
  role: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  order_count: number;
  total_spent: number;
}

export interface CustomerOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  status: string | null;
  created_at: string;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
}

export interface CustomerDetails {
  id: string;
  email: string | null;
  role: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  order_count: number;
  total_spent: number;
  orders: CustomerOrder[];
}

export async function getAllCustomers(): Promise<
  AdminCustomer[]
> {
  const { data, error } =
    await supabase.rpc(
      "admin_get_customers",
    );

  if (error) {
    throw error;
  }

  return (data ??
    []) as AdminCustomer[];
}

export async function getCustomerDetails(
  userId: string,
): Promise<CustomerDetails> {
  const { data, error } =
    await supabase.rpc(
      "admin_get_customer_details",
      {
        target_user_id: userId,
      },
    );

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(
      "Customer could not be found.",
    );
  }

  return data as CustomerDetails;
}