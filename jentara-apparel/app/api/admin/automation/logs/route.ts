// app/api/admin/automation/logs/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

const ADMIN_ROLES = new Set([
  "support",
  "operations",
  "admin",
  "super_admin",
]);

export async function GET() {
  try {
    const {
      data: {
        user,
      },
    } =
      await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Authentication required.",
        },
        {
          status: 401,
        },
      );
    }

    const {
      data: profile,
    } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    const role =
      String(
        profile?.role ?? "",
      )
        .trim()
        .toLowerCase();

    if (!ADMIN_ROLES.has(role)) {
      return NextResponse.json(
        {
          error:
            "Administrative access required.",
        },
        {
          status: 403,
        },
      );
    }

    const {
      data,
      error,
    } =
      await supabase
        .from("message_logs")
        .select(
          "id, recipient_email, channel, event, provider_message_id, status, subject, error_message, sent_at, created_at",
        )
        .order("created_at", {
          ascending: false,
        })
        .limit(100);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      logs:
        data ?? [],
    });
  } catch (error) {
    console.error(
      "Automation logs failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to load message logs.",
      },
      {
        status: 500,
      },
    );
  }
}