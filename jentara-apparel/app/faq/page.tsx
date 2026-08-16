// app/faq/page.tsx

"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";

const faqSections = [
  {
    title: "ORDERS",
    questions: [
      {
        question: "How can I place an order?",
        answer:
          "Browse the JENTARA collection, select the product you want, choose your available size, and add it to your cart. Continue to checkout, confirm your delivery address, and place your order.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "If you need to modify or cancel an order, contact us as soon as possible. Once an order has entered processing or shipment, changes may no longer be possible.",
      },
      {
        question: "How can I check my order status?",
        answer:
          "You can view your orders from your JENTARA account. Open My Orders and select the relevant order to see its current status and order details.",
      },
    ],
  },
  {
    title: "PAYMENT",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We support the payment methods available at checkout. The available options will be displayed before you confirm your order.",
      },
      {
        question: "Is my payment secure?",
        answer:
          "Yes. Payments are processed through secure payment infrastructure. JENTARA does not store your complete card or banking credentials.",
      },
    ],
  },
  {
    title: "SHIPPING",
    questions: [
      {
        question: "How long does delivery take?",
        answer:
          "Delivery time depends on your location and the shipping service used for your order. Your order information will provide the applicable delivery details.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once tracking information becomes available, you can use the order tracking information provided for your purchase.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Shipping availability and charges are displayed during checkout before your order is placed.",
      },
    ],
  },
  {
    title: "PRODUCTS & SIZING",
    questions: [
      {
        question: "How do I choose the right size?",
        answer:
          "We recommend checking the JENTARA Size Guide before ordering. Compare the listed measurements with a garment that fits you well.",
      },
      {
        question: "Will all sizes be available for every product?",
        answer:
          "Size availability depends on the individual product and current inventory. Sizes that are unavailable cannot be selected at the time of purchase.",
      },
      {
        question: "Are JENTARA products true to size?",
        answer:
          "Fit can vary depending on the collection and product design. Always refer to the individual product information and Size Guide before ordering.",
      },
    ],
  },
  {
    title: "RETURNS & REFUNDS",
    questions: [
      {
        question: "Can I return my order?",
        answer:
          "Returns are subject to the JENTARA Returns & Refund Policy. Please review the policy page for the applicable eligibility requirements and process.",
      },
      {
        question: "How do refunds work?",
        answer:
          "Eligible refunds are processed according to the JENTARA Returns & Refund Policy and the payment method used for the order.",
      },
    ],
  },
  {
    title: "ACCOUNT",
    questions: [
      {
        question: "Do I need an account to shop?",
        answer:
          "Creating an account gives you access to your orders, saved information, wishlist, and other account features.",
      },
      {
        question: "I forgot my password. What should I do?",
        answer:
          "Use the password recovery option on the login page and follow the instructions to regain access to your account.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#451713]/15">
      <button
        type="button"
        onClick={() =>
          setOpen((current) => !current)
        }
        aria-expanded={open}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-8
          py-6
          text-left
        "
      >
        <span
          className="
            text-sm
            font-medium
            text-[#151a2a]
            md:text-base
          "
        >
          {question}
        </span>

        <span
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            border
            border-[#451713]/20
            text-lg
            text-[#451713]
            transition-transform
            duration-300
            ${
              open
                ? "rotate-45"
                : ""
            }
          `}
        >
          +
        </span>
      </button>

      <div
        className={`
          grid
          transition-all
          duration-300
          ${
            open
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <p
            className="
              max-w-3xl
              pb-7
              pr-10
              text-sm
              leading-7
              text-[#151a2a]/60
            "
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#151a2a]">
      <Navbar />

      <section className="mx-auto max-w-[1500px] px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />

          <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#451713]">
            JENTARA / SUPPORT
          </p>
        </div>

        <div className="grid gap-10 border-b border-[#451713]/15 pb-16 md:grid-cols-[1fr_360px] md:items-end">
          <h1 className="font-serif text-[68px] leading-[0.82] tracking-[-0.07em] sm:text-[90px] md:text-[120px]">
            FAQ
          </h1>

          <p className="max-w-sm text-sm leading-7 text-[#151a2a]/55 md:pb-2">
            Everything you need to know
            about shopping, sizing,
            shipping, orders and JENTARA.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10 md:pb-32">
        {faqSections.map((section) => (
          <div
            key={section.title}
            className="grid border-b border-[#451713]/15 py-10 md:grid-cols-[220px_1fr] md:gap-12"
          >
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#451713]">
                {section.title}
              </p>
            </div>

            <div>
              {section.questions.map(
                (item) => (
                  <AccordionItem
                    key={item.question}
                    question={
                      item.question
                    }
                    answer={
                      item.answer
                    }
                  />
                )
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}