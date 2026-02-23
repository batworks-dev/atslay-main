"use client"

import { motion } from "framer-motion"
import { Rocket, Shield, Zap, CheckCircle, Lock, Truck } from "lucide-react"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ShippingPolicyPage() {
  const deliveryFeatures = [
    {
      icon: Zap,
      title: "Instant Digital Delivery",
      content: [
        "Immediate access to purchased websites upon successful payment",
        "Automated transfer process begins within seconds of purchase",
        "No waiting periods - start using your website immediately",
        "24/7 automated delivery system for uninterrupted service",
      ],
      timeframe: "Instantaneous Delivery",
    },
    {
      icon: Shield,
      title: "100% Secure Platform",
      content: [
        "Enterprise-grade encryption for all data transfers",
        "PCI-DSS compliant payment processing systems",
        "Secure credential transmission and storage",
        "Regular security audits and vulnerability testing",
        "Protected against unauthorized access and data breaches",
      ],
      timeframe: "Bank-Level Security",
    },
    {
      icon: Lock,
      title: "Guaranteed Transfer Process",
      content: [
        "Automated verification of successful website transfers",
        "Real-time tracking of transfer progress and status",
        "Backup systems ensure no data loss during migration",
        "Technical support ready to assist if any issues arise",
        "Complete transparency throughout the delivery process",
      ],
      timeframe: "Guaranteed Success",
    },
  ]

  const deliveryProcess = [
    {
      step: 1,
      title: "Purchase Completion",
      description: "Complete your secure payment through our protected gateway",
    },
    {
      step: 2,
      title: "Instant Verification",
      description: "System automatically verifies payment and initiates transfer",
    },
    {
      step: 3,
      title: "Automated Delivery",
      description: "Website assets and credentials delivered instantly to your account",
    },
    {
      step: 4,
      title: "Access Confirmation",
      description: "Receive immediate access to your new website dashboard",
    },
    {
      step: 5,
      title: "Support Ready",
      description: "Our team is available if you need any assistance",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center mb-10 sm:mb-14 md:mb-16"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white px-2">
              Shipping & Delivery Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
              Instant digital delivery with 100% security guaranteed. Your website is delivered immediately after purchase.
            </p>
            <p className="text-xs sm:text-sm text-white/50 mt-3 sm:mt-4">Last updated: September 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -3 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 mb-5 sm:mb-6 md:mb-8"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Instant Digital Delivery</h2>
            </div>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3 sm:mb-4">
              <strong className="text-white">No Waiting, No Delays:</strong> BATWORKS provides instant digital delivery of all website purchases. 
              The moment your payment is confirmed, our automated system immediately begins the transfer process.
            </p>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Unlike physical products that require shipping time, digital websites are delivered instantly through 
              our secure platform. You get immediate access to your purchase without any delays.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -3 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 mb-5 sm:mb-6 md:mb-8"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">100% Secure Application Delivery</h2>
            </div>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Your security is our top priority. BATWORKS employs military-grade encryption and security protocols 
              to ensure that every website transfer is completely secure. From payment processing to credential 
              delivery, every step is protected against threats.
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-8 sm:mb-10 md:mb-12">
            {deliveryFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-white/60">{feature.timeframe}</p>
                  </div>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {feature.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -3 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 mb-5 sm:mb-6 md:mb-8"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Instant Delivery Process</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
              {deliveryProcess.map((step, index) => (
                <div key={step.step} className="text-center relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-white font-bold text-sm sm:text-base">{step.step}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-white/60">{step.description}</p>
                  {index < deliveryProcess.length - 1 && (
                    <div className="hidden md:block absolute top-5 left-1/2 w-full h-px bg-white/20">
                      <div className="absolute -right-3 -top-2 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/60" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -3 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">Delivery Guarantee</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                <p className="text-sm sm:text-base text-white/70">
                  <strong className="text-white">Instant Access:</strong> All digital products are delivered immediately upon payment confirmation.
                </p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                <p className="text-sm sm:text-base text-white/70">
                  <strong className="text-white">100% Secure:</strong> Enterprise-level security protects every transaction and data transfer.
                </p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                <p className="text-sm sm:text-base text-white/70">
                  <strong className="text-white">Automated Process:</strong> No manual delays - our system handles everything instantly.
                </p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                <p className="text-sm sm:text-base text-white/70">
                  <strong className="text-white">Support Available:</strong> Contact admin@batworks.in if you experience any delivery issues.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
