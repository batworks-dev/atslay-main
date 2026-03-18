'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await signIn('google', { redirectTo: '/' })
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.')
      console.error(err)
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo and Title */}
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
            <span className="text-sm font-bold text-background">A</span>
          </div>
          <span className="text-2xl font-bold gradient-text">ATSlay</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome Back
        </h1>
        <p className="text-foreground/60">
          Sign in to optimize your resume and beat every ATS
        </p>
      </motion.div>

      {/* Login Card */}
      <motion.div
        className="relative"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-3xl blur-xl opacity-50" />
        <div className="relative bg-black/40 backdrop-blur-xl border border-border/40 rounded-3xl p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <motion.div
              className="bg-destructive/10 border border-destructive/30 rounded-lg p-4"
              variants={itemVariants}
            >
              <p className="text-sm text-destructive">{error}</p>
            </motion.div>
          )}

          {/* Google Sign In Button */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base rounded-lg flex items-center justify-center gap-3 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="flex items-center gap-3"
            variants={itemVariants}
          >
            <div className="flex-1 h-px bg-border/40" />
            <span className="text-sm text-foreground/50">or</span>
            <div className="flex-1 h-px bg-border/40" />
          </motion.div>

          {/* Features List */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-foreground/70">
                Get instant ATS score analysis
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-foreground/70">
                AI-powered resume optimization
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-foreground/70">
                Keyword matching and suggestions
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Text */}
      <motion.p
        className="text-center text-sm text-foreground/50 mt-6"
        variants={itemVariants}
      >
        By signing in, you agree to our Terms of Service and Privacy Policy
      </motion.p>
    </motion.div>
  )
}
