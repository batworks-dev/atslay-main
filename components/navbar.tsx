"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Settings, Package, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const { data: session } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setIsOpen(false)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isProfileOpen && !(e.target as HTMLElement).closest(".profile-dropdown")) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isProfileOpen])

  const navItems = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Enterprise", href: "/enterprise", highlight: true },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ]

  const profileItems = [
    { name: "My Products", href: "/my-products", icon: Package },
    { name: "Profile", href: "/profile/settings", icon: Settings },
  ]

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/10 border-b border-white/30 h-14"
          : "backdrop-blur-sm bg-white/5 border-b border-white/20 h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div
            className={`relative transition-all ${
              isScrolled ? "w-28 h-8" : "w-36 h-10"
            }`}
          >
            <Image
              src="/logo.png"
              alt="BatWorks Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.highlight ? (
              <Link
                key={item.name}
                href={item.href}
                className="
                  px-4 py-1.5 rounded-full
                  bg-gradient-to-r from-blue-400 to-blue-500
                  text-white text-sm font-semibold
                  shadow-md hover:shadow-lg
                  hover:scale-[1.03]
                  transition-all duration-300
                "
              >
                Enterprise
              </Link>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition ${
                  pathname === item.href
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-400 to-blue-500" />
                )}
              </Link>
            )
          )}
        </div>

        {/* Auth Section */}
        <div className="hidden md:block">
          {session ? (
            <div className="relative profile-dropdown">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg border border-white/30"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="User"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
                <span className="text-white text-sm truncate max-w-[100px]">
                  {session.user?.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-56 rounded-lg bg-[hsl(220_25%_8%)] border border-white/20 overflow-hidden"
                  >
                    {profileItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut className="inline w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-white/10 text-white border border-white/30 hover:bg-white/20">
                Get Started
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 h-screen w-72 bg-[hsl(220_25%_8%)] border-l border-white/20 p-6 z-50"
          >
            <div className="flex flex-col gap-4 mt-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white text-lg"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
