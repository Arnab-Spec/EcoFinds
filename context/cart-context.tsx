"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "./product-context"

// Define types
type CartItem = {
  productId: string
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: (products: Product[]) => number
  getCartItemCount: () => number
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("ecofinds-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ecofinds-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId)

      if (existingItem) {
        // Increment quantity if item already exists
        return prevCart.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item with quantity 1
        return [...prevCart, { productId, quantity: 1 }]
      }
    })

    toast({
      title: "Added to cart",
      description: "Item has been added to your cart.",
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId))

    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const getCartTotal = (products: Product[]) => {
    return cart.reduce((total, cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId)
      return total + (product ? product.price * cartItem.quantity : 0)
    }, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
