export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  size: string | null
  color: string | null
  created_at: string
  updated_at: string
  // Joined product info
  product?: {
    id: string
    name: string
    price: number
    image_url: string | null
  }
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  itemCount: number
}
