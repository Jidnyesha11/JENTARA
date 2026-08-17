// app/profile/page.tsx

"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/supabase/auth";

interface ProfileForm {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  mobile: string;
}

interface UserMetadata {
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
  gender?: string;
  date_of_birth?: string;
  dateOfBirth?: string;
  mobile?: string;
  phone?: string;
}

function getMetadata(
  user: NonNullable<ReturnType<typeof useAuth>["user"]>,
): UserMetadata {
  return (user.user_metadata ?? {}) as UserMetadata;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] =
    useState<ProfileForm>({
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      mobile: "",
    });

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  function updateField(
    field: keyof ProfileForm,
    value: string,
  ) {
    setSaved(false);

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSave(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!user) {
      return;
    }

    const metadata = getMetadata(user);

    const firstName =
      form.firstName.trim() ||
      metadata.first_name ||
      metadata.firstName ||
      "";

    const lastName =
      form.lastName.trim() ||
      metadata.last_name ||
      metadata.lastName ||
      "";

    const gender =
      form.gender ||
      metadata.gender ||
      "";

    const dateOfBirth =
      form.dateOfBirth ||
      metadata.date_of_birth ||
      metadata.dateOfBirth ||
      "";

    const mobile =
      form.mobile.trim() ||
      metadata.mobile ||
      metadata.phone ||
      "";

    try {
      setSaving(true);
      setSaved(false);

      const { supabase } =
        await import("@/lib/supabase/client");

      const { error } =
        await supabase.auth.updateUser({
          data: {
            first_name: firstName,
            last_name: lastName,
            gender,
            date_of_birth: dateOfBirth,
            mobile,
          },
        });

      if (error) {
        throw error;
      }

      setForm({
        firstName,
        lastName,
        gender,
        dateOfBirth,
        mobile,
      });

      setSaved(true);
    } catch (error) {
      console.error(
        "PROFILE UPDATE ERROR:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to save your profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut();

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(
        "PROFILE LOGOUT ERROR:",
        error,
      );
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f5ede4] text-[#451713]">
        <div className="text-center">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border border-[#451713]/20 border-t-[#451713]" />

          <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50">
            Loading account
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const metadata = getMetadata(user);

  const firstName =
    form.firstName ||
    metadata.first_name ||
    metadata.firstName ||
    "";

  const lastName =
    form.lastName ||
    metadata.last_name ||
    metadata.lastName ||
    "";

  const gender =
    form.gender ||
    metadata.gender ||
    "";

  const dateOfBirth =
    form.dateOfBirth ||
    metadata.date_of_birth ||
    metadata.dateOfBirth ||
    "";

  const mobile =
    form.mobile ||
    metadata.mobile ||
    metadata.phone ||
    "";

  const email =
    user.email ?? "No email available";

  const displayName =
    firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : "JENTARA Member";

  const firstInitial =
    firstName.charAt(0) ||
    email.charAt(0) ||
    "J";

  const lastInitial =
    lastName.charAt(0) || "";

  const initials =
    `${firstInitial}${lastInitial}`.toUpperCase();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <section className="border-b border-[#451713]/15 pb-8 md:pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
              Your JENTARA account
            </p>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1
                className="
                  font-serif
                  text-[48px]
                  leading-[0.88]
                  tracking-[-0.06em]
                  sm:text-[62px]
                  md:text-[78px]
                "
              >
                Account
              </h1>

              <p className="mt-4 max-w-[500px] text-[12px] leading-6 text-[#451713]/60">
                Manage your personal information,
                orders, addresses and saved pieces.
              </p>
            </div>

            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/40">
              JENTARA / PROFILE
            </span>
          </div>
        </section>

        <section className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          <aside className="min-w-0">
            <div className="border border-[#451713]/15 bg-[#f9f2ea]">
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#451713]
                      font-serif
                      text-lg
                      text-[#f5ede4]
                    "
                  >
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-serif text-xl tracking-[-0.03em]">
                      {displayName}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-[#451713]/50">
                      {email}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="border-t border-[#451713]/10">
                <ProfileNavLink
                  href="/profile"
                  number="01"
                  label="Profile"
                  active
                />

                <ProfileNavLink
                  href="/orders"
                  number="02"
                  label="Orders"
                />

                <ProfileNavLink
                  href="/profile/addresses"
                  number="03"
                  label="Addresses"
                />

                <ProfileNavLink
                  href="/wishlist"
                  number="04"
                  label="Wishlist"
                />

                <ProfileNavLink
                  href="/cart"
                  number="05"
                  label="Shopping Cart"
                />
              </nav>

              <div className="border-t border-[#451713]/10 p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    min-h-12
                    w-full
                    items-center
                    justify-between
                    px-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#451713]/55
                    transition-colors
                    hover:bg-[#451713]
                    hover:text-[#f5ede4]
                  "
                >
                  <span>
                    Logout
                  </span>

                  <span>
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-8">
            <section
              id="profile"
              className="
                min-w-0
                border
                border-[#451713]/15
                bg-[#f9f2ea]
                p-5
                sm:p-8
                md:p-10
              "
            >
              <div className="flex flex-col justify-between gap-4 border-b border-[#451713]/10 pb-6 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#451713]/45">
                    01 / Personal information
                  </p>

                  <h2 className="mt-3 font-serif text-[36px] leading-none tracking-[-0.05em] sm:text-[44px]">
                    Your profile.
                  </h2>
                </div>

                <span className="text-[8px] uppercase tracking-[0.2em] text-[#451713]/35">
                  Keep it current
                </span>
              </div>

              <form
                onSubmit={handleSave}
                className="mt-8"
              >
                <div className="grid min-w-0 gap-6 sm:grid-cols-2">
                  <ProfileInput
                    label="First Name"
                    value={firstName}
                    onChange={(value) =>
                      updateField(
                        "firstName",
                        value,
                      )
                    }
                    placeholder="First name"
                  />

                  <ProfileInput
                    label="Last Name"
                    value={lastName}
                    onChange={(value) =>
                      updateField(
                        "lastName",
                        value,
                      )
                    }
                    placeholder="Last name"
                  />
                </div>

                <div className="mt-8">
                  <p className="mb-4 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/50">
                    Gender
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "Male",
                      "Female",
                      "Other",
                    ].map((option) => {
                      const selected =
                        gender === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            updateField(
                              "gender",
                              option,
                            )
                          }
                          className={`
                            min-w-[92px]
                            border
                            px-5
                            py-3
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            transition-all
                            ${
                              selected
                                ? "border-[#451713] bg-[#451713] text-[#f5ede4]"
                                : "border-[#451713]/15 text-[#451713]/55 hover:border-[#451713]/40"
                            }
                          `}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-10 border-t border-[#451713]/10 pt-8">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#451713]/45">
                    General information
                  </p>

                  <div className="mt-6 grid min-w-0 gap-6 sm:grid-cols-2">
                    <ProfileInput
                      label="Date of Birth"
                      value={dateOfBirth}
                      onChange={(value) =>
                        updateField(
                          "dateOfBirth",
                          value,
                        )
                      }
                      placeholder="DD / MM / YYYY"
                    />

                    <ProfileInput
                      label="Mobile Number"
                      value={mobile}
                      onChange={(value) =>
                        updateField(
                          "mobile",
                          value,
                        )
                      }
                      placeholder="+91"
                      type="tel"
                    />

                    <div className="min-w-0 sm:col-span-2">
                      <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/50">
                        Email
                      </p>

                      <div className="min-w-0 border-b border-[#451713]/20 py-3">
                        <p className="break-all text-[13px] text-[#451713]/65">
                          {email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-[#451713]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-h-5">
                    {saved && (
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#451713]">
                        Profile saved successfully.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      inline-flex
                      min-h-12
                      w-full
                      items-center
                      justify-center
                      gap-6
                      bg-[#451713]
                      px-7
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#f5ede4]
                      transition-all
                      hover:bg-[#5c211b]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:w-auto
                    "
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}

                    <span>
                      →
                    </span>
                  </button>
                </div>
              </form>
            </section>

            <section
              id="account-actions"
              className="min-w-0"
            >
              <div className="mb-5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#451713]/45">
                  02 / Your JENTARA
                </p>

                <h2 className="mt-2 font-serif text-[34px] leading-none tracking-[-0.05em] sm:text-[42px]">
                  Everything in one place.
                </h2>
              </div>

              <div className="grid min-w-0 gap-3 sm:grid-cols-2">
                <AccountAction
                  href="/orders"
                  number="01"
                  title="Order History"
                  description="Track previous and current orders."
                />

                <AccountAction
                  href="/profile/addresses"
                  number="02"
                  title="Addresses"
                  description="Manage your delivery addresses."
                />

                <AccountAction
                  href="/wishlist"
                  number="03"
                  title="Wishlist"
                  description="Keep the pieces you want."
                />

                <AccountAction
                  href="/cart"
                  number="04"
                  title="Shopping Cart"
                  description="Review items before checkout."
                />
              </div>
            </section>

            <section
              id="address"
              className="
                min-w-0
                border
                border-[#451713]/15
                bg-[#f9f2ea]
                p-5
                sm:p-8
              "
            >
              <div className="flex flex-col gap-3 border-b border-[#451713]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/45">
                    03 / Delivery
                  </p>

                  <h2 className="mt-2 font-serif text-[32px] tracking-[-0.04em]">
                    Default address.
                  </h2>
                </div>

                <Link
                  href="/profile/addresses"
                  className="
                    w-fit
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    underline
                    underline-offset-4
                  "
                >
                  Manage addresses →
                </Link>
              </div>

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12px] leading-6 text-[#451713]/65">
                  Your saved delivery addresses
                  are managed from the address book.
                </p>

                <Link
                  href="/profile/addresses"
                  className="
                    inline-flex
                    min-h-11
                    w-full
                    items-center
                    justify-center
                    border
                    border-[#451713]
                    px-6
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    transition-colors
                    hover:bg-[#451713]
                    hover:text-[#f5ede4]
                    sm:w-auto
                  "
                >
                  Open Address Book
                </Link>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProfileNavLink({
  href,
  number,
  label,
  active = false,
}: {
  href: string;
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        group
        flex
        min-h-14
        items-center
        justify-between
        border-b
        border-[#451713]/10
        px-5
        transition-colors
        ${
          active
            ? "bg-[#451713] text-[#f5ede4]"
            : "text-[#451713] hover:bg-[#451713]/5"
        }
      `}
    >
      <span
        className={`
          text-[8px]
          ${
            active
              ? "text-[#f5ede4]/50"
              : "text-[#451713]/35"
          }
        `}
      >
        {number}
      </span>

      <span className="ml-auto mr-4 text-[9px] font-semibold uppercase tracking-[0.15em]">
        {label}
      </span>

      <span
        className={`
          transition-transform
          duration-300
          group-hover:translate-x-1
          ${
            active
              ? "text-[#f5ede4]"
              : "text-[#451713]/35"
          }
        `}
      >
        →
      </span>
    </Link>
  );
}

function ProfileInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/50">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="
          block
          min-w-0
          w-full
          border-0
          border-b
          border-[#451713]/20
          bg-transparent
          px-0
          py-3
          text-[13px]
          text-[#451713]
          outline-none
          placeholder:text-[#451713]/25
          focus:border-[#451713]
        "
      />
    </label>
  );
}

function AccountAction({
  href,
  number,
  title,
  description,
}: {
  href: string;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        min-w-0
        border
        border-[#451713]/15
        bg-[#f9f2ea]
        p-5
        transition-all
        duration-300
        hover:border-[#451713]/40
        hover:bg-[#f6ece2]
        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-serif text-xl text-[#451713]/30">
          {number}
        </span>

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>

      <h3 className="mt-7 font-serif text-[25px] tracking-[-0.03em]">
        {title}
      </h3>

      <p className="mt-2 text-[11px] leading-5 text-[#451713]/55">
        {description}
      </p>
    </Link>
  );
}