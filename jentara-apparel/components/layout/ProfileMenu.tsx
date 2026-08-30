
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/supabase/auth";
import { supabase } from "@/lib/supabase/client";

type AdminRole =
  | "support"
  | "operations"
  | "admin"
  | "super_admin";

const ADMIN_ROLES = new Set<AdminRole>([
  "support",
  "operations",
  "admin",
  "super_admin",
]);

function isAdminRole(
  value: string | null,
): value is AdminRole {
  return ADMIN_ROLES.has(
    value as AdminRole,
  );
}

function roleLabel(
  role: AdminRole,
): string {
  return role
    .replace("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

export default function ProfileMenu() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [open, setOpen] =
    useState(false);

  const [role, setRole] =
    useState<string | null>(null);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRole() {
      if (!user) {
        setRole(null);
        return;
      }

      const { data, error } =
        await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

      if (cancelled) {
        return;
      }

      if (error) {
        console.error(
          "PROFILE ROLE ERROR:",
          error,
        );
        setRole(null);
        return;
      }

      setRole(
        data?.role
          ? String(
              data.role,
            ).toLowerCase()
          : null,
      );
    }

    void loadRole();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent,
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  useEffect(() => {
    function handleEscape(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  async function handleLogout() {
    try {
      setOpen(false);

      await signOut();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(
        "PROFILE LOGOUT ERROR:",
        error,
      );
    }
  }

  const email =
    user?.email ?? "";

  const initial =
    email.charAt(0).toUpperCase() ||
    "J";

  const hasAdminAccess =
    isAdminRole(role);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        type="button"
        aria-label={
          user
            ? "Open account menu"
            : "Open login menu"
        }
        aria-expanded={open}
        onClick={() =>
          setOpen(
            (current) => !current,
          )
        }
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-[#451713]/20
          text-[#451713]
          transition-all
          duration-300
          hover:border-[#451713]
          hover:bg-[#451713]
          hover:text-[#f5ede4]
          focus:outline-none
          focus:ring-1
          focus:ring-[#451713]
          focus:ring-offset-2
          focus:ring-offset-[#f5ede4]
        "
      >
        {user ? (
          <span className="font-serif text-sm">
            {initial}
          </span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="8"
              r="3.5"
            />

            <path
              d="M5.5 20c.8-3.3 3.1-5 6.5-5s5.7 1.7 6.5 5"
              strokeLinecap="round"
            />
          </svg>
        )}

        {hasAdminAccess && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-4
              w-4
              items-center
              justify-center
              rounded-full
              border
              border-[#f5ede4]
              bg-[#451713]
              text-[7px]
              text-[#f5ede4]
            "
            title={`${roleLabel(role)} access`}
            aria-label={`${roleLabel(role)} access`}
          >
            ◈
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+14px)]
            z-[100]
            w-[285px]
            origin-top-right
            border
            border-[#451713]/15
            bg-[#f8f0e7]
            p-2
            shadow-[0_18px_50px_rgba(69,23,19,0.14)]
          "
        >
          <span
            className="
              absolute
              right-4
              top-[-6px]
              h-3
              w-3
              rotate-45
              border-l
              border-t
              border-[#451713]/15
              bg-[#f8f0e7]
            "
          />

          {!loading && user ? (
            <>
              <div className="border-b border-[#451713]/10 px-4 py-4">
                <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/45">
                  Your account
                </p>

                <p className="mt-2 truncate text-sm font-medium">
                  {email}
                </p>

                {hasAdminAccess && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center bg-[#451713] text-[8px] text-[#f5ede4]">
                      ◈
                    </span>

                    <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#451713]/55">
                      {roleLabel(
                        role,
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="py-2">
                <Link
                  href="/profile"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    transition-colors
                    hover:bg-[#451713]
                    hover:text-[#f5ede4]
                  "
                >
                  <span>
                    My Profile
                  </span>

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/orders"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    transition-colors
                    hover:bg-[#451713]
                    hover:text-[#f5ede4]
                  "
                >
                  <span>
                    My Orders
                  </span>

                  <span>→</span>
                </Link>

                <Link
                  href="/profile/addresses"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    transition-colors
                    hover:bg-[#451713]
                    hover:text-[#f5ede4]
                  "
                >
                  <span>
                    Addresses
                  </span>

                  <span>→</span>
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    transition-colors
                    hover:bg-[#451713]
                    hover:text-[#f5ede4]
                  "
                >
                  <span>
                    Wishlist
                  </span>

                  <span>→</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    transition-colors
                    hover:bg-[#451713]
                    hover:text-[#f5ede4]
                  "
                >
                  <span>
                    Shopping Cart
                  </span>

                  <span>→</span>
                </Link>

                {hasAdminAccess && (
                  <div className="mt-2 border-t border-[#451713]/10 pt-2">
                    <Link
                      href="/admin"
                      onClick={() =>
                        setOpen(false)
                      }
                      className="
                        group
                        flex
                        min-h-12
                        items-center
                        justify-between
                        bg-[#451713]
                        px-4
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-[#f5ede4]
                        transition
                        hover:bg-[#5d211b]
                      "
                    >
                      <span className="flex items-center gap-2">
                        <span>
                          ◈
                        </span>
                        Admin Panel
                      </span>

                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              <div className="border-t border-[#451713]/10 p-2">
                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-4
                    py-3.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#451713]/55
                    transition-colors
                    hover:bg-[#451713]
                    hover:text-[#f5ede4]
                  "
                >
                  <span>
                    Logout
                  </span>

                  <span>↗</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative px-4 py-5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/45">
                  Welcome to JENTARA
                </p>

                <h3 className="mt-2 font-serif text-2xl tracking-[-0.03em]">
                  Your account.
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-[#451713]/55">
                  Sign in to view orders,
                  save favourites and
                  manage your account.
                </p>
              </div>

              <div className="space-y-2 border-t border-[#451713]/10 p-2">
                <Link
                  href="/login"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    min-h-12
                    items-center
                    justify-between
                    bg-[#451713]
                    px-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#f5ede4]
                    transition-colors
                    hover:bg-[#5d211b]
                  "
                >
                  <span>
                    Login
                  </span>

                  <span className="text-base">
                    →
                  </span>
                </Link>

                <Link
                  href="/register"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    min-h-12
                    items-center
                    justify-between
                    border
                    border-[#451713]
                    px-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#451713]
                    transition-all
                    hover:bg-[#451713]
                    hover:text-[#f5ede4]
                  "
                >
                  <span>
                    Create Account
                  </span>

                  <span className="text-base">
                    →
                  </span>
                </Link>
              </div>

              <div className="border-t border-[#451713]/10 px-4 py-3">
                <p className="text-center text-[8px] uppercase tracking-[0.15em] text-[#451713]/35">
                  Shop JENTARA with your account
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

