import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import PointerGlow from "@/components/PointerGlow";
import DisclaimerBar from "@/components/results/DisclaimerBar";
import ResultsHero from "@/components/results/ResultHero";
import TransformationGrid from "@/components/results/TransformationGrid";
import ResultsFooter from "@/components/results/ResultFooter";

export const metadata = {
  title: "Results | Ethereal Sanctum",
  description:
    "Explore visible transformations — the intersection of medical precision and artistic restoration.",
};

export default function ResultsPage() {
  return (
    <LenisProvider>
      <PointerGlow />
      <DisclaimerBar />
      <Navbar />
      <main className="pt-48 pb-20 px-12 max-w-7xl mx-auto">
        <ResultsHero />
        <TransformationGrid />
      </main>
      <ResultsFooter />
    </LenisProvider>
  );
}