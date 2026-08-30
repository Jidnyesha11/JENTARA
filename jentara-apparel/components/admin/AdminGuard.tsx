// components/admin/AdminGuard.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";

interface AdminGuardProps {
  children: ReactNode;
}

const ADMIN_ROLES = new Set(["admin", "super_admin", "owner"]);

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAccess() {
      if (authLoading) return;

      if (!user) {
        router.replace("/login?redirect=/admin");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        console.error("ADMIN ACCESS CHECK:", error);
        router.replace("/");
        return;
      }

      const role = String(data?.role ?? "").toLowerCase();

      if (!ADMIN_ROLES.has(role)) {
        router.replace("/");
        return;
      }

      setAllowed(true);
      setChecking(false);
    }

    void checkAccess();

    return () => {
      mounted = false;
    };
  }, [authLoading, router, user]);

  if (authLoading || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5ede4] px-6 text-[#451713]">
        <div className="text-center">
          <p className="font-serif text-3xl tracking-[-0.04em]">JENTARA</p>
          <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.28em] text-[#451713]/40">
            Verifying administration access
          </p>
        </div>
      </div>
    );
  }

  return allowed ? <>{children}</> : null;
}
