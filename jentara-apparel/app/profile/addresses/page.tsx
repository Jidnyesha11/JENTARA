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
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">
        My Addresses
      </h1>

      <div className="space-y-4 max-w-2xl">
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          placeholder="Address Line 1"
          value={addressLine1}
          onChange={(e) =>
            setAddressLine1(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          placeholder="Address Line 2"
          value={addressLine2}
          onChange={(e) =>
            setAddressLine2(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          placeholder="State"
          value={stateName}
          onChange={(e) =>
            setStateName(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <input
          placeholder="Pincode"
          value={pincode}
          onChange={(e) =>
            setPincode(
              e.target.value
            )
          }
          className="border p-4 w-full rounded-lg"
        />

        <button
          onClick={
            handleAddAddress
          }
          className="
            bg-black
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Save Address
        </button>
      </div>
      <div className="mt-12 space-y-6">
  {addresses.length === 0 ? (
    <p>No addresses found.</p>
  ) : (
    addresses.map((address) => (
      <div
        key={address.id}
        className="
          border
          rounded-xl
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

        <p>{address.phone}</p>

        <p className="mt-4">
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

        <div className="mt-4 flex gap-4">
          <button
            onClick={() =>
              handleSetDefault(
                address.id
              )
            }
            className="
              text-blue-600
              font-medium
            "
          >
            Set Default
          </button>

          <button
            onClick={() =>
              handleDeleteAddress(
                address.id
              )
            }
            className="
              text-red-500
              font-medium
            "
          >
            Delete
          </button>
        </div>
      </div>
    ))
  )}
</div>
    </div>
  );
}