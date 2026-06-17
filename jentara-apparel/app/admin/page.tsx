"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import { getProfile } from "@/lib/supabase/profile";

export default function AdminPage() {
  const router = useRouter();

  const { user, loading } =
    useAuth();

  const [isAdmin, setIsAdmin] =
    useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (!user) return;

      const profile =
        await getProfile(
          user.id
        );

      if (
        profile.role !== "admin"
      ) {
        router.push("/");
        return;
      }

      setIsAdmin(true);
    }

    checkAdmin();
  }, [user, router]);

  if (
    loading ||
    !isAdmin
  ) {
    return (
      <div className="p-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold">
        Admin Dashboard
      </h1>
    </div>
  );
}