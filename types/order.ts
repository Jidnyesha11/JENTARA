export interface Order {
  id: string
  user_id: string
  order_number: string
  total_amount: number
  subtotal: number
  tax_amount: number
  shipping_cost: number
  discount_amount: number
  status: string
  payment_method: string | null
  payment_status: string
  stripe_payment_id: string | null
  
  // Shipping
  shipping_address: string
  shipping_city: string | null
  shipping_state: string | null
  shipping_postal_code: string | null
  shipping_country: string | null

  // Billing
  billing_address: string
  billing_city: string | null
  billing_state: string | null
  billing_postal_code: string | null
  billing_country: string | null

  notes: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  size: string | null
  color: string | null
  created_at: string
}

export interface OrderWithItems extends Order {
  items: OrderItem[]
}
