import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import FeaturesSection from '@/components/features-section';
import HowItWorksSection from '@/components/how-it-works-section';
import ProductPreviewSection from '@/components/product-preview-section';
import SocialProofSection from '@/components/social-proof-section';
import PricingSection from '@/components/pricing-section';
import FinalCTASection from '@/components/final-cta-section';
import Footer from '@/components/footer';
import ContactSection from '@/components/contact-section'



export default function Home() {
  return (
    <main className="w-full bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ProductPreviewSection />
      <SocialProofSection />
      <PricingSection />
      <ContactSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
