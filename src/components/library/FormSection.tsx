"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../animations";

// Floating label input with pointer glow
function GlowInput({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
  };
  const handleLeave = () => mouseX.set(-200);

  return (
    <div
      ref={ref}
      className="group relative"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <label
        className={`block text-[10px] font-label tracking-widest uppercase mb-2 transition-colors duration-300 ${
          focused ? "text-primary" : "text-on-surface-variant"
        }`}
      >
        {label}
      </label>

      {/* Input with pointer glow on border */}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 focus:ring-0 focus:outline-none placeholder:text-outline-variant transition-all font-light text-lg text-on-surface"
          style={{ borderColor: focused ? "#e6d5b4" : undefined }}
        />
        {/* Animated underline glow */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none"
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {/* Pointer-tracking glow dot on border */}
        <motion.div
          className="absolute bottom-0 w-6 h-px bg-primary/60 blur-[2px] pointer-events-none"
          style={{ left: glowX }}
        />
      </div>
    </div>
  );
}

// 3-step progress tracker with pointer tilt
function StepProgress({ current = 1, total = 3 }: { current?: number; total?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-3, 3]), {
    stiffness: 100, damping: 24,
  });

  return (
    <motion.div
      ref={ref}
      className="space-y-6"
      style={{ rotateY, perspective: 800 }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
      }}
      onMouseLeave={() => mouseX.set(0)}
    >
      <div className="flex justify-between items-center text-[10px] font-label tracking-[0.3em] uppercase text-on-surface-variant">
        <span>Personal Details</span>
        <motion.span
          key={current}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Step {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-px bg-outline-variant/30 relative overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-secondary to-primary"
          initial={{ width: "0%" }}
          whileInView={{ width: `${(current / total) * 100}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        />
        {/* Glint animation */}
        <motion.div
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "800%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
      </div>
    </motion.div>
  );
}

export default function FormSection() {
  return (
    <section className="space-y-12">
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p className="font-label text-xs tracking-[0.3em] uppercase text-primary mb-4" variants={fadeUp}>
          The Journey
        </motion.p>
        <motion.h2 className="font-headline text-4xl md:text-5xl font-light italic text-on-background" variants={fadeUp}>
          Guided Intake
        </motion.h2>
      </motion.header>

      <motion.div
        className="max-w-2xl bg-surface-container-lowest p-12 rounded-lg border border-outline-variant/10 space-y-12"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <StepProgress current={1} total={3} />

        <motion.div
          className="space-y-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp}>
            <GlowInput label="Legal Full Name" placeholder="E.g. Julianna Vesper" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <GlowInput label="Preferred Sanctuary Date" type="date" />
          </motion.div>
        </motion.div>

        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="w-full py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-label text-[10px] uppercase tracking-[0.3em] font-bold relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            {/* Shimmer on hover */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            Continue to Ritual Selection
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}