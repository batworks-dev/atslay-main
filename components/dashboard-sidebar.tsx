'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Menu, X, Home, Zap, FileText, CreditCard, HelpCircle, LogOut } from 'lucide-react'
import { ATSlayLogo } from './atslay-logo'

interface SidebarProps {
  userInitial?: string
}

export function DashboardSidebar({ userInitial = 'U' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'ATS Score Checker', href: '/dashboard/ats-checker', icon: Zap },
    { label: 'AI Resume Optimizer', href: '/dashboard/resume-optimizer', icon: FileText },
    { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { label: 'Support', href: '/dashboard/support', icon: HelpCircle },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Header - Logo and Menu Button */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ATSlayLogo variant="dark" size="sm" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-background/95 backdrop-blur-xl border-r border-border/40 transition-transform duration-300 md:translate-x-0 md:top-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section - Hidden on Mobile */}
          <div className="hidden md:block px-6 py-4 border-b border-border/40">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ATSlayLogo variant="dark" size="sm" />
            </Link>
          </div>

          {/* User Profile Section */}
          <div className="px-6 py-4 border-b border-border/40 md:pt-0 pt-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center font-bold text-background">
                {userInitial}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">ATSlay User</p>
                <p className="text-xs text-muted-foreground">Premium Plan</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-accent/20 to-secondary/20 text-accent border border-accent/50 shadow-lg shadow-accent/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="px-4 py-4 border-t border-border/40">
            <button
              onClick={() => {
                setIsOpen(false)
                signOut({ callbackUrl: '/' })
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive font-medium transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}