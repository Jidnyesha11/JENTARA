// components/layout/SiteChrome.tsx

"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const standaloneRoutes = [
  "/login",
  "/register",
  "/phone-login",
  "/otp",
  "/forgot-password",
];

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isStandalone =
    standaloneRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(`${route}/`)
    );

  const isAdmin =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isStandalone || isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}