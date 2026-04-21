"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportOnce } from "../animations";

export default function TreatmentsFooter() {
  return (
    <footer className="w-full px-12 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 bg-[#100e0b] border-t border-[#4b463d]/30 mt-32">
      <motion.div
        className="flex flex-col space-y-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="font-headline italic text-[#e6d5b4] text-xl">
          Ethereal Sanctum
        </div>
        <p className="text-[#e6d5b4] font-headline italic text-2xl leading-snug">
          Designed for Digital Alchemists.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        {[
          {
            heading: "Navigation",
            links: ["Treatments", "Our Story", "The Sanctuary"],
          },
          {
            heading: "Connect",
            links: ["Instagram", "LinkedIn", "Concierge"],
          },
        ].map((col) => (
          <motion.div
            key={col.heading}
            className="flex flex-col space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span
              className="text-[#e6d5b4] font-bold text-[10px] tracking-widest uppercase"
              variants={fadeUp}
            >
              {col.heading}
            </motion.span>
            {col.links.map((link) => (
              <motion.a
                key={link}
                href="#"
                className="text-[#cec5b9] hover:text-[#9cd0d2] transition-colors duration-700 font-label text-xs tracking-widest"
                variants={fadeUp}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex flex-col space-y-8 md:items-end"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="flex gap-6">
          {["Privacy", "Terms", "Press"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#cec5b9] hover:text-[#e6d5b4] font-label text-xs tracking-widest transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-[#cec5b9] font-label text-[10px] tracking-[0.2em] md:text-right">
          © 2024 Ethereal Sanctum. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}