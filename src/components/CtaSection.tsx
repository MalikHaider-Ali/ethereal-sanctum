"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp, viewportOnce } from "./animations";

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[500px] md:h-[819px] flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdJVyZ9jKMHtvuxWH_nCm2TgctQnjXasbQLr2iXvg_6cSwcevODMlwi00IdR3tmHJg_ghH38VxLV8Evex9-QYhZn6G6ZGeqawXhwig1w45uE1Gq-pCbWqi_5jM9-79T0qZ4SNNPMDZuGfrjbtc6a7j6MVcV4redCl37UMI-eJp2wiCBrMdyHwbOUVdn6FUvwxDq7M_2pfBp-hgXbpZfXp6Ja0tV-UtmsQUdqJCWzYeRmX37a98ZnviwEtCyaJwir4evjQoz1KVbw"
          alt="Luxury clinic interior"
          fill
          className="object-cover scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-sm" />
      </motion.div>

      <motion.div
        className="relative z-20 text-center space-y-6 md:space-y-10 max-w-2xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.h2
          className="font-headline text-4xl md:text-6xl italic text-on-background"
          variants={fadeUp}
        >
          Begin Your Journey
        </motion.h2>

        <motion.p
          className="font-body text-on-surface-variant text-base md:text-lg"
          variants={fadeUp}
        >
          Step into a space where time dissolves and beauty is redefined.
        </motion.p>

        <motion.div variants={fadeUp}>
          <motion.button
            className="w-full sm:w-auto bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 md:px-12 py-4 md:py-6 rounded-full font-label text-sm tracking-widest uppercase shadow-xl shadow-primary/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Reserve Your Sanctuary
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}