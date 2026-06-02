'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { APP_CONFIG, NAVIGATION } from '@/lib/constants'
import { Search, ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <nav className={styles.navbar}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className="text-xl font-serif font-bold text-primary-700">
              Jentara
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAVIGATION.main.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary-700 border-b-2 border-primary-700'
                    : 'text-neutral-700 hover:text-primary-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className={styles.actions}>
            {/* Search */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition"
                title="Search"
              >
                <Search size={20} className="text-neutral-700" />
              </button>

              {isSearchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="absolute right-0 top-full mt-2 w-80 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 z-50"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
                    autoFocus
                  />
                </form>
              )}
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2 hover:bg-neutral-100 rounded-lg transition"
              title="Wishlist"
            >
              <Heart size={20} className="text-neutral-700" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <button className="p-2 hover:bg-neutral-100 rounded-lg transition">
                <ShoppingCart size={20} className="text-neutral-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/account">
                  <button className="p-2 hover:bg-neutral-100 rounded-lg transition">
                    <User size={20} className="text-neutral-700" />
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-50 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut size={20} className="text-red-600" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <button className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-700 transition">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-4 py-2 bg-primary-700 text-white text-sm font-medium rounded-lg hover:bg-primary-800 transition">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition"
            >
              {isOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} className="text-neutral-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <div className="space-y-2">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded transition"
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-2" />
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded transition"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 bg-primary-700 text-white rounded transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}