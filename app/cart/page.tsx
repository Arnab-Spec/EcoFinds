"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useProducts } from "@/context/product-context"
import { usePurchases } from "@/context/purchase-context"
import { useAuth } from "@/context/auth-context"
import { Minus, Plus, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const { products } = useProducts()
  const { addPurchase } = usePurchases()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return {
        ...item,
        product,
      }
    })
    .filter((item) => item.product)

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to complete your purchase.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    // Process each cart item as a purchase
    cartItems.forEach((item) => {
      if (item.product) {
        addPurchase(user.id, item.productId, item.product.price * item.quantity)
      }
    })

    // Clear the cart
    clearCart()

    // Redirect to purchases page
    router.push("/purchases")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/browse">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4 border rounded-lg p-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.product?.image || "/placeholder.svg?height=80&width=80"}
                      alt={item.product?.title || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.productId}`}
                      className="text-lg font-medium hover:underline line-clamp-1"
                    >
                      {item.product?.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.product?.category}</p>
                    <p className="mt-1 font-medium">${(item.product?.price || 0).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="border rounded-lg p-6 space-y-4 sticky top-20">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal(products).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${getCartTotal(products).toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleCheckout}>
                  Checkout
                </Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
