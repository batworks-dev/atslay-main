"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Vault, Settings, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Verified Applications",
    description: "All our applications are tested and verified for quality assurance.",
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
    iconBg: "bg-blue-500/10",
    hoverBg: "group-hover:bg-blue-500/20",
    borderColor: "border-blue-500/30",
    hoverBorder: "group-hover:border-blue-500/50",
  },
  {
    icon: Vault,
    title: "Secure Payments",
    description: "Your transactions are protected with enterprise-grade security.",
    gradient: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
    iconBg: "bg-purple-500/10",
    hoverBg: "group-hover:bg-purple-500/20",
    borderColor: "border-purple-500/30",
    hoverBorder: "group-hover:border-purple-500/50",
  },
  {
    icon: Settings,
    title: "Instant Downloads",
    description: "Get immediate access to your purchased templates and scripts.",
    gradient: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    hoverBg: "group-hover:bg-emerald-500/20",
    borderColor: "border-emerald-500/30",
    hoverBorder: "group-hover:border-emerald-500/50",
  },
  {
    icon: Zap,
    title: "Affordable Pricing",
    description: "Premium quality at competitive prices that fit your budget.",
    gradient: "from-orange-500 to-yellow-500",
    bgGlow: "bg-orange-500/20",
    iconBg: "bg-orange-500/10",
    hoverBg: "group-hover:bg-orange-500/20",
    borderColor: "border-orange-500/30",
    hoverBorder: "group-hover:border-orange-500/50",
  },
]

export function WhyBatworks() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Batworks?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide the tools and security you need to build faster and more efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`bg-white/5 backdrop-blur-sm border ${feature.borderColor} ${feature.hoverBorder} text-center group hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-6 ${feature.iconBg} ${feature.hoverBg} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative`}>
                    {/* Gradient background for icon */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-xl`}></div>
                    <Icon className="h-8 w-8 text-white relative z-10" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>

                  {/* Bottom gradient line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}