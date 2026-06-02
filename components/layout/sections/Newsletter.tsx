'use client'

import React, { useState } from 'react'
import { Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-primary-700 text-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="mx-auto mb-6 text-secondary-500" size={40} />

        <h2 className="font-serif text-4xl font-bold mb-4">
          Stay in the Loop
        </h2>

        <p className="text-white/90 mb-8 text-lg">
          Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-3 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-secondary-500"
            disabled={isSubmitted}
          />
          <button
            type="submit"
            disabled={isSubmitted}
            className="px-8 py-3 bg-secondary-500 text-neutral-900 font-semibold rounded-lg hover:bg-secondary-600 transition disabled:opacity-50"
          >
            {isSubmitted ? '✓ Subscribed' : 'Subscribe'}
          </button>
        </form>

        <p className="text-white/70 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}