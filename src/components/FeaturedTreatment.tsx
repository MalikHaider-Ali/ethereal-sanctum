"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideLeft, slideRight, fadeUp, staggerContainer, viewportOnce } from "./animations";

export default function FeaturedTreatment() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left panel — slides in from left */}
      <motion.div
        className="flex-1 p-12 md:p-24 flex flex-col justify-center space-y-12 bg-surface-container-low"
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.span
          className="text-secondary font-label tracking-widest text-xs uppercase"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Signature Treatment
        </motion.span>

        <motion.h2
          className="font-headline text-7xl text-primary leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Laser <br /> Resurfacing
        </motion.h2>

        <motion.p
          className="font-body text-on-surface-variant text-lg max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          Harnessing controlled light energy to stimulate profound cellular
          renewal, erasing years of environmental impact in a single
          transformative session.
        </motion.p>

        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {[
            "Immediate reduction in fine lines",
            "Enhanced collagen production",
            "Refined skin texture and tone",
          ].map((benefit, i) => (
            <motion.div
              key={benefit}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
            >
              <span className="material-symbols-outlined text-primary">check_circle</span>
              <span className="font-body text-sm text-on-background">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="w-fit border-b border-primary text-primary pb-2 font-label text-xs tracking-widest uppercase hover:text-secondary hover:border-secondary transition-all"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.8 }}
        >
          Discover the process
        </motion.button>
      </motion.div>

      {/* Right image — slides in from right */}
      <motion.div
        className="flex-1 bg-surface-variant relative overflow-hidden min-h-[500px]"
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfgM-BUQuCI3WS7Dx3WXskEIGq8XP28InKEjecMSzgQeE-RJ07Gltu2myRmIA_2ri41wZJXMzKJqmpstvgPtMbed-FcUyONgtgumsBm0C73QxC1b3cO8RGhUYUAB8sZ_0WSxXmnqWt9yBXYlaGywwi6GmyHQhIPwQqO5iOLU9PHd-Qxut65t3nwZRJIkMpy_CsRLGRX4n2nsyLLXVkiEjhkVWcK8HGX8NaY05AV2TRRn68y5mNoDPYBWFu1N3pRJXbE95D9u76Yg"
          alt="Serene woman with perfect skin"
          fill
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        {/* Shimmer overlay on enter */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}