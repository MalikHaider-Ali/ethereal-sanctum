"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ReserveHero from "./ReserveHero";
import TreatmentSelector from "./TreatmentSelector";
import CalendarPicker from "./CalendarPicker";
import ReserveForm from "./ReserveForm";
import SummaryCard from "./SummaryCard";

export default function ReservePage() {
  const searchParams = useSearchParams();
  const [selectedTreatment, setSelectedTreatment] = useState("Celestial Attunement");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState("02:15 PM");
  const [confirmed, setConfirmed] = useState(false);

  // Pre-select treatment from URL param e.g. /reserve?treatment=Oceanic+Drift
  useEffect(() => {
    const param = searchParams.get("treatment");
    if (param) {
      setSelectedTreatment(decodeURIComponent(param));
      // Scroll past the hero to the treatment selector after a tick
      setTimeout(() => {
        document.getElementById("treatment-selector")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [searchParams]);

  return (
    <>
      <AnimatePresence>
        {confirmed && (
          <motion.div
            className="fixed inset-0 z-[80] bg-surface-container-lowest flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="material-symbols-outlined text-primary text-8xl mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </motion.span>
            <motion.h2
              className="font-headline text-5xl text-primary mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Reservation Confirmed
            </motion.h2>
            <motion.p
              className="text-on-surface-variant max-w-md text-lg font-light mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Your sanctuary awaits. A confirmation has been sent to your inbox.
            </motion.p>
            <motion.p
              className="text-secondary font-label text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              {selectedTreatment} &mdash; Dec {String(selectedDate).padStart(2, "0")}, 2024 at {selectedTime}
            </motion.p>
            <motion.button
              className="mt-12 px-12 py-4 rounded-full border border-primary/40 text-primary font-label text-xs tracking-widest uppercase"
              onClick={() => setConfirmed(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(230,213,180,0.05)" }}
            >
              Return to Reserve
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: multi-step form */}
        <div className="lg:col-span-8 space-y-24">
          {/* Step 1 */}
          <section className="space-y-12" id="treatment-selector">
            <ReserveHero />
            <TreatmentSelector
              selected={selectedTreatment}
              onSelect={setSelectedTreatment}
            />
          </section>

          {/* Step 2 */}
          <CalendarPicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={(d: Date) => setSelectedDate(d)}
            onTimeSelect={setSelectedTime}
          />

          {/* Step 3 */}
          <ReserveForm onSuccess={() => setConfirmed(true)} />
        </div>

        {/* Right: sticky summary */}
        <div className="lg:col-span-4">
          <SummaryCard
            treatment={selectedTreatment}
            date={selectedDate}
            time={selectedTime}
          />
        </div>
      </div>
    </>
  );
}