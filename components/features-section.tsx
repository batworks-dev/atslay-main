'use client';

import { motion } from 'framer-motion';
import { BarChart3, Zap } from 'lucide-react';

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  const features = [
    {
      title: 'Auto ATS Optimizer',
      description: 'Paste any resume and let AI rewrite it to reach 90+ ATS score instantly.',
      icon: Zap,
      color: 'from-accent to-accent/50',
      stat: '90+',
      statLabel: 'ATS Score',
      metrics: [
        { label: 'Keywords Added', value: '45+' },
        { label: 'Format Optimized', value: '100%' },
      ],
    },
    {
      title: 'JD × Resume Match Check',
      description: 'Compare your resume against job descriptions and identify missing keywords.',
      icon: BarChart3,
      color: 'from-secondary to-secondary/50',
      stat: '85%',
      statLabel: 'Match Score',
      metrics: [
        { label: 'Keywords Matched', value: '38/45' },
        { label: 'Missing Skills', value: '7' },
      ],
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-background overflow-hidden scroll-mt-20">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, rgba(123, 111, 255, 0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to beat every ATS and land more interviews
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group relative"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Card */}
                <div className="relative h-full bg-gradient-to-br from-card/40 to-card/20 border border-accent/20 rounded-2xl p-8 backdrop-blur-xl hover:border-accent/50 transition-colors duration-300">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} mb-6`}>
                    <Icon className="w-6 h-6 text-black" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-8">{feature.description}</p>

                  {/* Stats */}
                  <div className="space-y-6">
                    {/* Main Stat */}
                    <div className="bg-background/50 rounded-lg p-4 border border-accent/10">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
                          {feature.stat}
                        </span>
                        <span className="text-sm text-muted-foreground">{feature.statLabel}</span>
                      </div>
                    </div>

                    {/* Sub Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {feature.metrics.map((metric, i) => (
                        <div key={i} className="bg-background/30 rounded-lg p-3 border border-border/50">
                          <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                          <div className="text-lg font-semibold text-foreground">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}