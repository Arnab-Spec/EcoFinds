"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/context/cart-context"
import { useProducts } from "@/context/product-context"
import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"

export default function BrowsePage() {
  const { products } = useProducts()
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [filteredProducts, setFilteredProducts] = useState(products)

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))]

  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Browse Products</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden flex flex-col h-full">
                <Link href={`/product/${product.id}`} className="relative">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <CardContent className="p-4 flex-1">
                  <Link href={`/product/${product.id}`}>
                    <h2 className="font-semibold text-lg line-clamp-1 hover:underline">{product.title}</h2>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-medium text-lg">${product.price.toFixed(2)}</span>
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
        )}
      </main>
    </div>
  )
}
