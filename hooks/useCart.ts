'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAuth } from './useAuth'
import { supabase } from '@/lib/supabase/client'
import type { CartItem, Cart } from '@/types/cart'

export function useCart() {
  const { user } = useAuth()
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    itemCount: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart({
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        discount: 0,
        total: 0,
        itemCount: 0,
      })
      setIsLoading(false)
      return
    }

    try {
      const { data } = await supabase
        .from('carts')
        .select('*, product:product_id(id,name,price,image_url)')
        .eq('user_id', user.id)

      const items = data as CartItem[] | null

      if (items) {
        const subtotal = items.reduce(
          (sum, item) => sum + ((item.product?.price || 0) * item.quantity),
          0
        )
        const tax = subtotal * 0.18
        const shipping = subtotal > 999 ? 0 : 100
        const total = subtotal + tax + shipping

        setCart({
          items,
          subtotal,
          tax,
          shipping,
          discount: 0,
          total,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        })
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const addToCart = useCallback(
    async (
      productId: string,
      quantity: number,
      size?: string,
      color?: string
    ) => {
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase.from('carts').insert([
        {
          user_id: user.id,
          product_id: productId,
          quantity,
          size: size || 'M',
          color: color || 'Black',
        },
      ])

      if (error && error.code !== 'UNIQUE_VIOLATION') throw error

      await fetchCart()
    },
    [user, fetchCart]
  )

  const removeFromCart = useCallback(
    async (cartItemId: string) => {
      const { error } = await supabase
        .from('carts')
        .delete()
        .eq('id', cartItemId)

      if (error) throw error
      await fetchCart()
    },
    [fetchCart]
  )

  const updateQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      if (quantity < 1) {
        await removeFromCart(cartItemId)
        return
      }

      const { error } = await supabase
        .from('carts')
        .update({ quantity })
        .eq('id', cartItemId)

      if (error) throw error
      await fetchCart()
    },
    [fetchCart, removeFromCart]
  )

  const clearCart = useCallback(async () => {
    if (!user) return

    const { error } = await supabase.from('carts').delete().eq('user_id', user.id)

    if (error) throw error
    await fetchCart()
  }, [user, fetchCart])

  return {
    ...cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount: cart.itemCount,
  }
}