'use client'

import { motion } from 'framer-motion'
import { FileCheck, Zap, Calendar } from 'lucide-react'

interface DashboardStatsProps {
  resumesOptimized?: number
  tokensAvailable?: number
  userSince?: Date
}

export function DashboardStats({
  resumesOptimized = 12,
  tokensAvailable = 5000,
  userSince = new Date('2024-01-15'),
}: DashboardStatsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const formattedDate = userSince.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const stats = [
    {
      label: 'Resumes Optimized',
      value: resumesOptimized.toString(),
      icon: FileCheck,
      color: 'from-accent/20 to-accent/10',
      borderColor: 'border-accent/50',
    },
    {
      label: 'Tokens Available',
      value: tokensAvailable.toLocaleString(),
      icon: Zap,
      color: 'from-secondary/20 to-secondary/10',
      borderColor: 'border-secondary/50',
    },
    {
      label: 'User Since',
      value: formattedDate,
      icon: Calendar,
      color: 'from-blue-500/20 to-blue-500/10',
      borderColor: 'border-blue-500/50',
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className={`rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.borderColor} p-6 backdrop-blur-sm hover:shadow-lg hover:shadow-accent/20 transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-background/60 border border-border/40 flex items-center justify-center">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs font-semibold text-accent/70 bg-accent/10 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {stat.label}
            </h3>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
