"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  ExternalLink,
  Filter,
  X,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  mini_description: string;
  main_price: number;
  base_price: number;
  category: string;
  rating?: number;
  status?: string;
  reviews?: number;
  image: string;
  tags?: string[];
  revenue?: string;
  views?: number;
}

interface MarketplaceClientProps {
  initialProducts: Product[];
  categories: string[];
}

export default function MarketplaceClient({
  initialProducts = [],
  categories,
}: MarketplaceClientProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams?.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState("All");

  // We'll maintain productsWithRating (initialProducts + random rating 4.0 - 5.0)
  const [productsWithRating, setProductsWithRating] = useState<Product[]>(
    []
  );

  // Filtered products shown in UI (derived from productsWithRating)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // 1) Assign random rating between 4.0 and 5.0 (one-time whenever initialProducts changes)
  useEffect(() => {
    const rated = initialProducts.map((p) => ({
      ...p,
      // if rating exists (truthy 0 excluded) we keep it, else assign a random 4.0-5.0 with one decimal
      rating:
        typeof p.rating === "number"
          ? p.rating
          : Number((Math.random() * (5 - 4) + 4).toFixed(1)),
    }));
    setProductsWithRating(rated);
  }, [initialProducts]);

  // 2) Filter / search / sort whenever relevant inputs or productsWithRating change
  useEffect(() => {
    let filtered = productsWithRating;

    if (!filtered) filtered = [];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(q) ||
          product.mini_description?.toLowerCase().includes(q) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Apply sorting
    if (sortBy === "price-low") {
      filtered = [...filtered].sort(
        (a, b) => (a.main_price ?? 0) - (b.main_price ?? 0)
      );
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort(
        (a, b) => (b.main_price ?? 0) - (a.main_price ?? 0)
      );
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === "popular") {
      filtered = [...filtered].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, sortBy, productsWithRating]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatNumber = (num: number) => {
    if (typeof num !== "number") {
      return "0";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-10 md:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white px-2">
          Explore Marketplace
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
          Discover premium websites and digital assets ready for immediate
          purchase
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 sm:mb-8 space-y-3 sm:space-y-4"
      >
        {/* Search Bar with Filter Toggle */}
        <div className="flex gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/60" />
            <Input
              type="text"
              placeholder="Search products or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base md:text-lg bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 hover:border-white/40 focus:border-white/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 h-11 sm:h-12 px-3 sm:px-4"
          >
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Desktop Category Filters */}
        <div className="hidden md:flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm text-sm"
                  : "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all text-sm"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Mobile Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm sm:text-base">
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Category Filters for Mobile */}
            <div>
              <p className="text-white/70 text-xs sm:text-sm mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm text-xs sm:text-sm"
                        : "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/40 text-xs sm:text-sm"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
     {/* Sort Options (Mobile) */}
<div>
  <p className="text-white/70 text-xs sm:text-sm mb-2">Sort By</p>

  <div className="grid grid-cols-2 gap-2">
    {[
      { value: "featured", label: "Featured" },
      { value: "popular", label: "Most Popular" },
      { value: "price-low", label: "Price: Low to High" },
      { value: "price-high", label: "Price: High to Low" },
      { value: "rating", label: "Highest Rated" },
    ].map((option) => (
      <Button
        key={option.value}
        size="sm"
        variant="ghost"
        onClick={() => setSortBy(option.value)}
        className={
          sortBy === option.value
            ? "bg-white/25 backdrop-blur-md hover:bg-white/30 text-white border border-white/40 shadow-lg text-xs"
            : "bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/20 hover:text-white shadow-sm text-xs"
        }
      >
        {option.label}
      </Button>
    ))}
  </div>
</div>

          </motion.div>
        )}
      </motion.div>

      {/* Results Count and Sort (Desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <p className="text-white/60 text-sm sm:text-base px-1">
          Showing{" "}
          <span className="text-white font-semibold">
            {filteredProducts.length === 0 ? 0 : startIndex + 1}-
            {Math.min(endIndex, filteredProducts.length)}
          </span>{" "}
          of <span className="text-white font-semibold">{filteredProducts.length}</span>{" "}
          product{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Desktop Sort Dropdown */}
     {/* Desktop Sort Dropdown */}
<div className="hidden md:flex items-center gap-2">
  <span className="text-white/60 text-sm">Sort by:</span>

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="
      bg-white/10 
      backdrop-blur-lg 
      border border-white/30 
      text-white 
      rounded-lg 
      px-3 py-1.5 
      text-sm 
      shadow-md
      hover:bg-white/20
      hover:border-white/40
      focus:bg-white/20
      focus:border-white/40
      focus:outline-none
      cursor-pointer
    "
  >
    <option className="text-black" value="featured">Featured</option>
    <option className="text-black" value="popular">Most Popular</option>
    <option className="text-black" value="price-low">Price: Low to High</option>
    <option className="text-black" value="price-high">Price: High to Low</option>
    <option className="text-black" value="rating">Highest Rated</option>
  </select>
</div>

      </motion.div>

      {/* Website Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
      >
        {currentProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 h-full group overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 flex flex-col">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
                    {product.category || "Uncategorized"}
                  </Badge>

                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-white/20">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-white font-medium">
                      {typeof product.rating === "number"
                        ? product.rating.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>

                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-white/20">
                    <Eye className="h-3 w-3 text-white/70" />
                    <span className="text-xs text-white/90">
                      {formatNumber(product.views ?? 0)}
                    </span>
                  </div>

                  {product.status && (
                    <Badge
                      className={`absolute bottom-2 sm:bottom-3 right-2 sm:right-3 backdrop-blur-sm text-xs capitalize border ${
                        product.status.toLowerCase() === "active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {product.status}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
                <CardTitle className="text-base sm:text-lg mb-2 text-white group-hover:text-white/90 transition-colors line-clamp-1">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm mb-3 text-white/60 group-hover:text-white/70 line-clamp-2 flex-1">
                  {product.mini_description}
                </CardDescription>

                <div className="flex flex-wrap gap-1 mb-3">
                  {(product.tags || []).slice(0, 3).map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {product.tags && product.tags.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-white/10 text-white/60 border border-white/20 backdrop-blur-sm"
                    >
                      +{product.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-3 sm:p-4 pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  ₹{(product.base_price ?? 0).toLocaleString("en-IN")}
                </div>
                <Link href={`/marketplace/${product._id}`} passHref>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm transition-all w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {filteredProducts.length > 0 && totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2">
            <Button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        onClick={() => goToPage(page)}
                        variant={currentPage === page ? "default" : "outline"}
                        className={
                          currentPage === page
                            ? "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm min-w-[40px]"
                            : "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/40 min-w-[40px]"
                        }
                        size="sm"
                      >
                        {page}
                      </Button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="text-white/60 px-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
            </div>

            <Button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
              size="sm"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-white/60 text-sm">
            Page {currentPage} of {totalPages}
          </div>
        </motion.div>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 sm:py-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white/60" />
            </div>
            <p className="text-lg sm:text-xl text-white/70 mb-2">No products found</p>
            <p className="text-sm text-white/50 mb-6">Try adjusting your search or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSortBy("featured");
              }}
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/40"
            >
              Clear All Filters
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
