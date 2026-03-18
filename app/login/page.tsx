"use client"

import { useState } from "react"
import Link from "next/link"
import { Chrome, Shield, Lock, CheckCircle2, Zap, ArrowLeft } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ATSlayLogo } from "@/components/atslay-logo"
import { AuroraBackground } from "@/components/aurora-background"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (session) {
      router.push("/dashboard")
    }
  }, [session, router])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: true,
      })
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
    }
  }

  // Show loading spinner while checking authentication status
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent/20"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-accent absolute top-0 left-0"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <AuroraBackground />
      </div>
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Back Button - Top Left */}
      <a 
        href="/" 
        className="absolute top-8 left-8 z-20 inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm">Back to Home</span>
      </a>

      {/* Centered Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-background/90 backdrop-blur-2xl border border-accent/40 rounded-3xl p-8 shadow-2xl shadow-accent/20">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <ATSlayLogo variant="dark" size="md" />
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to optimize your resume and ace ATS screening
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3.5 px-4 rounded-xl 
                     flex items-center justify-center gap-3 transition-all duration-300
                     hover:shadow-lg hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-900" />
            ) : (
              <Chrome className="h-5 w-5" />
            )}
            <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background backdrop-blur-sm px-3 py-1 text-muted-foreground border border-border/40 rounded-full inline-flex items-center gap-2">
                <Shield className="h-3 w-3" />
                <span>Secure authentication</span>
                <Lock className="h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/30 hover:bg-accent/10 transition-colors">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/40">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <p className="text-xs text-foreground/70 font-medium">AI Powered</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-secondary/5 border border-secondary/30 hover:bg-secondary/10 transition-colors">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/40">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
              </div>
              <p className="text-xs text-foreground/70 font-medium">Instant Results</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/30 hover:bg-accent/10 transition-colors">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/40">
                <Shield className="h-4 w-4 text-accent" />
              </div>
              <p className="text-xs text-foreground/70 font-medium">Secure & Private</p>
            </div>
          </div>

          {/* Footer Links */}
          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-foreground/70 hover:text-foreground transition-colors font-medium">
              Terms
            </a>
            {" "}and{" "}
            <a href="/privacy" className="text-foreground/70 hover:text-foreground transition-colors font-medium">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Bottom CTA */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          New to ATSlay?{" "}
          <a href="/" className="text-accent hover:text-secondary transition-colors font-semibold">
            Explore features →
          </a>
        </p>
      </div>
    </div>
  )
}