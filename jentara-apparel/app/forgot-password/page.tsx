
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
} from "lucide-react";

import {
  sendPasswordResetEmail,
} from "@/lib/supabase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [sent, setSent] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSent(false);

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    try {
      setLoading(true);

      const { error: resetError } =
        await sendPasswordResetEmail(
          email
        );

      if (resetError) {
        throw resetError;
      }

      setSent(true);
    } catch (resetError: unknown) {
      console.error(
        "PASSWORD RESET ERROR:",
        resetError
      );

      setError(
        resetError &&
          typeof resetError ===
            "object" &&
          "message" in
            resetError
          ? String(
              (
                resetError as {
                  message: string;
                }
              ).message
            )
          : "Unable to send the password reset email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5ede4]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-[#451713]
            px-10
            py-10
            text-[#f5ede4]
            lg:flex
            lg:flex-col
            lg:justify-between
            xl:px-16
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-40
              -top-40
              h-[550px]
              w-[550px]
              rounded-full
              border
              border-white/10
            "
          />

          <Link
            href="/"
            className="
              relative
              z-10
              w-fit
              font-serif
              text-4xl
              tracking-[-0.08em]
            "
          >
            jentara
          </Link>

          <div className="relative z-10 max-w-xl">
            <div className="mb-8 h-px w-12 bg-white/35" />

            <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.35em] text-white/45">
              Account Recovery
            </p>

            <h1
              className="
                font-serif
                text-[76px]
                leading-[0.8]
                tracking-[-0.07em]
              "
            >
              RESET
              <br />
              YOUR
              <br />
              ACCESS.
            </h1>

            <p className="mt-8 max-w-sm text-sm leading-7 text-white/55">
              Enter the email connected to
              your JENTARA account and
              we&apos;ll send you a secure
              password reset link.
            </p>
          </div>

          <p className="relative z-10 text-[8px] uppercase tracking-[0.18em] text-white/25">
            © {new Date().getFullYear()} JENTARA
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-[440px]">
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="
                  font-serif
                  text-4xl
                  tracking-[-0.08em]
                  text-[#451713]
                "
              >
                jentara
              </Link>
            </div>

            <div
              className="
                rounded-[28px]
                border
                border-[#451713]/10
                bg-[#faf6f1]
                p-6
                shadow-[0_25px_80px_rgba(69,23,19,0.10)]
                sm:p-9
              "
            >
              <Link
                href="/login"
                className="
                  mb-8
                  inline-flex
                  items-center
                  gap-2
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#451713]/50
                  transition
                  hover:text-[#451713]
                "
              >
                <ArrowLeft size={13} />
                Back to Login
              </Link>

              <div className="mb-8">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                  Account Recovery
                </p>

                <h2
                  className="
                    font-serif
                    text-4xl
                    leading-none
                    tracking-[-0.05em]
                    text-[#451713]
                    sm:text-5xl
                  "
                >
                  Forgot Password?
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#151a2a]/45">
                  No problem. We&apos;ll
                  send a secure reset link
                  to your email.
                </p>
              </div>

              {sent ? (
                <div
                  className="
                    rounded-2xl
                    border
                    border-green-900/10
                    bg-green-50
                    p-5
                  "
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-green-800">
                    Reset Email Sent
                  </p>

                  <p className="mt-3 text-sm leading-6 text-green-900/70">
                    Check your inbox for
                    the password reset link.
                    If you don&apos;t see it,
                    check your spam folder.
                  </p>

                  <Link
                    href="/login"
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-green-900
                      underline
                      underline-offset-4
                    "
                  >
                    Return to Login
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="reset-email"
                      className="
                        mb-2
                        block
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#451713]/55
                      "
                    >
                      Email Address
                    </label>

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-[#451713]/12
                        bg-white/60
                        px-4
                        py-3.5
                        transition
                        focus-within:border-[#451713]/50
                        focus-within:bg-white
                      "
                    >
                      <Mail
                        size={17}
                        className="shrink-0 text-[#451713]/40"
                      />

                      <input
                        id="reset-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(
                          event
                        ) =>
                          setEmail(
                            event.target
                              .value
                          )
                        }
                        placeholder="you@example.com"
                        className="
                          min-w-0
                          flex-1
                          bg-transparent
                          text-sm
                          text-[#151a2a]
                          outline-none
                          placeholder:text-[#151a2a]/30
                        "
                      />
                    </div>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="
                        rounded-xl
                        border
                        border-red-900/10
                        bg-red-50
                        px-4
                        py-3
                        text-xs
                        leading-5
                        text-red-800
                      "
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-full
                      bg-[#451713]
                      px-6
                      py-2
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-white
                      transition
                      hover:bg-[#32100d]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <span>
                      {loading
                        ? "Sending..."
                        : "Send Reset Link"}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      <ArrowRight size={15} />
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}