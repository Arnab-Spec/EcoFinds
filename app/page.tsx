import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">EcoFinds</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Empowering Sustainable Consumption through a Second-Hand Marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/browse">Browse Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
