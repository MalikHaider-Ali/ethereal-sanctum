"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ReserveHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 16 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 16 });
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [3, -3]), { stiffness: 80, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-3, 3]), { stiffness: 80, damping: 22 });

  return (
    <div
      className="space-y-4 relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute pointer-events-none -inset-20 z-0"
        style={{
          background: `radial-gradient(circle at calc(50% + ${glowX}px) calc(50% + ${glowY}px), rgba(230,213,180,0.06) 0%, transparent 60%)`,
        }}
      />
      <motion.span
        className="text-secondary font-label text-xs tracking-[0.3em] uppercase block relative z-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Phase 01
      </motion.span>
      <motion.div style={{ rotateX, rotateY, perspective: 1000 }} className="relative z-10">
        <motion.h2
          className="font-headline text-5xl md:text-6xl text-on-surface leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Select your path.
        </motion.h2>
      </motion.div>
      <motion.p
        className="text-on-surface-variant max-w-xl text-lg leading-relaxed relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55 }}
      >
        Choose the elemental experience that resonates with your current state of being.
      </motion.p>
    </div>
  );
}