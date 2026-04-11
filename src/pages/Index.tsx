import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ScreenshotsSection from "@/components/landing/ScreenshotsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="relative noise">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <ScreenshotsSection />
    <HowItWorksSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
