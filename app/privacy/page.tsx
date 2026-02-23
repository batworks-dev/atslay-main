"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from "lucide-react"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account on BATWORKS marketplace (name, email, phone number)",
        "Business information including company details, website specifications, and transaction requirements",
        "Payment information processed securely through our authorized payment partners",
        "Website usage data, analytics, and interaction patterns to enhance our marketplace services",
        "Communication records and support tickets when you engage with our BATWORKS team",
      ],
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "To facilitate website acquisitions and transfers through BATWORKS marketplace",
        "To verify buyer and seller identities and maintain transaction integrity",
        "To process payments and manage financial transactions securely",
        "To provide customer support and resolve marketplace disputes",
        "To improve BATWORKS platform features and user experience",
        "To communicate important updates about your transactions and account",
        "To comply with legal requirements and prevent fraudulent activities",
      ],
    },
    {
      icon: Lock,
      title: "Data Protection at BATWORKS",
      content: [
        "Enterprise-grade encryption protocols for all sensitive data transmission",
        "PCI-DSS compliant payment processing systems for financial transactions",
        "Regular security audits, penetration testing, and vulnerability assessments",
        "Strict access controls and role-based permissions for team members",
        "Secure data storage with redundant backup systems",
        "Continuous monitoring for suspicious activities and potential threats",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Privacy Rights",
      content: [
        "Access and review all personal information stored by BATWORKS",
        "Request corrections or updates to inaccurate or incomplete data",
        "Complete deletion of your BATWORKS account and associated data",
        "Opt-out of marketing communications while maintaining transaction alerts",
        "Data portability to transfer your information to other services",
        "Object to specific data processing activities with valid reasons",
      ],
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
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white px-2">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
              At BATWORKS, we are committed to protecting your privacy and ensuring the security of your personal 
              and business information throughout your website marketplace journey.
            </p>
            <p className="text-xs sm:text-sm text-white/50 mt-3 sm:mt-4">Last updated: September 2025</p>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{section.title}</h2>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -3 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Contact BATWORKS Privacy Team</h2>
              </div>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3 sm:mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or how BATWORKS 
                handles your personal data, please contact our dedicated privacy team:
              </p>
              <div className="space-y-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-white font-medium">Email: admin@batworks.in</p>
                <p className="text-xs sm:text-sm text-white/60 mt-2 sm:mt-4">
                  We are committed to responding to all privacy-related inquiries within 48 hours during business days.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
