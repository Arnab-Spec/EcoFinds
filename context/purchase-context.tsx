"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Define types
type Purchase = {
  id: string
  userId: string
  productId: string
  purchaseDate: string
  price: number
}

type PurchaseContextType = {
  purchases: Purchase[]
  addPurchase: (userId: string, productId: string, price: number) => void
  getUserPurchases: (userId: string) => Purchase[]
}

// Create context
const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined)

// Sample purchase data
const INITIAL_PURCHASES: Purchase[] = [
  {
    id: "1",
    userId: "1",
    productId: "3",
    purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    price: 120.0,
  },
  {
    id: "2",
    userId: "1",
    productId: "5",
    purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    price: 75.0,
  },
]

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load purchases from localStorage or use initial data
    const savedPurchases = localStorage.getItem("ecofinds-purchases")
    if (savedPurchases) {
      setPurchases(JSON.parse(savedPurchases))
    } else {
      setPurchases(INITIAL_PURCHASES)
      localStorage.setItem("ecofinds-purchases", JSON.stringify(INITIAL_PURCHASES))
    }
  }, [])

  const addPurchase = (userId: string, productId: string, price: number) => {
    const newPurchase: Purchase = {
      id: String(Date.now()),
      userId,
      productId,
      purchaseDate: new Date().toISOString(),
      price,
    }

    const updatedPurchases = [...purchases, newPurchase]
    setPurchases(updatedPurchases)
    localStorage.setItem("ecofinds-purchases", JSON.stringify(updatedPurchases))

    toast({
      title: "Purchase complete",
      description: "Your purchase has been successfully completed.",
    })
  }

  const getUserPurchases = (userId: string) => {
    return purchases.filter((purchase) => purchase.userId === userId)
  }

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        addPurchase,
        getUserPurchases,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  )
}

export const usePurchases = () => {
  const context = useContext(PurchaseContext)
  if (context === undefined) {
    throw new Error("usePurchases must be used within a PurchaseProvider")
  }
  return context
}
