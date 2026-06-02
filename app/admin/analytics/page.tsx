'use client'

import React from 'react'
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react'

export default function AdminAnalyticsPage() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '₹1,24,500',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Orders',
      value: '324',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Customers',
      value: '1,240',
      change: '+5.1%',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Growth',
      value: '23.5%',
      change: '+4.3%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Analytics</h1>
        <p className="text-neutral-600 mt-1">
          Business insights and performance metrics
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${metric.color} p-3 rounded-lg text-white`}>
                <metric.icon size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold">
                {metric.change}
              </span>
            </div>
            <p className="text-neutral-600 text-sm mb-2">{metric.title}</p>
            <p className="text-3xl font-bold text-neutral-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="mt-8 bg-white rounded-lg border border-neutral-200 p-12 text-center">
        <TrendingUp size={48} className="mx-auto text-neutral-400 mb-4" />
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          Advanced Analytics
        </h2>
        <p className="text-neutral-600">
          Detailed charts and reports coming soon. Track your business performance
          in real-time with comprehensive analytics.
        </p>
      </div>
    </div>
  )
}