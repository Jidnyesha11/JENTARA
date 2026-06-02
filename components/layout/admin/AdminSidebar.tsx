'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  X,
} from 'lucide-react'

const ADMIN_MENU = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
    submenu: [
      { title: 'All Products', href: '/admin/products' },
      { title: 'Add Product', href: '/admin/products/new' },
      { title: 'Categories', href: '/admin/categories' },
      { title: 'Inventory', href: '/admin/inventory' },
    ],
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
    submenu: [
      { title: 'All Orders', href: '/admin/orders' },
      { title: 'Pending Orders', href: '/admin/orders?status=pending' },
      { title: 'Shipped Orders', href: '/admin/orders?status=shipped' },
    ],
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href)

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary-700 text-white rounded-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative md:w-64 w-64 h-screen bg-neutral-900 text-white p-6 overflow-y-auto transition-transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } z-40`}
      >
        <Link href="/admin" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center font-bold">
            JA
          </div>
          <span className="font-serif font-bold">Jentara Admin</span>
        </Link>

        <nav className="space-y-2">
          {ADMIN_MENU.map((item) => (
            <div key={item.href}>
              <Link href={item.href}>
                <button
                  onClick={() => {
                    if (item.submenu) {
                      setExpanded((prev) => ({
                        ...prev,
                        [item.href]: !prev[item.href],
                      }))
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive(item.href)
                      ? 'bg-primary-700 text-white'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.submenu && (
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        expanded[item.href] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
              </Link>

              {/* Submenu */}
              {item.submenu && expanded[item.href] && (
                <div className="ml-4 mt-2 space-y-1 border-l border-neutral-700">
                  {item.submenu.map((sub) => (
                    <Link key={sub.href} href={sub.href}>
                      <button
                        className={`w-full text-left px-4 py-2 text-sm transition ${
                          pathname === sub.href
                            ? 'text-primary-500 bg-neutral-800'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {sub.title}
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}