// app/profile/addresses/page.tsx

"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
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
    [address.city, address.state]
      .filter(Boolean)
      .join(", "),
    address.pincode,
  ].filter(Boolean);
}

export default function AddressesPage() {
  const { user, loading: authLoading } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [form, setForm] =
    useState<AddressForm>(initialForm);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [defaultId, setDefaultId] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  const loadAddresses = useCallback(async () => {
    if (!user) {
      setAddresses([]);
      setLoading(false);
      return;
    }

    try {
      setError("");

      const data =
        await getAddresses(user.id);

      setAddresses(data ?? []);
    } catch (loadError) {
      console.error(loadError);

      setError(
        "Unable to load your addresses. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void loadAddresses();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [authLoading, loadAddresses]);

  function updateForm(
    field: keyof AddressForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      return;
    }

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.addressLine1.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pincode.trim()
    ) {
      setError(
        "Please complete all required address fields."
      );

      return;
    }

    setSaving(true);
    setError("");

    try {
      await addAddress({
        user_id: user.id,
        full_name: form.fullName.trim(),
        phone: form.phone.trim(),
        address_line_1:
          form.addressLine1.trim(),
        address_line_2:
          form.addressLine2.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      });

      setForm(initialForm);

      await loadAddresses();
    } catch (saveError) {
      console.error(saveError);

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save the address."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(
    addressId: string
  ) {
    setDeletingId(addressId);
    setError("");

    try {
      await deleteAddress(addressId);
      await loadAddresses();
    } catch (deleteError) {
      console.error(deleteError);

      setError(
        "Unable to delete this address. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSetDefault(
    addressId: string
  ) {
    if (!user) {
      return;
    }

    setDefaultId(addressId);
    setError("");

    try {
      await setDefaultAddress(
        user.id,
        addressId
      );

      await loadAddresses();
    } catch (defaultError) {
      console.error(defaultError);

      setError(
        "Unable to update the default address."
      );
    } finally {
      setDefaultId(null);
    }
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50">
            Loading addresses
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#451713]">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
              JENTARA / ACCOUNT / ADDRESSES
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-[48px] leading-[0.9] tracking-[-0.06em] sm:text-[68px] lg:text-[78px]">
                Addresses
              </h1>

              <p className="mt-4 max-w-xl text-[12px] leading-6 text-[#451713]/55">
                Manage the places where your JENTARA pieces
                should arrive.
              </p>
            </div>

            <Link
              href="/profile"
              className="inline-flex w-fit items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] underline underline-offset-4 transition hover:opacity-55"
            >
              Back to account
              <span>←</span>
            </Link>
          </div>
        </header>

        {error && (
          <div className="mt-7 border border-[#451713]/20 bg-[#efe4d9] px-5 py-4 text-[11px] leading-5 text-[#451713]">
            {error}
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <section className="min-w-0">
            <div className="border border-[#451713]/15 bg-[#f8f2ec] p-6 sm:p-8 lg:p-10">
              <div className="border-b border-[#451713]/15 pb-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50">
                  New address
                </p>

                <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                  Add a delivery address
                </h2>

                <p className="mt-2 text-[12px] leading-6 text-[#451713]/55">
                  Save an address for a faster checkout.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-7"
              >
                <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45"
                    >
                      Full name *
                    </label>

                    <input
                      id="fullName"
                      value={form.fullName}
                      onChange={(event) =>
                        updateForm(
                          "fullName",
                          event.target.value
                        )
                      }
                      placeholder="Your full name"
                      autoComplete="name"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45"
                    >
                      Phone *
                    </label>

                    <input
                      id="phone"
                      value={form.phone}
                      onChange={(event) =>
                        updateForm(
                          "phone",
                          event.target.value
                        )
                      }
                      placeholder="Mobile number"
                      autoComplete="tel"
                      inputMode="tel"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="mt-7">
                  <label
                    htmlFor="addressLine1"
                    className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45"
                  >
                    Address *
                  </label>

                  <input
                    id="addressLine1"
                    value={form.addressLine1}
                    onChange={(event) =>
                      updateForm(
                        "addressLine1",
                        event.target.value
                      )
                    }
                    placeholder="House / flat / street"
                    autoComplete="address-line1"
                    className={inputClassName}
                  />
                </div>

                <div className="mt-7">
                  <label
                    htmlFor="addressLine2"
                    className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45"
                  >
                    Address line 2
                  </label>

                  <input
                    id="addressLine2"
                    value={form.addressLine2}
                    onChange={(event) =>
                      updateForm(
                        "addressLine2",
                        event.target.value
                      )
                    }
                    placeholder="Apartment, landmark, etc."
                    autoComplete="address-line2"
                    className={inputClassName}
                  />
                </div>

                <div className="mt-7 grid gap-x-8 gap-y-2 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="city"
                      className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45"
                    >
                      City *
                    </label>

                    <input
                      id="city"
                      value={form.city}
                      onChange={(event) =>
                        updateForm(
                          "city",
                          event.target.value
                        )
                      }
                      placeholder="City"
                      autoComplete="address-level2"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45"
                    >
                      State *
                    </label>

                    <input
                      id="state"
                      value={form.state}
                      onChange={(event) =>
                        updateForm(
                          "state",
                          event.target.value
                        )
                      }
                      placeholder="State"
                      autoComplete="address-level1"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45"
                    >
                      Pincode *
                    </label>

                    <input
                      id="pincode"
                      value={form.pincode}
                      onChange={(event) =>
                        updateForm(
                          "pincode",
                          event.target.value
                        )
                      }
                      placeholder="Pincode"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    mt-9
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
                    tracking-[0.2em]
                    text-[#f5ede4]
                    transition
                    hover:bg-[#5c211b]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <span>
                    {saving
                      ? "Saving address"
                      : "Save address"}
                  </span>

                  <span>→</span>
                </button>
              </form>
            </div>
          </section>

          <section className="min-w-0">
            <div className="mb-5 flex items-end justify-between border-b border-[#451713]/15 pb-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/50">
                  Saved
                </p>

                <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                  Your addresses
                </h2>
              </div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713]/45">
                {addresses.length}{" "}
                {addresses.length === 1
                  ? "address"
                  : "addresses"}
              </p>
            </div>

            {addresses.length === 0 ? (
              <div className="border border-dashed border-[#451713]/20 px-6 py-16 text-center sm:px-10">
                <p className="font-serif text-3xl tracking-[-0.04em]">
                  No saved addresses.
                </p>

                <p className="mx-auto mt-3 max-w-sm text-[11px] leading-5 text-[#451713]/55">
                  Add your first delivery address using the
                  form beside this section.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address, index) => {
                  const addressLines =
                    formatAddressLine(address);

                  return (
                    <article
                      key={address.id}
                      className="border border-[#451713]/15 bg-[#f8f2ec] p-6 sm:p-7"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <span className="font-serif text-xl text-[#451713]/35">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="font-serif text-2xl tracking-[-0.03em]">
                                {address.full_name}
                              </h3>

                              {address.is_default && (
                                <span className="border border-[#451713]/20 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em]">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="mt-2 text-[11px] text-[#451713]/55">
                              {address.phone}
                            </p>
                          </div>
                        </div>

                        {!address.is_default && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSetDefault(
                                address.id
                              )
                            }
                            disabled={
                              defaultId === address.id
                            }
                            className="w-fit text-left text-[9px] font-semibold uppercase tracking-[0.17em] underline underline-offset-4 transition hover:opacity-55 disabled:opacity-40"
                          >
                            {defaultId === address.id
                              ? "Updating"
                              : "Make default"}
                          </button>
                        )}
                      </div>

                      <div className="ml-8 mt-6 border-t border-[#451713]/10 pt-5">
                        <div className="space-y-1 text-[12px] leading-5 text-[#451713]/65">
                          {addressLines.map(
                            (line, lineIndex) => (
                              <p key={lineIndex}>
                                {line}
                              </p>
                            )
                          )}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                          <Link
                            href="/checkout"
                            className="text-[9px] font-semibold uppercase tracking-[0.17em] underline underline-offset-4 transition hover:opacity-55"
                          >
                            Use at checkout
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                address.id
                              )
                            }
                            disabled={
                              deletingId === address.id
                            }
                            className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#451713]/45 underline underline-offset-4 transition hover:text-[#451713] disabled:opacity-40"
                          >
                            {deletingId === address.id
                              ? "Removing"
                              : "Remove"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}