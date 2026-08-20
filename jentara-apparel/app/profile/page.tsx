// app/profile/addresses/page.tsx

"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

import {
  addAddress,
  deleteAddress,
  getAddresses,
  setDefaultAddress,
} from "@/lib/supabase/addresses";

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

interface AddressForm {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const initialForm: AddressForm = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

const inputClassName = `
  w-full
  border-0
  border-b
  border-[#451713]/20
  bg-transparent
  px-0
  py-4
  text-[13px]
  text-[#451713]
  outline-none
  transition
  placeholder:text-[#451713]/35
  focus:border-[#451713]
`;

function formatAddressLine(address: Address) {
  return [
    address.address_line_1,
    address.address_line_2,
    [address.city, address.state].filter(Boolean).join(", "),
    address.pincode,
  ].filter(Boolean);
}

export default function AddressesPage() {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [form, setForm] = useState<AddressForm>(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [defaultId, setDefaultId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadAddresses() {
    if (!user) return;

    try {
      setLoading(true);
      setError("");

      const data = await getAddresses(user.id);

      setAddresses(data ?? []);
    } catch (loadError) {
      console.error(loadError);
      setError("Unable to load your addresses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    void loadAddresses();
  }, [user]);

  function updateField(
    field: keyof AddressForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleAddAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await addAddress({
        user_id: user.id,
        full_name: form.fullName.trim(),
        phone: form.phone.trim(),
        address_line_1: form.addressLine1.trim(),
        address_line_2: form.addressLine2.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      });

      await loadAddresses();

      setForm(initialForm);
      setSuccess("Address saved successfully.");

      window.setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (saveError: unknown) {
      console.error(saveError);

      const message =
        saveError instanceof Error
          ? saveError.message
          : "Unable to save this address.";

      setError(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAddress(id: string) {
    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      await deleteAddress(id);
      await loadAddresses();
    } catch (deleteError) {
      console.error(deleteError);
      setError("Unable to delete this address.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSetDefault(addressId: string) {
    if (!user) return;

    setDefaultId(addressId);
    setError("");
    setSuccess("");

    try {
      await setDefaultAddress(user.id, addressId);
      await loadAddresses();

      setSuccess("Default address updated.");

      window.setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (defaultError) {
      console.error(defaultError);
      setError("Unable to update the default address.");
    } finally {
      setDefaultId(null);
    }
  }

  if (!user && !loading) {
    return (
      <main className="min-h-screen bg-[#f5ede4] px-6 py-20 text-[#451713]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/50">
            JENTARA / ACCOUNT
          </p>

          <h1 className="mt-6 font-serif text-5xl tracking-[-0.06em] sm:text-7xl">
            Sign in to manage your addresses.
          </h1>

          <Link
            href="/login"
            className="
              mt-10
              inline-flex
              min-h-12
              items-center
              gap-8
              bg-[#451713]
              px-7
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#f5ede4]
              transition
              hover:bg-[#5c211b]
            "
          >
            Sign in
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#451713]/45
              transition
              hover:text-[#451713]
            "
          >
            Account
          </Link>

          <span className="text-[9px] text-[#451713]/30">
            /
          </span>

          <span className="text-[8px] font-semibold uppercase tracking-[0.28em]">
            Addresses
          </span>
        </div>

        {/* Page heading */}
        <header className="mt-10 border-b border-[#451713]/15 pb-10 sm:mt-14 sm:pb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#451713]/55">
              JENTARA / DELIVERY
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-[52px] leading-[0.88] tracking-[-0.07em] sm:text-[76px] lg:text-[88px]">
                Addresses
              </h1>

              <p className="mt-5 max-w-lg text-[12px] leading-6 text-[#451713]/55">
                Keep your delivery details ready for every JENTARA order.
              </p>
            </div>

            {addresses.length > 0 && (
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                {addresses.length}{" "}
                {addresses.length === 1 ? "address" : "addresses"} saved
              </p>
            )}
          </div>
        </header>

        {/* Feedback */}
        {(error || success) && (
          <div
            className={`
              mt-6
              border
              px-5
              py-4
              text-[10px]
              uppercase
              tracking-[0.12em]
              ${
                error
                  ? "border-[#8b2c25]/20 bg-[#8b2c25]/5 text-[#8b2c25]"
                  : "border-[#451713]/15 bg-[#451713]/5 text-[#451713]"
              }
            `}
          >
            {error || success}
          </div>
        )}

        {/* Main workspace */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          {/* Add address */}
          <section className="border border-[#451713]/15 bg-[#f8f2eb]">
            <div className="border-b border-[#451713]/15 px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                    New delivery
                  </p>

                  <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                    Add an address
                  </h2>
                </div>

                <span className="hidden font-serif text-4xl text-[#451713]/10 sm:block">
                  01
                </span>
              </div>
            </div>

            <form
              onSubmit={handleAddAddress}
              className="px-6 py-7 sm:px-8 sm:py-9"
            >
              <div className="grid gap-x-8 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Full name</span>

                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) =>
                      updateField(
                        "fullName",
                        event.target.value
                      )
                    }
                    placeholder="Full name"
                    autoComplete="name"
                    required
                    className={inputClassName}
                  />
                </label>

                <label className="block">
                  <span className="sr-only">Phone number</span>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="Phone number"
                    autoComplete="tel"
                    required
                    className={inputClassName}
                  />
                </label>
              </div>

              <label className="mt-1 block">
                <span className="sr-only">Address line 1</span>

                <input
                  type="text"
                  value={form.addressLine1}
                  onChange={(event) =>
                    updateField(
                      "addressLine1",
                      event.target.value
                    )
                  }
                  placeholder="Address line 1"
                  autoComplete="address-line1"
                  required
                  className={inputClassName}
                />
              </label>

              <label className="block">
                <span className="sr-only">Address line 2</span>

                <input
                  type="text"
                  value={form.addressLine2}
                  onChange={(event) =>
                    updateField(
                      "addressLine2",
                      event.target.value
                    )
                  }
                  placeholder="Address line 2 (optional)"
                  autoComplete="address-line2"
                  className={inputClassName}
                />
              </label>

              <div className="grid gap-x-8 sm:grid-cols-3">
                <label className="block">
                  <span className="sr-only">City</span>

                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) =>
                      updateField(
                        "city",
                        event.target.value
                      )
                    }
                    placeholder="City"
                    autoComplete="address-level2"
                    required
                    className={inputClassName}
                  />
                </label>

                <label className="block">
                  <span className="sr-only">State</span>

                  <input
                    type="text"
                    value={form.state}
                    onChange={(event) =>
                      updateField(
                        "state",
                        event.target.value
                      )
                    }
                    placeholder="State"
                    autoComplete="address-level1"
                    required
                    className={inputClassName}
                  />
                </label>

                <label className="block">
                  <span className="sr-only">Pincode</span>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.pincode}
                    onChange={(event) =>
                      updateField(
                        "pincode",
                        event.target.value
                      )
                    }
                    placeholder="Pincode"
                    autoComplete="postal-code"
                    required
                    className={inputClassName}
                  />
                </label>
              </div>

              <div className="mt-9 border-t border-[#451713]/10 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="
                    group
                    flex
                    min-h-12
                    w-full
                    items-center
                    justify-between
                    bg-[#451713]
                    px-6
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#f5ede4]
                    transition
                    hover:bg-[#5c211b]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <span>
                    {saving ? "Saving address..." : "Save address"}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-base transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </div>

              <p className="mt-5 text-[9px] leading-5 text-[#451713]/40">
                Your address is securely stored and used only for delivery.
              </p>
            </form>
          </section>

          {/* Saved addresses */}
          <section>
            <div className="mb-6 flex items-end justify-between border-b border-[#451713]/15 pb-5">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                  Your details
                </p>

                <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                  Saved addresses
                </h2>
              </div>

              <span className="font-serif text-3xl text-[#451713]/15">
                {String(addresses.length).padStart(2, "0")}
              </span>
            </div>

            {loading ? (
              <div className="border border-[#451713]/15 px-6 py-16 text-center sm:px-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/45">
                  Loading addresses
                </p>
              </div>
            ) : addresses.length === 0 ? (
              <div className="border border-[#451713]/15 px-6 py-16 sm:px-8 sm:py-20">
                <p className="font-serif text-3xl tracking-[-0.04em]">
                  No addresses yet.
                </p>

                <p className="mt-3 max-w-sm text-[11px] leading-6 text-[#451713]/50">
                  Add your first delivery address using the form beside this
                  section.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address, index) => {
                  const addressLines = formatAddressLine(address);

                  return (
                    <article
                      key={address.id}
                      className="
                        group
                        border
                        border-[#451713]/15
                        bg-transparent
                        transition
                        hover:bg-[#f8f2eb]
                      "
                    >
                      <div className="flex items-start justify-between gap-5 border-b border-[#451713]/10 px-5 py-5 sm:px-7">
                        <div className="flex items-center gap-4">
                          <span className="font-serif text-2xl text-[#451713]/20">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div>
                            <h3 className="font-serif text-xl tracking-[-0.03em]">
                              {address.full_name}
                            </h3>

                            {address.is_default && (
                              <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/50">
                                Default delivery address
                              </p>
                            )}
                          </div>
                        </div>

                        {address.is_default && (
                          <span className="shrink-0 border border-[#451713]/20 px-3 py-2 text-[7px] font-semibold uppercase tracking-[0.18em]">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="px-5 py-6 sm:px-7 sm:py-7">
                        <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
                          <div>
                            <p className="text-[11px] leading-6 text-[#451713]/70">
                              {addressLines.map((line, lineIndex) => (
                                <span key={`${address.id}-${lineIndex}`}>
                                  {line}
                                  {lineIndex < addressLines.length - 1 && (
                                    <br />
                                  )}
                                </span>
                              ))}
                            </p>

                            <p className="mt-5 text-[10px] font-medium tracking-[0.04em] text-[#451713]/55">
                              {address.phone}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-start gap-5 sm:flex-col sm:items-end sm:justify-start">
                            {!address.is_default && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleSetDefault(address.id)
                                }
                                disabled={defaultId === address.id}
                                className="
                                  text-[8px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.18em]
                                  underline
                                  underline-offset-4
                                  transition
                                  hover:text-[#451713]/55
                                  disabled:opacity-40
                                "
                              >
                                {defaultId === address.id
                                  ? "Updating..."
                                  : "Make default"}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteAddress(address.id)
                              }
                              disabled={deletingId === address.id}
                              className="
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-[#451713]/45
                                underline
                                underline-offset-4
                                transition
                                hover:text-[#8b2c25]
                                disabled:opacity-40
                              "
                            >
                              {deletingId === address.id
                                ? "Removing..."
                                : "Remove"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Bottom account navigation */}
        <div className="mt-14 border-t border-[#451713]/15 pt-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/profile"
              className="
                inline-flex
                items-center
                gap-4
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#451713]/50
                transition
                hover:text-[#451713]
              "
            >
              <span aria-hidden="true">←</span>
              Back to account
            </Link>

            <p className="text-[8px] uppercase tracking-[0.2em] text-[#451713]/30">
              JENTARA / DELIVERY DETAILS
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}