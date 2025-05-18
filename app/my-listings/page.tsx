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
import { useState } from "react"
import Navbar from "@/components/navbar"

export default function MyListingsPage() {
  const { user } = useAuth()
  const { userListings, deleteProduct } = useProducts()
  const router = useRouter()
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // Redirect if not logged in
  if (!user) {
    router.push("/auth/login")
    return null
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
      <main className="flex-1 container px-4 py-8 md:px-6">
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
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground">{product.category}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/edit-product/${product.id}`)}>
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
                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
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
