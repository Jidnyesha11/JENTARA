"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/supabase/auth";

export default function ProfilePage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold text-[#4a0f0f]">
            My Account
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your profile, orders and addresses.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Profile Card */}
          <div>

            <div className="bg-white rounded-3xl shadow-md p-8">

              <div className="flex flex-col items-center">

                {/* Avatar */}
                <div className="w-28 h-28 rounded-full bg-[#4a0f0f] text-white flex items-center justify-center text-4xl font-bold">

                  {user.email?.charAt(0).toUpperCase()}

                </div>

                <h2 className="text-2xl font-bold mt-6">
                  JENTARA Member
                </h2>

                <p className="text-gray-500 mt-2 text-center break-all">
                  {user.email}
                </p>

              </div>

              <div className="mt-8 border-t pt-6">

                <div className="space-y-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      User ID
                    </p>

                    <p className="font-medium break-all">
                      {user.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Account Status
                    </p>

                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Right Dashboard */}
          <div className="lg:col-span-2">

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">

              <div className="bg-white rounded-3xl shadow-md p-6">

                <div className="text-4xl mb-2">
                  📦
                </div>

                <h3 className="font-bold text-lg">
                  Orders
                </h3>

                <p className="text-gray-500 text-sm">
                  View order history
                </p>

              </div>

              <div className="bg-white rounded-3xl shadow-md p-6">

                <div className="text-4xl mb-2">
                  ❤️
                </div>

                <h3 className="font-bold text-lg">
                  Wishlist
                </h3>

                <p className="text-gray-500 text-sm">
                  Saved products
                </p>

              </div>

              <div className="bg-white rounded-3xl shadow-md p-6">

                <div className="text-4xl mb-2">
                  📍
                </div>

                <h3 className="font-bold text-lg">
                  Addresses
                </h3>

                <p className="text-gray-500 text-sm">
                  Manage locations
                </p>

              </div>

            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-2xl font-bold mb-8">
                Quick Actions
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <Link
                  href="/orders"
                  className="
                    p-6
                    rounded-2xl
                    border
                    hover:bg-[#f8f5f2]
                    transition
                  "
                >
                  <div className="text-3xl mb-3">
                    📦
                  </div>

                  <h3 className="font-bold text-lg">
                    My Orders
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Track and manage your orders
                  </p>
                </Link>

                <Link
                  href="/profile/addresses"
                  className="
                    p-6
                    rounded-2xl
                    border
                    hover:bg-[#f8f5f2]
                    transition
                  "
                >
                  <div className="text-3xl mb-3">
                    📍
                  </div>

                  <h3 className="font-bold text-lg">
                    Manage Addresses
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Update delivery addresses
                  </p>
                </Link>

                <Link
                  href="/wishlist"
                  className="
                    p-6
                    rounded-2xl
                    border
                    hover:bg-[#f8f5f2]
                    transition
                  "
                >
                  <div className="text-3xl mb-3">
                    ❤️
                  </div>

                  <h3 className="font-bold text-lg">
                    Wishlist
                  </h3>

                  <p className="text-gray-500 mt-1">
                    View saved products
                  </p>
                </Link>

                <Link
                  href="/cart"
                  className="
                    p-6
                    rounded-2xl
                    border
                    hover:bg-[#f8f5f2]
                    transition
                  "
                >
                  <div className="text-3xl mb-3">
                    🛒
                  </div>

                  <h3 className="font-bold text-lg">
                    Shopping Cart
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Review cart items
                  </p>
                </Link>

              </div>

              <button
                onClick={handleLogout}
                className="
                  mt-8
                  w-full
                  bg-[#4a0f0f]
                  text-white
                  py-4
                  rounded-xl
                  text-lg
                  font-semibold
                  hover:bg-[#5d1818]
                  transition
                "
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}