"use client"

import { useProducts } from "@/context/product-context"
import { Book, Dumbbell, Home, Laptop, Palette, Shirt, Sparkles, GamepadIcon } from "lucide-react"
import Link from "next/link"

export default function CategorySection() {
  const { categories } = useProducts()

  // Map category names to icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "laptop":
        return <Laptop className="h-6 w-6" />
      case "shirt":
        return <Shirt className="h-6 w-6" />
      case "home":
        return <Home className="h-6 w-6" />
      case "book-open":
        return <Book className="h-6 w-6" />
      case "dumbbell":
        return <Dumbbell className="h-6 w-6" />
      case "sparkles":
        return <Sparkles className="h-6 w-6" />
      case "gamepad-2":
        return <GamepadIcon className="h-6 w-6" />
      case "palette":
        return <Palette className="h-6 w-6" />
      default:
        return <Laptop className="h-6 w-6" />
    }
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Browse by Category</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore our wide range of pre-loved items across different categories
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/browse?category=${encodeURIComponent(category.name)}`}
              className="group flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/20 flex items-center justify-center mb-3 group-hover:bg-green-200 dark:group-hover:bg-green-700/20 transition-colors">
                {getCategoryIcon(category.icon)}
              </div>
              <span className="font-medium text-center">{category.name}</span>
              <span className="text-xs text-gray-500 mt-1">{category.subCategories.length} subcategories</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
