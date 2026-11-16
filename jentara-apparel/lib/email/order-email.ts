
import { supabase } from "@/lib/supabase/client";
import { resend, resendFrom } from "./resend";
import {
  renderEmailHtml,
  renderVariables,
} from "./render-template";

interface OrderItem {
  id: string;
  product_name: string | null;
  price: number | null;
  quantity: number | null;
  size: string | null;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string | null;
  created_at: string;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
}

function money(
  value: number,
): string {
  return `₹${value.toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )}`;
}

function formatOrderId(
  id: string,
): string {
  return `#JNT-${id
    .replace(/-/g, "")
    .slice(0, 8)
    .toUpperCase()}`;
}

function buildItemsHtml(
  items: OrderItem[],
): string {
  if (items.length === 0) {
    return "No item information available.";
  }

  return items
    .map((item) => {
      const quantity =
        Number(
          item.quantity ?? 0,
        );

      const price =
        Number(
          item.price ?? 0,
        );

      const size =
        item.size
          ? ` · Size: ${item.size}`
          : "";

      return `${item.product_name ?? "Product"}${size} · Qty: ${quantity} · ${money(price * quantity)}`;
    })
    .join("\n");
}

function buildAddress(
  order: Order,
): string {
  return [
    order.customer_name,
    order.address_line_1,
    order.address_line_2,
    [order.city, order.state]
      .filter(Boolean)
      .join(", "),
    order.pincode,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendOrderPlacedEmail(
  orderId: string,
) {
  const { data: order, error: orderError } =
    await supabase
      .from("orders")
      .select(
        `
        id,
        customer_name,
        customer_email,
        total_amount,
        status,
        created_at,
        address_line_1,
        address_line_2,
        city,
        state,
        pincode
      `,
      )
      .eq("id", orderId)
      .single();

  if (orderError) {
    throw orderError;
  }

  const { data: items, error: itemsError } =
    await supabase
      .from("order_items")
      .select(
        "id, product_name, price, quantity, size",
      )
      .eq("order_id", orderId);

  if (itemsError) {
    throw itemsError;
  }

  const { data: template, error: templateError } =
    await supabase
      .from("message_templates")
      .select(
        "id, code, subject, content, active",
      )
      .eq("code", "ORDER_PLACED")
      .eq("channel", "email")
      .single();

  if (templateError) {
    throw templateError;
  }

  if (!template.active) {
    throw new Error(
      "ORDER_PLACED email template is disabled.",
    );
  }

  const orderRecord =
    order as Order;

  const orderItems =
    (items ?? []) as OrderItem[];

  const orderIdDisplay =
    formatOrderId(
      orderRecord.id,
    );

  const subtotal =
    orderItems.reduce(
      (sum, item) =>
        sum +
        Number(
          item.price ?? 0,
        ) *
          Number(
            item.quantity ?? 0,
          ),
      0,
    );

  const variables = {
    customer_name:
      orderRecord.customer_name,

    order_id:
      orderIdDisplay,

    order_date:
      new Date(
        orderRecord.created_at,
      ).toLocaleString("en-IN"),

    order_items:
      buildItemsHtml(
        orderItems,
      ),

    subtotal:
      money(subtotal),

    shipping:
      "Free",

    order_total:
      money(
        Number(
          orderRecord.total_amount,
        ),
      ),

    shipping_address:
      buildAddress(
        orderRecord,
      ),

    tracking_url:
      `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/orders/${orderRecord.id}`,
  };

  const subject =
    renderVariables(
      template.subject ??
        "Your JENTARA order is confirmed",
      variables,
    );

  const html =
    renderEmailHtml(
      template.content,
      variables,
    );

  const idempotencyKey =
    `order-placed/${orderRecord.id}`;

  const { data, error } =
    await resend.emails.send(
      {
        from: resendFrom,
        to: [
          orderRecord.customer_email,
        ],
        subject,
        html,
      },
      {
        idempotencyKey,
      },
    );

  if (error) {
    throw new Error(
      error.message,
    );
  }

  return {
    messageId:
      data?.id ?? null,

    recipient:
      orderRecord.customer_email,

    orderId:
      orderRecord.id,
  };
}