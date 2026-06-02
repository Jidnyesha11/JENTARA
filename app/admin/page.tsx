'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import StatCard from '@/components/admin/StatCard'
import RecentOrders from '@/components/admin/RecentOrders'
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Eye,
  Download,
} from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  recentOrdersCount: number
  topProducts: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrdersCount: 0,
    topProducts: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          supabase.from('products').select('id', { count: 'exact' }),
          supabase.from('orders').select('total_amount', { count: 'exact' }),
          supabase.from('users').select('id', { count: 'exact' }),
        ])

        // Calculate revenue
        const { data: ordersData } = await supabase
          .from('orders')
          .select('total_amount')
          .eq('payment_status', 'completed')

        const totalRevenue =
          ordersData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

        setStats({
          totalProducts: productsRes.count || 0,
          totalOrders: ordersRes.count || 0,
          totalUsers: usersRes.count || 0,
          totalRevenue,
          recentOrdersCount: ordersRes.count || 0,
          topProducts: [],
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      trend: '+8%',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
      trend: '+5%',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      trend: '+15%',
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-1">Welcome back to Jentara Admin</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-neutral-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      )}

      {/* Charts & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">
            Revenue Overview
          </h2>
          <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600">
            <div className="text-center">
              <Eye size={40} className="mx-auto mb-2 opacity-50" />
              <p>Chart visualization coming soon</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Quick Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Avg Order Value</span>
              <span className="font-bold text-neutral-900">₹2,450</span>
            </div>
            <div className="h-px bg-neutral-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Conversion Rate</span>
              <span className="font-bold text-neutral-900">3.2%</span>
            </div>
            <div className="h-px bg-neutral-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Avg Shipping Cost</span>
              <span className="font-bold text-neutral-900">₹100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  )
}