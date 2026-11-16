// app/admin/automation/page.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

const cards = [
  {
    href: "/admin/automation/templates",
    eyebrow: "Library",
    title: "Email Templates",
    description:
      "Create and maintain reusable transactional and campaign messages.",
  },
  {
    href: "/admin/automation/logs",
    eyebrow: "Delivery",
    title: "Message Logs",
    description:
      "Monitor sent, failed and pending customer communications.",
  },
];

export default function AutomationPage() {
  const [orderId, setOrderId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function sendOrderEmail() {
    if (!orderId.trim()) {
      setMessage(
        "Enter an order ID first.",
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response =
        await fetch(
          "/api/admin/automation/order-email/send",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              orderId:
                orderId.trim(),
            }),
          },
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to send email.",
        );
      }

      setMessage(
        "Order confirmation email sent successfully.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send email.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />

          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / AUTOMATION
          </p>
        </div>

        <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
          Automation
        </h1>

        <p className="mt-4 max-w-2xl text-[12px] leading-6 text-[#451713]/50">
          Control customer communications,
          transactional emails and delivery
          visibility from one place.
        </p>
      </header>

      <section className="grid gap-5 py-10 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group border border-[#451713]/12 p-8 transition hover:border-[#451713]/40"
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
              {card.eyebrow}
            </p>

            <h2 className="mt-3 font-serif text-3xl">
              {card.title}
            </h2>

            <p className="mt-3 max-w-md text-[11px] leading-6 text-[#451713]/55">
              {card.description}
            </p>

            <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4">
              Open section →
            </p>
          </Link>
        ))}
      </section>

      <section className="border border-[#451713]/12 p-6 sm:p-8">
        <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
          Transactional control
        </p>

        <h2 className="mt-2 font-serif text-3xl">
          Order confirmation
        </h2>

        <p className="mt-3 max-w-xl text-[11px] leading-6 text-[#451713]/50">
          Manually resend the order confirmation
          email to a customer. This uses the
          active ORDER_PLACED template.
        </p>

        <div className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <input
            value={orderId}
            onChange={(event) =>
              setOrderId(
                event.target.value,
              )
            }
            placeholder="Order UUID"
            className="min-h-11 flex-1 border-b border-[#451713]/25 bg-transparent px-1 py-3 text-[11px] outline-none focus:border-[#451713]"
          />

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              void sendOrderEmail()
            }
            className="min-h-11 bg-[#451713] px-6 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#f5ede4] disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Send confirmation"}
          </button>
        </div>

        {message && (
          <p className="mt-5 text-[10px] leading-5 text-[#451713]/70">
            {message}
          </p>
        )}
      </section>
    </div>
  );
}