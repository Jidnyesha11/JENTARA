"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import {
  addAddress,
  getAddresses,
  deleteAddress,
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

export default function AddressesPage() {
  const { user } = useAuth();

  const [addresses, setAddresses] =
    useState<Address[]>([]);

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [addressLine1, setAddressLine1] =
    useState("");

  const [addressLine2, setAddressLine2] =
    useState("");

  const [city, setCity] =
    useState("");

  const [stateName, setStateName] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  async function loadAddresses() {
    if (!user) return;

    const userId = user.id;

    try {
      const data =
        await getAddresses(
          userId
        );

      setAddresses(data ?? []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!user) return;

    const userId = user.id;

    async function fetchAddresses() {
      try {
        const data =
          await getAddresses(
            userId
          );

        setAddresses(data ?? []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAddresses();
  }, [user]);

  async function handleAddAddress() {
    if (!user) return;

    const userId = user.id;

    try {
      await addAddress({
        user_id: userId,

        full_name: fullName,

        phone,

        address_line_1:
          addressLine1,

        address_line_2:
          addressLine2,

        city,

        state: stateName,

        pincode,
      });

      await loadAddresses();

      setFullName("");
      setPhone("");
      setAddressLine1("");
      setAddressLine2("");
      setCity("");
      setStateName("");
      setPincode("");

      alert(
        "Address Added Successfully"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : JSON.stringify(error);

      console.error(
        "ADDRESS ERROR:",
        errorMessage
      );

      alert(errorMessage);
    }
  }

  async function handleDeleteAddress(
  id: string
) {
  try {
    await deleteAddress(id);

    await loadAddresses();
  } catch (error) {
    console.error(error);
  }
}

async function handleSetDefault(
  addressId: string
) {
  if (!user) return;

  try {
    await setDefaultAddress(
      user.id,
      addressId
    );

    await loadAddresses();
  } catch (error) {
    console.error(error);
  }
}

  return (
  <div className="min-h-screen bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-12">

    <div className="max-w-7xl mx-auto">

      <div className="mb-12">
        <h1 className="text-4xl font-bold sm:text-5xl text-[#4a0f0f]">
          My Addresses
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your delivery addresses.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Address Form */}
        <div>
          <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-8">
              Add New Address
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">

              <input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="border p-4 rounded-xl"
              />

              <input
                placeholder="Phone"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="border p-4 rounded-xl"
              />

            </div>

            <input
              placeholder="Address Line 1"
              value={addressLine1}
              onChange={(e) =>
                setAddressLine1(
                  e.target.value
                )
              }
              className="border p-4 rounded-xl w-full mt-4"
            />

            <input
              placeholder="Address Line 2"
              value={addressLine2}
              onChange={(e) =>
                setAddressLine2(
                  e.target.value
                )
              }
              className="border p-4 rounded-xl w-full mt-4"
            />

            <div className="mt-4 grid gap-4 sm:grid-cols-3">

              <input
                placeholder="City"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className="border p-4 rounded-xl"
              />

              <input
                placeholder="State"
                value={stateName}
                onChange={(e) =>
                  setStateName(
                    e.target.value
                  )
                }
                className="border p-4 rounded-xl"
              />

              <input
                placeholder="Pincode"
                value={pincode}
                onChange={(e) =>
                  setPincode(
                    e.target.value
                  )
                }
                className="border p-4 rounded-xl"
              />

            </div>

            <button
              onClick={handleAddAddress}
              className="
                mt-6
                w-full
                bg-[#4a0f0f]
                text-white
                py-4
                rounded-xl
                font-semibold
                hover:bg-[#5d1818]
                transition
              "
            >
              Save Address
            </button>

          </div>
        </div>

        {/* Saved Addresses */}
        <div>

          {addresses.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-md p-8 text-center">

              <h3 className="text-2xl font-semibold mb-3">
                No Addresses Found
              </h3>

              <p className="text-gray-500">
                Add your first delivery address.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {addresses.map((address) => (

                <div
                  key={address.id}
                  className="
                    bg-white
                    rounded-3xl
                    shadow-md
                    p-6
                  "
                >

                  {address.is_default && (
                    <span
                      className="
                        inline-block
                        bg-green-100
                        text-green-700
                        text-xs
                        px-3
                        py-1
                        rounded-full
                        mb-3
                      "
                    >
                      Default Address
                    </span>
                  )}

                  <h3 className="text-xl font-bold">
                    {address.full_name}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {address.phone}
                  </p>

                  <div className="mt-4 text-gray-600 space-y-1">

                    <p>
                      {address.address_line_1}
                    </p>

                    <p>
                      {address.address_line_2}
                    </p>

                    <p>
                      {address.city},{" "}
                      {address.state}
                    </p>

                    <p>
                      {address.pincode}
                    </p>

                  </div>

                  <div className="mt-6 flex gap-4">

                    {!address.is_default && (
                      <button
                        onClick={() =>
                          handleSetDefault(
                            address.id
                          )
                        }
                        className="
                          px-5
                          py-2
                          rounded-lg
                          bg-blue-100
                          text-blue-700
                          hover:bg-blue-200
                        "
                      >
                        Set Default
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDeleteAddress(
                          address.id
                        )
                      }
                      className="
                        px-5
                        py-2
                        rounded-lg
                        bg-red-100
                        text-red-600
                        hover:bg-red-200
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  </div>
);
}