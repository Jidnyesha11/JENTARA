import React from 'react'
import Link from 'next/link'

interface HeroSectionProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  backgroundClass?: string
}

export default function HeroSection({
  title,
  subtitle,
  ctaText = 'Shop Now',
  ctaHref = '/shop',
  backgroundClass = 'bg-gradient-to-r from-primary-700 to-primary-600',
}: HeroSectionProps) {
  return (
    <section
      className={`relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden ${backgroundClass}`}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-slide-up">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up">
            {subtitle}
          </p>
        )}

        <Link href={ctaHref}>
          <button className="inline-block px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-neutral-100 transition transform hover:scale-105 animate-slide-up">
            {ctaText}
          </button>
        </Link>
      </div>
    </section>
  )
}