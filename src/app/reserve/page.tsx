"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ReserveHero from "@/components/reserve/ReserveHero";
import TreatmentSelector from "@/components/reserve/TreatmentSelector";
import CalendarPicker from "@/components/reserve/CalendarPicker";
import ReserveForm from "@/components/reserve/ReserveForm";
import SummaryCard from "@/components/reserve/SummaryCard";

export default function ReservePage() {
  const searchParams = useSearchParams();
  const [selectedTreatment, setSelectedTreatment] = useState("Celestial Attunement");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState("02:15 PM");
  const [confirmed, setConfirmed] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const param = searchParams.get("treatment");
    if (param) {
      setSelectedTreatment(decodeURIComponent(param));
      setTimeout(() => {
        document.getElementById("treatment-selector")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [searchParams]);

  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

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
              className="material-symbols-outlined text-primary text-7xl md:text-8xl mb-6 md:mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </motion.span>
            <motion.h2
              className="font-headline text-4xl md:text-5xl text-primary mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Reservation Confirmed
            </motion.h2>
            <motion.p
              className="text-on-surface-variant max-w-md text-base md:text-lg font-light mb-4"
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
              {selectedTreatment} — {formatDate(selectedDate)} at {selectedTime}
            </motion.p>
            <motion.button
              className="mt-10 md:mt-12 px-10 md:px-12 py-4 rounded-full border border-primary/40 text-primary font-label text-xs tracking-widest uppercase"
              onClick={() => setConfirmed(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              Return to Reserve
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile summary toggle button */}
      <div className="lg:hidden fixed bottom-24 left-6 z-40">
        <motion.button
          className="bg-surface-container-low border border-primary/30 text-primary px-5 py-3 rounded-full font-label text-xs tracking-widest uppercase flex items-center gap-2 shadow-xl"
          onClick={() => setShowSummary(true)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="material-symbols-outlined text-sm">receipt_long</span>
          Summary
        </motion.button>
      </div>

      {/* Mobile summary drawer */}
      <AnimatePresence>
        {showSummary && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-surface-container-lowest/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSummary(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[60] bg-surface-container-low rounded-t-2xl p-6 lg:hidden max-h-[80vh] overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline text-2xl text-on-surface">Your Consultation</h3>
                <button onClick={() => setShowSummary(false)}>
                  <span className="material-symbols-outlined text-on-surface-variant">close</span>
                </button>
              </div>
              <SummaryCard treatment={selectedTreatment} date={selectedDate} time={selectedTime} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="min-h-screen pt-28 md:pt-32 pb-24 px-4 md:px-6 lg:px-12 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: multi-step form */}
        <div className="lg:col-span-8 space-y-16 md:space-y-24">
          <section className="space-y-10 md:space-y-12" id="treatment-selector">
            <ReserveHero />
            <TreatmentSelector selected={selectedTreatment} onSelect={setSelectedTreatment} />
          </section>
          <CalendarPicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
          />
          <ReserveForm onSuccess={() => setConfirmed(true)} />
        </div>

        {/* Right: sticky summary — desktop only */}
        <div className="hidden lg:block lg:col-span-4">
          <SummaryCard treatment={selectedTreatment} date={selectedDate} time={selectedTime} />
        </div>
      </div>
    </>
  );
}