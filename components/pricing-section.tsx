'use client';

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PricingSection() {
  const router = useRouter();

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
      transition: { duration: 0.5 },
    },
  };

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleContactUs = () => {
    router.push('/login');
  };

  const plans = [
    {
      name: 'Student Plan',
      price: '₹69',
      period: '/month',
      description: 'Perfect for students starting their career journey',
      features: [
        'AI Resume Optimization',
        'ATS Score Analysis',
        'Up to 5 Resume Uploads',
        'Email Support',
        'Keyword Recommendations',
        'Monthly Updates',
      ],
      cta: 'Get Started',
      onClick: handleGetStarted,
      highlighted: true,
    },
    {
      name: 'University Plan',
      price: 'Custom',
      period: 'Pricing',
      description: 'Tailored solutions for educational institutions',
      features: [
        'Unlimited Resume Uploads',
        'Batch Processing',
        'Advanced Analytics',
        'Dedicated Support',
        'Custom Integration',
        'Training & Onboarding',
        'API Access',
      ],
      cta: 'Contact Us',
      onClick: handleContactUs,
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 bg-background overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15"
        animate={{
          background: [
            'radial-gradient(circle, rgba(200, 245, 74, 0.4) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(123, 111, 255, 0.4) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(200, 245, 74, 0.4) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose the perfect plan for your resume optimization journey. All plans include our powerful ATS engine.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative group"
            >
              {/* Glow effect for highlighted plan */}
              {plan.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-3xl blur-xl" />
              )}

              <div
                className={`relative h-full rounded-3xl backdrop-blur-xl border transition-all duration-300 p-8 flex flex-col ${
                  plan.highlighted
                    ? 'bg-black/60 border-accent/50 shadow-2xl shadow-accent/30'
                    : 'bg-black/40 border-border/40 hover:border-secondary/50'
                }`}
              >
                {/* Highlighted Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-secondary px-4 py-1 rounded-full text-sm font-semibold text-background">
                      <Zap className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-foreground/60 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-foreground/60 text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={plan.onClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full mb-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-accent to-secondary text-background hover:shadow-lg hover:shadow-accent/30 shadow-md shadow-accent/20'
                      : 'bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/30'
                  }`}
                >
                  {plan.cta}
                </motion.button>

                {/* Features List */}
                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? 'text-accent' : 'text-secondary'
                        }`}
                      />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Note */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-foreground/60 text-sm">
            Questions about our pricing?{' '}
            <button
              onClick={handleContactUs}
              className="text-accent font-semibold cursor-pointer hover:text-accent/80 transition-colors"
            >
              Contact our team
            </button>{' '}
            for more details.
          </p>
        </motion.div>
      </div>
    </section>
  );
}