"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { useProducts } from "@/context/product-context"
import { usePurchases } from "@/context/purchase-context"
import { formatDistanceToNow } from "date-fns"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"

export default function PurchasesPage() {
  const { user } = useAuth()
  const { getUserPurchases } = usePurchases()
  const { getProductById } = useProducts()
  const router = useRouter()

  // Redirect if not logged in
  if (!user) {
    router.push("/auth/login")
    return null
  }

  const userPurchases = getUserPurchases(user.id)

  // Enrich purchases with product data
  const enrichedPurchases = userPurchases
    .map((purchase) => {
      const product = getProductById(purchase.productId)
      return {
        ...purchase,
        product,
      }
    })
    .filter((purchase) => purchase.product) // Filter out purchases with missing products

  // Sort by purchase date (newest first)
  enrichedPurchases.sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Your Purchases</h1>

        {enrichedPurchases.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle>No Purchases Yet</CardTitle>
              <CardDescription>You haven&apos;t made any purchases yet.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Explore our marketplace to find unique and sustainable second-hand items.</p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/browse">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {enrichedPurchases.map((purchase) => (
              <Card key={purchase.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-48 h-48">
                    <Image
                      src={purchase.product?.image || "/placeholder.svg?height=200&width=200"}
                      alt={purchase.product?.title || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold">{purchase.product?.title}</h2>
                        <p className="text-sm text-muted-foreground">{purchase.product?.category}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <p className="font-medium">${purchase.price.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          Purchased {formatDistanceToNow(new Date(purchase.purchaseDate), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{purchase.product?.description}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/product/${purchase.productId}`}>View Product</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
