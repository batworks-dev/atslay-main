"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
export function CTASection() {
    const router = useRouter();
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: 'hsl(220 25% 8%)' }}>
      {/* Glowing effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b from-blue-500/15 to-purple-600/10 blur-3xl"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium">Limited Time Offer</span>
          </span>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance leading-tight">
          Ready to Scale Your Startup?
        </h2>
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
          Explore our marketplace and power your business with pre-built applications that save you months of
          development time.
        </p>

     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button
        size="lg"
        onClick={() => router.push("/marketplace")}
        className="group relative bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:transform hover:-translate-y-1"
      >
        <span className="relative z-10">Explore Marketplace</span>
      </Button>
    </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
          <div className="flex items-center gap-2 hover:text-white/80 transition-colors">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Verified Applications</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white/80 transition-colors">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Installation Support</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white/80 transition-colors">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span> Secure Payment</span>
          </div>
        </div>
      </div>
    </section>
  )
}