"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../animations";

export default function DSFooter() {
  return (
    <footer className="w-full px-12 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 bg-[#100e0b] border-t border-[#4b463d]/30">
      <motion.div
        className="space-y-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="font-headline italic text-[#e6d5b4] text-xl block">Ethereal Sanctum</span>
        <p className="font-headline text-[#e6d5b4] text-[2rem] leading-tight">
          Designed for Digital Alchemists.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {["Privacy", "Terms", "Accessibility", "Press"].map((link, i) => (
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
        className="flex flex-col justify-end items-start md:items-end"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="text-[#cec5b9] font-label text-[10px] tracking-widest">
          © 2024 Ethereal Sanctum. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
}