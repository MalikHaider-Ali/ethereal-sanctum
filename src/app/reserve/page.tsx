import { Suspense } from "react";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import PointerGlow from "@/components/PointerGlow";
import ReservePage from "@/components/reserve/ReservePage";
import ReserveFooter from "@/components/reserve/ReserveFooter";

export const metadata = {
  title: "Reserve | Ethereal Sanctum",
  description:
    "Claim your moment — reserve a transformative sanctuary experience tailored to your elemental needs.",
};

export default function Reserve() {
  return (
    <LenisProvider>
      <PointerGlow />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <ReservePage />
        </Suspense>
      </main>
      <ReserveFooter />
    </LenisProvider>
  );
}