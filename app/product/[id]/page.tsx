"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useProducts } from "@/context/product-context"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { getProductById } = useProducts()
  const { addToCart } = useCart()
  const router = useRouter()
  const [product, setProduct] = useState(getProductById(id))

  useEffect(() => {
    const foundProduct = getProductById(id)
    if (!foundProduct) {
      router.push("/browse")
    } else {
      setProduct(foundProduct)
    }
  }, [id, getProductById, router])

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 py-8 md:px-6">
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="mt-2 flex items-center">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              <span className="ml-4 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                {product.category}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-2 text-muted-foreground">{product.description}</p>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold">Seller</h2>
              <p className="mt-2 text-muted-foreground">{product.sellerName}</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => addToCart(product.id)}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                Contact Seller
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
