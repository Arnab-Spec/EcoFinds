import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Recycle, ShoppingBag, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CategorySection from "@/components/category-section"
import FeaturedProducts from "@/components/featured-products"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover Sustainable Second-Hand Treasures
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join our community of eco-conscious buyers and sellers. Give pre-loved items a new home while reducing
                  waste and saving money.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href="/browse">Browse Marketplace</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/auth/register">Join Our Community</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative h-[450px] w-full max-w-[600px] lg:h-[550px]">
              <Image
                src="/eco-hero.png"
                alt="EcoFinds Marketplace"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <CategorySection />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* How EcoFinds Works */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How EcoFinds Works</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform makes it easy to buy and sell pre-loved items in a few simple steps
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="bg-green-50 dark:bg-green-900/10 border-0">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/20 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>List Your Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Create detailed listings with photos and descriptions. Set your price and connect with potential
                  buyers.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 dark:bg-green-900/10 border-0">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Connect & Transact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Browse listings, ask questions, and make purchases securely through our platform.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 dark:bg-green-900/10 border-0">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/20 flex items-center justify-center mb-4">
                  <Recycle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Reduce & Reuse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Give items a second life, reduce waste, and contribute to a more sustainable future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Collective Impact */}
      <section className="py-16 bg-green-50 dark:bg-green-900/10">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Collective Impact</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Together, we're making a difference for our planet
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <p className="text-gray-500">Items Reused</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">5,000+</div>
              <p className="text-gray-500">Active Users</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50,000kg</div>
              <p className="text-gray-500">CO₂ Saved</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">₹15,00,000+</div>
              <p className="text-gray-500">Money Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Join Our Community */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Join Our Community?
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Start buying and selling pre-loved items today
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/auth/register">
                  Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/browse">Browse Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}



