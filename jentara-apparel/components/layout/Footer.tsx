// components/layout/Footer.tsx

import Link from "next/link";
import NewsletterForm from "@/components/layout/NewsletterForm";

const resources = [
  {
    label: "Order Tracking",
    href: "/order-tracking",
  },
  {
    label: "Return & Exchange",
    href: "/policies#return-refund",
  },
  {
    label: "About Us",
    href: "/about",
  },
];

const quickLinks = [
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Size Guide",
    href: "/size-guide",
  },
  {
    label: "Privacy Policy",
    href: "/policies#privacy",
  },
  {
    label: "Return & Exchange Policy",
    href: "/policies#exchange",
  },
  {
    label: "Terms & Conditions",
    href: "/policies#terms",
  },
  {
    label: "Shipping & Delivery",
    href: "/policies#shipping",
  },
  {
    label: "Refund Policy",
    href: "/policies#return-refund",
  },
  {
    label: "Product Care",
    href: "/policies#product-care",
  },
  {
    label: "Help",
    href: "/contact",
  },
];

function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="
          mb-5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-[#f5eee6]
        "
      >
        {title}
      </h2>

      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        block
        w-fit
        text-[10px]
        font-medium
        uppercase
        tracking-[0.06em]
        text-[#f5eee6]/70
        transition-all
        duration-300
        hover:translate-x-1
        hover:text-[#f5eee6]
      "
    >
      <span className="inline-block">
        {label}
      </span>
    </Link>
  );
}

function SocialLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex
        w-fit
        items-center
        gap-3
        text-[10px]
        font-medium
        uppercase
        tracking-[0.08em]
        text-[#f5eee6]/70
        transition-colors
        duration-300
        hover:text-[#f5eee6]
      "
    >
      <span
        className="
          h-px
          w-5
          bg-[#f5eee6]/40
          transition-all
          duration-300
          group-hover:w-8
          group-hover:bg-[#f5eee6]
        "
      />

      {label}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        border-t
        border-[#f5eee6]/20
        bg-[#451713]
        text-[#f5eee6]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1500px]
          px-6
          sm:px-8
          lg:px-10
        "
      >
        {/* Footer Top */}

        <div
          className="
            grid
            grid-cols-1
            gap-12
            py-14
            sm:grid-cols-2
            lg:grid-cols-5
            lg:gap-8
            lg:py-16
          "
        >
          {/* Resources */}

          <FooterSection title="Resources">
            {resources.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
                label={link.label}
              />
            ))}

            <div
              className="
                mt-9
                border-t
                border-[#f5eee6]/15
                pt-7
              "
            >
              <p
                className="
                  mb-4
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#f5eee6]
                "
              >
                Popular Search
              </p>

              <FooterLink
                href="/shop"
                label="Oversized Tees"
              />
            </div>
          </FooterSection>

          {/* Quick Links */}

          <FooterSection title="Quick Links">
            {quickLinks.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
                label={link.label}
              />
            ))}
          </FooterSection>

          {/* Follow Us */}

          <FooterSection title="Follow Us">
            <div className="space-y-4">
              <SocialLink
                href="#"
                label="Instagram"
              />

              <SocialLink
                href="#"
                label="Facebook"
              />

              <SocialLink
                href="#"
                label="X"
              />
            </div>

            <p
              className="
                mt-8
                max-w-[220px]
                text-[9px]
                leading-5
                tracking-[0.05em]
                text-[#f5eee6]/45
              "
            >
              Follow JENTARA for new drops,
              styling inspiration and exclusive
              updates.
            </p>
          </FooterSection>

          {/* Contact */}

          <FooterSection title="Contact Us">
            <p
              className="
                max-w-[250px]
                text-[10px]
                uppercase
                leading-[1.8]
                tracking-[0.04em]
                text-[#f5eee6]/65
              "
            >
              Reach out to us on WhatsApp
              or contact our support team.
            </p>

            <div className="mt-5 space-y-3">
              <div>
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-[#f5eee6]/40
                  "
                >
                  Phone
                </p>

                <a
                  href="tel:+919284191297"
                  className="
                    mt-1
                    block
                    text-[10px]
                    tracking-[0.04em]
                    text-[#f5eee6]/80
                    transition
                    hover:text-[#f5eee6]
                  "
                >
                  +91 9284191297
                </a>
              </div>

              <div>
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-[#f5eee6]/40
                  "
                >
                  Email
                </p>

                <a
                  href="mailto:support@jentara.in"
                  className="
                    mt-1
                    block
                    text-[10px]
                    tracking-[0.04em]
                    text-[#f5eee6]/80
                    transition
                    hover:text-[#f5eee6]
                  "
                >
                  support@jentara.in
                </a>
              </div>

              <div>
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-[#f5eee6]/40
                  "
                >
                  Working Hours
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    uppercase
                    leading-6
                    tracking-[0.04em]
                    text-[#f5eee6]/70
                  "
                >
                  10:30 AM – 6:00 PM
                  <br />
                  Monday – Saturday
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/919284191297"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6
                inline-flex
                items-center
                gap-3
                border
                border-[#f5eee6]/30
                px-4
                py-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
                transition-all
                duration-300
                hover:border-[#f5eee6]
                hover:bg-[#f5eee6]
                hover:text-[#451713]
              "
            >
              WhatsApp Support

              <span>→</span>
            </a>
          </FooterSection>

          {/* Visit Us */}

          <FooterSection title="Visit Us">
            <p
              className="
                max-w-[230px]
                text-[10px]
                uppercase
                leading-[1.8]
                tracking-[0.04em]
                text-[#f5eee6]/65
              "
            >
              Visit our store for an
              exclusive JENTARA experience.
            </p>

            <div className="mt-5">
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.16em]
                  text-[#f5eee6]/40
                "
              >
                Store
              </p>

              <p
                className="
                  mt-2
                  text-[10px]
                  uppercase
                  leading-6
                  tracking-[0.04em]
                  text-[#f5eee6]/70
                "
              >
                Store details coming soon.
              </p>
            </div>

            <Link
              href="/contact"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#f5eee6]
              "
            >
              View More

              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </FooterSection>
        </div>

        {/* Newsletter */}

        <div
          className="
            border-b
            border-t
            border-[#f5eee6]/15
            py-10
            lg:py-12
          "
        >
          <div
            className="
              flex
              flex-col
              gap-7
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#f5eee6]/50
                "
              >
                Stay In The Loop
              </p>

              <h2
                className="
                  mt-3
                  max-w-[600px]
                  font-serif
                  text-3xl
                  leading-none
                  tracking-[-0.04em]
                  sm:text-4xl
                "
              >
                Be the first to know.
              </h2>

              <p
                className="
                  mt-3
                  max-w-[520px]
                  text-[10px]
                  leading-5
                  tracking-[0.03em]
                  text-[#f5eee6]/50
                "
              >
                Sign up for new arrivals,
                exclusive drops, offers and
                JENTARA updates.
              </p>
            </div>

            <NewsletterForm />
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
            flex
            flex-col
            gap-8
            py-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <p
              className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.1em]
                text-[#f5eee6]/45
              "
            >
              Copyright © {year} JENTARA PVT LTD.
              All Rights Reserved.
            </p>

            <p
              className="
                mt-2
                text-[8px]
                uppercase
                tracking-[0.08em]
                text-[#f5eee6]/30
              "
            >
              Premium Streetwear • New Generation
            </p>
          </div>

          <Link
            href="/"
            aria-label="JENTARA Home"
            className="group"
          >
            <div
              className="
                flex
                flex-col
                items-start
                lg:items-end
              "
            >
              <span
                className="
                  mb-[-6px]
                  mr-3
                  font-serif
                  text-xl
                  leading-none
                  text-[#f5eee6]/80
                  transition
                  group-hover:scale-110
                "
              >
                •
              </span>

              <span
                className="
                  font-serif
                  text-5xl
                  font-medium
                  leading-none
                  tracking-[-0.09em]
                  text-[#f5eee6]
                  transition-opacity
                  duration-300
                  group-hover:opacity-70
                  sm:text-6xl
                "
              >
                Jentara
              </span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}