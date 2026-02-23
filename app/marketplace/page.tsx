export const dynamic = "force-dynamic";

import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import MarketplaceClient from "./MarketplaceClient";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function getProducts() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/product`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    // Prepend "All" and extract just the name strings
    return ["All", ...data.map((cat: { name: string }) => cat.name)];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return ["All"];
  }
}

export default async function MarketplacePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="min-h-screen" style={{ background: "hsl(220 25% 8%)" }}>
      <Navbar />

      <main className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 relative">
        {/* Background effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px]
            rounded-full bg-gradient-to-b from-blue-500/15 to-purple-600/10 blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.02]
          bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]
          bg-[size:50px_50px]"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <MarketplaceClient
            initialProducts={products}
            categories={categories}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}