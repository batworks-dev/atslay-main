"use client"

import { motion } from "framer-motion"
import { Users, Target, Award, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"



// BeamsBackground Component
function BeamsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<any[]>([])
  const animationFrameRef = useRef<number>(0)
  const MINIMUM_BEAMS = 20

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    interface Beam {
      x: number
      y: number
      width: number
      length: number
      angle: number
      speed: number
      opacity: number
      hue: number
      pulse: number
      pulseSpeed: number
    }

    function createBeam(width: number, height: number): Beam {
      const angle = -35 + Math.random() * 10
      return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 190 + Math.random() * 70,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      }
    }

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      const totalBeams = MINIMUM_BEAMS * 1.5
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(canvas.width, canvas.height)
      )
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam
      
      const column = index % 3
      const spacing = canvas.width / 3

      beam.y = canvas.height + 100
      beam.x =
        column * spacing +
        spacing / 2 +
        (Math.random() - 0.5) * spacing * 0.5
      beam.width = 100 + Math.random() * 100
      beam.speed = 0.5 + Math.random() * 0.4
      beam.hue = 190 + (index * 70) / totalBeams
      beam.opacity = 0.2 + Math.random() * 0.1
      return beam
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2)

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)
      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`)
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    function animate() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.filter = "blur(35px)"

      const totalBeams = beamsRef.current.length
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed
        beam.pulse += beam.pulseSpeed

        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams)
        }

        drawBeam(ctx, beam)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ filter: "blur(15px)" }}
      />
      <motion.div
        className="absolute inset-0 bg-neutral-950/5"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          backdropFilter: "blur(50px)",
        }}
      />
    </>
  )
}

export default function AboutPage() {
  const [videoLoading, setVideoLoading] = useState(true)

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower startups and companies by providing instant access to production-ready applications, eliminating months of development time.",
    },
    {
      icon: Users,
      title: "Our Community",
      description:
        "A thriving ecosystem of developers, startups, and enterprises collaborating to build and share exceptional applications.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "Every application undergoes rigorous testing and code review to ensure you're deploying enterprise-grade solutions.",
    },
    {
      icon: Zap,
      title: "Launch Faster",
      description:
        "Skip the development phase and go straight to market with fully functional, customizable applications ready for deployment.",
    },
  ]

  const stats = [
    { number: "500+", label: "Applications" },
    { number: "2K+", label: "Happy Customers" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950">
      <BeamsBackground />
      
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              About BatWorks
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/70 mb-12 leading-relaxed"
            >
              A revolutionary marketplace where startups, companies, and developers can purchase ready-to-use applications
              to accelerate their digital journey.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/20"
                >
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                  <div className="text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Values</h2>
              <p className="text-xl text-white/70">What drives us to create the ultimate application marketplace</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                      <p className="text-white/70 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-cyan-400/20"
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-white">Our Story</h2>
              <div className="space-y-6">
                <p className="text-white/70 leading-relaxed">
                  BatWorks was founded on a simple realization: every startup and company shouldn't have to build everything from scratch. We witnessed countless teams spending months developing the same foundational applications—dashboards, e-commerce platforms, SaaS tools—when they could have been focusing on their unique value proposition.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Our founders, seasoned developers and entrepreneurs themselves, recognized this inefficiency. They envisioned a marketplace where quality, production-ready applications could be instantly purchased and deployed, allowing teams to launch faster and iterate quicker. BatWorks was born to bridge this gap.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Today, BatWorks serves thousands of startups, companies, and developers worldwide. From MVP launches to enterprise solutions, our curated collection of ready-to-use applications helps teams move from idea to execution in record time. We're not just selling applications—we're accelerating innovation.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Company Video Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">See BATWORKS in Action</h2>
              <p className="text-xl text-white/70">Discover how we're revolutionizing application development</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-cyan-400/20 bg-white/5 backdrop-blur-sm"
            >
              <div className="aspect-video relative">
                {videoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm z-10">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                      <p className="text-white/70 text-sm">Loading video...</p>
                    </div>
                  </div>
                )}
                <video
                  className="w-full h-full object-cover"
                  src="/batworks.mp4"
                  title="BatWorks Company Video"
                  controls
                  onLoadedData={() => setVideoLoading(false)}
                  onError={() => setVideoLoading(false)}
                  preload="metadata"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
