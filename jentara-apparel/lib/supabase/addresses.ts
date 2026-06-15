import { supabase } from "./client";

export async function getAddresses(
  userId: string
) {
  const { data, error } =
    await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data;
}

export async function getDefaultAddress(
  userId: string
) {
  const { data, error } =
    await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .eq("is_default", true)
      .single();

  if (error) {
    throw error;
  }

  return data;
}
export async function addAddress(
  address: {
    user_id: string;
    full_name: string;
    phone: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    country?: string;
    pincode: string;
  }
) {
  const { data, error } =
    await supabase
      .from("addresses")
      .insert({
        ...address,
        country:
          address.country ??
          "India",
      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteAddress(
  id: string
) {
  const { error } =
    await supabase
      .from("addresses")
      .delete()
      .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function setDefaultAddress(
  userId: string,
  addressId: string
) {
  await supabase
    .from("addresses")
    .update({
      is_default: false,
    })
    .eq("user_id", userId);

  const { error } =
    await supabase
      .from("addresses")
      .update({
        is_default: true,
      })
      .eq("id", addressId);

  if (error) {
    console.log(
      "SUPABASE ADDRESS ERROR:",
      error
    );

    throw error;
  }
}


