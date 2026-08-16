
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Smartphone,
} from "lucide-react";

import {
  sendOtp,
  signInWithGoogle,
} from "@/lib/supabase/auth";

export default function PhoneLoginPage() {
  const router = useRouter();

  const [phone, setPhone] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  function handlePhoneChange(
    value: string
  ) {
    setPhone(
      value
        .replace(/\D/g, "")
        .slice(0, 10)
    );
  }

  async function handleSendOtp(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (phone.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    try {
      setLoading(true);

      const { error: otpError } =
        await sendOtp(phone);

      if (otpError) {
        throw otpError;
      }

      router.push(
        `/otp?phone=${encodeURIComponent(
          phone
        )}`
      );
    } catch (otpError: unknown) {
      console.error(
        "SEND OTP ERROR:",
        otpError
      );

      if (
        otpError &&
        typeof otpError === "object" &&
        "message" in otpError
      ) {
        setError(
          String(
            (
              otpError as {
                message: string;
              }
            ).message
          )
        );
      } else {
        setError(
          "We couldn't send the OTP. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setError("");
      setGoogleLoading(true);

      const { error: googleError } =
        await signInWithGoogle();

      if (googleError) {
        throw googleError;
      }
    } catch (googleError: unknown) {
      console.error(
        "GOOGLE LOGIN ERROR:",
        googleError
      );

      setError(
        googleError &&
          typeof googleError === "object" &&
          "message" in googleError
          ? String(
              (
                googleError as {
                  message: string;
                }
              ).message
            )
          : "Google sign-in could not be started."
      );

      setGoogleLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5ede4]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* Editorial Side */}

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
              -left-40
              -top-40
              h-[550px]
              w-[550px]
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              -right-40
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
              Quick Access
            </p>

            <h1
              className="
                font-serif
                text-[70px]
                leading-[0.8]
                tracking-[-0.07em]
                xl:text-[96px]
              "
            >
              SIGN IN
              <br />
              WITHOUT
              <br />
              PASSWORDS.
            </h1>

            <p className="mt-8 max-w-sm text-sm leading-7 text-white/55">
              Enter your mobile number
              and receive a secure one-time
              verification code.
            </p>

            <div className="mt-10 space-y-3">
              {[
                "No Password Needed",
                "Secure OTP Verification",
                "Fast Account Access",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-[9px] uppercase tracking-[0.15em] text-white/45"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15">
                    <Check size={11} />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-[8px] uppercase tracking-[0.18em] text-white/25">
            © {new Date().getFullYear()} JENTARA
          </p>
        </section>

        {/* Form */}

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

              <div className="mt-5 h-px w-10 bg-[#451713]" />
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
                md:p-10
              "
            >
              <div className="mb-8">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                  Quick Access
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
                  Sign In With OTP
                </h2>

                <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#151a2a]/40">
                  Secure. Simple. Password-free.
                </p>
              </div>

              <form
                onSubmit={handleSendOtp}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="phone"
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
                    Mobile Number
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
                    <Smartphone
                      size={17}
                      className="shrink-0 text-[#451713]/40"
                    />

                    <span className="border-r border-[#451713]/10 pr-3 text-sm font-medium text-[#451713]">
                      +91
                    </span>

                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) =>
                        handlePhoneChange(
                          event.target.value
                        )
                      }
                      placeholder="XXXXX XXXXX"
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        text-sm
                        tracking-[0.15em]
                        text-[#151a2a]
                        outline-none
                        placeholder:text-[#151a2a]/30
                      "
                    />

                    {phone.length ===
                      10 && (
                      <Check
                        size={17}
                        className="shrink-0 text-green-700"
                      />
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-[8px] uppercase tracking-[0.12em] text-[#151a2a]/35">
                      India +91
                    </p>

                    <p className="text-[8px] tabular-nums uppercase tracking-[0.12em] text-[#151a2a]/35">
                      {phone.length}/10
                    </p>
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
                  disabled={
                    loading ||
                    phone.length !== 10
                  }
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
                    disabled:opacity-40
                  "
                >
                  <span>
                    {loading
                      ? "Sending OTP..."
                      : "Send OTP"}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <ArrowRight size={15} />
                  </span>
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <span className="h-px flex-1 bg-[#451713]/10" />
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#151a2a]/35">
                  Or
                </span>
                <span className="h-px flex-1 bg-[#451713]/10" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-[#451713]/12
                  bg-white/50
                  px-4
                  py-3.5
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#451713]
                  transition
                  hover:bg-white
                  disabled:opacity-50
                "
              >
                <span className="font-serif text-base font-bold">
                  G
                </span>

                {googleLoading
                  ? "Opening Google..."
                  : "Continue With Google"}
              </button>

              <div className="mt-7 border-t border-[#451713]/10 pt-6 text-center">
                <p className="text-[9px] uppercase tracking-[0.12em] text-[#151a2a]/40">
                  Prefer a password?
                </p>

                <Link
                  href="/login"
                  className="
                    mt-2
                    inline-block
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#451713]
                    underline
                    underline-offset-4
                  "
                >
                  Sign In With Email →
                </Link>
              </div>

              <p className="mt-6 text-center text-[8px] leading-5 text-[#151a2a]/35">
                By continuing, you agree to
                JENTARA&apos;s Terms &
                Conditions and Privacy Policy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

