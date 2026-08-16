
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
  Phone,
  User,
} from "lucide-react";

import { signUp } from "@/lib/supabase/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  function handlePhoneChange(
    value: string
  ) {
    const digits =
      value.replace(/\D/g, "");

    setPhone(
      digits.slice(0, 10)
    );
  }

  async function handleRegister(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (
      phone.length > 0 &&
      phone.length !== 10
    ) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error: signUpError } =
        await signUp(
          email,
          password,
          {
            full_name:
              fullName.trim(),
            phone:
              phone.length === 10
                ? `+91${phone}`
                : undefined,
          }
        );

      if (signUpError) {
        throw signUpError;
      }

      if (data.session) {
        router.replace("/");
        router.refresh();
        return;
      }

      router.push(
        `/login?registered=true`
      );
    } catch (registerError: unknown) {
      console.error(
        "REGISTER ERROR:",
        registerError
      );

      if (
        registerError &&
        typeof registerError === "object" &&
        "message" in registerError
      ) {
        setError(
          String(
            (
              registerError as {
                message: string;
              }
            ).message
          )
        );
      } else {
        setError(
          "Unable to create your account. Please try again."
        );
      }
    } finally {
      setLoading(false);
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
              -right-40
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
              -left-40
              h-[500px]
              w-[500px]
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
              Become a Member
            </p>

            <h1
              className="
                font-serif
                text-[72px]
                leading-[0.8]
                tracking-[-0.07em]
                xl:text-[94px]
              "
            >
              JOIN THE
              <br />
              NEW
              <br />
              GENERATION.
            </h1>

            <p className="mt-8 max-w-sm text-sm leading-7 text-white/55">
              Create your JENTARA account
              and keep your orders, wishlist
              and personal style all in one
              place.
            </p>

            <div className="mt-10 grid max-w-md grid-cols-2 gap-3">
              {[
                "Exclusive Drops",
                "Early Access",
                "Saved Wishlist",
                "Easy Returns",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    border
                    border-white/10
                    px-4
                    py-4
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-white/45
                  "
                >
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
          <div className="w-full max-w-[470px]">
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
              "
            >
              <div className="mb-8">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                  New Member
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
                  Create Account
                </h2>

                <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#151a2a]/40">
                  Your JENTARA journey starts here.
                </p>
              </div>

              <form
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <AuthInput
                  id="full-name"
                  label="Full Name"
                  value={fullName}
                  onChange={setFullName}
                  placeholder="Your full name"
                  icon={<User size={16} />}
                  autoComplete="name"
                />

                <AuthInput
                  id="register-email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  icon={<Mail size={16} />}
                  autoComplete="email"
                />

                <AuthInput
                  id="phone"
                  label="Mobile Number"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="10-digit mobile number"
                  icon={<Phone size={16} />}
                  autoComplete="tel"
                />

                <PasswordInput
                  id="register-password"
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  visible={showPassword}
                  onToggle={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  autoComplete="new-password"
                />

                <PasswordInput
                  id="confirm-password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={
                    setConfirmPassword
                  }
                  visible={
                    showConfirmPassword
                  }
                  onToggle={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                  autoComplete="new-password"
                />

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
                    mt-3
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
                      ? "Creating Account..."
                      : "Create Account"}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <ArrowRight size={15} />
                  </span>
                </button>
              </form>

              <div className="mt-7 border-t border-[#451713]/10 pt-6 text-center">
                <p className="text-[9px] uppercase tracking-[0.12em] text-[#151a2a]/40">
                  Already a member?
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
                  Sign In →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
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
        {label}
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
        <span className="shrink-0 text-[#451713]/40">
          {icon}
        </span>

        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={placeholder}
          autoComplete={autoComplete}
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
  );
}

function PasswordInput({
  id,
  label,
  value,
  onChange,
  visible,
  onToggle,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
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
        {label}
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
        <Lock
          size={16}
          className="shrink-0 text-[#451713]/40"
        />

        <input
          id={id}
          type={
            visible
              ? "text"
              : "password"
          }
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder="••••••••"
          autoComplete={autoComplete}
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
          onClick={onToggle}
          aria-label={
            visible
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
          {visible ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
        </button>
      </div>
    </div>
  );
}