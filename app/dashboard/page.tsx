"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { useProducts } from "@/context/product-context"
import { usePurchases } from "@/context/purchase-context"
import { Edit, Package, ShoppingBag, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"

export default function DashboardPage() {
  const { user, updateProfile } = useAuth()
  const { userListings } = useProducts()
  const { getUserPurchases } = usePurchases()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(user?.username || "")
  const [email, setEmail] = useState(user?.email || "")

  // Handle redirection and data fetching in useEffect to avoid SSR issues
  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }
  }, [user, router])

  // If not logged in, show loading state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  const listings = userListings(user.id)
  const purchases = getUserPurchases(user.id)

  const handleSaveProfile = () => {
    updateProfile({ username, email })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl">Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? (
                  "Cancel"
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-full p-3">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                My Listings
              </CardTitle>
              <CardDescription>
                You have {listings.length} active listing{listings.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {listings.slice(0, 3).map((listing) => (
                  <div key={listing.id} className="flex items-center gap-2">
                    <div className="w-10 h-10 relative rounded overflow-hidden flex-shrink-0">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{listing.title}</p>
                      <p className="text-xs text-muted-foreground">₹{listing.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                {listings.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center mt-2">+{listings.length - 3} more listings</p>
                )}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="/my-listings">View All Listings</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-green-600" />
                Purchase History
              </CardTitle>
              <CardDescription>
                You have made {purchases.length} purchase{purchases.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/purchases">View Purchase History</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
