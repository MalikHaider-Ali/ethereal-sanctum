import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import TreatmentShowcase from "@/components/TreatmentShowcase";
import StatsSection from "@/components/StatsSection";
import FeaturedTreatment from "@/components/FeaturedTreatment";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import PointerGlow from "@/components/PointerGlow";

export default function Home() {
  return (
    <LenisProvider>
      <PointerGlow />
      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <TreatmentShowcase />
        <StatsSection />
        <FeaturedTreatment />
        <TestimonialsSection />
        <ProcessSection />
        <CtaSection />
      </main>
      <Footer />
    </LenisProvider>
  );
}
