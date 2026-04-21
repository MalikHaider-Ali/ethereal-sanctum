"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportOnce } from "../animations";

export default function ReserveFooter() {
  return (
    <footer className="w-full px-12 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 bg-[#100e0b] border-t border-[#4b463d]/30 mt-24">
      <motion.div
        className="space-y-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="font-headline italic text-[#e6d5b4] text-xl">Ethereal Sanctum</div>
        <p className="font-headline text-[2rem] leading-tight text-[#e6d5b4] italic">
          Beyond the physical, into the light.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        {[
          { heading: "Destinations", links: ["Treatments", "Wellness", "Sanctuary"] },
          { heading: "Legal", links: ["Privacy", "Terms", "Accessibility"] },
        ].map((col) => (
          <motion.div
            key={col.heading}
            className="space-y-4"
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
            <nav className="flex flex-col gap-2">
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
            </nav>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex flex-col justify-between items-end"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="text-right">
          <p className="text-[#e6d5b4] font-label text-[10px] tracking-widest uppercase mb-4">Location</p>
          <p className="text-[#cec5b9] text-xs tracking-widest leading-loose">
            77 Obsidian Path
            <br />
            Etheric Valley, CA 90210
          </p>
        </div>
        <p className="text-[#cec5b9] font-label text-[10px] tracking-widest mt-12">
          © 2024 Ethereal Sanctum. Designed for Digital Alchemists.
        </p>
      </motion.div>
    </footer>
  );
}