'use client';

import { ArrowRight } from 'lucide-react';
import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export default function FinalCTASection() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleStartOptimizing = () => {
    router.push('/login');
  };

  return (
    <section className="py-16 md:py-24 w-full flex justify-center items-center px-4 md:px-6 bg-background">
      <motion.div 
        className="w-full max-w-6xl relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl border border-accent/30 bg-black/20 backdrop-blur-sm shadow-2xl min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center duration-500">
          {/* Dithering Effect Background */}
          <Suspense fallback={<div className="absolute inset-0 bg-accent/10" />}>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply">
              <Dithering
                colorBack="#00000000"
                colorFront="#C8F54A"
                shape="warp"
                type="4x4"
                speed={isHovered ? 0.6 : 0.2}
                className="size-full"
                minPixelRatio={1}
              />
            </div>
          </Suspense>

          {/* Content */}
          <motion.div 
            className="relative z-10 px-6 sm:px-8 md:px-12 max-w-4xl mx-auto text-center flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div 
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              AI-Powered Resume Optimization
            </motion.div>

            {/* Headline */}
            <motion.h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Stop getting<br />
              <span className="inline-block px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl sm:rounded-3xl lg:rounded-4xl bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/50 backdrop-blur-md mt-4 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent">
                ghosted by ATS
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Your resume deserves to be seen. Optimize it with AI and start landing interviews today.
            </motion.p>

            {/* Button */}
            <motion.button 
              onClick={handleStartOptimizing}
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-accent px-10 sm:px-12 text-base font-semibold text-accent-foreground transition-all duration-300 hover:bg-accent/90 hover:scale-105 active:scale-95 hover:ring-4 hover:ring-accent/20 shadow-lg shadow-accent/40"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 font-semibold">Start Optimizing</span>
              <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}