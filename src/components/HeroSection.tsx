"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeIn } from "./animations";

export default function HeroSection() {
  const words = ["Reveal", "Your", "Most", "Radiant", "Self"];

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        <motion.div
          className="w-full h-full opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      </div>

      <motion.div
        className="relative z-20 max-w-5xl space-y-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Animated headline — word by word */}
        <motion.h1
          className="font-headline font-light italic text-[clamp(48px,8vw,88px)] leading-[1.1] text-on-background tracking-tight"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {["Reveal Your Most", "Radiant Self"].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.split(" ").map((word, wi) => (
                <motion.span
                  key={wi}
                  className="inline-block mr-[0.25em]"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.8,
                        delay: li * 0.3 + wi * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="font-body text-on-surface-variant text-lg max-w-2xl mx-auto tracking-wide leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9 } as never}
        >
          A sanctuary where advanced medical science harmonizes with the
          ethereal art of rejuvenation.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.1 } as never}
        >
          <Link href="/treatments">
            <motion.button
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 rounded-full font-label text-sm tracking-widest uppercase hover:scale-95 transition-all duration-500"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Consultation
            </motion.button>
          </Link>
          <Link href="/about">
            <motion.button
              className="border border-outline-variant/30 text-primary px-10 py-5 rounded-full font-label text-sm tracking-widest uppercase hover:bg-primary/5 transition-all duration-500"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Sanctuary
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}