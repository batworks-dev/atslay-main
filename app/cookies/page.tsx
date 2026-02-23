"use client"

import { motion } from "framer-motion"
import { Cookie, Settings, BarChart3, Shield, Info, ToggleLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Navbar from "@/components/navbar"
import {Footer} from "@/components/footer"

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      description: "Required for the website to function properly. These cannot be disabled.",
      examples: ["Authentication", "Security", "Form submissions"],
      required: true,
    },
    {
      icon: BarChart3,
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website.",
      examples: ["Page views", "User behavior", "Performance metrics"],
      required: false,
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description: "Enable enhanced functionality and personalization.",
      examples: ["Language preferences", "Theme settings", "User preferences"],
      required: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Learn about how we use cookies to improve your experience on BatWorks.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last updated: December 2024</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glassmorphic bg-card/60 p-8 rounded-xl border border-primary/20 mb-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">What Are Cookies?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are stored on your device when you visit our website. They help us
              provide you with a better experience by remembering your preferences, keeping you logged in, and analyzing
              how our website is used.
            </p>
          </motion.div>

          <div className="space-y-8 mb-12">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
                className="glassmorphic bg-card/60 p-8 rounded-xl border border-primary/20"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{type.title}</h3>
                      <p className="text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch disabled={type.required} defaultChecked={type.required} />
                    {type.required && <span className="text-xs text-muted-foreground">Required</span>}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, exampleIndex) => (
                      <span key={exampleIndex} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glassmorphic bg-card/60 p-8 rounded-xl border border-primary/20 mb-8"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <ToggleLeft className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Managing Your Cookie Preferences</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You can control and manage cookies in several ways:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                <p className="text-muted-foreground">
                  Use the cookie preferences above to enable/disable non-essential cookies
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                <p className="text-muted-foreground">Configure your browser settings to block or delete cookies</p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                <p className="text-muted-foreground">Use private/incognito browsing mode</p>
              </li>
            </ul>
            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80">
                Save Preferences
              </Button>
              <Button variant="outline" className="border-primary/20 hover:border-primary/40 bg-transparent">
                Accept All
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glassmorphic bg-card/60 p-8 rounded-xl border border-primary/20"
          >
            <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: privacy@batworks.com</p>
              <p>Address: 123 Tech Street, San Francisco, CA 94105</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
