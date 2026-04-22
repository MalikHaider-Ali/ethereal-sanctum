"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "./animations";

export default function PhilosophySection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-surface-container-lowest overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.span
          className="text-secondary font-label tracking-[0.3em] text-[10px] uppercase block"
          variants={fadeUp}
        >
          The Alchemy of Care
        </motion.span>

        <motion.blockquote
          className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic text-on-background leading-snug"
          variants={fadeUp}
        >
          &ldquo;We don&apos;t change how you look; we curate the resonance of
          your natural vitality, bringing the internal light to the surface.&rdquo;
        </motion.blockquote>

        <motion.div variants={fadeIn}>
          <p className="font-body text-on-surface-variant/70 text-sm tracking-widest">
            — ALTHEA VANCE, FOUNDER
          </p>
        </motion.div>

        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}