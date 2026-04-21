"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../animations";

export default function BadgesSection() {
  return (
    <section className="space-y-12">
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p className="font-label text-xs tracking-[0.3em] uppercase text-primary mb-4" variants={fadeUp}>
          Metadata
        </motion.p>
        <motion.h2 className="font-headline text-4xl md:text-5xl font-light italic text-on-background" variants={fadeUp}>
          Tokens &amp; Selections
        </motion.h2>
      </motion.header>

      <motion.div
        className="flex flex-wrap items-center gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Category chips */}
        <motion.div className="space-y-4" variants={fadeUp}>
          <p className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase">
            Category (Teal)
          </p>
          <div className="flex gap-4">
            {["Clinical", "Advanced"].map((label, i) => (
              <motion.span
                key={label}
                className="px-4 py-1.5 rounded-full bg-secondary-container/30 border border-secondary/20 text-secondary text-[10px] font-label tracking-widest uppercase"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.06, borderColor: "rgba(156,208,210,0.5)" }}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Selection pills */}
        <motion.div className="space-y-4" variants={fadeUp}>
          <p className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase">
            Selection Pill
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.div
              className="px-6 py-3 rounded-full bg-primary text-on-primary text-[10px] font-label tracking-widest uppercase flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: "0 0 20px rgba(230,213,180,0.2)" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Selected Experience
              <span className="material-symbols-outlined text-xs">check</span>
            </motion.div>

            <motion.div
              className="px-6 py-3 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-label tracking-widest uppercase flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.04, backgroundColor: "rgba(56,52,49,0.8)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Unselected
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}