"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  available?: boolean;
}

interface NavigationSection {
  label: string;
  items: NavigationItem[];
}

const navigationSections: NavigationSection[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: "⌂",
        available: true,
      },
      {
        label: "Analytics",
        href: "/admin/analytics",
        icon: "◒",
        available: true,
      },
    ],
  },
  {
    label: "Commerce",
    items: [
      {
        label: "Orders",
        href: "/admin/orders",
        icon: "□",
        available: true,
      },
      {
        label: "Products",
        href: "/admin/products",
        icon: "◇",
        available: true,
      },
      {
        label: "Categories",
        href: "/admin/categories",
        icon: "▦",
        available: true,
      },
      {
        label: "Inventory",
        href: "/admin/inventory",
        icon: "▤",
        available: true,
      },
    ],
  },
  {
    label: "Customers",
    items: [
      {
        label: "Customers",
        href: "/admin/customers",
        icon: "○",
        available: true,
      },
      {
        label: "Reviews",
        href: "/admin/reviews",
        icon: "☆",
        available: true,
      },
      {
        label: "Queries",
        href: "/admin/queries",
        icon: "◇",
        available: true,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        label: "Admin Users",
        href: "/admin/users",
        icon: "◎",
        available: true,
      },
      {
        label: "Roles & Permissions",
        href: "/admin/roles",
        icon: "◈",
        available: true,
      },
    ],
  },
];

function isItemActive(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-7 pb-8 pt-8">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="group inline-block"
        >
          <p className="font-serif text-2xl tracking-[-0.06em] text-[#451713]">
            JENTARA
          </p>

          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.28em] text-[#451713]/45">
            Administration
          </p>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <nav className="space-y-7">
          {navigationSections.map((section) => (
            <div key={section.label}>
              <p className="px-3 pb-2 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/35">
                {section.label}
              </p>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isItemActive(
                    pathname,
                    item.href,
                  );

                  const className = `
                    group flex min-h-10 items-center gap-3
                    px-3 text-[11px] font-medium
                    tracking-[0.01em] transition
                    ${
                      active
                        ? "bg-[#451713] text-[#f5ede4]"
                        : item.available
                          ? "text-[#451713]/65 hover:bg-[#451713]/[0.06] hover:text-[#451713]"
                          : "cursor-default text-[#451713]/30"
                    }
                  `;

                  if (!item.available) {
                    return (
                      <div
                        key={item.href}
                        className={className}
                        title="Coming soon"
                      >
                        <span
                          className="
                            flex h-7 w-7 shrink-0 items-center
                            justify-center text-sm
                          "
                        >
                          {item.icon}
                        </span>

                        <span>{item.label}</span>

                        <span className="ml-auto text-[7px] uppercase tracking-[0.12em]">
                          Soon
                        </span>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className={className}
                    >
                      <span
                        className={`
                          flex h-7 w-7 shrink-0 items-center
                          justify-center text-sm
                          ${
                            active
                              ? "text-[#f5ede4]"
                              : "text-[#451713]/45"
                          }
                        `}
                      >
                        {item.icon}
                      </span>

                      <span>{item.label}</span>

                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#f5ede4]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-[#451713]/10 p-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="
            flex min-h-10 items-center gap-3 px-3
            text-[10px] font-semibold uppercase
            tracking-[0.16em] text-[#451713]/55
            transition hover:text-[#451713]
          "
        >
          <span className="text-sm">←</span>
          <span>View Storefront</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside
        className="
          fixed inset-y-0 left-0 z-40 hidden
          w-[250px] border-r border-[#451713]/10
          bg-[#f5ede4] lg:block
        "
      >
        <NavigationContent pathname={pathname} />
      </aside>

      <div
        className="
          sticky top-0 z-30 flex h-16 items-center
          justify-between border-b border-[#451713]/10
          bg-[#f5ede4]/95 px-5 backdrop-blur
          lg:hidden
        "
      >
        <Link href="/admin" className="flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-[-0.06em] text-[#451713]">
            JENTARA
          </span>

          <span className="text-[7px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
            Admin
          </span>
        </Link>

        <button
          type="button"
          aria-label={
            mobileOpen ? "Close admin menu" : "Open admin menu"
          }
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="
            flex h-10 w-10 items-center justify-center
            border border-[#451713]/15 text-[#451713]
            transition hover:bg-[#451713] hover:text-[#f5ede4]
          "
        >
          {mobileOpen ? "×" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="
            fixed inset-0 z-50 bg-[#451713]/20
            lg:hidden
          "
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="
              absolute inset-y-0 left-0 w-[290px]
              bg-[#f5ede4] shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-end px-5 pt-5">
              <button
                type="button"
                aria-label="Close admin menu"
                onClick={() => setMobileOpen(false)}
                className="
                  flex h-9 w-9 items-center justify-center
                  border border-[#451713]/15 text-lg
                  text-[#451713]
                "
              >
                ×
              </button>
            </div>

            <NavigationContent
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}
    </>
  );
}