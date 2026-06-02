import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/layout/sections/HeroSection'
import FeaturedProducts from '@/components/layout/sections/FeaturedProducts'
import CategoryPreview from '@/components/layout/sections/CategoryPreview'
import Testimonials from '@/components/layout/sections/Testimonials'
import Newsletter from '@/components/layout/sections/Newsletter'
import { NAVIGATION } from '@/lib/constants'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Star of the New Generation"
        subtitle="Modern streetwear with perfect oversized fit, high quality fabric, and authentic style"
        ctaText="Shop Now"
        ctaHref="/shop"
        backgroundClass="bg-gradient-to-r from-primary-700 to-primary-600"
      />

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Stay ahead of the curve with our newest arrivals. Limited stock, unlimited style.
            </p>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Category Preview */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Shop by Category
            </h2>
          </div>
          <CategoryPreview />
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16 md:py-24 bg-secondary-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Perfect Oversized Fit */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary-700 rounded-full flex items-center justify-center text-white text-3xl">
                  👕
                </div>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Perfect Oversized Fit
              </h3>
              <p className="text-neutral-600">
                Perfectly balanced oversized fit that delivers comfort, structure, and effortless
                street presence.
              </p>
            </div>

            {/* High Quality Fabric */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary-700 rounded-full flex items-center justify-center text-white text-3xl">
                  ✨
                </div>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                High Quality Fabric
              </h3>
              <p className="text-neutral-600">
                High-quality fabric designed for comfort, durability, and a luxe everyday feel.
              </p>
            </div>

            {/* Premium Printing */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary-700 rounded-full flex items-center justify-center text-white text-3xl">
                  🎨
                </div>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Premium Print Quality
              </h3>
              <p className="text-neutral-600">
                Premium printing that delivers crisp detail and long-lasting impact on every piece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              What People Say
            </h2>
            <p className="text-neutral-600">
              Real feedback from those who wear Jentara every day
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}