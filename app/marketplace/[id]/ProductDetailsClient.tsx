"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, PlayCircle, Shield, Code, ArrowLeft, Share2, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface Product {
  _id: string;
  name: string;
  mini_description: string;
  about: string;
  main_price: number;
  base_price: number;
  category: string;
  status?: string;
  rating?: number;
  reviews?: number;
  image: string;
  tags?: string[];
  revenue?: string;
  monthlyVisitors?: string;
  established_year: number | string;
  key_features: string[];
  technology_stack: {
    [key: string]: string[];
  };
  videoLink?: string;
  live_demo_link?: string;
}

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.mini_description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Back Button */}
      <br />
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
        <Link href="/marketplace">
          <Button variant="ghost" className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">{product.category || 'Uncategorized'}</Badge>
              {product.status && (
                <Badge
                  className={`backdrop-blur-sm text-xs capitalize border ${
                    product.status.toLowerCase() === 'active'
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}
                >{product.status}</Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-white/90 text-lg">{product.mini_description}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Description */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all">
            <CardHeader>
              <CardTitle className="text-white">About This Product</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 leading-relaxed">{product.about}</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all">
            <CardHeader>
              <CardTitle className="text-white">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(product.key_features || []).map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Code className="h-5 w-5" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(product.technology_stack || {}).map(([category, technologies]) => (
                <div key={category}>
                  <h4 className="font-medium capitalize mb-2 text-white">{category}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {(technologies as string[]).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Video Preview */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <PlayCircle className="h-5 w-5 text-blue-400" />
                Video Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.videoLink ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/20 shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      product.videoLink.includes("youtube.com")
                        ? product.videoLink.split("v=")[1]?.split("&")[0]
                        : product.videoLink.includes("youtu.be")
                        ? product.videoLink.split("/").pop()
                        : product.videoLink
                    }`}
                    title="Product Video Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-white/60 py-12">
                  <PlayCircle className="w-10 h-10 text-white/40 mb-2" />
                  <p>No video preview available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Purchase Card */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all sticky top-24">
            <CardHeader>
              {/* Discounted / Final Price */}
              <div className="text-3xl font-bold text-white">
                ₹{(product.base_price ?? 0).toLocaleString('en-IN')}
              </div>

              {/* Crossed-out Original Price */}
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="line-through text-white/50">
                  ₹{product.main_price?.toLocaleString('en-IN') ?? 'N/A'}
                </span>
                <span className="text-green-400 font-medium">
                  Limited Time Offer
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Link href={`/checkout/${product._id}`} className="block">
                <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-600 hover:to-cyan-700 text-white border-0 transition-all">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Purchase Now
                </Button>
              </Link>

              <div className="flex gap-2">
                {/* Live Demo Button */}
                {product.live_demo_link ? (
                  <a href={product.live_demo_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/40"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live Link
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="flex-1 bg-white/10 backdrop-blur-md border-white/20 text-white/40 cursor-not-allowed"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Link
                  </Button>
                )}

                {/* Share Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex-1 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/40"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>

              <Separator className="bg-white/20" />
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Monthly Visitors:</span>
                  <span className="font-medium text-white">{product.monthlyVisitors ?? 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Established:</span>
                  <span className="font-medium text-white">{product.established_year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Category:</span>
                  <Badge variant="secondary" className="bg-white/10 text-white border border-white/20">{product.category || 'Uncategorized'}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}