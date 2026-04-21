"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportOnce } from "../animations";

export default function ResultsFooter() {
  return (
    <footer className="w-full px-12 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 bg-[#100e0b] border-t border-[#4b463d]/30">
      <motion.div
        className="flex flex-col gap-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="font-headline italic text-[#e6d5b4] text-xl">Ethereal Sanctum</div>
        <p className="font-headline italic text-2xl text-on-surface-variant leading-tight">
          Crafting the architecture of timeless beauty.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h4
          className="text-primary font-label text-[10px] uppercase tracking-[0.3em]"
          variants={fadeUp}
        >
          Navigation
        </motion.h4>
        <div className="flex flex-col gap-4">
          {["Treatments", "Practitioners", "The Sanctuary", "Contact"].map((link) => (
            <motion.a
              key={link}
              href="#"
              className="text-[#cec5b9] font-label text-xs tracking-widest hover:text-[#9cd0d2] transition-colors duration-700"
              variants={fadeUp}
            >
              {link}
            </motion.a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-8 justify-between"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="flex flex-col gap-4">
          <h4 className="text-primary font-label text-[10px] uppercase tracking-[0.3em]">Legal</h4>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Accessibility"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#cec5b9] font-label text-[10px] tracking-widest uppercase hover:text-[#9cd0d2] transition-colors duration-700"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <p className="text-[#cec5b9] font-label text-[10px] tracking-widest opacity-40">
          © 2024 Ethereal Sanctum. Designed for Digital Alchemists.
        </p>
      </motion.div>
    </footer>
  );
}