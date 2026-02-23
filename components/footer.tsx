"use client"

import { Instagram, Twitter, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0f1b34]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient glow effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.png"
                alt="Batworks Logo"
                width={150}
                height={40}
              />
            </div>
            <p className="text-white/60 max-w-md leading-relaxed mb-6">
              The premier marketplace for premium web applications, landing pages, PHP scripts, and ML algorithms. Build
              faster, launch sooner.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/batworks.dev/" 
                className="group w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              </a>
          
              <a 
                href="https://www.linkedin.com/company/batworksdev" 
                className="group w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300"
              >
                <Linkedin className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              </a>
              <a 
  href="mailto:admin@batworks.in"
  className="group w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300"
>
  <Mail className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
</a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
            </h3>
            <ul className="space-y-3 mt-6">
              <li>
                <Link 
                  href="/marketplace" 
                  className="text-white/60 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                >
                  <span className="relative">
                    Marketplace
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-white/60 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                >
                  <span className="relative">
                    About
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="text-white/60 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                >
                  <span className="relative">
                    Careers
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-white/60 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                >
                  <span className="relative">
                    Contact
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Legal
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
            </h3>
            <ul className="space-y-3 mt-6">
              <li>
                <Link 
                  href="/privacy" 
                  className={`transition-all duration-300 hover:translate-x-1 inline-block group ${
                    pathname === '/privacy' ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative">
                    Privacy Policy
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                      pathname === '/privacy' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className={`transition-all duration-300 hover:translate-x-1 inline-block group ${
                    pathname === '/terms' ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative">
                    Terms of Service
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                      pathname === '/terms' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/refund" 
                  className={`transition-all duration-300 hover:translate-x-1 inline-block group ${
                    pathname === '/refund' ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative">
                    Refund Policy
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                      pathname === '/refund' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/shipping" 
                  className={`transition-all duration-300 hover:translate-x-1 inline-block group ${
                    pathname === '/shipping' ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative">
                    Shipping Policy
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                      pathname === '/shipping' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-white/50 mb-4 md:mb-0 text-sm">
            © 2025 Batworks. All rights reserved.
          </p>

          <div className="flex items-center space-x-2 text-white/50 text-sm">
            <span>Made with</span>
            <span className="text-red-400 animate-pulse">♥</span>
            <span>for developers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}