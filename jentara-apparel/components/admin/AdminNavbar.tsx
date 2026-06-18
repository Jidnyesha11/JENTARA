"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Products",
      href: "/admin/products",
    },
    {
      name: "Orders",
      href: "/admin/orders",
    },
    {
      name: "Customers",
      href: "/admin/customers",
    },
  ];

  return (
    <div
      className="
        flex
        flex-wrap
        gap-4
        mb-10
      "
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            px-5
            py-3
            rounded-lg
            border
            transition-all
            ${
              pathname ===
              link.href
                ? "bg-black text-white"
                : "bg-white text-black"
            }
          `}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}