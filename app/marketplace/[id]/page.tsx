import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import {Footer} from "@/components/footer"
import Link from "next/link"
import ProductDetailsClient from "./ProductDetailsClient"

interface Product {
  _id: string;
  name: string;
  mini_description: string;
  about: string;
  main_price: number;
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
  metrics?: {
    [key: string]: string;
  };
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="min-h-screen" style={{ background: 'hsl(220 25% 8%)' }}>
        <Navbar />
        <main className="pt-20 pb-16 relative">
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl font-bold mb-4 text-white">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Link href="/marketplace">
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'hsl(220 25% 8%)' }}>
      <Navbar />
      
      <main className="pt-20 pb-16 relative">
        {/* Background effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b from-blue-500/15 to-purple-600/10 blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <ProductDetailsClient product={product} />
      </main>
      <Footer />
    </div>
  )
}