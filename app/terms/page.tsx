"use client"

import { motion } from "framer-motion"
import { FileText, Users, CreditCard, Shield, AlertCircle, Scale, Ban } from "lucide-react"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  const sections = [
    {
      icon: Users,
      title: "User Accounts & Responsibilities",
      content: [
        "You must be at least 18 years old to create a BATWORKS account",
        "You are solely responsible for maintaining account security and credentials",
        "Accurate and complete business information must be provided during registration",
        "Each individual or business entity may maintain only one active account",
        "BATWORKS reserves the right to suspend or terminate accounts violating our terms",
        "Users must not engage in fraudulent activities or misrepresentation",
      ],
    },
    {
      icon: CreditCard,
      title: "Transactions & Financial Terms",
      content: [
        "All payments are processed through secure, PCI-compliant payment gateways",
        "Buyers are responsible for conducting due diligence before website purchases",
        "BATWORKS facilitates transactions but does not hold payments in escrow",
        "Transaction fees and commission structures are non-negotiable",
        "STRICTLY NO REFUNDS - All sales are final once transaction is completed",
        "Payment disputes must be raised within 24 hours of transaction",
      ],
    },
    {
      icon: Shield,
      title: "Website Verification & Due Diligence",
      content: [
        "BATWORKS provides basic verification but makes no warranties about website quality",
        "Buyers must conduct independent verification of website metrics and performance",
        "We are not responsible for website functionality or performance post-transfer",
        "Sellers must provide accurate, truthful information about their listings",
        "False or misleading listings will result in immediate account termination",
        "All website transfers are conducted as-is with no implied warranties",
      ],
    },
    {
      icon: Scale,
      title: "Intellectual Property Rights",
      content: [
        "Sellers must legally own or have transfer rights to all website assets",
        "BATWORKS does not claim ownership of user-generated content or listings",
        "Users grant BATWORKS license to display content solely for platform operations",
        "Respect third-party intellectual property; report infringements immediately",
        "Trademark and copyright violations are strictly prohibited",
        "Transfer of intellectual property rights is solely between buyer and seller",
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
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white px-2">
              Terms & Conditions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
              Governing your use of BATWORKS website marketplace platform. Please read these terms carefully.
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
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Agreement to Terms</h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              By accessing and using BATWORKS platform, you accept and agree to be bound by these Terms & Conditions. 
              If you do not agree to abide by these terms, please do not use our service. Continued use constitutes 
              acceptance of any modifications to these terms.
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
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
              transition={{ delay: 0.6 }}
              whileHover={{ y: -3 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                  <Ban className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">No Refund Policy</h2>
              </div>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3 sm:mb-4">
                <strong className="text-white">Important:</strong> BATWORKS operates on a strict no-refund policy. All transactions are final 
                once completed. By using our platform, you acknowledge and agree that:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="text-sm sm:text-base text-white/70">No refunds will be provided under any circumstances</p>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="text-sm sm:text-base text-white/70">All website sales are conducted on an "as-is" basis</p>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="text-sm sm:text-base text-white/70">Buyers assume all risk associated with website purchases</p>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="text-sm sm:text-base text-white/70">Support is available for platform usage, but not for refund requests</p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -3 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Limitation of Liability</h2>
              </div>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3 sm:mb-4">
                BATWORKS acts solely as a marketplace platform connecting buyers and sellers. We explicitly disclaim 
                liability for:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="text-sm sm:text-base text-white/70">Website performance, functionality, or revenue after transfer</p>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="text-sm sm:text-base text-white/70">Disputes arising between buyers and sellers</p>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="text-sm sm:text-base text-white/70">Third-party content, services, or integrations</p>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="text-sm sm:text-base text-white/70">Financial losses or business disruptions</p>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="text-sm sm:text-base text-white/70">Technical issues beyond our platform's core functionality</p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -3 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 p-5 sm:p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/20"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Contact Information</h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3 sm:mb-4">
                For questions about these Terms & Conditions, please contact BATWORKS:
              </p>
              <div className="space-y-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-white font-medium">Email: admin@batworks.in</p>
                <p className="text-xs sm:text-sm text-white/60 mt-2 sm:mt-4">
                  We recommend reviewing these terms periodically as they may be updated to reflect platform changes.
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
