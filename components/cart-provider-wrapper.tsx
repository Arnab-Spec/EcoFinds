"use client"

import { CartProvider } from "@/context/cart-context"
import { ProductProvider } from "@/context/product-context"

export function CartProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProductProvider>
      <CartProvider>{children}</CartProvider>
    </ProductProvider>
  )
}
