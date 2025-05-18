"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/context/cart-context"
import { useProducts } from "@/context/product-context"
import { Search, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useSearchParams } from "next/navigation"

export default function BrowsePage() {
  const { products, categories } = useProducts()
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const searchParams = useSearchParams()

  // Get subcategories for the selected category
  const subCategories =
    selectedCategory !== "all" ? categories.find((c) => c.name === selectedCategory)?.subCategories || [] : []

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const subcategoryParam = searchParams.get("subcategory")
    const searchParam = searchParams.get("search")

    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }

    if (subcategoryParam) {
      setSelectedSubCategory(subcategoryParam)
    }

    if (searchParam) {
      setSearchTerm(searchParam)
    }
  }, [searchParams])

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)

      // Filter by subcategory if selected
      if (selectedSubCategory && selectedSubCategory !== "all") {
        filtered = filtered.filter((product) => product.subCategory === selectedSubCategory)
      }
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedSubCategory])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="relative mb-12">
          {/* Background gradient effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-eco-green-100/20 to-eco-blue-100/20 dark:from-eco-green-900/10 dark:to-eco-blue-900/10 rounded-xl blur-lg opacity-70"></div>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-eco-green-200/20 dark:border-eco-green-500/10">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-eco-green-600 to-eco-blue-600 dark:from-eco-green-400 dark:to-eco-blue-400">Browse Products</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Discover sustainable second-hand treasures</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64 group">
                {/* Input glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-eco-green-400/0 to-eco-blue-400/0 group-hover:from-eco-green-400/30 group-hover:to-eco-blue-400/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-eco-green-500 dark:text-eco-green-400" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border-eco-green-200/50 dark:border-eco-green-700/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-eco-green-500/50 dark:focus:ring-eco-green-400/50 focus:border-transparent transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative group">
                {/* Select glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-eco-green-400/0 to-eco-blue-400/0 group-hover:from-eco-green-400/30 group-hover:to-eco-blue-400/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>

                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value)
                    setSelectedSubCategory("all") // Reset subcategory when category changes
                  }}
                >
                  <SelectTrigger className="w-full sm:w-44 border-eco-green-200/50 dark:border-eco-green-700/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-eco-green-500/50 dark:focus:ring-eco-green-400/50 focus:border-transparent transition-all duration-300">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-eco-green-200/50 dark:border-eco-green-700/30 rounded-lg shadow-lg">
                    <SelectItem value="all" className="focus:bg-eco-green-50 dark:focus:bg-eco-green-900/20">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name} className="focus:bg-eco-green-50 dark:focus:bg-eco-green-900/20">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCategory !== "all" && (
                <div className="relative group">
                  {/* Select glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-eco-green-400/0 to-eco-blue-400/0 group-hover:from-eco-green-400/30 group-hover:to-eco-blue-400/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>

                  <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                    <SelectTrigger className="w-full sm:w-44 border-eco-green-200/50 dark:border-eco-green-700/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-eco-green-500/50 dark:focus:ring-eco-green-400/50 focus:border-transparent transition-all duration-300">
                      <SelectValue placeholder="Subcategory" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-eco-green-200/50 dark:border-eco-green-700/30 rounded-lg shadow-lg">
                      <SelectItem value="all" className="focus:bg-eco-green-50 dark:focus:bg-eco-green-900/20">All Subcategories</SelectItem>
                      {subCategories.map((subCategory) => (
                        <SelectItem key={subCategory} value={subCategory} className="focus:bg-eco-green-50 dark:focus:bg-eco-green-900/20">
                          {subCategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 relative">
            <div className="absolute inset-0 bg-gradient-radial from-eco-green-100/10 to-transparent dark:from-eco-green-900/5 dark:to-transparent opacity-70"></div>
            <div className="relative">
              <div className="inline-block p-6 rounded-full bg-gradient-to-br from-eco-green-100/30 to-eco-blue-100/30 dark:from-eco-green-900/10 dark:to-eco-blue-900/10 backdrop-blur-sm mb-6 animate-float">
                <Search className="h-10 w-10 text-eco-green-500/70 dark:text-eco-green-400/70" />
              </div>
              <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-eco-green-600 to-eco-blue-600 dark:from-eco-green-400 dark:to-eco-blue-400">No products found</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden flex flex-col h-full border-0 shadow-md hover:shadow-xl transition-all duration-500 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:backdrop-blur-md relative"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-eco-green-400/0 to-eco-blue-400/0 group-hover:from-eco-green-400/5 group-hover:to-eco-blue-400/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>

                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-eco-green-200/0 via-eco-blue-400/0 to-eco-green-200/0 group-hover:from-eco-green-200/30 group-hover:via-eco-blue-400/30 group-hover:to-eco-green-200/30 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                <div className="relative flex flex-col h-full rounded-xl overflow-hidden z-10">
                  <Link href={`/product/${product.id}`} prefetch={true} className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {product.featured && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-eco-green-500 to-eco-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg backdrop-blur-sm">
                        <span className="relative inline-flex items-center">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75 mr-2"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white mr-2"></span>
                          Featured
                        </span>
                      </div>
                    )}
                  </Link>

                  <CardContent className="p-5 flex-1 relative">
                    <Link href={`/product/${product.id}`} prefetch={true}>
                      <h2 className="font-bold text-lg line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-eco-green-500 group-hover:to-eco-blue-500 transition-all duration-300">{product.title}</h2>
                    </Link>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{product.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-eco-green-600 to-eco-blue-600 dark:from-eco-green-400 dark:to-eco-blue-400">₹{product.price.toFixed(2)}</span>
                      <div className="flex items-center text-sm bg-gradient-to-r from-yellow-50/80 to-yellow-100/80 dark:from-yellow-900/20 dark:to-yellow-800/20 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{product.seller.rating}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs bg-gradient-to-r from-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">{product.category}</span>
                      <span className="text-xs bg-gradient-to-r from-eco-blue-50/80 to-eco-blue-100/80 dark:from-eco-blue-900/20 dark:to-eco-blue-800/20 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">{product.condition}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 pt-0">
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-gradient-to-r from-eco-green-500 to-eco-blue-500 hover:from-eco-green-600 hover:to-eco-blue-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 border-0"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
