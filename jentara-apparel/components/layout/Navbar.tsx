// components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import CategoriesMenu from "@/components/layout/CategoriesMenu";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M20.8 8.8c0 5.1-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.8A4.7 4.7 0 0 1 8 4.1c1.4 0 2.8.7 4 2 1.2-1.3 2.6-2 4-2a4.7 4.7 0 0 1 4.8 4.7Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M5 8.5h14l-.8 11H5.8L5 8.5Z"
        strokeLinejoin="round"
      />

      <path
        d="M9 9V6.5a3 3 0 0 1 6 0V9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle
        cx="12"
        cy="8"
        r="3"
      />

      <path
        d="M5.5 20c.7-3.5 3-5.5 6.5-5.5s5.8 2 6.5 5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M4 7h16"
        strokeLinecap="round"
      />

      <path
        d="M4 12h16"
        strokeLinecap="round"
      />

      <path
        d="M4 17h16"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="m6 6 12 12"
        strokeLinecap="round"
      />

      <path
        d="m18 6-12 12"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
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
    <>
      <header
        className="
          sticky
          top-0
          z-[100]
          w-full
          border-b
          border-[#451713]/10
          bg-[#f5ede4]/95
          backdrop-blur-md
        "
      >
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-8">

          {/* Mobile Navbar */}

          <div
            className="
              grid
              h-[68px]
              grid-cols-[1fr_auto_1fr]
              items-center
              md:hidden
            "
          >
            {/* Menu */}

            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(true)
                }
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-[#451713]
                  transition-colors
                  hover:bg-[#451713]/5
                "
              >
                <MenuIcon />
              </button>
            </div>

            {/* Logo */}

            <Link
              href="/"
              aria-label="JENTARA Home"
              className="
                flex
                items-center
                justify-center
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
                "
              >
                jentara
              </span>
            </Link>

            {/* Mobile Actions */}

            <div className="flex items-center justify-end gap-1.5">
              <Link
                href="/shop"
                aria-label="Search products"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-[#451713]
                  transition-colors
                  hover:bg-[#451713]/5
                "
              >
                <SearchIcon />
              </Link>

              <Link
                href="/login"
                aria-label="Account"
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
                  transition-colors
                  hover:bg-[#451713]/5
                "
              >
                <UserIcon />
              </Link>
            </div>
          </div>

          {/* Desktop Navbar */}

          <div
            className="
              hidden
              h-[82px]
              grid-cols-[1fr_auto_1fr]
              items-center
              md:grid
            "
          >
            {/* Desktop Navigation */}

            <nav aria-label="Main navigation">
              <div className="flex items-center gap-7 lg:gap-9">

                <Link
                  href="/"
                  className={`
                    relative
                    whitespace-nowrap
                    py-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    transition-colors
                    duration-300
                    ${
                      isActive("/")
                        ? "text-[#451713]"
                        : "text-[#451713]/55 hover:text-[#451713]"
                    }
                  `}
                >
                  Home

                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-px
                      bg-[#451713]
                      transition-all
                      duration-300
                      ${
                        isActive("/")
                          ? "w-full"
                          : "w-0"
                      }
                    `}
                  />
                </Link>

                <Link
                  href="/shop"
                  className={`
                    relative
                    whitespace-nowrap
                    py-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    transition-colors
                    duration-300
                    ${
                      isActive("/shop")
                        ? "text-[#451713]"
                        : "text-[#451713]/55 hover:text-[#451713]"
                    }
                  `}
                >
                  Shop

                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-px
                      bg-[#451713]
                      transition-all
                      duration-300
                      ${
                        isActive("/shop")
                          ? "w-full"
                          : "w-0"
                      }
                    `}
                  />
                </Link>

                {/* Categories Dropdown */}

                <CategoriesMenu />

                <Link
                  href="/about"
                  className={`
                    relative
                    whitespace-nowrap
                    py-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    transition-colors
                    duration-300
                    ${
                      isActive("/about")
                        ? "text-[#451713]"
                        : "text-[#451713]/55 hover:text-[#451713]"
                    }
                  `}
                >
                  About Us

                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-px
                      bg-[#451713]
                      transition-all
                      duration-300
                      ${
                        isActive("/about")
                          ? "w-full"
                          : "w-0"
                      }
                    `}
                  />
                </Link>

                <Link
                  href="/contact"
                  className={`
                    relative
                    whitespace-nowrap
                    py-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.13em]
                    transition-colors
                    duration-300
                    ${
                      isActive("/contact")
                        ? "text-[#451713]"
                        : "text-[#451713]/55 hover:text-[#451713]"
                    }
                  `}
                >
                  Contact Us

                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-px
                      bg-[#451713]
                      transition-all
                      duration-300
                      ${
                        isActive("/contact")
                          ? "w-full"
                          : "w-0"
                      }
                    `}
                  />
                </Link>
              </div>
            </nav>

            {/* Logo */}

            <Link
              href="/"
              aria-label="JENTARA Home"
              className="
                flex
                items-center
                justify-center
                whitespace-nowrap
              "
            >
              <span
                className="
                  font-serif
                  text-[43px]
                  font-semibold
                  lowercase
                  leading-none
                  tracking-[-0.09em]
                  text-[#451713]
                "
              >
                jentara
              </span>
            </Link>

            {/* Desktop Actions */}

            <div className="flex items-center justify-end gap-2">
              <Link
                href="/shop"
                aria-label="Search products"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-[#451713]
                  transition-colors
                  hover:bg-[#451713]/5
                "
              >
                <SearchIcon />
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-[#451713]
                  transition-colors
                  hover:bg-[#451713]/5
                "
              >
                <HeartIcon />
              </Link>

              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-[#451713]
                  transition-colors
                  hover:bg-[#451713]/5
                "
              >
                <BagIcon />
              </Link>

              <Link
                href="/login"
                aria-label="Account"
                className="
                  ml-1
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#451713]/15
                  text-[#451713]
                  transition-colors
                  hover:bg-[#451713]/5
                "
              >
                <UserIcon />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[200]
          md:hidden
          ${
            mobileMenuOpen
              ? "pointer-events-auto"
              : "pointer-events-none"
          }
        `}
      >
        {/* Backdrop */}

        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className={`
            absolute
            inset-0
            bg-[#25100d]/35
            backdrop-blur-[2px]
            transition-opacity
            duration-300
            ${
              mobileMenuOpen
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />

        {/* Drawer */}

        <aside
          aria-label="Mobile navigation"
          className={`
            absolute
            left-0
            top-0
            flex
            h-full
            w-[82%]
            max-w-[360px]
            flex-col
            bg-[#f5ede4]
            text-[#451713]
            shadow-[12px_0_40px_rgba(37,16,13,0.12)]
            transition-transform
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              mobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          <div className="flex h-[68px] items-center justify-between border-b border-[#451713]/10 px-5">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="
                font-serif
                text-[34px]
                font-semibold
                lowercase
                leading-none
                tracking-[-0.09em]
              "
            >
              jentara
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#451713]/15
              "
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex-1 overflow-y-auto px-5 py-8"
          >
            <p className="mb-6 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              Navigation
            </p>

            <div className="border-t border-[#451713]/20">
              {[
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
              ].map(
                (item, index) => {
                  const active =
                    isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        border-b
                        border-[#451713]/20
                        py-5
                      "
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-sm text-[#451713]/35">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span
                          className={`
                            text-[13px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            ${
                              active
                                ? "text-[#451713]"
                                : "text-[#451713]/65"
                            }
                          `}
                        >
                          {item.label}
                        </span>
                      </div>

                      <span className="text-lg text-[#451713]/40 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  );
                }
              )}
            </div>

            <div className="mt-10">
              <p className="mb-5 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                Account
              </p>

              <div className="space-y-4">
                <Link
                  href="/wishlist"
                  onClick={closeMobileMenu}
                  className="
                    block
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#451713]/65
                  "
                >
                  Wishlist
                </Link>

                <Link
                  href="/cart"
                  onClick={closeMobileMenu}
                  className="
                    block
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#451713]/65
                  "
                >
                  Shopping Bag
                </Link>

                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="
                    block
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#451713]/65
                  "
                >
                  My Account
                </Link>
              </div>
            </div>
          </nav>

          <div className="border-t border-[#451713]/15 px-5 py-6">
            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/40">
              Star of the New Generation
            </p>

            <p className="mt-2 text-[10px] text-[#451713]/55">
              JENTARA APPAREL · 2026
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}