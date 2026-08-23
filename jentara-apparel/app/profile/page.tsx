// app/profile/page.tsx

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/supabase/auth";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  async function handleLogout() {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50">
            Loading account
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const metadata = user.user_metadata ?? {};

  const firstName =
    metadata.first_name ??
    metadata.firstName ??
    "";

  const lastName =
    metadata.last_name ??
    metadata.lastName ??
    "";

  const displayName =
    [firstName, lastName]
      .filter(Boolean)
      .join(" ") ||
    user.email?.split("@")[0] ||
    "JENTARA Customer";

  const initial =
    displayName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
              JENTARA / ACCOUNT
            </p>
          </div>

          <div className="mt-6">
            <h1 className="font-serif text-[48px] leading-[0.9] tracking-[-0.06em] sm:text-[68px] lg:text-[78px]">
              Account
            </h1>

            <p className="mt-4 max-w-xl text-[12px] leading-6 text-[#451713]/55">
              Your JENTARA profile, orders and saved
              pieces — all in one place.
            </p>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-[#451713]/15 bg-[#efe4d9] p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#451713] font-serif text-xl text-[#f5ede4]">
                  {initial}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-serif text-xl tracking-[-0.03em]">
                    {displayName}
                  </p>

                  <p className="mt-1 truncate text-[10px] text-[#451713]/55">
                    {user.email}
                  </p>
                </div>
              </div>

              <nav className="mt-8 border-t border-[#451713]/15 pt-5">
                <div className="space-y-1">
                  <Link
                    href="/profile"
                    className="flex min-h-11 items-center justify-between border-b border-[#451713]/10 px-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                  >
                    Profile
                    <span>→</span>
                  </Link>

                  <Link
                    href="/orders"
                    className="flex min-h-11 items-center justify-between border-b border-[#451713]/10 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-55"
                  >
                    Orders
                    <span>→</span>
                  </Link>

                  <Link
                    href="/wishlist"
                    className="flex min-h-11 items-center justify-between border-b border-[#451713]/10 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-55"
                  >
                    Wishlist
                    <span>→</span>
                  </Link>

                  <Link
                    href="/cart"
                    className="flex min-h-11 items-center justify-between border-b border-[#451713]/10 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-55"
                  >
                    Cart
                    <span>→</span>
                  </Link>

                  <Link
                    href="/profile/addresses"
                    className="flex min-h-11 items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-55"
                  >
                    Addresses
                    <span>→</span>
                  </Link>
                </div>
              </nav>

              <div className="mt-7 border-t border-[#451713]/15 pt-5">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex min-h-11 w-full items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#451713]/60 transition hover:text-[#451713]"
                >
                  Logout
                  <span>→</span>
                </button>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="border border-[#451713]/15 bg-[#f8f2ec] p-6 sm:p-8 lg:p-10">
              <div className="border-b border-[#451713]/15 pb-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50">
                  Profile
                </p>

                <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                  Personal information
                </h2>

                <p className="mt-2 max-w-xl text-[12px] leading-6 text-[#451713]/55">
                  Keep your JENTARA account information up to
                  date.
                </p>
              </div>

              <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                    First name
                  </p>

                  <p className="mt-3 border-b border-[#451713]/20 pb-3 text-[14px]">
                    {firstName || "Not added"}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                    Last name
                  </p>

                  <p className="mt-3 border-b border-[#451713]/20 pb-3 text-[14px]">
                    {lastName || "Not added"}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                    Email
                  </p>

                  <p className="mt-3 break-all border-b border-[#451713]/20 pb-3 text-[14px]">
                    {user.email ?? "Not available"}
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-[#451713]/15 pt-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50">
                  Your JENTARA
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/orders"
                    className="group border border-[#451713]/15 p-5 transition hover:bg-[#efe4d9]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl tracking-[-0.03em]">
                        Orders
                      </span>

                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-[#451713]/55">
                      View purchases and track deliveries.
                    </p>
                  </Link>

                  <Link
                    href="/wishlist"
                    className="group border border-[#451713]/15 p-5 transition hover:bg-[#efe4d9]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl tracking-[-0.03em]">
                        Wishlist
                      </span>

                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-[#451713]/55">
                      Return to the pieces you saved.
                    </p>
                  </Link>

                  <Link
                    href="/cart"
                    className="group border border-[#451713]/15 p-5 transition hover:bg-[#efe4d9]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl tracking-[-0.03em]">
                        Shopping bag
                      </span>

                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-[#451713]/55">
                      Review the pieces waiting for checkout.
                    </p>
                  </Link>

                  <Link
                    href="/profile/addresses"
                    className="group border border-[#451713]/15 p-5 transition hover:bg-[#efe4d9]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl tracking-[-0.03em]">
                        Addresses
                      </span>

                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-[#451713]/55">
                      Manage your delivery addresses.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}