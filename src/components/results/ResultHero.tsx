"use client";

import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { staggerContainer } from "../animations";

export default function ResultsHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [3, -3]), { stiffness: 80, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-3, 3]), { stiffness: 80, damping: 22 });
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <header
      className="mb-16 md:mb-24 text-center relative"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className="absolute pointer-events-none -inset-20 z-0"
        style={{
          background: `radial-gradient(circle at calc(50% + ${glowX}px) calc(50% + ${glowY}px), rgba(230,213,180,0.06) 0%, transparent 60%)`,
        }}
      />

      <motion.div
        className="relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-headline text-[clamp(3rem,8vw,6rem)] md:text-7xl lg:text-8xl text-primary font-light tracking-tight leading-none mb-4 md:mb-6"
          style={{ rotateX, rotateY, perspective: 1000 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Visible{" "}
          <motion.span
            className="italic font-extralight text-on-surface-variant"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            Transformation
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Explore the intersection of medical precision and artistic restoration. Each outcome
          is a testament to our curated alchemical approach to aesthetic wellness.
        </motion.p>
      </motion.div>
    </header>
  );
}