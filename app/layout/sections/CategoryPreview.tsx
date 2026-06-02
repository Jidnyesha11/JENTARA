import React from 'react'
import Link from 'next/link'

const categories = [
  {
    name: 'Men',
    description: 'Explore our men\'s collection',
    href: '/shop?category=men',
    color: 'bg-primary-700',
  },
  {
    name: 'Women',
    description: 'Discover women\'s styles',
    href: '/shop?category=women',
    color: 'bg-primary-600',
  },
  {
    name: 'New Arrivals',
    description: 'Fresh drops every week',
    href: '/shop?sort=newest',
    color: 'bg-secondary-500',
  },
]

export default function CategoryPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link key={category.name} href={category.href}>
          <div className={`${category.color} rounded-lg p-8 text-white cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1 min-h-48 flex flex-col justify-center`}>
            <h3 className="text-2xl font-serif font-bold mb-2">
              {category.name}
            </h3>
            <p className="text-white/90">{category.description}</p>
            <div className="mt-6 inline-block text-white font-semibold group">
              Explore →{' '}
              <span className="inline-block transform group-hover:translate-x-1 transition">
                →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}