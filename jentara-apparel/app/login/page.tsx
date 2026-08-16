
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

import {
  signIn,
  signInWithGoogle,
} from "@/lib/supabase/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (!password) {
      setError(
        "Please enter your password."
      );
      return;
    }

    try {
      setLoading(true);

      const { error: signInError } =
        await signIn(
          email,
          password
        );

      if (signInError) {
        throw signInError;
      }

      router.replace("/");
      router.refresh();
    } catch (loginError: unknown) {
      console.error(
        "LOGIN ERROR:",
        loginError
      );

      if (
        loginError &&
        typeof loginError === "object" &&
        "message" in loginError
      ) {
        setError(
          String(
            (
              loginError as {
                message: string;
              }
            ).message
          )
        );
      } else {
        setError(
          "Unable to sign in. Please check your credentials and try again."
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
    } catch (googleLoginError: unknown) {
      console.error(
        "GOOGLE LOGIN ERROR:",
        googleLoginError
      );

      if (
        googleLoginError &&
        typeof googleLoginError === "object" &&
        "message" in googleLoginError
      ) {
        setError(
          String(
            (
              googleLoginError as {
                message: string;
              }
            ).message
          )
        );
      } else {
        setError(
          "Google sign-in could not be started."
        );
      }

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
              -left-32
              -top-32
              h-[500px]
              w-[500px]
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-48
              -right-32
              h-[600px]
              w-[600px]
              rounded-full
              border
              border-white/10
            "
          />

          <div className="relative z-10 flex items-center justify-between">
            <Link
              href="/"
              className="
                font-serif
                text-4xl
                tracking-[-0.08em]
              "
            >
              jentara
            </Link>

            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/45">
              <Sparkles size={13} />
              New Season
            </div>
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="mb-8 h-px w-12 bg-white/35" />

            <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.35em] text-white/45">
              Member Access
            </p>

            <h1
              className="
                font-serif
                text-[76px]
                leading-[0.8]
                tracking-[-0.07em]
                xl:text-[100px]
              "
            >
              WELCOME
              <br />
              BACK.
            </h1>

            <p className="mt-8 max-w-sm text-sm leading-7 text-white/55">
              Your wardrobe is waiting.
              Sign in to continue exploring
              JENTARA collections, orders and
              saved pieces.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Exclusive Drops",
                "Saved Wishlist",
                "Order Tracking",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    rounded-full
                    border
                    border-white/15
                    px-4
                    py-2
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-white/45
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">
              © {new Date().getFullYear()} JENTARA
            </p>
          </div>
        </section>

        {/* Form Side */}

        <section
          className="
            flex
            min-h-screen
            items-center
            justify-center
            px-5
            py-10
            sm:px-8
            lg:px-12
            xl:px-20
          "
        >
          <div className="w-full max-w-[440px]">
            {/* Mobile Brand */}

            <div className="mb-10 lg:hidden">
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
                  Member Access
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
                  Welcome Back
                </h2>

                <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#151a2a]/40">
                  Let&apos;s get you styled.
                </p>
              </div>

              <form
                onSubmit={handleLogin}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
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
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
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

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#451713]/55
                      "
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-[#451713]/50
                        transition
                        hover:text-[#451713]
                      "
                    >
                      Forgot Password?
                    </Link>
                  </div>

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
                    <Lock
                      size={17}
                      className="shrink-0 text-[#451713]/40"
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      placeholder="••••••••"
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

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="
                        shrink-0
                        text-[#451713]/45
                        transition
                        hover:text-[#451713]
                      "
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
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
                    transition-all
                    duration-300
                    hover:bg-[#32100d]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <span>
                    {loading
                      ? "Signing In..."
                      : "Continue"}
                  </span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                    "
                  >
                    <ArrowRight size={15} />
                  </span>
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <span className="h-px flex-1 bg-[#451713]/10" />
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#151a2a]/35">
                  Or continue with
                </span>
                <span className="h-px flex-1 bg-[#451713]/10" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/phone-login"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#451713]/12
                    bg-white/50
                    px-4
                    py-3.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.1em]
                    text-[#451713]
                    transition
                    hover:bg-white
                  "
                >
                  <span>📱</span>
                  OTP Login
                </Link>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#451713]/12
                    bg-white/50
                    px-4
                    py-3.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.1em]
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
                    ? "Opening..."
                    : "Google"}
                </button>
              </div>

              <div className="mt-8 border-t border-[#451713]/10 pt-7 text-center">
                <p className="text-[9px] uppercase tracking-[0.12em] text-[#151a2a]/40">
                  New to JENTARA?
                </p>

                <Link
                  href="/register"
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
                    transition
                    hover:opacity-60
                  "
                >
                  Create Account →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}