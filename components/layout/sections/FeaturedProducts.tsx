'use client'

import React from 'react'

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="h-64 bg-neutral-200 rounded-lg mb-4" />
        <h3 className="font-semibold text-neutral-900 mb-2">Featured Product 1</h3>
        <p className="text-neutral-600 mb-4">₹999</p>
        <button className="w-full bg-primary-700 text-white py-2 rounded-lg hover:bg-primary-800">
          Add to Cart
        </button>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="h-64 bg-neutral-200 rounded-lg mb-4" />
        <h3 className="font-semibold text-neutral-900 mb-2">Featured Product 2</h3>
        <p className="text-neutral-600 mb-4">₹1,299</p>
        <button className="w-full bg-primary-700 text-white py-2 rounded-lg hover:bg-primary-800">
          Add to Cart
        </button>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="h-64 bg-neutral-200 rounded-lg mb-4" />
        <h3 className="font-semibold text-neutral-900 mb-2">Featured Product 3</h3>
        <p className="text-neutral-600 mb-4">₹1,499</p>
        <button className="w-full bg-primary-700 text-white py-2 rounded-lg hover:bg-primary-800">
          Add to Cart
        </button>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="h-64 bg-neutral-200 rounded-lg mb-4" />
        <h3 className="font-semibold text-neutral-900 mb-2">Featured Product 4</h3>
        <p className="text-neutral-600 mb-4">₹1,199</p>
        <button className="w-full bg-primary-700 text-white py-2 rounded-lg hover:bg-primary-800">
          Add to Cart
        </button>
      </div>
    </div>
  )
}