import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/auth-context"
import { CartProviderWrapper } from "@/components/cart-provider-wrapper"
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <CartProviderWrapper>
              <PurchaseProvider>
                {children}
                <Toaster />
              </PurchaseProvider>
            </CartProviderWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
