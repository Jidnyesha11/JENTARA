"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

interface OrderItem {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
}

interface Order {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
}

export default function OrderDetailsPage() {
  const params = useParams();

  const [items, setItems] = useState<OrderItem[]>([]);
  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadOrder() {
      const { data, error } =
        await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", params.id);

      if (error) {
        console.error(error);
      }

      const {
        data: orderData,
        error: orderError,
      } = await supabase
        .from("orders")
        .select(
          `
          address_line_1,
          address_line_2,
          city,
          state,
          pincode
        `
        )
        .eq("id", params.id)
        .single();

      if (orderError) {
        console.error(orderError);
      }

      setItems(data || []);
      setOrder(orderData || null);

      setLoading(false);
    }

    loadOrder();
  }, [params.id]);

  const totalAmount =
    items.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Order Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold text-[#4a0f0f]">
            Order Details
          </h1>

          <p className="text-gray-500 mt-2">
            Review your purchased items and shipping information.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Order Items */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-3xl font-bold mb-8">
                Ordered Items
              </h2>

              {items.length === 0 ? (

                <p className="text-gray-500">
                  No items found.
                </p>

              ) : (

                <div className="space-y-6">

                  {items.map((item) => (

                    <div
                      key={item.id}
                      className="
                        border
                        rounded-2xl
                        p-6
                      "
                    >

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="text-2xl font-semibold">
                            {item.product_name}
                          </h3>

                          <p className="text-gray-500 mt-2">
                            Quantity:
                            {" "}
                            {item.quantity}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-xl font-bold text-[#4a0f0f]">
                            ₹
                            {item.price}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            Each
                          </p>

                        </div>

                      </div>

                      <div className="mt-4 border-t pt-4 flex justify-between">

                        <span className="font-medium">
                          Subtotal
                        </span>

                        <span className="font-bold">
                          ₹
                          {item.price *
                            item.quantity}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

          {/* Right Side */}
          <div className="space-y-8">

            {/* Delivery Address */}
            {order && (

              <div className="bg-white rounded-3xl shadow-md p-8">

                <h2 className="text-2xl font-bold mb-6">
                  Delivery Address
                </h2>

                <div className="text-gray-600 space-y-2">

                  <p>
                    {order.address_line_1}
                  </p>

                  <p>
                    {order.address_line_2}
                  </p>

                  <p>
                    {order.city},{" "}
                    {order.state}
                  </p>

                  <p>
                    {order.pincode}
                  </p>

                </div>

              </div>

            )}

            {/* Order Summary */}
            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>
                    {items.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">
                    Free
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Included</span>
                </div>

              </div>

              <div className="border-t mt-6 pt-6">

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-[#4a0f0f]">
                    ₹{totalAmount}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}