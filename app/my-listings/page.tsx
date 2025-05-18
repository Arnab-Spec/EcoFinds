"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/context/auth-context"
import { useProducts } from "@/context/product-context"
import { Edit, Plus, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"

export default function MyListingsPage() {
  const { user } = useAuth()
  const { userListings, deleteProduct } = useProducts()
  const router = useRouter()
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // Handle redirection and data fetching in useEffect to avoid SSR issues
  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }
  }, [user, router])

  // If not logged in, show loading state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  const listings = userListings(user.id)

  const handleDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete)
      setProductToDelete(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Listings</h1>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/sell">
              <Plus className="mr-2 h-4 w-4" />
              Add New Listing
            </Link>
          </Button>
        </div>

        {listings.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <CardTitle>No Listings Yet</CardTitle>
              <CardDescription>You haven&apos;t listed any products for sale yet.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Start selling your pre-owned items and contribute to a more sustainable future.</p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/sell">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Listing
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((product) => (
              <Card key={product.id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl">
                <div className="aspect-square relative rounded-t-xl overflow-hidden">
                  <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                </div>
                <CardHeader className="p-5 pb-0">
                  <CardTitle className="text-lg line-clamp-1 text-gray-800 dark:text-gray-100">{product.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-300 mt-1">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">{product.category}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0 flex justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                    onClick={() => router.push(`/edit-product/${product.id}`)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Dialog
                    open={productToDelete === product.id}
                    onOpenChange={(open) => {
                      if (!open) setProductToDelete(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 rounded-md"
                        onClick={() => setProductToDelete(product.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete &quot;{product.title}&quot;? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setProductToDelete(null)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
