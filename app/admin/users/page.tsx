'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils/formatting'
import { Shield, Mail, Phone } from 'lucide-react'
import type { User } from '@/types/auth'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      setUsers((data || []) as User[])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAdminStatus = async (userId: string, isAdmin: boolean) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: isAdmin ? 'user' : 'admin' })
        .eq('id', userId)

      if (error) throw error

      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, role: isAdmin ? 'user' : 'admin' } : u
        )
      )
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Users</h1>
        <p className="text-neutral-600 mt-1">
          Manage customer accounts and permissions
        </p>
      </div>

      {/* Users Table */}
      <div className="mt-8 bg-white rounded-lg border border-neutral-200 overflow-hidden">
        {isLoading ? (
          <div className="p-6 animate-pulse space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-12 bg-neutral-100 rounded"></div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-neutral-600">
            <p>No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50 transition"
                  >
                    <td className="px-6 py-3 text-sm font-medium text-neutral-900">
                      {user.full_name || '—'}
                    </td>
                    <td className="px-6 py-3 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-neutral-600">
                      {user.phone ? (
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          {user.phone}
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 w-fit ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role === 'admin' && <Shield size={14} />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-neutral-600">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <button
                        onClick={() =>
                          toggleAdminStatus(user.id, user.role === 'admin')
                        }
                        className="text-primary-700 hover:text-primary-800 font-semibold"
                      >
                        {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
