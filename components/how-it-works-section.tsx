'use client';

import { motion } from 'framer-motion';
import { Upload, FileText, TrendingUp, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Upload Resume',
      description: 'Share your current resume in any format',
      icon: Upload,
      color: 'from-accent to-accent/50',
    },
    {
      number: 2,
      title: 'Paste Job Description',
      description: 'Add the job posting you\'re targeting',
      icon: FileText,
      color: 'from-secondary to-secondary/50',
    },
    {
      number: 3,
      title: 'Get 90+ ATS Score',
      description: 'Get your optimized resume instantly',
      icon: TrendingUp,
      color: 'from-accent to-secondary',
    },
  ];

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

  const stepVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="how-it-works" className="relative py-24 bg-gradient-to-b from-background to-[#0F0F0F] overflow-hidden scroll-mt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, rgba(200, 245, 74, 0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple 3-step process to optimize your resume and beat the ATS
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number} variants={stepVariants} className="relative group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-4 w-8 h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
                )}

                {/* Step Card */}
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                  {/* Card Content */}
                  <div className="relative bg-gradient-to-br from-card/40 to-card/20 border border-accent/20 rounded-2xl p-8 backdrop-blur-xl hover:border-accent/50 transition-all duration-300 h-full flex flex-col">
                    {/* Step Number */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} mb-6`}>
                      <span className="text-2xl font-bold text-black">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className="mb-6">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground flex-grow">{step.description}</p>

                    {/* Animated arrow on hover */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="mt-6 inline-flex items-center gap-2 text-accent text-sm font-semibold"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    )}
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