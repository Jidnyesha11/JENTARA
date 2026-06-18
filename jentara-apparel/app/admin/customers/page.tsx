"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllCustomers,
} from "@/lib/supabase/admin-customers";

import AdminNavbar from "@/components/admin/AdminNavbar";

interface Customer {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  useEffect(() => {
    let mounted = true;

    getAllCustomers()
      .then((data) => {
        if (mounted) {
          setCustomers(
            data ?? []
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">
        Customers
      </h1>

      <AdminNavbar />

      <div className="space-y-4">
        {customers.length === 0 ? (
          <div
            className="
              border
              rounded-xl
              p-10
              text-center
            "
          >
            No Customers Found
          </div>
        ) : (
          customers.map(
            (customer) => (
              <div
                key={customer.id}
                className="
                  border
                  rounded-xl
                  p-6
                "
              >
                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  {customer.email}
                </p>

                <p>
                  <strong>
                    Role:
                  </strong>{" "}
                  {customer.role}
                </p>

                <p>
                  <strong>
                    Joined:
                  </strong>{" "}
                  {new Date(
                    customer.created_at
                  ).toLocaleDateString()}
                </p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}