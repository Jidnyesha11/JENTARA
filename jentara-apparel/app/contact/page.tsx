// app/contact/page.tsx

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const navItems = [
  {
    label: "HOME",
    href: "/",
  },
  {
    label: "SHOP",
    href: "/shop",
  },
  {
    label: "WOMEN",
    href: "/shop?category=women",
  },
  {
    label: "MEN",
    href: "/shop?category=men",
  },
  {
    label: "ABOUT US",
    href: "/about",
  },
  {
    label: "CONTACT US",
    href: "/contact",
  },
];

const contactDetails = [
  {
    number: "01",
    label: "WHATSAPP SUPPORT",
    value: "+91 9284191297",
    href: "https://wa.me/919284191297",
  },
  {
    number: "02",
    label: "EMAIL",
    value: "support@jentara.in",
    href: "mailto:support@jentara.in",
  },
  {
    number: "03",
    label: "OUR LOCATION",
    value: "MUMBAI - 400101",
    href: "#location",
  },
];

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  function handleChange(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setSending(true);

      /*
       * The form is currently UI-ready.
       * Connect this handler to your email/API service
       * when the backend email workflow is added.
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      alert(
        "Thank you for contacting JENTARA. We will get back to you soon."
      );

      setForm({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "CONTACT FORM ERROR:",
        error
      );

      alert(
        "Unable to send your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#4b1712]">
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-[#4b1712]/20 bg-[#f5ede4]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8">
          <div className="relative flex h-[72px] items-center justify-between md:h-[88px]">
            {/* Mobile Menu */}
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen(
                  (previous) => !previous
                )
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-[#4b1712]
                md:hidden
              "
            >
              <span className="text-xl">
                {menuOpen ? "×" : "☰"}
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="flex items-center gap-6 lg:gap-8">
                {navItems.map((item) => {
                  const active =
                    item.href === "/contact";

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        relative
                        text-[9px]
                        font-semibold
                        tracking-[0.13em]
                        transition-opacity
                        duration-300
                        hover:opacity-50
                        lg:text-[10px]
                        ${
                          active
                            ? "after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-[#4b1712]"
                            : ""
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Logo */}
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
                  md:text-[43px]
                "
              >
                jentara
              </span>
            </Link>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-4 md:gap-5">
              <Link
                href="/search"
                aria-label="Search"
                className="
                  text-lg
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                "
              >
                ⌕
              </Link>

              <Link
                href="/cart"
                aria-label="Cart"
                className="
                  text-lg
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                "
              >
                ♡
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              md:hidden
              ${
                menuOpen
                  ? "max-h-[400px] border-t border-[#4b1712]/15 py-5"
                  : "max-h-0"
              }
            `}
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="
                    text-[10px]
                    font-semibold
                    tracking-[0.18em]
                  "
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        {/* =======================================================
            HERO
        ======================================================= */}
        <section className="border-b border-[#4b1712]/25 py-10 md:py-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#4b1712]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.35em]">
              Star of the New Generation
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h1
              className="
                font-serif
                text-[62px]
                leading-[0.82]
                tracking-[-0.07em]
                sm:text-[80px]
                md:text-[105px]
                lg:text-[125px]
              "
            >
              CONTACT US
            </h1>

            <p className="max-w-[280px] text-[11px] leading-6 text-[#4b1712]/60 md:pb-2 md:text-right">
              Questions, ideas,
              <br />
              collaborations or simply
              <br />
              want to say hello?
            </p>
          </div>
        </section>

        {/* =======================================================
            MAIN CONTACT SECTION
        ======================================================= */}
        <section className="py-12 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Left Side */}
            <div>
              <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#4b1712]/50">
                We Are Always Ready
              </p>

              <h2
                className="
                  max-w-[620px]
                  font-serif
                  text-[43px]
                  leading-[0.92]
                  tracking-[-0.05em]
                  sm:text-[54px]
                  md:text-[62px]
                "
              >
                We are always
                <br />
                ready to help you
                <br />
                and answer your
                <br />
                questions.
              </h2>

              <p className="mt-8 max-w-[570px] text-[12px] leading-[1.9] text-[#4b1712]/70 md:text-[13px]">
                We&apos;re always excited to hear from our community.
                Whether you need assistance with an order, have
                inquiries about our collections, or want to
                collaborate with JENTARA, our team is here to help.
              </p>

              {/* Contact Details */}
              <div className="mt-10 border-t border-[#4b1712]/25">
                {contactDetails.map(
                  (contact) => (
                    <a
                      key={contact.number}
                      href={contact.href}
                      target={
                        contact.href.startsWith(
                          "http"
                        )
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        contact.href.startsWith(
                          "http"
                        )
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        border-b
                        border-[#4b1712]/25
                        py-5
                        transition-all
                        duration-300
                        hover:pl-2
                      "
                    >
                      <div className="flex items-center gap-5">
                        <span className="font-serif text-xl text-[#4b1712]/50">
                          {contact.number}
                        </span>

                        <div>
                          <p className="text-[8px] font-semibold uppercase tracking-[0.2em]">
                            {contact.label}
                          </p>

                          <p className="mt-1 text-[12px] text-[#4b1712]/70">
                            {contact.value}
                          </p>
                        </div>
                      </div>

                      <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  )
                )}
              </div>

              {/* Support Hours */}
              <div className="mt-9 flex items-start gap-4">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#4b1712]" />

                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.25em]">
                    Support Hours
                  </p>

                  <p className="mt-2 text-[11px] leading-6 text-[#4b1712]/60">
                    MON - FRI
                    <br />
                    10:00 AM - 7:00 PM
                    <br />
                    Support Team
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <div
                className="
                  rounded-[22px]
                  border
                  border-[#4b1712]/20
                  bg-[#f9f3ec]
                  p-6
                  shadow-[0_18px_50px_rgba(75,23,18,0.08)]
                  sm:p-8
                  md:p-10
                "
              >
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#4b1712]/50">
                      Get In Touch
                    </p>

                    <h2
                      className="
                        mt-3
                        font-serif
                        text-[37px]
                        leading-none
                        tracking-[-0.04em]
                      "
                    >
                      Let&apos;s talk.
                    </h2>
                  </div>

                  <span className="font-serif text-3xl text-[#4b1712]/20">
                    01
                  </span>
                </div>

                <p className="mb-8 max-w-[440px] text-[11px] leading-6 text-[#4b1712]/60">
                  Have a question, collaboration idea, or simply
                  want to connect? Send us a message and our team
                  will get back to you.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="
                        mb-2
                        block
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                      "
                    >
                      Full Name
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(event) =>
                        handleChange(
                          "fullName",
                          event.target.value
                        )
                      }
                      placeholder="Your name"
                      className="
                        w-full
                        border-0
                        border-b
                        border-[#4b1712]/30
                        bg-transparent
                        px-0
                        py-3
                        text-[13px]
                        text-[#4b1712]
                        outline-none
                        placeholder:text-[#4b1712]/30
                        focus:border-[#4b1712]
                      "
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-2
                        block
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                      "
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        handleChange(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="you@example.com"
                      className="
                        w-full
                        border-0
                        border-b
                        border-[#4b1712]/30
                        bg-transparent
                        px-0
                        py-3
                        text-[13px]
                        text-[#4b1712]
                        outline-none
                        placeholder:text-[#4b1712]/30
                        focus:border-[#4b1712]
                      "
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="
                        mb-2
                        block
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                      "
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={(event) =>
                        handleChange(
                          "subject",
                          event.target.value
                        )
                      }
                      placeholder="How can we help?"
                      className="
                        w-full
                        border-0
                        border-b
                        border-[#4b1712]/30
                        bg-transparent
                        px-0
                        py-3
                        text-[13px]
                        text-[#4b1712]
                        outline-none
                        placeholder:text-[#4b1712]/30
                        focus:border-[#4b1712]
                      "
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="
                        mb-2
                        block
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                      "
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(event) =>
                        handleChange(
                          "message",
                          event.target.value
                        )
                      }
                      placeholder="Write your message..."
                      rows={5}
                      className="
                        w-full
                        resize-none
                        border-0
                        border-b
                        border-[#4b1712]/30
                        bg-transparent
                        px-0
                        py-3
                        text-[13px]
                        leading-6
                        text-[#4b1712]
                        outline-none
                        placeholder:text-[#4b1712]/30
                        focus:border-[#4b1712]
                      "
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-between
                      bg-[#4b1712]
                      px-6
                      py-4
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-[#f5ede4]
                      transition-all
                      duration-300
                      hover:bg-[#641f18]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    <span>
                      {sending
                        ? "Sending..."
                        : "Send Message"}
                    </span>

                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            LOCATION / SUPPORT
        ======================================================= */}
        <section
          id="location"
          className="border-t border-[#4b1712]/30 py-12 md:py-20"
        >
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#4b1712]/50">
                Find Us
              </p>

              <h2
                className="
                  mt-4
                  font-serif
                  text-[45px]
                  leading-[0.9]
                  tracking-[-0.05em]
                  sm:text-[55px]
                "
              >
                Mumbai,
                <br />
                India.
              </h2>

              <p className="mt-6 text-[11px] leading-6 text-[#4b1712]/60">
                MUMBAI - 400101
              </p>
            </div>

            <div
              className="
                group
                relative
                min-h-[270px]
                overflow-hidden
                rounded-[20px]
                border
                border-[#4b1712]/15
                bg-[#ddd7d0]
              "
            >
              {/* Editorial map-style placeholder */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-[12%] top-[22%] h-px w-[75%] rotate-[15deg] bg-[#4b1712]" />
                <div className="absolute left-[5%] top-[50%] h-px w-[90%] rotate-[-8deg] bg-[#4b1712]" />
                <div className="absolute left-[30%] top-[10%] h-[90%] w-px rotate-[18deg] bg-[#4b1712]" />
                <div className="absolute left-[68%] top-[5%] h-[95%] w-px rotate-[-25deg] bg-[#4b1712]" />
              </div>

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#4b1712] bg-[#f5ede4]">
                  <span className="text-xl">
                    ●
                  </span>
                </div>

                <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.3em]">
                  JENTARA
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-[#4b1712]/50">
                  Mumbai
                </p>
              </div>

              <div className="absolute bottom-5 left-5">
                <span className="bg-[#4b1712] px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-[#f5ede4]">
                  Our Location
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            RESPONSE / WHATSAPP CTA
        ======================================================= */}
        <section className="pb-14 md:pb-20">
          <div className="overflow-hidden rounded-[22px] bg-[#4b1712] px-7 py-12 text-[#f5ede4] sm:px-10 md:px-16 md:py-16">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.35em] text-[#f5ede4]/55">
                  Need A Faster Reply?
                </p>

                <h2
                  className="
                    mt-4
                    max-w-[700px]
                    font-serif
                    text-[42px]
                    leading-[0.92]
                    tracking-[-0.05em]
                    sm:text-[52px]
                    md:text-[64px]
                  "
                >
                  Talk to us directly.
                </h2>

                <p className="mt-6 max-w-[500px] text-[11px] leading-6 text-[#f5ede4]/65">
                  For order assistance, quick questions, or
                  anything urgent, reach our support team directly
                  on WhatsApp.
                </p>
              </div>

              <a
                href="https://wa.me/919284191297"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-7
                  border
                  border-[#f5ede4]/40
                  px-6
                  py-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  transition-all
                  duration-300
                  hover:bg-[#f5ede4]
                  hover:text-[#4b1712]
                "
              >
                WhatsApp Support

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* =======================================================
            FINAL BRAND LINE
        ======================================================= */}
        <section className="border-t border-[#4b1712]/30 pb-16 pt-10 text-center md:pb-20">
          <p className="font-serif text-[30px] tracking-[-0.04em] sm:text-[38px]">
            Star of the New Generation
          </p>

          <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.35em] text-[#4b1712]/45">
            JENTARA APPAREL
          </p>
        </section>
      </div>
    </main>
  );
}