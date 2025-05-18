"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/auth-context"
import { useProducts } from "@/context/product-context"
import { ImagePlus } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { getProductById, updateProduct } = useProducts()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    const product = getProductById(id)

    // Redirect if product not found or user is not the seller
    if (!product) {
      router.push("/my-listings")
      return
    }

    if (!user || product.sellerId !== user.id) {
      router.push("/browse")
      return
    }

    // Set form values
    setTitle(product.title)
    setDescription(product.description)
    setCategory(product.category)
    setPrice(product.price.toString())
    setImage(product.image)
  }, [id, getProductById, user, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateProduct(id, {
      title,
      description,
      category,
      price: Number.parseFloat(price),
      image,
    })

    router.push("/my-listings")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 py-8 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Update the information about your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Leather Jacket"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Home Decor">Home Decor</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Toys">Toys</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item, including condition, age, dimensions, etc."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="29.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    {image && (
                      <div className="relative w-full h-32 mb-4">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt="Product preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-16 flex flex-col items-center justify-center"
                    >
                      <ImagePlus className="h-6 w-6 mb-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {image ? "Change image" : "Click to upload an image"}
                      </span>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Supported formats: JPEG, PNG, WebP</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Update Product
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
