'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { GLSLHills } from './glsl-hills';

export default function HeroSection() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(200, 245, 74, 0.3)',
        '0 0 40px rgba(200, 245, 74, 0.5)',
        '0 0 20px rgba(200, 245, 74, 0.3)',
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20 bg-background">
      {/* GLSLHills background */}
      <div className="absolute inset-0 z-0">
        <GLSLHills width="100%" height="100%" cameraZ={125} planeSize={256} speed={0.5} />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">AI-Powered Resume Optimization</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground max-w-4xl mx-auto"
          >
            <span>Beat every</span>
            <br />
            <motion.span
              variants={glowVariants}
              animate="animate"
              className="inline-block px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl sm:rounded-3xl lg:rounded-4xl bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/50 backdrop-blur-md text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent"
            >
              ATS
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Optimize your resume with AI and land more interviews. Get 90+ ATS score improvement instantly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold group"
            >
              Try ATSlay <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              
              className="bg-black border-2 border-secondary text-secondary hover:bg-secondary/10 text-base font-semibold"
            >
              See How It Works
            </Button>
          </motion.div>

          {/* Hero Card with Score Improvement */}
          <motion.div
            variants={itemVariants}
            className="relative mx-auto max-w-2xl"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-3xl blur-xl" />
            <div className="relative bg-black/60 border border-accent/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-accent/20">
              <div className="grid grid-cols-3 gap-4">
                {/* Before Score */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-muted-foreground mb-2">54</div>
                  <div className="text-sm text-muted-foreground">Before</div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 text-accent" />
                    </motion.div>
                  </div>
                </div>

                {/* After Score */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">94</div>
                  <div className="text-sm text-accent/80">After</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-secondary"
                  initial={{ width: '35%' }}
                  animate={{ width: '80%' }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              </div>

              <p className="text-xs text-muted-foreground mt-4">+40 ATS Score Improvement</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}