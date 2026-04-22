"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportOnce } from "../animations";

export default function AboutFooter() {
  return (
    <footer className="w-full px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 bg-[#100e0b] border-t border-[#4b463d]/30">
      <motion.div
        className="flex flex-col justify-between space-y-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="font-headline italic text-[#e6d5b4] text-xl">Ethereal Sanctum</div>
        <p className="font-headline text-[#e6d5b4] text-2xl md:text-3xl leading-tight">
          Crafting silence in a <br />
          <span className="italic">distracted world.</span>
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col space-y-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h5 className="font-label text-primary uppercase tracking-widest text-xs mb-2 md:mb-4" variants={fadeUp}>
          Exploration
        </motion.h5>
        {["Treatments", "Philosophy", "Journal", "Inquiry"].map((link) => (
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

      <motion.div
        className="flex flex-col justify-between items-start md:items-end space-y-6 md:space-y-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="flex flex-wrap gap-4 md:gap-6">
          {["Privacy", "Terms", "Accessibility", "Press"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#cec5b9] hover:text-[#e6d5b4] transition-colors duration-500 font-label text-xs tracking-widest"
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-[#cec5b9] text-[10px] tracking-widest uppercase">
          © 2024 Ethereal Sanctum. Designed for Digital Alchemists.
        </p>
      </motion.div>
    </footer>
  );
}