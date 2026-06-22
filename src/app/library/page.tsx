import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import PointerGlow from "@/components/PointerGlow";
import DSHero from "@/components/library/DSHero";
import NavigationSection from "@/components/library/NavigationSection";
import TypographySection from "@/components/library/TypographySection";
import InteractiveSection from "@/components/library/InteractiveSection";
import BadgesSection from "@/components/library/BadgeSection";
import FormSection from "@/components/library/FormSection";
import DSFooter from "@/components/library/DSFooter";

export const metadata = {
  title: "Design System | Ethereal Sanctum",
  description: "The visual design language powering Ethereal Sanctum.",
};

export default function DesignSystemPage() {
  return (
    <LenisProvider>
      <PointerGlow />
      <Navbar />
      <DSHero />
      <main className="min-h-screen pb-20 px-6 md:px-12 max-w-7xl mx-auto space-y-32 pt-20">
        <NavigationSection />
        <TypographySection />
        <InteractiveSection />
        <BadgesSection />
        <FormSection />
      </main>
      <DSFooter />
    </LenisProvider>
  );
}