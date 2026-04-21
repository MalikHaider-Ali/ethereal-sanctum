import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import PointerGlow from "@/components/PointerGlow";
import TreatmentsHero from "@/components/treatments/TreatmentsHero";
import TreatmentsGrid from "@/components/treatments/TreatmentsGrid";
import TreatmentsFooter from "@/components/treatments/TreatmentsFooter";

export const metadata = {
  title: "Treatments | Ethereal Sanctum",
  description:
    "Discover our curated collection of transformative rituals — where clinical precision meets organic luxury.",
};

export default function TreatmentsPage() {
  return (
    <LenisProvider>
      <PointerGlow />
      <Navbar />
      <main className="pt-32 pb-20 overflow-x-hidden">
        <TreatmentsHero />
        <TreatmentsGrid />
      </main>
      <TreatmentsFooter />
    </LenisProvider>
  );
}