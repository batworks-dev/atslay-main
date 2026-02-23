import { Card, CardContent } from "@/components/ui/card";
import { Globe, FileCode, Database, Brain } from "lucide-react";

const categories = [
  {
    icon: Globe,
    title: "Websites",
    description: "Complete web applications ready to deploy",
    count: "150+ Templates",
  },
  {
    icon: FileCode,
    title: "Landing Pages",
    description: "High-converting pages for your business",
    count: "80+ Designs",
  },
  {
    icon: Database,
    title: "PHP Scripts",
    description: "Backend solutions and server scripts",
    count: "200+ Scripts",
  },
  {
    icon: Brain,
    title: "ML Algorithms",
    description: "Pre-trained models and AI solutions",
    count: "50+ Models",
  },
];

export function CategoriesSection() {
  return (
    <section id="marketplace" className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background elements matching hero section */}
      <div className="absolute inset-0 z-0">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/90"></div>
        
        {/* Glowing effects */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-blue-500/10 to-purple-600/5 blur-3xl"></div>
        
        {/* Subtle lightning effect in background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Building in Seconds
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Kickstart your next project with premium templates built by us and our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 hover:transform hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90">
                    {category.title}
                  </h3>
                  <p className="text-white/60 mb-3 group-hover:text-white/70">
                    {category.description}
                  </p>
                  <p className="text-white/80 font-medium group-hover:text-white">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional stats matching hero section style */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-white/60">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-white/60">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/60">Ready to Deploy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}