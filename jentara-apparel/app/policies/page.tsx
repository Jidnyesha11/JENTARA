"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface PolicySection {
  id: string;
  number: string;
  title: string;
  intro: string;
  paragraphs?: string[];
  points?: string[];
}

const policies: PolicySection[] = [
  {
    id: "order",
    number: "01",
    title: "ORDER POLICY",
    intro:
      "Everything you need to know about placing and confirming an order with JENTARA.",
    points: [
      "Orders are processed only after successful payment confirmation.",
      "Please verify your selected size, product details and shipping information before placing an order.",
      "Once an order has been confirmed, changes may not be possible after processing or production has begun.",
      "JENTARA reserves the right to cancel or refuse an order where there is a genuine issue with product availability, pricing, payment or suspected misuse of the service.",
      "If an order cannot be fulfilled, the customer will be informed and any applicable payment refund will be processed through the original payment method or another appropriate method.",
    ],
  },

  {
    id: "payment",
    number: "02",
    title: "PAYMENT POLICY",
    intro:
      "Our payment policy explains how payments are handled when you place an order.",
    points: [
      "Full payment is required for prepaid orders.",
      "Cash on Delivery may be available only on selected orders and locations.",
      "Payment confirmation is required before an order is processed.",
      "JENTARA does not ask customers to share passwords, OTPs, PINs or confidential banking credentials with our support team.",
      "If a payment is deducted but an order is not successfully created, the payment status will be checked and the applicable amount will be handled according to the payment provider's settlement process.",
      "Payments relating to orders that have already been dispatched may not be refundable through order cancellation and will instead be handled under the applicable return or refund policy.",
    ],
  },

  {
    id: "shipping",
    number: "03",
    title: "SHIPPING & DELIVERY",
    intro:
      "We aim to dispatch your JENTARA order within the estimated processing timeline communicated on the website or during checkout.",
    points: [
      "Orders are typically dispatched within the estimated processing time.",
      "Delivery timelines may vary depending on your location, courier availability, weather, public holidays and other circumstances outside our reasonable control.",
      "Customers are responsible for providing an accurate and complete shipping address and reachable contact details.",
      "If a delivery attempt fails because the address or contact information provided by the customer is incorrect or the customer is unavailable, additional delivery attempts may be subject to the courier's procedures.",
      "JENTARA is not responsible for delays caused by courier partners or unforeseen circumstances after the shipment has been handed over to the delivery partner.",
      "Once shipment tracking becomes available, customers may use the tracking information provided by JENTARA to follow the shipment.",
    ],
  },

  {
    id: "exchange",
    number: "04",
    title: "EXCHANGE POLICY",
    intro:
      "We understand that finding the right fit matters. Eligible size exchanges may be requested within the applicable exchange period communicated by JENTARA.",
    points: [
      "Size exchanges are accepted within the specified exchange period.",
      "Products must be unused, unwashed and in their original condition.",
      "The original product packaging, tags and other supplied accessories should be retained wherever applicable.",
      "Exchange requests are subject to stock availability.",
      "A product may not be eligible for exchange if it shows signs of use, washing, alteration, damage or missing original tags.",
      "Certain products or promotional purchases may be excluded from exchange where the product page or offer clearly states the applicable restriction.",
      "Customers should contact JENTARA support before sending an item back so that the correct exchange process can be provided.",
    ],
  },

  {
    id: "return-refund",
    number: "05",
    title: "RETURN & REFUND POLICY",
    intro:
      "Returns are intended for products that arrive damaged, defective or materially incorrect. Refund eligibility is determined after the returned product is reviewed.",
    points: [
      "Returns are accepted only for damaged, defective or incorrect items received, subject to verification.",
      "Customers should contact JENTARA support as soon as reasonably possible after receiving an affected order.",
      "Unboxing videos or photographs may be required to verify damage, tampering or an incorrect product.",
      "Products must generally remain unused, unwashed and in original condition unless the issue itself makes this impossible.",
      "Refunds, if approved, will be processed according to the applicable return and refund process.",
      "Approved refunds will normally be processed through the original payment method where technically and operationally possible.",
      "Shipping or handling charges, where applicable, may be treated according to the circumstances of the return and the applicable policy.",
      "JENTARA reserves the right to reject a return where inspection establishes that the product was used, washed, altered, damaged after delivery or does not meet the applicable return requirements.",
    ],
  },

  {
    id: "privacy",
    number: "06",
    title: "PRIVACY POLICY",
    intro:
      "JENTARA respects your privacy and aims to collect and use personal information only for legitimate business and service purposes.",
    paragraphs: [
      "When you create an account, place an order, contact support or otherwise interact with JENTARA, we may collect information such as your name, email address, phone number, shipping address, billing information, order information and account details necessary to provide our services.",
      "We use this information to process orders, deliver products, communicate order updates, provide customer support, manage accounts, prevent fraud and improve our website and services.",
      "Payment information may be processed by third-party payment providers. JENTARA does not require customers to share payment passwords, OTPs, PINs or confidential banking credentials with us.",
      "We may share information with service providers such as payment processors, delivery partners, technology providers and other vendors where reasonably necessary to operate the business and fulfil your order.",
      "We may also disclose information where required by applicable law, legal process, regulatory requirements or to protect the rights, safety and security of JENTARA, our customers or others.",
      "We use reasonable administrative and technical measures to protect personal information. However, no online transmission or storage system can be guaranteed to be completely secure.",
      "You should keep your account credentials confidential and contact us if you believe your account has been accessed without authorization.",
      "You may contact JENTARA at support@jentara.in regarding questions or requests concerning your personal information, subject to applicable law and reasonable verification requirements.",
    ],
  },

  {
    id: "terms",
    number: "07",
    title: "TERMS & CONDITIONS",
    intro:
      "These Terms & Conditions govern your use of the JENTARA website and your purchase of products through our online store.",
    points: [
      "By accessing or using the JENTARA website, you agree to comply with these Terms & Conditions and the policies referenced on this website.",
      "You agree to provide accurate information when creating an account, placing an order or communicating with JENTARA.",
      "You must not use the website for unlawful purposes, fraudulent activity, abuse, unauthorized access, interference with the service or any activity that infringes the rights of JENTARA or another person.",
      "Product descriptions, images, colours and measurements are provided to help customers make informed purchasing decisions. Minor differences may occur due to screen settings, photography, lighting, manufacturing tolerances or the nature of the product.",
      "Product prices, availability, descriptions and offers may change from time to time. Changes will not ordinarily affect an order that has already been successfully confirmed, except where correction or cancellation is required because of an obvious error, fraud or circumstances outside our reasonable control.",
      "JENTARA reserves the right to limit quantities, refuse suspicious transactions or cancel orders where there is a legitimate reason to do so.",
      "Intellectual property appearing on the website, including brand names, logos, graphics, photographs, written content and design elements, belongs to JENTARA or the respective rights holder and may not be copied, reproduced or commercially exploited without permission.",
      "You must not attempt to interfere with the security, functionality or availability of the website, including through malicious code, unauthorized access, scraping intended to abuse the service or other disruptive activity.",
      "JENTARA may update these Terms & Conditions from time to time. Updated terms will apply prospectively from the time they are published unless otherwise required by applicable law.",
      "Nothing in these Terms & Conditions is intended to exclude or restrict any consumer right that cannot lawfully be excluded under applicable Indian law.",
    ],
  },

  {
    id: "product-care",
    number: "08",
    title: "PRODUCT CARE",
    intro:
      "Good care helps your JENTARA pieces maintain their fit, colour and finish for longer.",
    points: [
      "Wash garments inside out with similar colours.",
      "Do not bleach or use harsh detergents.",
      "Follow the care instructions provided on the garment label for the best results.",
      "Avoid excessive heat where the garment care label recommends otherwise.",
      "Do not iron directly over prints, graphics, embroidery or other decorative elements unless the garment care instructions specifically allow it.",
      "Store garments in a clean and dry environment.",
    ],
  },
];

export default function PoliciesPage() {
  const [openPolicy, setOpenPolicy] =
    useState<string | null>(null);

  useEffect(() => {
    function openHashPolicy() {
      const hash =
        window.location.hash.replace(
          "#",
          ""
        );

      if (
        hash &&
        policies.some(
          (policy) =>
            policy.id === hash
        )
      ) {
        setOpenPolicy(hash);

        window.setTimeout(() => {
          document
            .getElementById(hash)
            ?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
        }, 100);
      }
    }

    openHashPolicy();

    window.addEventListener(
      "hashchange",
      openHashPolicy
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        openHashPolicy
      );
    };
  }, []);

  function togglePolicy(id: string) {
    setOpenPolicy((current) =>
      current === id ? null : id
    );

    window.history.replaceState(
      null,
      "",
      `/policies#${id}`
    );
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#451713]/15
          bg-[#f5ede4]/95
          backdrop-blur-md
        "
      >
        <div className="mx-auto max-w-[1500px] px-5 md:px-8">
          <div className="relative flex h-[74px] items-center justify-between md:h-[88px]">

            <nav className="hidden md:block">
              <div className="flex items-center gap-6 lg:gap-8">
                <Link
                  href="/"
                  className="text-[9px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-50"
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  className="text-[9px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-50"
                >
                  Shop
                </Link>

                <Link
                  href="/products"
                  className="text-[9px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-50"
                >
                  Women
                </Link>

                <Link
                  href="/products"
                  className="text-[9px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-50"
                >
                  Men
                </Link>

                <Link
                  href="/about"
                  className="text-[9px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-50"
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className="text-[9px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-50"
                >
                  Contact Us
                </Link>
              </div>
            </nav>

            <Link
              href="/"
              aria-label="JENTARA Home"
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
              "
            >
              <span
                className="
                  font-serif
                  text-[38px]
                  font-semibold
                  lowercase
                  leading-none
                  tracking-[-0.09em]
                  md:text-[44px]
                "
              >
                jentara
              </span>
            </Link>

            <div className="ml-auto flex items-center gap-5">
              <Link
                href="/products"
                aria-label="Search products"
                className="text-xl transition-opacity hover:opacity-50"
              >
                ⌕
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="text-lg transition-opacity hover:opacity-50"
              >
                ♡
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1500px] px-5 md:px-8">

        {/* Hero */}

        <section className="border-b border-[#451713]/20 py-12 md:py-20">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.35em]">
              Star of the New Generation
            </p>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h1
              className="
                font-serif
                text-[62px]
                leading-[0.82]
                tracking-[-0.07em]
                sm:text-[82px]
                md:text-[110px]
                lg:text-[130px]
              "
            >
              POLICIES
            </h1>

            <div className="max-w-[330px] md:pb-3 md:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                JENTARA APPAREL
              </p>

              <p className="mt-3 text-[11px] leading-6 text-[#451713]/55">
                Clear information for a
                smoother shopping experience.
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}

        <section className="border-b border-[#451713]/20 py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                JENTARA / INFORMATION
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-[760px]
                  font-serif
                  text-[34px]
                  leading-[1]
                  tracking-[-0.05em]
                  sm:text-[44px]
                  md:text-[52px]
                "
              >
                Everything in one place.
              </h2>

              <p className="mt-6 max-w-[700px] text-[12px] leading-7 text-[#451713]/60">
                From placing an order to receiving,
                exchanging and caring for your JENTARA
                pieces, our policies are designed to keep
                the process simple and transparent.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Navigation */}

        <section className="py-10 md:py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                Explore
              </p>

              <h2 className="mt-3 font-serif text-[38px] tracking-[-0.05em] md:text-[50px]">
                Policy Guide
              </h2>
            </div>

            <p className="hidden text-[9px] uppercase tracking-[0.2em] text-[#451713]/40 md:block">
              {policies.length} Sections
            </p>
          </div>

          <div className="space-y-3">
            {policies.map((policy) => {
              const isOpen =
                openPolicy === policy.id;

              return (
                <section
                  key={policy.id}
                  id={policy.id}
                  className={`
                    scroll-mt-28
                    overflow-hidden
                    rounded-[18px]
                    border
                    transition-all
                    duration-500
                    ${
                      isOpen
                        ? "border-[#451713]/35 bg-[#eadfd4] shadow-[0_14px_40px_rgba(69,23,19,0.08)]"
                        : "border-[#451713]/15 bg-[#faf5ef]"
                    }
                  `}
                >
                  <button
                    type="button"
                    onClick={() =>
                      togglePolicy(
                        policy.id
                      )
                    }
                    aria-expanded={isOpen}
                    aria-controls={`${policy.id}-content`}
                    className="
                      flex
                      w-full
                      items-center
                      gap-5
                      px-5
                      py-6
                      text-left
                      sm:px-7
                      md:px-9
                      md:py-7
                    "
                  >
                    <span className="min-w-[30px] font-serif text-lg text-[#451713]/35">
                      {policy.number}
                    </span>

                    <span className="flex-1">
                      <span className="block text-[11px] font-semibold tracking-[0.1em] sm:text-[12px]">
                        {policy.title}
                      </span>

                      <span className="mt-2 block max-w-[850px] text-[10px] leading-5 text-[#451713]/45 md:text-[11px]">
                        {policy.intro}
                      </span>
                    </span>

                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#451713]/20
                        font-serif
                        text-xl
                        transition-transform
                        duration-500
                        ${
                          isOpen
                            ? "rotate-45"
                            : ""
                        }
                      `}
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={`${policy.id}-content`}
                    className={`
                      grid
                      transition-all
                      duration-500
                      ease-in-out
                      ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#451713]/12 px-5 pb-8 pt-7 sm:px-7 md:px-9 md:pb-10">
                        <div className="max-w-[900px] pl-0 sm:pl-[50px]">

                          {policy.paragraphs?.map(
                            (
                              paragraph,
                              index
                            ) => (
                              <p
                                key={index}
                                className="mb-5 text-[11px] leading-7 text-[#451713]/65 md:text-[12px]"
                              >
                                {paragraph}
                              </p>
                            )
                          )}

                          {policy.points && (
                            <ul className="space-y-4">
                              {policy.points.map(
                                (
                                  point,
                                  index
                                ) => (
                                  <li
                                    key={`${policy.id}-${index}`}
                                    className="flex gap-4 text-[11px] leading-6 text-[#451713]/68 md:text-[12px]"
                                  >
                                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#451713]/55" />

                                    <span>
                                      {point}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          )}

                          {policy.id ===
                            "privacy" && (
                            <div className="mt-8 border-t border-[#451713]/12 pt-6">
                              <p className="text-[9px] uppercase tracking-[0.15em] text-[#451713]/45">
                                Privacy Contact
                              </p>

                              <a
                                href="mailto:support@jentara.in"
                                className="mt-2 inline-block text-[11px] font-medium underline underline-offset-4"
                              >
                                support@jentara.in
                              </a>
                            </div>
                          )}

                          {policy.id ===
                            "terms" && (
                            <div className="mt-8 border-t border-[#451713]/12 pt-6">
                              <p className="text-[9px] uppercase tracking-[0.15em] text-[#451713]/45">
                                Support
                              </p>

                              <p className="mt-2 text-[11px] leading-6 text-[#451713]/60">
                                For questions regarding
                                these Terms & Conditions,
                                contact JENTARA support.
                              </p>

                              <a
                                href="mailto:support@jentara.in"
                                className="mt-2 inline-block text-[11px] font-medium underline underline-offset-4"
                              >
                                support@jentara.in
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        {/* Contact CTA */}

        <section className="pb-16 md:pb-20">
          <div className="rounded-[24px] bg-[#451713] px-7 py-12 text-[#f5ede4] sm:px-10 md:px-16 md:py-16">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.35em] text-[#f5ede4]/45">
                  Need Help?
                </p>

                <h2
                  className="
                    mt-4
                    font-serif
                    text-[42px]
                    leading-[0.92]
                    tracking-[-0.05em]
                    sm:text-[52px]
                    md:text-[64px]
                  "
                >
                  We&apos;re here.
                </h2>

                <p className="mt-5 max-w-[530px] text-[11px] leading-6 text-[#f5ede4]/55">
                  If you have a question about an order,
                  exchange, return, delivery or anything
                  else, our support team is happy to help.
                </p>
              </div>

              <Link
                href="/contact"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-7
                  border
                  border-[#f5ede4]/35
                  px-6
                  py-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  transition-all
                  duration-300
                  hover:bg-[#f5ede4]
                  hover:text-[#451713]
                "
              >
                Contact JENTARA

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Brand */}

        <section className="border-t border-[#451713]/20 py-12 text-center md:py-16">
          <p className="font-serif text-[30px] tracking-[-0.04em] sm:text-[40px]">
            Star of the New Generation
          </p>

          <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.35em] text-[#451713]/40">
            JENTARA APPAREL
          </p>
        </section>
      </div>
    </main>
  );
}