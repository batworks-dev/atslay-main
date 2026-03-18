'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardStats } from '@/components/dashboard-stats'
import { motion } from 'framer-motion'
import { BarChart3, Sparkles, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!session?.user) {
    redirect('/login')
  }

  const userInitial = session.user.name?.charAt(0).toUpperCase() || 'U'
  const userCreatedDate = new Date(session.user.email ? session.user.email.split('@')[0] : Date.now())

  return (
    <div className="flex">
      <DashboardSidebar userInitial={userInitial} />

      <main className="flex-1 md:ml-64 min-h-screen bg-gradient-to-b from-background via-background to-[#0F0F0F] pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-8">
          {/* Dashboard Header Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-2xl bg-gradient-to-br from-accent/15 via-secondary/10 to-transparent border border-accent/40 p-8 backdrop-blur-sm overflow-hidden relative group"
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-6 mb-4">
                <div className="flex-1">
                  <div className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/20 border border-accent/40">
                    <span className="text-xs font-semibold text-accent">Welcome</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent mb-3">
                    Dashboard
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    View all your stats at a glance and track your ATS optimization progress
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/30">
                  <BarChart3 className="w-10 h-10 text-accent" />
                </div>
              </div>
              
              {/* Stats Pills */}
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="px-4 py-2 rounded-lg bg-background/50 border border-border/40 backdrop-blur">
                  <p className="text-xs text-muted-foreground">Resumes Optimized</p>
                  <p className="text-lg font-bold text-accent">12</p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-background/50 border border-border/40 backdrop-blur">
                  <p className="text-xs text-muted-foreground">Tokens Available</p>
                  <p className="text-lg font-bold text-secondary">5,000</p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-background/50 border border-border/40 backdrop-blur">
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="text-lg font-bold text-accent">98.5%</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  Welcome back, {session.user.name}!
                </h1>
                <p className="text-muted-foreground text-lg">
                  Here's your ATS optimization dashboard
                </p>
              </div>
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="w-20 h-20 rounded-2xl border-2 border-accent/50 shadow-lg shadow-accent/20"
                />
              )}
            </div>
          </motion.div>

          {/* Stats Section */}
          <DashboardStats
            resumesOptimized={12}
            tokensAvailable={5000}
            userSince={userCreatedDate}
          />

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* ATS Score Analysis */}
            <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 p-8 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    ATS Score Analysis
                  </h2>
                  <p className="text-muted-foreground">
                    Get real-time ATS compatibility scores
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent/90 text-background font-semibold transition-colors">
                Check Score
                <span>→</span>
              </button>
            </div>

            {/* AI Resume Optimizer */}
            <div className="rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 p-8 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    AI Resume Optimizer
                  </h2>
                  <p className="text-muted-foreground">
                    Optimize your resume with AI
                  </p>
                </div>
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/90 text-background font-semibold transition-colors">
                Optimize Resume
                <span>→</span>
              </button>
            </div>

            {/* Usage Overview */}
            <div className="md:col-span-2 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Monthly Usage Overview
                  </h2>
                  <p className="text-muted-foreground">
                    Track your token usage and optimization activity
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg bg-background/50 border border-border/40 p-4">
                  <p className="text-sm text-muted-foreground mb-2">This Month</p>
                  <p className="text-2xl font-bold text-foreground">456</p>
                </div>
                <div className="rounded-lg bg-background/50 border border-border/40 p-4">
                  <p className="text-sm text-muted-foreground mb-2">Total Processed</p>
                  <p className="text-2xl font-bold text-foreground">2,891</p>
                </div>
                <div className="rounded-lg bg-background/50 border border-border/40 p-4">
                  <p className="text-sm text-muted-foreground mb-2">Success Rate</p>
                  <p className="text-2xl font-bold text-accent">98.5%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}