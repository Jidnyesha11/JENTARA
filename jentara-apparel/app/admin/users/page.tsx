// app/admin/users/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getAdminUsers,
  updateUserRole,
  type AdminRole,
  type AdminUser,
} from "@/lib/supabase/admin-users";

const roles: AdminRole[] = [
  "customer",
  "support",
  "operations",
  "admin",
  "super_admin",
];

function formatRole(role: string | null) {
  return (role || "customer")
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadUsers() {
      try {
        setLoading(true);
        setErrorMessage(null);

        const data = await getAdminUsers();

        if (mounted) {
          setUsers(data);
        }
      } catch (error) {
        console.error("Failed to load admin users:", error);

        if (mounted) {
          setErrorMessage(
            "Unable to load users. Check your admin permissions.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter((user) =>
      String(user.email)
        .toLowerCase()
        .includes(value),
    );
  }, [query, users]);

  async function changeRole(
    userId: string,
    role: AdminRole,
  ) {
    const currentUser = users.find(
      (user) => user.id === userId,
    );

    if (
      currentUser?.role === role
    ) {
      return;
    }

    setSavingId(userId);
    setErrorMessage(null);

    try {
      const updated = await updateUserRole(
        userId,
        role,
      );

      setUsers((current) =>
        current.map((user) =>
          user.id === userId
            ? updated
            : user,
        ),
      );
    } catch (error) {
      console.error("Role change failed:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Role could not be updated.";

      setErrorMessage(message);
    } finally {
      setSavingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / ADMINISTRATION
            </p>
          </div>

          <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
            Users
          </h1>

          <p className="mt-4 max-w-xl text-[12px] leading-6 text-[#451713]/50">
            Manage account access and administrative roles across the JENTARA
            workspace.
          </p>
        </header>

        <div className="flex flex-col gap-5 border-b border-[#451713]/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search users by email..."
            className="w-full border-b border-[#451713]/25 bg-transparent py-4 text-[12px] outline-none transition placeholder:text-[#451713]/35 focus:border-[#451713] sm:max-w-md"
          />

          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713]/40">
            {filtered.length}{" "}
            {filtered.length === 1
              ? "user"
              : "users"}
          </p>
        </div>

        {errorMessage && (
          <div className="border-b border-[#7b2924]/20 bg-[#7b2924]/5 px-5 py-4 text-[10px] leading-5 text-[#7b2924]">
            {errorMessage}
          </div>
        )}

        {loading ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl">
              Loading users
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-[#451713]/40">
              JENTARA administration
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl">
              No users found.
            </p>

            <p className="mt-3 text-[11px] text-[#451713]/45">
              Try another search.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#451713]/10 border-b border-[#451713]/12">
            {filtered.map((user) => (
              <article
                key={user.id}
                className="grid gap-5 py-6 md:grid-cols-[1fr_180px_200px] md:items-center"
              >
                <div className="min-w-0">
                  <p className="break-all text-[11px]">
                    {user.email}
                  </p>

                  <p className="mt-2 break-all text-[8px] uppercase tracking-[0.12em] text-[#451713]/30">
                    {user.id}
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#451713]/35">
                    Current role
                  </p>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.12em]">
                    {formatRole(user.role)}
                  </p>
                </div>

                <select
                  value={
                    user.role || "customer"
                  }
                  disabled={
                    savingId === user.id
                  }
                  onChange={(event) =>
                    void changeRole(
                      user.id,
                      event.target
                        .value as AdminRole,
                    )
                  }
                  className="min-h-11 w-full border border-[#451713]/15 bg-transparent px-3 text-[8px] font-semibold uppercase tracking-[0.12em] outline-none transition focus:border-[#451713] disabled:cursor-wait disabled:opacity-50"
                >
                  {roles.map((role) => (
                    <option
                      key={role}
                      value={role}
                    >
                      {formatRole(role)}
                    </option>
                  ))}
                </select>
              </article>
            ))}
          </div>
        )}

        <p className="mt-8 max-w-2xl text-[10px] leading-5 text-[#451713]/40">
          Only a super administrator should be able to change roles. The
          database function must enforce this independently of the interface.
        </p>
      </div>
    </main>
  );
}