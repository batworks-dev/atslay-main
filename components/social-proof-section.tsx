'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Globe } from 'lucide-react';

export default function SocialProofSection() {
  const stats = [
    {
      icon: Users,
      value: '100+',
      label: 'Resumes Optimized',
      color: 'from-accent to-accent/50',
    },
    {
      icon: TrendingUp,
      value: '92%',
      label: 'Interview Increase',
      color: 'from-secondary to-secondary/50',
    },
    {
      icon: Globe,
      value: '10+',
      label: 'Countries',
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

  const statVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-[#0F0F0F] overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, rgba(123, 111, 255, 0.3) 0%, transparent 70%)' }} />
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
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Trusted by Job Seekers Worldwide</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who've successfully landed interviews with optimized resumes
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={statVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-card/40 to-card/20 border border-accent/20 rounded-2xl p-8 backdrop-blur-xl hover:border-accent/50 transition-all duration-300 text-center h-full flex flex-col items-center justify-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mb-6`}>
                    <Icon className="w-8 h-8 text-black" />
                  </div>

                  {/* Value */}
                  <motion.div
                    className={`text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-3`}
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonial-like section */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground italic mb-4">
            "ATSlay helped me increase my interview rate from 5% to 25%. The AI optimization is insane."
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary" />
            <div className="text-left">
              <p className="font-semibold text-foreground text-sm">Sarah Chen</p>
              <p className="text-xs text-muted-foreground">Software Engineer, San Francisco</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
