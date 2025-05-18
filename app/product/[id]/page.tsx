"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useProducts } from "@/context/product-context"
import { ArrowLeft, Calendar, MapPin, ShoppingCart, Star, User } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { format } from "date-fns"

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { getProductById } = useProducts()
  const { addToCart } = useCart()
  const router = useRouter()

  // Get product directly without useState to avoid unnecessary re-renders
  const product = getProductById(id)

  // Use useEffect only for navigation if product not found
  useEffect(() => {
    if (!product) {
      router.push("/browse")
    }
  }, [product, router])

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority={true}
              loading="eager"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link href={`/browse?category=${encodeURIComponent(product.category)}`} className="hover:underline">
                {product.category}
              </Link>
              {product.subCategory && (
                <>
                  <span>/</span>
                  <Link
                    href={`/browse?category=${encodeURIComponent(product.category)}&subcategory=${encodeURIComponent(product.subCategory)}`}
                    className="hover:underline"
                  >
                    {product.subCategory}
                  </Link>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold">{product.title}</h1>

            <div className="mt-2 flex items-center">
              <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
              <span className="ml-4 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                {product.condition}
              </span>
            </div>

            <Tabs defaultValue="description" className="mt-6">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="seller">Seller Info</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="pt-4">
                <div className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2 py-1 border-b last:border-0">
                      <span className="font-medium">{spec.name}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="seller" className="pt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-100 rounded-full p-3">
                        <User className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{product.seller.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{product.seller.rating} rating</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {format(new Date(product.seller.joinedDate), "MMMM yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{product.seller.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        <span>{product.seller.totalSales} total sales</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

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
      <Footer />
    </div>
  )
}
