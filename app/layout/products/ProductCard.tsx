'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/formatting'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const discount =
    product.original_price && product.price < product.original_price
      ? Math.round(
          ((product.original_price - product.price) /
            product.original_price) *
            100
        )
      : 0

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div
          className="relative overflow-hidden bg-neutral-100 aspect-square rounded-lg mb-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={product.image_url || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discount}%
            </div>
          )}

          {/* Stock Status */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
          >
            <Heart
              size={20}
              className={`transition ${
                isWishlisted
                  ? 'fill-primary-700 text-primary-700'
                  : 'text-neutral-400'
              }`}
            />
          </button>

          {/* Add to Cart Button (On Hover) */}
          {isHovered && product.stock > 0 && (
            <button
              onClick={(e) => {
                e.preventDefault()
                // TODO: Add to cart
              }}
              className="absolute bottom-4 left-4 right-4 bg-primary-700 text-white py-2 rounded-lg font-semibold hover:bg-primary-800 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-700 transition line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-neutral-900">
              {formatCurrency(product.price)}
            </span>
            {product.original_price && product.price < product.original_price && (
              <span className="text-sm text-neutral-500 line-through">
                {formatCurrency(product.original_price)}
              </span>
            )}
          </div>

          {/* Size Info */}
          {product.sizes && product.sizes.length > 0 && (
            <p className="text-xs text-neutral-500 mb-2">
              {product.sizes.join(', ')}
            </p>
          )}

          {/* Stock Info */}
          <p className={`text-xs font-medium ${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.stock > 0
              ? `${product.stock} in stock`
              : 'Out of stock'}
          </p>
        </div>
      </div>
    </Link>
  )
}