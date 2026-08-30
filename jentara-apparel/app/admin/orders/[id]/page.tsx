// app/admin/orders/[id]/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getAdminOrder,
  ORDER_STATUSES,
  updateOrderStatus,
  type OrderStatus,
} from "@/lib/supabase/admin-orders";

const money = (value: number) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function AdminOrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadOrder() {
    try {
      setData(await getAdminOrder(params.id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.id) void loadOrder();
  }, [params.id]);

  async function changeStatus(status: OrderStatus) {
    if (!data?.order) return;

    setSaving(true);

    try {
      const updated = await updateOrderStatus(data.order.id, status);
      setData((current: any) => ({
        ...current,
        order: { ...current.order, ...updated },
      }));
    } catch (error) {
      console.error(error);
      window.alert("Status could not be updated.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-[1500px] px-5 py-20 text-[9px] uppercase tracking-[0.2em]">Loading order</div>;
  }

  if (!data?.order) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-20 text-center">
        <p className="font-serif text-3xl">Order not found.</p>
        <Link href="/admin/orders" className="mt-5 inline-block text-[9px] font-semibold uppercase tracking-[0.18em] underline">
          Back to orders →
        </Link>
      </div>
    );
  }

  const order = data.order;
  const items = data.items ?? [];
  const itemTotal = items.reduce(
    (total: number, item: any) => total + Number(item.price ?? 0) * Number(item.quantity ?? 0),
    0,
  );

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <Link href="/admin/orders" className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#451713]/45 underline underline-offset-4">
        ← All orders
      </Link>

      <header className="mt-7 border-b border-[#451713]/15 pb-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#451713]/40">
              Order
            </p>
            <h1 className="mt-3 font-serif text-[48px] leading-none tracking-[-0.06em]">
              #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <p className="mt-3 text-[10px] text-[#451713]/45">
              {new Date(order.created_at).toLocaleString("en-IN")}
            </p>
          </div>

          <select
            value={order.status || "pending"}
            disabled={saving}
            onChange={(event) => void changeStatus(event.target.value as OrderStatus)}
            className="min-h-11 border border-[#451713]/20 bg-transparent px-4 text-[9px] font-semibold uppercase tracking-[0.15em]"
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </header>

      <section className="grid gap-10 py-10 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="border border-[#451713]/12">
          <div className="border-b border-[#451713]/10 p-6 sm:p-8">
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
              Purchased pieces
            </p>
            <h2 className="mt-2 font-serif text-3xl">{items.length} line items</h2>
          </div>

          <div className="divide-y divide-[#451713]/10">
            {items.map((item: any) => (
              <div key={item.id} className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
                <div>
                  <p className="font-serif text-xl">{item.product_name}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#451713]/45">
                    Size {item.size || "—"} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-[11px] font-semibold">{money(Number(item.price) * Number(item.quantity))}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#451713]/10 p-6 sm:p-8">
            <div className="flex justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em]">Items subtotal</span>
              <span className="font-serif text-2xl">{money(itemTotal)}</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-[#451713]/10 pt-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em]">Order total</span>
              <span className="font-serif text-3xl">{money(order.total_amount)}</span>
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="border border-[#451713]/12 p-6 sm:p-8">
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">Customer</p>
            <h2 className="mt-3 font-serif text-2xl">{order.customer_name || "Guest customer"}</h2>
            <p className="mt-3 break-all text-[11px] text-[#451713]/55">{order.customer_email}</p>
            {order.customer_phone && <p className="mt-2 text-[11px] text-[#451713]/55">{order.customer_phone}</p>}
          </div>

          <div className="border border-[#451713]/12 p-6 sm:p-8">
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">Delivery address</p>
            <div className="mt-5 space-y-1 text-[11px] leading-6 text-[#451713]/65">
              <p>{order.address_line_1}</p>
              {order.address_line_2 && <p>{order.address_line_2}</p>}
              <p>{order.city}, {order.state}</p>
              <p>{order.pincode}</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
