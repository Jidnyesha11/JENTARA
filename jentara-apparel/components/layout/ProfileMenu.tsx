// components/layout/ProfileMenu.tsx

"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import { UserRound } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/supabase/auth";

export default function ProfileMenu() {
  const {
    user,
    loading,
  } = useAuth();

  const [
    open,
    setOpen,
  ] = useState(false);

  const menuRef =
    useRef<HTMLDivElement | null>(
      null
    );

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  async function handleLogout() {
    await signOut();

    setOpen(false);

    window.location.href = "/";
  }

  if (loading) {
    return (
      <div
        className="
          h-9
          w-9
          animate-pulse
          rounded-full
          bg-[#451713]/10
        "
      />
    );
  }

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setOpen((value) => !value)
        }
        aria-label="Account"
        aria-expanded={open}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-[#451713]/15
          text-[#451713]
          transition-all
          duration-300
          hover:border-[#451713]/40
          hover:bg-[#451713]/5
        "
      >
        <UserRound
          size={18}
          strokeWidth={1.7}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+14px)]
            w-[250px]
            overflow-hidden
            rounded-2xl
            border
            border-[#451713]/10
            bg-[#faf6f1]
            shadow-[0_20px_60px_rgba(69,23,19,0.18)]
          "
        >
          {user ? (
            <>
              <div className="border-b border-[#451713]/10 px-5 py-5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                  Signed In
                </p>

                <p className="mt-2 truncate text-sm font-medium text-[#151a2a]">
                  {user.email ??
                    "JENTARA Member"}
                </p>
              </div>

              <div className="p-2">
                <ProfileLink
                  href="/profile"
                  label="My Profile"
                  onClick={() =>
                    setOpen(false)
                  }
                />

                <ProfileLink
                  href="/orders"
                  label="My Orders"
                  onClick={() =>
                    setOpen(false)
                  }
                />

                <ProfileLink
                  href="/wishlist"
                  label="Wishlist"
                  onClick={() =>
                    setOpen(false)
                  }
                />

                <ProfileLink
                  href="/profile/addresses"
                  label="Addresses"
                  onClick={() =>
                    setOpen(false)
                  }
                />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    mt-1
                    w-full
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-red-700
                    transition
                    hover:bg-red-50
                  "
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-5 pb-3 pt-5">
                <p className="font-serif text-2xl tracking-[-0.04em] text-[#451713]">
                  Welcome to JENTARA
                </p>

                <p className="mt-2 text-[9px] uppercase leading-5 tracking-[0.12em] text-[#151a2a]/45">
                  Sign in to manage your
                  orders and wishlist.
                </p>
              </div>

              <div className="space-y-2 p-3">
                <Link
                  href="/login"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#451713]
                    px-4
                    py-3
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white
                    transition
                    hover:bg-[#32100d]
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#451713]/15
                    px-4
                    py-3
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#451713]
                    transition
                    hover:bg-[#451713]/5
                  "
                >
                  Create Account
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ProfileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        block
        rounded-xl
        px-4
        py-3
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.14em]
        text-[#151a2a]/65
        transition
        hover:bg-[#451713]/5
        hover:text-[#451713]
      "
    >
      {label}
    </Link>
  );
}