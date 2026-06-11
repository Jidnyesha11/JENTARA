"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/supabase/auth";

export default function ProfilePage() {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [
    user,
    loading,
    router,
  ]);

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="p-20">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">

      <h1 className="text-5xl font-bold mb-10">
        My Account
      </h1>

      <div className="border rounded-xl p-8">

        <h2 className="text-2xl font-semibold mb-4">
          Profile Information
        </h2>

        <div className="space-y-3">

          <p>
            <strong>Email:</strong>{" "}
            {user.email}
          </p>

          <p>
            <strong>User ID:</strong>{" "}
            {user.id}
          </p>

        </div>

      </div>

      <div className="mt-8 flex gap-4">

        <Link
          href="/orders"
          className="
            bg-black
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          My Orders
        </Link>

        <button
          onClick={handleLogout}
          className="
            border
            px-6
            py-3
            rounded-lg
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}