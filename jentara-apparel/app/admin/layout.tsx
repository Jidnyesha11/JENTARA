// app/admin/layout.tsx

import type { ReactNode } from "react";

import AdminNavbar from "@/components/admin/AdminNavbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <AdminNavbar />

      <main className="min-h-screen lg:pl-[250px]">
        {children}
      </main>
    </div>
  );
}