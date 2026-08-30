// app/admin/layout.tsx
"use client";

import type { ReactNode } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminGuard from "@/components/admin/AdminGuard";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f5ede4] text-[#451713]">
        <AdminNavbar />
        <main className="min-h-screen lg:pl-[250px]">{children}</main>
      </div>
    </AdminGuard>
  );
}
