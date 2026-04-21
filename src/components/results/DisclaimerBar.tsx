"use client";

import { motion } from "framer-motion";

export default function DisclaimerBar() {
  return (
    <motion.div
      className="w-full bg-secondary-container/80 backdrop-blur-md py-3 px-12 text-center relative z-[60]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <p className="text-secondary text-[11px] uppercase tracking-[0.25em] font-medium">
        Clinical Disclaimer: Results may vary. Consultations required for personalized treatment protocols.
      </p>
    </motion.div>
  );
}