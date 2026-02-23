"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Eye,
  Download,
  Calendar,
  Search,
  Filter,
  ShoppingBag,
  FileText,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { toast, Toaster } from "react-hot-toast";

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
  purchaseDate?: string;
  orderId?: string;
  downloadLink?: string;
}

export default function MyProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch user's purchased products
  useEffect(() => {
    async function fetchMyProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setProducts(data.products || []);
          setFilteredProducts(data.products || []);
        } else {
          toast.error("Failed to load your products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error loading products");
      } finally {
        setLoading(false);
      }
    }

    fetchMyProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.mini_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // DOWNLOAD HANDLER
  const handleDownload = (
    productId: string,
    productName: string,
    downloadLink?: string
  ) => {
    try {
      if (!downloadLink) {
        toast.error("No download link found");
        return;
      }

      toast.loading("Preparing download...");

      // Convert Google Drive link → Direct Download
      if (downloadLink.includes("drive.google.com")) {
        let fileId = null;

        // Handle view links: /file/d/FILEID/view
        const match1 = downloadLink.match(/\/d\/(.+?)\//);

        // Handle "uc?export=download&id=FILEID"
        const match2 = downloadLink.match(/id=([^&]+)/);

        fileId = match1 ? match1[1] : match2 ? match2[1] : null;

        if (!fileId) {
          toast.dismiss();
          toast.error("Invalid Google Drive link");
          return;
        }

        const directURL = `https://drive.google.com/uc?export=download&id=${fileId}`;

        // Auto download
        const a = document.createElement("a");
        a.href = directURL;
        a.download = `${productName}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        toast.dismiss();
        toast.success("Download started!");
        return;
      }

      // Normal direct URLs
      const a = document.createElement("a");
      a.href = downloadLink;
      a.download = `${productName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.dismiss();
      toast.success("Download started!");
    } catch (error) {
      toast.dismiss();
      toast.error("Error downloading file");
      console.error(error);
    }
  };

  const handleViewDetails = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleViewOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  // LOADING SCREEN
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] overflow-hidden">
        <div className="relative flex items-center justify-center mb-10">
          <div className="absolute w-48 h-48 rounded-full border-[3px] border-cyan-400/40 animate-ping" />
          <div className="absolute w-36 h-36 rounded-full border-[3px] border-blue-500/60 animate-spin-slow" />
          <div className="absolute w-24 h-24 rounded-full border-[3px] border-purple-600/70 animate-pulse" />
          <img
            src="https://www.batworks.in/logo.png"
            alt="BatWorks Logo"
            className="relative w-32 h-auto object-contain"
          />
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-white text-center px-6 leading-relaxed animate-fadeIn">
          SKIP THE BUILD. <span className="text-cyan-400">LAUNCH FASTER</span>
          <br />
          WITH PREMIUM WEB APPLICATIONS.
        </h2>

        <p className="mt-6 text-gray-400 text-sm tracking-widest uppercase animate-pulse">
          Loading your order details...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(220_25%_8%)]">
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">My Products</h1>
            <p className="text-white/60">
              Manage and access all your purchased products ({products.length}{" "}
              total)
            </p>
          </motion.div>

          {/* Search + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <Input
                placeholder="Search your products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 text-white border-white/20 placeholder:text-white/40"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant="outline"
                  className={`whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white/10 text-white border-white/20"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {cat === "all" ? "All" : cat}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-white/20" />
              <h2 className="text-2xl text-white mb-2">
                {products.length === 0
                  ? "No products yet"
                  : "No matching products"}
              </h2>
              <p className="text-white/60 mb-6">
                {products.length === 0
                  ? "Your purchased products will appear here."
                  : "Try adjusting your search or filters."}
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-white/10 border border-white/20 hover:border-white/40 backdrop-blur-md">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />

                        <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                          ✓ Owned
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 space-y-4">
                      <div>
                        <CardTitle className="text-white text-xl">{product.name}</CardTitle>
                        <CardDescription className="text-white/60">
                          {product.mini_description}
                        </CardDescription>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge className="bg-white/10 text-white">
                          {product.category}
                        </Badge>

                        {product.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-xs">
                              {product.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Purchase Date */}
                      {product.purchaseDate && (
                        <div className="flex items-center gap-2 text-xs text-white/60 border-t border-white/10 pt-2">
                          <Calendar className="w-3 h-3" />
                          Purchased{" "}
                          {new Date(product.purchaseDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                      )}

                      {/* ACTION BUTTONS */}
                      <div className="flex gap-2">
                        {/* Download Button */}
                        <Button
                          onClick={() =>
                            handleDownload(
                              product._id,
                              product.name,
                              product.downloadLink
                            )
                          }
                          className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>

                        
                      </div>

                      {/* View Order */}
                      {product.orderId && (
                        <Button
                          onClick={() => handleViewOrder(product.orderId!)}
                          variant="ghost"
                          className="w-full text-white/60 hover:text-white text-xs"
                        >
                          <FileText className="w-3 h-3 mr-2" />
                          View Order
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
