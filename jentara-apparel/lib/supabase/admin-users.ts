// lib/supabase/admin-users.ts

import { supabase } from "./client";

export type AdminRole =
  | "customer"
  | "support"
  | "operations"
  | "admin"
  | "super_admin";

export interface AdminUser {
  id: string;
  email: string;
  role: string | null;
  created_at: string;
}

interface RoleUpdateResponse {
  success: boolean;
  user_id: string;
  role: AdminRole;
}

function getSupabaseError(error: unknown) {
  if (
    error &&
    typeof error === "object"
  ) {
    const value = error as Record<
      string,
      unknown
    >;

    return {
      message:
        typeof value.message === "string"
          ? value.message
          : "Unknown Supabase error",
      details:
        typeof value.details === "string"
          ? value.details
          : "",
      hint:
        typeof value.hint === "string"
          ? value.hint
          : "",
      code:
        typeof value.code === "string"
          ? value.code
          : "",
    };
  }

  return {
    message: String(error),
    details: "",
    hint: "",
    code: "",
  };
}

export async function getAdminUsers(): Promise<
  AdminUser[]
> {
  const { data, error } =
    await supabase
      .from("profiles")
      .select(
        "id, email, role, created_at",
      )
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    const details =
      getSupabaseError(error);

    console.error(
      "getAdminUsers failed:",
      details,
    );

    throw new Error(
      details.message,
    );
  }

  return (data ?? []) as AdminUser[];
}

export async function updateUserRole(
  userId: string,
  role: AdminRole,
): Promise<AdminUser> {
  if (!userId) {
    throw new Error(
      "User ID is required.",
    );
  }

  if (!role) {
    throw new Error(
      "A role is required.",
    );
  }

  const {
    data,
    error,
  } = await supabase.rpc(
    "admin_update_profile_role",
    {
      target_user_id: userId,
      new_role: role,
    },
  );

  if (error) {
    const details =
      getSupabaseError(error);

    console.error(
      "updateUserRole failed:",
      details,
    );

    throw new Error(
      `${details.message}${
        details.code
          ? ` (${details.code})`
          : ""
      }`,
    );
  }

  const result =
    data as RoleUpdateResponse | null;

  if (!result?.success) {
    throw new Error(
      "Supabase did not confirm the role update.",
    );
  }

  const {
    data: updatedUser,
    error: fetchError,
  } = await supabase
    .from("profiles")
    .select(
      "id, email, role, created_at",
    )
    .eq("id", userId)
    .single();

  if (fetchError) {
    const details =
      getSupabaseError(
        fetchError,
      );

    console.error(
      "Failed to reload updated user:",
      details,
    );

    throw new Error(
      details.message,
    );
  }

  return updatedUser as AdminUser;
}