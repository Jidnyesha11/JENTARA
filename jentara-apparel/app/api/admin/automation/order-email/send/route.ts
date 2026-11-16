// app/api/admin/automation/order-email/send/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import { sendOrderPlacedEmail } from "@/lib/email/order-email";

const ADMIN_ROLES = new Set([
  "support",
  "operations",
  "admin",
  "super_admin",
]);

export async function POST(
  request: Request,
) {
  let orderId = "";

  try {
    const body =
      await request.json();

    orderId =
      String(
        body.orderId ?? "",
      ).trim();

    if (!orderId) {
      return NextResponse.json(
        {
          error:
            "Order ID is required.",
        },
        {
          status: 400,
        },
      );
    }

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
      error: profileError,
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

    if (
      profileError ||
      !ADMIN_ROLES.has(role)
    ) {
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

    const result =
      await sendOrderPlacedEmail(
        orderId,
      );

    const {
      data: order,
    } =
      await supabase
        .from("orders")
        .select(
          "user_id, customer_email",
        )
        .eq("id", orderId)
        .single();

    await supabase
      .from("message_logs")
      .insert({
        user_id:
          order?.user_id ??
          null,

        recipient_email:
          result.recipient,

        channel:
          "email",

        event:
          "ORDER_PLACED",

        order_id:
          orderId,

        provider_message_id:
          result.messageId,

        status:
          "sent",

        subject:
          "JENTARA Order Confirmation",

        sent_at:
          new Date().toISOString(),

        metadata: {
          triggered_by:
            user.id,

          manual_resend:
            true,
        },
      });

    return NextResponse.json({
      success: true,
      messageId:
        result.messageId,
    });
  } catch (error) {
    console.error(
      "Order email send failed:",
      error,
    );

    if (orderId) {
      await supabase
        .from("message_logs")
        .insert({
          order_id:
            orderId,

          channel:
            "email",

          event:
            "ORDER_PLACED",

          status:
            "failed",

          error_message:
            error instanceof Error
              ? error.message
              : "Unknown error",

          metadata: {
            manual_resend:
              true,
          },
        });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send email.",
      },
      {
        status: 500,
      },
    );
  }
}