"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainerSlow, viewportOnce } from "./animations";

const steps = [
  { number: "01", title: "Consultation", desc: "A deep-dive analysis of your skin's genetic profile and personal aspirations." },
  { number: "02", title: "Curated Plan", desc: "A bespoke sequence of clinical treatments and holistic home rituals." },
  { number: "03", title: "Transformation", desc: "The unveiling of your most vibrant self through expert-led precision." },
];

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-surface-container-lowest overflow-hidden">
      <motion.div
        className="text-center mb-16 md:mb-24 space-y-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="text-secondary font-label tracking-widest text-[10px] uppercase block">
          The Journey
        </span>
        <h2 className="font-headline text-4xl md:text-5xl text-primary">Your Transformation</h2>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="hidden md:block absolute top-[25%] left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="space-y-6 md:space-y-8 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Smaller circle on mobile */}
              <div className="w-32 h-32 md:aspect-square md:w-auto bg-surface-container-high rounded-full flex items-center justify-center relative overflow-hidden mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary/30"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
                />
                <motion.span
                  className="text-5xl md:text-6xl font-headline text-outline-variant group-hover:text-primary transition-colors duration-700 relative z-10"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2, type: "spring", stiffness: 200 }}
                >
                  {step.number}
                </motion.span>
                <div className="absolute inset-0 border border-primary/20 rounded-full group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div className="text-center space-y-3 md:space-y-4">
                <h3 className="font-headline text-xl md:text-2xl text-on-background italic">{step.title}</h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}