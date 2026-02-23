"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"

interface Product {
  _id: string;
  name: string;
  mini_description: string;
  main_price: number;
  base_price: number;
  category: string;
  rating?: number;
  image: string;
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        setLoading(true)
        const res = await fetch('/api/product?sort=recent&limit=6')
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: 'hsl(220 25% 8%)' }}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Glowing effects */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b from-blue-500/15 to-purple-600/10 blur-3xl"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Products</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Discover our most popular and highly-rated templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 animate-pulse">
                <div className="w-full h-48 bg-white/20"></div>
                <CardContent className="p-6 space-y-4">
                  <div className="h-6 bg-white/20 rounded w-3/4"></div>
                  <div className="h-4 bg-white/20 rounded w-full"></div>
                  <div className="h-4 bg-white/20 rounded w-5/6"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-white/20 rounded w-1/4"></div>
                    <div className="h-10 bg-white/20 rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            products.map((product, index) => (
              <Card
                key={product._id}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 group overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 hover:transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      {product.category}
                    </Badge>
                  </div>
                  {/* Rating badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">{product.rating ?? 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-white/60 mb-4 line-clamp-2 group-hover:text-white/70 flex-grow">
                    {product.mini_description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-white">₹{(product.base_price ?? 0).toLocaleString('en-IN')}</span>
                    <div className="flex space-x-2">
                      <Link href={`/marketplace/${product._id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  )
}