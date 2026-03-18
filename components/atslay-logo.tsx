'use client';

import { motion } from 'framer-motion';

export function ATSlayLogo({ variant = 'dark', size = 'lg', horizontal = true }) {
  const sizeMap = {
    sm: { wordmark: '24px', subtitle: '9px', gap: '10px' },
    md: { wordmark: '32px', subtitle: '11px', gap: '14px' },
    lg: { wordmark: '48px', subtitle: '12px', gap: '18px' },
    xl: { wordmark: '64px', subtitle: '14px', gap: '24px' },
  };

  const sizes = sizeMap[size] || sizeMap.lg;

  const variants_config = {
    dark: {
      ats: '#EDEAD9',
      lay: '#C8F54A',
      subtitle: '#3a3a3a',
    },
    light: {
      ats: '#080808',
      lay: '#2a5200',
      subtitle: '#444',
    },
    accent: {
      ats: '#080808',
      lay: '#080808',
      subtitle: '#3a6000',
    },
    ghost: {
      ats: '#EDEAD9',
      lay: '#C8F54A',
      subtitle: '#333',
    },
  };

  const config = variants_config[variant] || variants_config.dark;

  if (horizontal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: sizes.gap,
        }}
      >
        {/* Wordmark */}
        <motion.div
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 900,
            fontSize: sizes.wordmark,
            letterSpacing: '0.5px',
            lineHeight: 0.95,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: config.ats }}>ATS</span>
          <span style={{ color: config.lay }}>lay</span>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            width: '1px',
            height: sizes.wordmark,
            background: config.subtitle,
            opacity: 0.3,
          }}
        />

        {/* Info Column */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {/* Subtitle */}
          <motion.div
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: sizes.subtitle,
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
              color: config.subtitle,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            AI Resume Optimizer
          </motion.div>

          {/* By line */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: sizes.subtitle,
            }}
          >
            <span
              style={{
                fontSize: `${parseInt(sizes.subtitle) - 1}px`,
                letterSpacing: '0.3px',
                textTransform: 'uppercase',
                color: config.subtitle,
                opacity: 1,
              }}
            >
              by
            </span>
            <span
              style={{
                width: '2px',
                height: '2px',
                borderRadius: '50%',
                background: config.subtitle,
                opacity: 0.4,
              }}
            />
            <span
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: `${parseInt(sizes.subtitle) - 1}px`,
                letterSpacing: '0.3px',
                textTransform: 'uppercase',
                color: config.subtitle,
                fontWeight: 700,
              }}
            >
              Batworks
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // Vertical version (original)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: size === 'sm' ? '1rem' : size === 'md' ? '1.5rem' : '2rem',
        background: '#0d0d0d',
        border: `1px solid #1e1e1e`,
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        minWidth: 'fit-content',
      }}
    >
      {/* Glow effect */}
      {variant === 'dark' && (
        <motion.div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '220px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(200, 245, 74, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Content */}
      <motion.div style={{ position: 'relative', zIndex: 10 }}>
        {/* Wordmark */}
        <motion.div
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: sizeMap.lg.wordmark,
            letterSpacing: '0.5px',
            lineHeight: 1,
            marginBottom: '6px',
          }}
        >
          <span style={{ color: config.ats }}>ATS</span>
          <span style={{ color: config.lay }}>lay</span>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: sizeMap.lg.subtitle,
            letterSpacing: '0.3px',
            textTransform: 'uppercase',
            color: config.subtitle,
            marginTop: '4px',
            marginBottom: '8px',
            fontWeight: 700,
          }}
        >
          AI Resume Optimizer
        </motion.div>

        {/* By line */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '6px',
            paddingTop: '6px',
            borderTop: `1px solid #1e1e1e`,
          }}
        >
          <span
            style={{
              fontSize: '8px',
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
              color: config.subtitle,
              opacity: 1,
            }}
          >
            by
          </span>
          <span
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: config.subtitle,
              opacity: 0.5,
            }}
          />
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
              color: config.subtitle,
              fontWeight: 700,
            }}
          >
            Batworks
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Logo variations gallery
export function ATSlayLogoGallery() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', padding: '40px', background: '#080808' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#666', fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '2px' }}>Dark — Primary</div>
        <ATSlayLogo variant="dark" size="lg" />
      </div>
      <div style={{ textAlign: 'center', background: '#EDEAD9', padding: '40px', borderRadius: '16px' }}>
        <div style={{ color: '#888', fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '2px' }}>Light</div>
        <ATSlayLogo variant="light" size="lg" />
      </div>
      <div style={{ textAlign: 'center', background: '#C8F54A', padding: '40px', borderRadius: '16px' }}>
        <div style={{ color: '#3a6000', fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '2px' }}>Accent</div>
        <ATSlayLogo variant="accent" size="lg" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#666', fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '2px' }}>Ghost</div>
        <ATSlayLogo variant="ghost" size="lg" />
      </div>
    </div>
  );
}