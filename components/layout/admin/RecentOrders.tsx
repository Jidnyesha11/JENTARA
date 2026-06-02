'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { formatCurrency, formatDate } from '@/lib/utils/formatting'
import type { Order } from '@/types/order'

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

        setOrders((data || []) as Order[])
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentOrders()
  }, [])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return colors[status] || colors.pending
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200">
      <div className="p-6 border-b border-neutral-200">
        <h2 className="text-xl font-semibold text-neutral-900">Recent Orders</h2>
      </div>

      {isLoading ? (
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-neutral-100 rounded"></div>
            ))}
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="p-6 text-center text-neutral-600">
          No orders found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                >
                  <td className="px-6 py-3 text-sm font-mono text-neutral-900">
                    {order.order_number}
                  </td>
                  <td className="px-6 py-3 text-sm font-semibold text-neutral-900">
                    {formatCurrency(order.total_amount)}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-neutral-600">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <Link href={`/admin/orders/${order.id}`}>
                      <button className="text-primary-700 hover:text-primary-800 font-semibold">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}