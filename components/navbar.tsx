'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ATSlayLogo } from './atslay-logo'

interface NavLink {
  label: string
  href: string
  isActive?: boolean
}

interface NavbarProps {
  navLinks?: NavLink[]
  ctaButtonText?: string
  ctaButtonHref?: string
}

const Navbar: React.FC<NavbarProps> = ({
  navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaButtonText = 'Get Started',
  ctaButtonHref = '/login',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace('#', ''))
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if section is in viewport (with offset for navbar)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navLinks])

  const handleCTAClick = () => {
    router.push(ctaButtonHref)
    setIsOpen(false)
  }

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Smooth scroll to section
    const sectionId = href.replace('#', '')
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-md bg-background/80 border-b border-border/40">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
        <ATSlayLogo variant="dark" size="md" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1 rounded-full bg-background/60 px-1 py-1 ring-1 ring-border/40 backdrop-blur">
        {navLinks.map((link, index) => {
          const isActive = activeSection === link.href.replace('#', '')
          return (
            <a
              key={index}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(link.href)
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-accent bg-accent/10 shadow-lg shadow-accent/20'
                  : 'text-foreground/70 hover:text-foreground hover:bg-secondary/5'
              }`}
            >
              {link.label}
            </a>
          )
        })}

        <button
          onClick={handleCTAClick}
          className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-secondary hover:shadow-lg hover:shadow-accent/30 px-4 py-2 text-sm font-semibold text-background transition-all duration-200 shadow-md shadow-accent/20 hover:scale-105 active:scale-95"
        >
          {ctaButtonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-secondary/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/40 md:hidden">
          <div className="flex flex-col gap-2 p-4">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-secondary/5'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <button
              onClick={handleCTAClick}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-secondary px-4 py-2 text-sm font-semibold text-background transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {ctaButtonText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 