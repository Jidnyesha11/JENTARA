// components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ProfileMenu from "@/components/layout/ProfileMenu";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className="
        sticky
        top-0
        z-[80]
        border-b
        border-[#451713]/10
        bg-[#f5ede4]/95
        backdrop-blur-md
      "
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        <div
          className="
            relative
            flex
            h-[72px]
            items-center
            justify-between
            md:h-[88px]
          "
        >
          {/* Desktop Navigation */}

          <nav className="hidden md:block">
            <div className="flex items-center gap-7 lg:gap-9">
              {navigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative
                      whitespace-nowrap
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.13em]
                      transition-all
                      duration-300
                      ${
                        active
                          ? "text-[#451713]"
                          : "text-[#451713]/55 hover:text-[#451713]"
                      }
                    `}
                  >
                    {item.label}

                    <span
                      className={`
                        absolute
                        -bottom-2
                        left-0
                        h-px
                        bg-[#451713]
                        transition-all
                        duration-300
                        ${
                          active
                            ? "w-full"
                            : "w-0"
                        }
                      `}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile Left */}

          <button
            type="button"
            aria-label={
              mobileMenuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen(
                (previous) => !previous,
              )
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              text-[#451713]
              md:hidden
            "
          >
            <span
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-[5px]
              "
            >
              <span
                className={`
                  block
                  h-px
                  w-5
                  bg-[#451713]
                  transition-transform
                  duration-300
                  ${
                    mobileMenuOpen
                      ? "translate-y-[3px] rotate-45"
                      : ""
                  }
                `}
              />

              <span
                className={`
                  block
                  h-px
                  w-5
                  bg-[#451713]
                  transition-transform
                  duration-300
                  ${
                    mobileMenuOpen
                      ? "-translate-y-[3px] -rotate-45"
                      : ""
                  }
                `}
              />
            </span>
          </button>

          {/* Logo */}

          <Link
            href="/"
            aria-label="JENTARA Home"
            className="
              absolute
              left-1/2
              top-1/2
              z-10
              -translate-x-1/2
              -translate-y-1/2
              whitespace-nowrap
            "
          >
            <span
              className="
                font-serif
                text-[34px]
                font-semibold
                lowercase
                leading-none
                tracking-[-0.09em]
                text-[#451713]
                sm:text-[38px]
                md:text-[46px]
              "
            >
              jentara
            </span>
          </Link>

          {/* Right Actions */}

          <div
            className="
              ml-auto
              flex
              shrink-0
              items-center
              gap-2
              sm:gap-4
              md:gap-5
            "
          >
            {/* Search */}

            <Link
              href="/search"
              aria-label="Search products"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-[#451713]
                transition-opacity
                hover:opacity-50
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[19px] w-[19px]"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                />

                <path
                  d="m16 16 4 4"
                  strokeLinecap="round"
                />
              </svg>
            </Link>

            {/* Desktop Wishlist */}

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="
                hidden
                h-10
                w-10
                items-center
                justify-center
                text-[#451713]
                transition-opacity
                hover:opacity-50
                md:flex
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[20px] w-[20px]"
                aria-hidden="true"
              >
                <path
                  d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Desktop Cart */}

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="
                hidden
                h-10
                w-10
                items-center
                justify-center
                text-[#451713]
                transition-opacity
                hover:opacity-50
                md:flex
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[19px] w-[19px]"
                aria-hidden="true"
              >
                <path
                  d="M4 8h16l-1 12H5L4 8Z"
                  strokeLinejoin="round"
                />

                <path
                  d="M8 8a4 4 0 0 1 8 0"
                  strokeLinecap="round"
                />
              </svg>
            </Link>

            {/* Profile */}

            <ProfileMenu />
          </div>
        </div>

        {/* Mobile Navigation Drawer */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            md:hidden
            ${
              mobileMenuOpen
                ? "max-h-[520px] border-t border-[#451713]/10"
                : "max-h-0"
            }
          `}
        >
          <nav className="py-4">
            {navigation.map((item, index) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className={`
                    flex
                    min-h-12
                    items-center
                    justify-between
                    border-b
                    border-[#451713]/10
                    px-2
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    transition-colors
                    ${
                      active
                        ? "text-[#451713]"
                        : "text-[#451713]/60 hover:text-[#451713]"
                    }
                  `}
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span>
                    {item.label}
                  </span>

                  <span
                    className={`
                      text-base
                      ${
                        active
                          ? "opacity-100"
                          : "opacity-30"
                      }
                    `}
                  >
                    →
                  </span>
                </Link>
              );
            })}

            {/* Mobile shopping links */}

            <div className="grid grid-cols-2 gap-2 pt-4">
              <Link
                href="/wishlist"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="
                  border
                  border-[#451713]/15
                  px-4
                  py-4
                  text-center
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#451713]
                "
              >
                Wishlist
              </Link>

              <Link
                href="/cart"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="
                  border
                  border-[#451713]/15
                  px-4
                  py-4
                  text-center
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#451713]
                "
              >
                Cart
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}