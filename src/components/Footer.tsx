"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportOnce } from "../animations";

export default function Footer() {
  return (
    <footer className="w-full px-12 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 bg-[#100e0b] border-t border-[#4b463d]/30">
      <motion.div
        className="space-y-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="font-headline italic text-[#e6d5b4] text-3xl">
          Ethereal Sanctum
        </div>
        <p className="font-headline italic text-2xl text-[#e6d5b4] opacity-80 leading-snug">
          Designed for Digital Alchemists.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        {[
          { heading: "Ecosystem", links: ["Treatments", "Wellness", "Boutique", "Philosophy"] },
          { heading: "Information", links: ["Privacy", "Terms", "Accessibility", "Press"] },
        ].map((col) => (
          <motion.div
            key={col.heading}
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              className="text-[#e6d5b4] font-label text-[10px] tracking-widest uppercase"
              variants={fadeUp}
            >
              {col.heading}
            </motion.p>
            <nav className="flex flex-col gap-4">
              {col.links.map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-[#cec5b9] font-label text-xs tracking-widest hover:text-[#9cd0d2] transition-colors duration-700"
                  variants={fadeUp}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="space-y-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="text-[#e6d5b4] font-label text-[10px] tracking-widest uppercase">
          The Sanctum Newsletter
        </p>
        <div className="relative group">
          <input
            className="w-full bg-transparent border-b border-outline-variant/30 py-4 font-body text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40"
            placeholder="Your Email Address"
            type="email"
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2">
            <span className="material-symbols-outlined text-primary">arrow_forward</span>
          </button>
        </div>
        <div className="pt-8">
          <p className="text-[#cec5b9] font-label text-[10px] tracking-widest">
            © 2024 ETHEREAL SANCTUM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}