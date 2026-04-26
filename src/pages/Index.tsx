import ParticleCanvas from "@/components/landing/ParticleCanvas";
import GradientMesh from "@/components/landing/GradientMesh";
import LightStreaks from "@/components/landing/LightStreaks";
import AuroraEffect from "@/components/landing/AuroraEffect";
import FloatingElements from "@/components/landing/FloatingElements";
import ScrollProgress from "@/components/landing/ScrollProgress";
import SectionDivider from "@/components/landing/SectionDivider";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarqueeTicker from "@/components/landing/MarqueeTicker";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="relative">
    {/* Scroll progress bar */}
    <ScrollProgress />

    {/* Premium background layers */}
    <GradientMesh />
    <AuroraEffect />
    <ParticleCanvas />
    <LightStreaks />
    <FloatingElements />

    {/* Content */}
    <div className="relative z-10">
      <Navbar />
      <HeroSection />
      <MarqueeTicker />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <HowItWorksSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <CTASection />
      <Footer />
    </div>
  </div>
);

export default Index;
