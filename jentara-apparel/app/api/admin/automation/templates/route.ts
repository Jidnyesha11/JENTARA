// app/api/admin/automation/templates/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

const ADMIN_ROLES = new Set([
  "admin",
  "super_admin",
]);

async function requireAdmin() {
  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "AUTH_REQUIRED",
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
    throw new Error(
      "ADMIN_REQUIRED",
    );
  }

  return user;
}

export async function GET() {
  try {
    await requireAdmin();

    const {
      data,
      error,
    } =
      await supabase
        .from("message_templates")
        .select(
          "id, name, code, channel, type, subject, content, variables, active, updated_at",
        )
        .eq("channel", "email")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      templates:
        data ?? [],
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    return NextResponse.json(
      {
        error:
          message ===
          "AUTH_REQUIRED"
            ? "Authentication required."
            : message ===
                "ADMIN_REQUIRED"
              ? "Admin access required."
              : "Unable to load templates.",
      },
      {
        status:
          message ===
          "AUTH_REQUIRED"
            ? 401
            : 403,
      },
    );
  }
}

export async function POST(
  request: Request,
) {
  try {
    const user =
      await requireAdmin();

    const body =
      await request.json();

    const name =
      String(
        body.name ?? "",
      ).trim();

    const code =
      String(
        body.code ?? "",
      )
        .trim()
        .toUpperCase();

    const subject =
      String(
        body.subject ?? "",
      ).trim();

    const content =
      String(
        body.content ?? "",
      ).trim();

    if (
      !name ||
      !code ||
      !content
    ) {
      return NextResponse.json(
        {
          error:
            "Name, code and content are required.",
        },
        {
          status: 400,
        },
      );
    }

    const {
      data,
      error,
    } =
      await supabase
        .from("message_templates")
        .insert({
          name,
          code,
          channel:
            "email",
          type:
            body.type ??
            "transactional",
          subject:
            subject || null,
          content,
          variables: [],
          created_by:
            user.id,
          active:
            true,
        })
        .select()
        .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      template: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create template.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(
  request: Request,
) {
  try {
    await requireAdmin();

    const body =
      await request.json();

    const id =
      String(
        body.id ?? "",
      ).trim();

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Template ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const {
      data,
      error,
    } =
      await supabase
        .from("message_templates")
        .update({
          name:
            String(
              body.name ?? "",
            ).trim(),

          subject:
            String(
              body.subject ?? "",
            ).trim() ||
            null,

          content:
            String(
              body.content ?? "",
            ).trim(),

          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      template: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update template.",
      },
      {
        status: 500,
      },
    );
  }
}