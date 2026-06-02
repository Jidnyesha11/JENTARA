'use client'

import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { LogOut, Bell, Settings } from 'lucide-react'

export default function AdminHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="p-2 hover:bg-neutral-100 rounded-lg transition relative">
          <Bell size={20} className="text-neutral-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="p-2 hover:bg-neutral-100 rounded-lg transition">
          <Settings size={20} className="text-neutral-700" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
          <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold">
            {user?.full_name?.charAt(0) || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-neutral-900">
              {user?.full_name || 'Admin'}
            </p>
            <p className="text-xs text-neutral-600">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}
