import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context"
import { ProductProvider } from "@/context/product-context"
import { PurchaseProvider } from "@/context/purchase-context"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoFinds - Sustainable Second-Hand Marketplace",
  description: "Buy and sell pre-owned goods sustainably",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <PurchaseProvider>
                  {children}
                  <Toaster />
                </PurchaseProvider>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
