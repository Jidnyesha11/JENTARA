"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [updated, setUpdated] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Your password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }

    try {
      setSaving(true);
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) throw updateError;
      setUpdated(true);
    } catch (updateError) {
      console.error("PASSWORD UPDATE ERROR:", updateError);
      setError(
        updateError instanceof Error
          ? updateError.message
          : "This reset link may have expired. Request a new password reset email and try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5ede4] px-5 py-12 text-[#451713] sm:px-8">
      <section className="w-full max-w-[460px]">
        <Link
          href="/"
          className="font-serif text-4xl tracking-[-0.08em]"
        >
          jentara
        </Link>

        {updated ? (
          <div className="mt-12 border-y border-[#451713]/15 py-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#451713]/45">
              ACCOUNT / PASSWORD UPDATED
            </p>
            <h1 className="mt-5 font-serif text-4xl tracking-[-0.06em]">
              You&apos;re all set.
            </h1>
            <p className="mt-4 text-[12px] leading-6 text-[#451713]/55">
              Your password has been updated. Sign in with your new password to
              continue.
            </p>
            <Link
              href="/login"
              className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#451713] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition hover:bg-[#32100d]"
            >
              Return to sign in
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-12 border-b border-[#451713]/15 pb-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#451713]/45">
                ACCOUNT / RECOVERY
              </p>
              <h1 className="mt-5 font-serif text-4xl tracking-[-0.06em] sm:text-5xl">
                Set a new password.
              </h1>
              <p className="mt-4 text-[12px] leading-6 text-[#451713]/55">
                Choose a new password for your JENTARA account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <label className="block text-[9px] font-semibold uppercase tracking-[0.2em]">
                New password
                <input
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-3 min-h-12 w-full border-b border-[#451713]/25 bg-transparent px-1 text-sm outline-none transition focus:border-[#451713]"
                />
              </label>

              <label className="block text-[9px] font-semibold uppercase tracking-[0.2em]">
                Confirm new password
                <input
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  className="mt-3 min-h-12 w-full border-b border-[#451713]/25 bg-transparent px-1 text-sm outline-none transition focus:border-[#451713]"
                />
              </label>

              {error && (
                <p role="alert" className="text-[11px] leading-5 text-red-800">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="flex min-h-12 w-full items-center justify-center bg-[#451713] px-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition hover:bg-[#32100d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Updating password..." : "Update password"}
              </button>
            </form>

            <Link
              href="/forgot-password"
              className="mt-7 inline-flex text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
            >
              Request another reset email
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
