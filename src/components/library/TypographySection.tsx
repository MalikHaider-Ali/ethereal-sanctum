"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../animations";

export default function TypographySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Parallax on the giant headline
  const headlineY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section className="space-y-12" ref={ref}>
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p className="font-label text-xs tracking-[0.3em] uppercase text-primary mb-4" variants={fadeUp}>
          Typographic Soul
        </motion.p>
        <motion.h2 className="font-headline text-4xl md:text-5xl font-light italic text-on-background" variants={fadeUp}>
          The Digital Alchemist
        </motion.h2>
      </motion.header>

      <div className="space-y-16 overflow-hidden">
        {/* Giant display headline with parallax */}
        <div className="overflow-hidden">
          <motion.div style={{ y: headlineY }}>
            <motion.p
              className="text-on-surface-variant font-label text-[10px] tracking-[0.4em] uppercase mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
            >
              Display Serif
            </motion.p>
            <motion.h1
              className="font-headline text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-none text-on-surface"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Alchemy of <br />
              <motion.span
                className="italic text-primary"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                Modern Beauty
              </motion.span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Body + Label side by side */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="space-y-6" variants={fadeUp}>
            <p className="text-on-surface-variant font-label text-[10px] tracking-[0.4em] uppercase">
              Body Sans-Serif
            </p>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-on-surface-variant">
              Our philosophy transcends the traditional clinic. We merge the precision of
              cellular science with the serenity of ancient rituals.
            </p>
          </motion.div>

          <motion.div className="space-y-6" variants={fadeUp}>
            <p className="text-on-surface-variant font-label text-[10px] tracking-[0.4em] uppercase">
              Label Medium
            </p>
            <p className="text-sm tracking-wider leading-relaxed text-on-surface-variant font-medium">
              INTER MEDIUM — DESIGNED FOR LEGIBILITY IN CLINICAL CONTEXTS AND INTERACTIVE
              INTERFACES. 12PX / 1.6 LINE HEIGHT.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}