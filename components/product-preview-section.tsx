'use client';

import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProductPreviewSection() {
  const metrics = [
    { label: 'ATS Score', value: '94', color: 'text-accent' },
    { label: 'Keyword Matches', value: '38/45', color: 'text-secondary' },
    { label: 'Missing Skills', value: '7', color: 'text-orange-400' },
  ];

  const keywords = [
    { word: 'Python', matched: true },
    { word: 'React', matched: true },
    { word: 'AWS', matched: true },
    { word: 'Leadership', matched: true },
    { word: 'Machine Learning', matched: false },
    { word: 'DevOps', matched: false },
    { word: 'Kubernetes', matched: false },
    { word: 'TypeScript', matched: true },
    { word: 'API Design', matched: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, rgba(200, 245, 74, 0.3) 0%, transparent 70%)' }} />
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
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Your Resume Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See your ATS score, keyword matches, and actionable improvements in one place
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Dashboard Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-3xl blur-2xl" />

              {/* Dashboard */}
              <div className="relative bg-gradient-to-br from-card to-card/50 border border-accent/30 rounded-3xl p-8 lg:p-12 backdrop-blur-xl overflow-hidden">
                {/* Top metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      className="bg-background/50 rounded-xl p-4 border border-border/50"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                      <div className={`text-4xl font-bold ${metric.color}`}>{metric.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-12" />

                {/* Keywords Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    Keyword Matches
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {keywords.map((keyword, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
                          keyword.matched
                            ? 'bg-accent/10 border-accent/30'
                            : 'bg-orange-500/10 border-orange-500/30'
                        }`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {keyword.matched ? (
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-foreground">{keyword.word}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action hint */}
                <motion.div
                  className="mt-8 pt-8 border-t border-border/30"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">
                      <span className="font-semibold text-foreground">Pro tip:</span> Add the 7 missing keywords to boost your score to 100+
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
