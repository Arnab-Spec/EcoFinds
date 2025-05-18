"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { Leaf, Menu, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const cartItemCount = cart.length

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-lg shadow-md dark:bg-gray-950/70 border-b border-eco-green-200/20 dark:border-eco-green-500/10"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-eco-green-400/20 to-eco-blue-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative flex items-center">
            <Leaf className="h-7 w-7 text-eco-green-500 animate-pulse-slow" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-eco-green-500 to-eco-blue-500">EcoFinds</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/browse"
            className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-eco-green-400 after:to-eco-blue-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Browse
          </Link>
          {user && (
            <>
              <Link
                href="/sell"
                className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-eco-green-400 after:to-eco-blue-400 hover:after:w-full after:transition-all after:duration-300"
              >
                Sell
              </Link>
              <Link
                href="/my-listings"
                className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-eco-green-400 after:to-eco-blue-400 hover:after:w-full after:transition-all after:duration-300"
              >
                My Listings
              </Link>
              <Link
                href="/purchases"
                className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-eco-green-400 after:to-eco-blue-400 hover:after:w-full after:transition-all after:duration-300"
              >
                Purchases
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-eco-green-400/0 to-eco-blue-400/0 rounded-full group-hover:from-eco-green-400/10 group-hover:to-eco-blue-400/10 transition-all duration-300"></div>
            <ShoppingCart className="h-5 w-5 relative transition-transform group-hover:scale-110 duration-300" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-eco-green-500 to-eco-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-eco-green-400/0 to-eco-blue-400/0 group-hover:from-eco-green-400/10 group-hover:to-eco-blue-400/10 transition-all duration-300 rounded-full"></div>
                  <User className="h-5 w-5 relative z-10 transition-transform group-hover:scale-110 duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="backdrop-blur-md bg-white/90 dark:bg-gray-950/90 border border-eco-green-200/20 dark:border-eco-green-500/10 shadow-lg">
                <DropdownMenuLabel className="text-eco-green-700 dark:text-eco-green-300">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-eco-green-200/30 dark:bg-eco-green-500/20" />
                <DropdownMenuItem asChild className="focus:bg-eco-green-50 dark:focus:bg-eco-green-900/20">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-eco-green-400 to-eco-blue-400 opacity-70"></div>
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-eco-green-50 dark:focus:bg-eco-green-900/20">
                  <Link href="/my-listings" className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-eco-green-400 to-eco-blue-400 opacity-70"></div>
                    My Listings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-eco-green-50 dark:focus:bg-eco-green-900/20">
                  <Link href="/purchases" className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-eco-green-400 to-eco-blue-400 opacity-70"></div>
                    Purchases
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-eco-green-200/30 dark:bg-eco-green-500/20" />
                <DropdownMenuItem onClick={logout} className="focus:bg-eco-green-50 dark:focus:bg-eco-green-900/20 text-red-500 dark:text-red-400">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-eco-green-500 to-eco-blue-500 hover:from-eco-green-600 hover:to-eco-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative group overflow-hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-eco-green-400/0 to-eco-blue-400/0 group-hover:from-eco-green-400/10 group-hover:to-eco-blue-400/10 transition-all duration-300 rounded-full"></div>
            <Menu className="h-5 w-5 relative z-10 transition-transform group-hover:scale-110 duration-300" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-eco-green-200/20 dark:border-eco-green-500/10 py-4 px-4 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/browse"
              className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-eco-green-50 hover:to-eco-blue-50 dark:hover:from-eco-green-900/20 dark:hover:to-eco-blue-900/20 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-eco-green-400 to-eco-blue-400"></div>
                Browse
              </div>
            </Link>
            {user ? (
              <>
                <Link
                  href="/sell"
                  className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-eco-green-50 hover:to-eco-blue-50 dark:hover:from-eco-green-900/20 dark:hover:to-eco-blue-900/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-eco-green-400 to-eco-blue-400"></div>
                    Sell
                  </div>
                </Link>
                <Link
                  href="/my-listings"
                  className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-eco-green-50 hover:to-eco-blue-50 dark:hover:from-eco-green-900/20 dark:hover:to-eco-blue-900/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-eco-green-400 to-eco-blue-400"></div>
                    My Listings
                  </div>
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-eco-green-50 hover:to-eco-blue-50 dark:hover:from-eco-green-900/20 dark:hover:to-eco-blue-900/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-eco-green-400 to-eco-blue-400"></div>
                    Dashboard
                  </div>
                </Link>
                <Link
                  href="/purchases"
                  className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-eco-green-50 hover:to-eco-blue-50 dark:hover:from-eco-green-900/20 dark:hover:to-eco-blue-900/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-eco-green-400 to-eco-blue-400"></div>
                    Purchases
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start p-0 px-3 py-2 h-auto font-medium text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                  onClick={logout}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    Logout
                  </div>
                </Button>
              </>
            ) : (
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-eco-green-500 to-eco-blue-500 hover:from-eco-green-600 hover:to-eco-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
