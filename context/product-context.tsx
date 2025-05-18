"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Define types
export type Product = {
  id: string
  title: string
  description: string
  category: string
  price: number
  image: string
  sellerId: string
  sellerName: string
  createdAt: string
}

type ProductContextType = {
  products: Product[]
  userListings: (userId: string) => Product[]
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  updateProduct: (id: string, product: Partial<Omit<Product, "id" | "sellerId" | "createdAt">>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
}

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined)

// Sample product data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    description: "Genuine leather jacket in excellent condition. Worn only a few times.",
    category: "Clothing",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    sellerId: "1",
    sellerName: "johndoe",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Mechanical Keyboard",
    description: "Mechanical keyboard with Cherry MX Brown switches. Great for typing and gaming.",
    category: "Electronics",
    price: 45.5,
    image: "/placeholder.svg?height=300&width=300",
    sellerId: "1",
    sellerName: "johndoe",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Vintage Record Player",
    description: "Fully functional record player from the 70s. Great sound quality.",
    category: "Electronics",
    price: 120.0,
    image: "/placeholder.svg?height=300&width=300",
    sellerId: "2",
    sellerName: "janedoe",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Mountain Bike",
    description: "Lightly used mountain bike. 21 speeds, disc brakes.",
    category: "Sports",
    price: 210.0,
    image: "/placeholder.svg?height=300&width=300",
    sellerId: "2",
    sellerName: "janedoe",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "Antique Wooden Chair",
    description: "Beautiful wooden chair from the early 1900s. Some wear but in good condition.",
    category: "Furniture",
    price: 75.0,
    image: "/placeholder.svg?height=300&width=300",
    sellerId: "3",
    sellerName: "bobsmith",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    title: "Handmade Ceramic Vase",
    description: "Unique handmade ceramic vase. Perfect for fresh or dried flowers.",
    category: "Home Decor",
    price: 35.0,
    image: "/placeholder.svg?height=300&width=300",
    sellerId: "3",
    sellerName: "bobsmith",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load products from localStorage or use initial data
    const savedProducts = localStorage.getItem("ecofinds-products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(INITIAL_PRODUCTS)
      localStorage.setItem("ecofinds-products", JSON.stringify(INITIAL_PRODUCTS))
    }
  }, [])

  const userListings = (userId: string) => {
    return products.filter((product) => product.sellerId === userId)
  }

  const addProduct = (product: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...product,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    }

    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)
    localStorage.setItem("ecofinds-products", JSON.stringify(updatedProducts))

    toast({
      title: "Product added",
      description: "Your product has been successfully listed.",
    })

    return newProduct
  }

  const updateProduct = (id: string, product: Partial<Omit<Product, "id" | "sellerId" | "createdAt">>) => {
    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      })
      return
    }

    const updatedProducts = [...products]
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      ...product,
    }

    setProducts(updatedProducts)
    localStorage.setItem("ecofinds-products", JSON.stringify(updatedProducts))

    toast({
      title: "Product updated",
      description: "Your product has been successfully updated.",
    })
  }

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id)
    setProducts(updatedProducts)
    localStorage.setItem("ecofinds-products", JSON.stringify(updatedProducts))

    toast({
      title: "Product deleted",
      description: "Your product has been successfully removed.",
    })
  }

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id)
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        userListings,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
