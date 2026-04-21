"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../animations";

export default function NavigationSection() {
  return (
    <section className="space-y-12">
      {/* Section header */}
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p className="font-label text-xs tracking-[0.3em] uppercase text-primary mb-4" variants={fadeUp}>
          Architecture
        </motion.p>
        <motion.h2 className="font-headline text-4xl md:text-5xl font-light italic text-on-background" variants={fadeUp}>
          Navigation Shells
        </motion.h2>
      </motion.header>

      <div className="grid grid-cols-1 gap-12">
        {/* State 1: Transparent */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
        >
          <p className="text-on-surface-variant font-label text-xs tracking-widest">
            STATE 01: INITIAL TRANSPARENCY
          </p>
          <div className="relative h-24 w-full bg-surface-container-low rounded-lg overflow-hidden flex items-center px-12 border border-outline-variant/10">
            <nav className="w-full flex justify-between items-center">
              <span className="font-headline italic text-3xl text-[#e6d5b4]">Ethereal Sanctum</span>
              <div className="hidden md:flex gap-8">
                <span className="text-[#e6d5b4] border-b border-[#e6d5b4]/40 pb-1 font-label uppercase tracking-[0.2em] text-[10px]">
                  Treatments
                </span>
                <span className="text-[#cec5b9] font-label uppercase tracking-[0.2em] text-[10px]">Wellness</span>
                <span className="text-[#cec5b9] font-label uppercase tracking-[0.2em] text-[10px]">Sanctuary</span>
              </div>
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-primary">Consultation</span>
            </nav>
          </div>
        </motion.div>

        {/* State 2: Frosted glass */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-on-surface-variant font-label text-xs tracking-widest">
            STATE 02: SCROLLED GLASSMORPHISM
          </p>
          <div className="relative h-24 w-full bg-stone-950/60 backdrop-blur-2xl rounded-lg overflow-hidden flex items-center px-12 border border-outline-variant/10 shadow-2xl">
            <nav className="w-full flex justify-between items-center">
              <span className="font-headline italic text-3xl text-[#e6d5b4]">Ethereal Sanctum</span>
              <div className="hidden md:flex gap-8">
                <span className="text-[#cec5b9] font-label uppercase tracking-[0.2em] text-[10px]">Treatments</span>
                <span className="text-[#e6d5b4] border-b border-[#e6d5b4]/40 pb-1 font-label uppercase tracking-[0.2em] text-[10px]">
                  Wellness
                </span>
                <span className="text-[#cec5b9] font-label uppercase tracking-[0.2em] text-[10px]">Sanctuary</span>
              </div>
              <span className="font-label uppercase tracking-[0.2em] text-[10px] text-primary">Consultation</span>
            </nav>
          </div>
        </motion.div>
      </div>
    </section>
  );
}