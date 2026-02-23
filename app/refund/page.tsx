"use client"

import { motion } from "framer-motion"
import { RefreshCw, Clock, CheckCircle, XCircle, AlertTriangle, DollarSign, HelpCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function RefundPolicyPage() {
  const supportScenarios = [
    {
      icon: CheckCircle,
      title: "Full Support Provided",
      scenarios: [
        "Technical issues during website transfer process",
        "Access and credential setup assistance",
        "Guidance on platform features and functionality",
        "Troubleshooting for integration problems",
      ],
      timeframe: "Immediate assistance during business hours",
    },
    {
      icon: AlertTriangle,
      title: "Limited Support Available",
      scenarios: [
        "Basic usage questions about the BATWORKS platform",
        "Documentation and resource guidance",
        "Best practices for website management",
        "Third-party integration suggestions",
      ],
      timeframe: "24-48 hour response time",
    },
    {
      icon: XCircle,
      title: "Support Limitations",
      scenarios: [
        "Custom development or modification requests",
        "Website content creation or design changes",
        "Hosting or server configuration beyond transfer",
        "Third-party service technical support",
      ],
      timeframe: "Referral to partner services",
    },
  ]

  const supportProcess = [
    {
      step: 1,
      title: "Contact Support",
      description: "Reach out to our team at admin@batworks.in with your query",
    },
    {
      step: 2,
      title: "Issue Assessment",
      description: "We analyze your specific situation and requirements",
    },
    {
      step: 3,
      title: "Solution Proposal",
      description: "Provide step-by-step guidance or alternative approaches",
    },
    {
      step: 4,
      title: "Implementation Support",
      description: "Assist with implementing the recommended solution",
    },
    {
      step: 5,
      title: "Follow-up",
      description: "Ensure the solution works effectively for your needs",
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
              <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white px-2">
              Refund Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
              BATWORKS provides comprehensive support for platform usage. Please note that all sales are final.
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
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">No Refund Policy</h2>
            </div>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3 sm:mb-4">
              <strong className="text-white">Important:</strong> BATWORKS operates on a strict no-refund policy. All sales are final once a 
              transaction is completed. We do not offer refunds for any purchases made through our platform.
            </p>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              However, we are committed to providing exceptional support to ensure you can effectively use our platform 
              and resolve any technical issues you may encounter during the website transfer process.
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
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Our Support Commitment</h2>
            </div>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              While refunds are not available, BATWORKS provides comprehensive support to help you successfully 
              complete website transfers and effectively use our platform. Our team is dedicated to ensuring you 
              have the assistance needed to achieve your goals.
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-8 sm:mb-10 md:mb-12">
            {supportScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                    <scenario.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{scenario.title}</h3>
                    <p className="text-xs sm:text-sm text-white/60">{scenario.timeframe}</p>
                  </div>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {scenario.scenarios.map((item, itemIndex) => (
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
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Support Process</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
              {supportProcess.map((step, index) => (
                <div key={step.step} className="text-center relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-white font-bold text-sm sm:text-base">{step.step}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-white/60">{step.description}</p>
                  {index < supportProcess.length - 1 && (
                    <div className="hidden md:block absolute top-5 left-1/2 w-full h-px bg-white/20" />
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
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">Important Information</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                <p className="text-sm sm:text-base text-white/70">
                  <strong className="text-white">No Refunds:</strong> All sales are final. No refunds will be provided under any circumstances.
                </p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                <p className="text-sm sm:text-base text-white/70">
                  <strong className="text-white">Support Availability:</strong> Assistance is available for platform usage and technical issues during transfer.
                </p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                <p className="text-sm sm:text-base text-white/70">
                  <strong className="text-white">Due Diligence:</strong> Buyers are responsible for verifying website details before purchase.
                </p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                <p className="text-sm sm:text-base text-white/70">
                  <strong className="text-white">Contact Support:</strong> For assistance, email admin@batworks.in - we're here to help you succeed.
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
