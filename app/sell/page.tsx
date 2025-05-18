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
import { ImagePlus, Trash2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"

export default function SellPage() {
  const { user } = useAuth()
  const { addProduct, categories } = useProducts()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [price, setPrice] = useState("")
  const [condition, setCondition] = useState("Good")
  const [image, setImage] = useState("/placeholder.svg?height=300&width=300")
  const [specifications, setSpecifications] = useState<Array<{ name: string; value: string }>>([
    { name: "", value: "" },
  ])
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Get subcategories for the selected category
  const subCategories = category ? categories.find((c) => c.name === category)?.subCategories || [] : []

  // Redirect if not logged in
  if (!user) {
    router.push("/auth/login")
    return null
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      // In a real app, we would upload the image to a server here
      // For now, we'll just use the preview URL
      setImage(previewUrl)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setImage("/placeholder.svg?height=300&width=300")
  }

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { name: "", value: "" }])
  }

  const handleRemoveSpecification = (index: number) => {
    const newSpecs = [...specifications]
    newSpecs.splice(index, 1)
    setSpecifications(newSpecs)
  }

  const handleSpecificationChange = (index: number, field: "name" | "value", value: string) => {
    const newSpecs = [...specifications]
    newSpecs[index][field] = value
    setSpecifications(newSpecs)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Filter out empty specifications
    const filteredSpecs = specifications.filter((spec) => spec.name.trim() !== "" && spec.value.trim() !== "")

    const newProduct = {
      title,
      description,
      category,
      subCategory,
      price: Number.parseFloat(price),
      image,
      specifications: filteredSpecs,
      condition,
      sellerId: user.id,
      seller: {
        id: user.id,
        name: user.username,
        rating: 4.5, // Default rating for new sellers
        joinedDate: new Date().toISOString(),
        location: "Mumbai, Maharashtra", // Default location
        totalSales: 0,
      },
    }

    addProduct(newProduct)
    router.push("/my-listings")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 py-8 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">List a Product</h1>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Provide detailed information about the item you want to sell.</CardDescription>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={category}
                      onValueChange={(value) => {
                        setCategory(value)
                        setSubCategory("") // Reset subcategory when category changes
                      }}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {category && (
                    <div className="space-y-2">
                      <Label htmlFor="subCategory">Subcategory</Label>
                      <Select value={subCategory} onValueChange={setSubCategory} required>
                        <SelectTrigger id="subCategory">
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {subCategories.map((subCategory) => (
                            <SelectItem key={subCategory} value={subCategory}>
                              {subCategory}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="999.99"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={condition} onValueChange={setCondition} required>
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Like New">Like New</SelectItem>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Very Good">Very Good</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Specifications</Label>
                  <div className="space-y-3">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Name (e.g., Brand)"
                          value={spec.name}
                          onChange={(e) => handleSpecificationChange(index, "name", e.target.value)}
                        />
                        <Input
                          placeholder="Value (e.g., Samsung)"
                          value={spec.value}
                          onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveSpecification(index)}
                          disabled={specifications.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={handleAddSpecification} className="mt-2">
                      Add Specification
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Product preview"
                          width={300}
                          height={300}
                          className="mx-auto h-48 object-contain"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-0 right-0 m-2"
                          onClick={handleRemoveImage}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="w-full h-32 flex flex-col items-center justify-center">
                          <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Click to upload an image</span>
                          <span className="text-xs text-muted-foreground mt-1">or drag and drop</span>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">Supported formats: JPEG, PNG, WebP</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Upload className="mr-2 h-4 w-4" />
                  List Product
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
