export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  original_price: number | null
  category_id: string | null
  image_url: string | null
  gallery_images: string[] | null
  sizes: string[] | null
  colors: string[] | null
  stock: number
  sku: string | null
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductReview {
  id: string
  product_id: string
  user_id: string
  rating: number
  title: string
  content: string
  is_verified: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}
