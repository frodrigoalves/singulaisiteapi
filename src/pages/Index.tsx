import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { WhatIsSingulaiSection } from "@/components/landing/what-is-singulai-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { SecuritySection } from "@/components/landing/security-section";
import { TokenomicsSection } from "@/components/landing/tokenomics-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhatIsSingulaiSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SecuritySection />
        <TokenomicsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
