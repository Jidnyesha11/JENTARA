// app/api/admin/automation/order-email/preview/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import {
  renderEmailHtml,
  renderVariables,
} from "@/lib/email/render-template";

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json();

    const orderId =
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

    if (
      profileError ||
      ![
        "support",
        "operations",
        "admin",
        "super_admin",
      ].includes(
        String(
          profile?.role ?? "",
        )
          .trim()
          .toLowerCase(),
      )
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

    const {
      data: order,
      error: orderError,
    } =
      await supabase
        .from("orders")
        .select(
          `
          id,
          customer_name,
          customer_email,
          total_amount,
          created_at
        `,
        )
        .eq("id", orderId)
        .single();

    if (orderError) {
      return NextResponse.json(
        {
          error:
            orderError.message,
        },
        {
          status: 404,
        },
      );
    }

    const {
      data: template,
      error: templateError,
    } =
      await supabase
        .from("message_templates")
        .select(
          "subject, content",
        )
        .eq("code", "ORDER_PLACED")
        .eq("channel", "email")
        .single();

    if (templateError) {
      return NextResponse.json(
        {
          error:
            templateError.message,
        },
        {
          status: 500,
        },
      );
    }

    const variables = {
      customer_name:
        order.customer_name,

      order_id:
        `#JNT-${order.id
          .replace(/-/g, "")
          .slice(0, 8)
          .toUpperCase()}`,

      order_date:
        new Date(
          order.created_at,
        ).toLocaleString("en-IN"),

      order_items:
        "Order items will appear here.",

      subtotal:
        `₹${Number(
          order.total_amount,
        ).toLocaleString("en-IN")}`,

      shipping:
        "Free",

      order_total:
        `₹${Number(
          order.total_amount,
        ).toLocaleString("en-IN")}`,

      shipping_address:
        "Delivery address will appear here.",

      tracking_url:
        `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/orders/${order.id}`,
    };

    const subject =
      renderVariables(
        template.subject ?? "",
        variables,
      );

    const html =
      renderEmailHtml(
        template.content,
        variables,
      );

    return NextResponse.json({
      subject,
      html,
    });
  } catch (error) {
    console.error(
      "Order email preview failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to generate email preview.",
      },
      {
        status: 500,
      },
    );
  }
}