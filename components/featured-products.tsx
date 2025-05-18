"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useProducts } from "@/context/product-context"
import { useCart } from "@/context/cart-context"
import { ArrowRight, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FeaturedProducts() {
  const { getFeaturedProducts } = useProducts()
  const { addToCart } = useCart()

  const featuredProducts = getFeaturedProducts().slice(0, 4)

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Products</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover our handpicked selection of exceptional pre-loved items
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col h-full">
              <Link href={`/product/${product.id}`} prefetch={true} className="relative">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  Featured
                </div>
              </Link>
              <CardContent className="p-4 flex-1">
                <Link href={`/product/${product.id}`} prefetch={true}>
                  <h3 className="font-semibold text-lg line-clamp-1 hover:underline">{product.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-medium text-lg">₹{product.price.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button onClick={() => addToCart(product.id)} className="w-full bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/browse">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
