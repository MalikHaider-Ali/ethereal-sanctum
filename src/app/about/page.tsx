import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import PointerGlow from "@/components/PointerGlow";
import AboutHero from "@/components/about/AboutHero";
import TeamSection from "@/components/about/TeamSection";
import CredentialsBand from "@/components/about/CredentialsBand";
import AboutFooter from "@/components/about/AboutFooter";

export const metadata = {
  title: "About | Ethereal Sanctum",
  description:
    "Meet the practitioners behind Ethereal Sanctum — where science meets serenity.",
};

export default function AboutPage() {
  return (
    <LenisProvider>
      <PointerGlow />
      <Navbar />
      <main>
        <AboutHero />
        <TeamSection />
        <CredentialsBand />
      </main>
      <AboutFooter />
    </LenisProvider>
  );
}