"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "./animations";

export default function TestimonialsSection() {
  return (
    <section className="py-40 px-12 bg-background relative overflow-hidden">
      {/* Ambient floating orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-secondary/5 blur-3xl pointer-events-none"
        animate={{ y: [0, 25, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center space-y-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Stars */}
        <motion.div className="flex justify-center gap-1" variants={fadeIn}>
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 300 }}
            >
              star
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="font-headline text-4xl italic text-on-background leading-relaxed"
          variants={fadeUp}
        >
          &ldquo;The atmosphere at Serenova is unlike anything I&apos;ve
          experienced. It&apos;s not just about the procedures; it&apos;s a
          recalibration of my entire being. I left feeling luminous, inside and
          out.&rdquo;
        </motion.p>

        <motion.div className="space-y-2" variants={fadeUp}>
          <p className="font-label text-sm tracking-widest text-primary uppercase">
            Evelyn St. James
          </p>
          <p className="font-body text-[10px] text-on-surface-variant tracking-widest uppercase">
            Elite Member since 2021
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}