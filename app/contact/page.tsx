"use client"

import { motion } from "framer-motion"
import { Mail, MessageCircle, Headphones, Shield, Linkedin, Instagram, Send, CheckCircle, XCircle } from "lucide-react"
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
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.batworks.in/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          inquiryType: '',
          subject: '',
          message: '',
        })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Failed to send message')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please try again.')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "admin@batworks.in",
      description: "Get in touch for any questions or support",
    },
  ]

  const socialMedia = [
    {
      icon: Linkedin,
      title: "LinkedIn",
      url: "https://www.linkedin.com/company/batworksdev",
      username: "batworksdev",
    },
    {
      icon: Instagram,
      title: "Instagram",
      url: "https://instagram.com/batworks.dev",
      username: "batworks.dev",
    },
  ]

  const supportCategories = [
    {
      icon: MessageCircle,
      title: "General Inquiry",
      description: "Questions about our platform or services",
      responseTime: "Within 4 hours",
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Help with website transfers or technical issues",
      responseTime: "Within 2 hours",
    },
    {
      icon: Shield,
      title: "Security & Trust",
      description: "Report security concerns or verification issues",
      responseTime: "Within 1 hour",
    },
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
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/70 mb-12 leading-relaxed"
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </div>
        </section>

        {/* Support Categories */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How Can We Help?</h2>
              <p className="text-xl text-white/70">Choose the category that best describes your inquiry</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {supportCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{category.title}</h3>
                  <p className="text-white/70 mb-3">{category.description}</p>
                  <span className="text-sm text-cyan-400 font-medium">{category.responseTime}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info & Social Media */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{info.title}</h3>
                  <p className="text-cyan-400 font-medium mb-2">{info.details}</p>
                  <p className="text-sm text-white/70">{info.description}</p>
                </motion.div>
              ))}

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 text-center"
              >
                <h3 className="text-lg font-semibold mb-6 text-white">Follow Us</h3>
                <div className="flex justify-center space-x-6">
                  {socialMedia.map((social) => (
                    <a
                      key={social.title}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <social.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">{social.title}</span>
                      <span className="text-xs text-white/60">@{social.username}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Support Ticket Form */}
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-3xl font-bold mb-6 text-white">Submit a Support Ticket</h2>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Whether you're looking to buy a website, need technical support, or have questions about our platform,
                  we're here to help. Fill out the form and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                        className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-lg focus:border-cyan-400/40 focus:outline-none text-white placeholder-white/40 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                        className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-lg focus:border-cyan-400/40 focus:outline-none text-white placeholder-white/40 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-lg focus:border-cyan-400/40 focus:outline-none text-white placeholder-white/40 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Inquiry Type</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-lg focus:border-cyan-400/40 focus:outline-none text-white transition-all duration-300"
                    >
                      <option value="" className="bg-neutral-900">Select inquiry type</option>
                      <option value="General" className="bg-neutral-900">General</option>
                      <option value="Error" className="bg-neutral-900">Error</option>
                      <option value="Product" className="bg-neutral-900">Product</option>
                      <option value="Partnership" className="bg-neutral-900">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                      className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-lg focus:border-cyan-400/40 focus:outline-none text-white placeholder-white/40 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                      className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-cyan-400/20 rounded-lg focus:border-cyan-400/40 focus:outline-none text-white placeholder-white/40 resize-none transition-all duration-300"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/40 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400">{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Ticket
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-cyan-400/20 h-fit"
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Why Choose BatWorks?</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Verified Websites</h4>
                      <p className="text-sm text-white/70">
                        Every website undergoes thorough verification for quality and authenticity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Secure Transactions</h4>
                      <p className="text-sm text-white/70">
                        Your payments are protected with enterprise-grade security.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Expert Support</h4>
                      <p className="text-sm text-white/70">
                        Our team of experts is here to guide you through every step.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Fast Transfers</h4>
                      <p className="text-sm text-white/70">
                        Complete website transfers in as little as 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
