"use client"

import Navbar from "@/components/navbar"
import { HeroSection } from "@/components/hero"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedProducts } from "@/components/featured-products"
import { WhyBatworks } from "@/components/why-batworks"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />

      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <WhyBatworks />
        <CTASection />
      </main>

      <Footer />

      {/* Floating WhatsApp Contact */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Glow ring */}
        <span
          className="
            absolute inset-0 rounded-full
            bg-green-500/40 blur-xl
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        />

        <a
          href="https://wa.me/919305441865?text=Hi%20BATWORKS%2C%20I%20want%20to%20know%20more"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="
            relative flex items-center gap-3
            h-14 pl-4 pr-5
            rounded-full
            bg-[#25D366]
            shadow-2xl shadow-green-500/30
            transition-all duration-300 ease-out
            hover:scale-105
          "
        >
          {/* WhatsApp Icon */}
          <span
            className="
              flex items-center justify-center
              w-10 h-10 rounded-full
              bg-white/20
            "
          >
            <Image
              src="/whatsapp.svg"
              alt="WhatsApp"
              width={22}
              height={22}
              priority
            />
          </span>

          {/* Expandable Text */}
          <span
            className="
              max-w-0 overflow-hidden whitespace-nowrap
              text-white text-sm font-semibold
              transition-all duration-300
              group-hover:max-w-[140px]
            "
          >
            Chat with us
          </span>
        </a>
      </div>
    </div>
  )
}
