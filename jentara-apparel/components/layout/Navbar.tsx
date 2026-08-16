// components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import CategoriesMenu from "@/components/layout/CategoriesMenu";

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

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  const categoriesActive =
    pathname === "/categories" ||
    pathname.startsWith("/categories/");

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#451713]/10
        bg-[#f5ede4]/95
        backdrop-blur-md
      "
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div
          className="
            relative
            flex
            h-[76px]
            items-center
            justify-between
            md:h-[88px]
          "
        >
          {/* Desktop Navigation */}

          <nav
            className="
              hidden
              md:block
            "
          >
            <div
              className="
                flex
                items-center
                gap-7
                lg:gap-9
              "
            >
              {navigation
                .slice(0, 2)
                .map((item) => {
                  const active =
                    isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        relative
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

              {/* Categories */}

              <div
                className={`
                  relative
                  ${
                    categoriesActive
                      ? "text-[#451713]"
                      : ""
                  }
                `}
              >
                <CategoriesMenu />
              </div>

              {navigation
                .slice(2)
                .map((item) => {
                  const active =
                    isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        relative
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

          {/* Mobile Categories */}

          <Link
            href="/categories"
            className={`
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.12em]
              transition
              md:hidden
              ${
                categoriesActive
                  ? "text-[#451713]"
                  : "text-[#451713]/60"
              }
            `}
          >
            Categories
          </Link>

          {/* Logo */}

          <Link
            href="/"
            aria-label="JENTARA Home"
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <span
              className="
                font-serif
                text-[38px]
                font-semibold
                lowercase
                leading-none
                tracking-[-0.09em]
                text-[#451713]
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
              items-center
              gap-4
              sm:gap-5
            "
          >
            <Link
              href="/products"
              aria-label="Search products"
              className="
                text-[20px]
                text-[#451713]
                transition-opacity
                hover:opacity-50
              "
            >
              ⌕
            </Link>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="
                text-[21px]
                text-[#451713]
                transition-opacity
                hover:opacity-50
              "
            >
              ♡
            </Link>

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="
                text-[19px]
                text-[#451713]
                transition-opacity
                hover:opacity-50
              "
            >
              🛍
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}