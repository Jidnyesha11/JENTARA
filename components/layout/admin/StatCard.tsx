import React from 'react'
import { LucideIcon, TrendingUp } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
  trend?: string
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className={`${color} p-3 rounded-lg text-white`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
            <TrendingUp size={16} />
            {trend}
          </div>
        )}
      </div>
      <p className="text-neutral-600 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-neutral-900">{value}</p>
    </div>
  )
}