"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../animations";

// Magnetic button: pulls toward cursor
function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    mouseX.set(dx * 0.25);
    mouseY.set(dy * 0.25);
  };
  const handleLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {children}
    </motion.button>
  );
}

// Cursor state orb
function CursorOrb({
  size,
  label,
  children,
  filled,
}: {
  size: string;
  label: string;
  children?: React.ReactNode;
  filled?: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <motion.div
        className={`${size} rounded-full border border-primary/40 flex items-center justify-center ${
          filled ? "bg-primary" : ""
        }`}
        whileHover={{ scale: 1.15, borderColor: "rgba(230,213,180,0.8)" }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      <span className="text-[10px] font-label tracking-widest text-on-surface-variant uppercase">
        {label}
      </span>
    </motion.div>
  );
}

export default function InteractiveSection() {
  return (
    <section className="space-y-12">
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p className="font-label text-xs tracking-[0.3em] uppercase text-primary mb-4" variants={fadeUp}>
          Interactive
        </motion.p>
        <motion.h2 className="font-headline text-4xl md:text-5xl font-light italic text-on-background" variants={fadeUp}>
          Actions &amp; Cursors
        </motion.h2>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        {/* Buttons */}
        <motion.div
          className="space-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="flex flex-wrap items-end gap-12">
            <motion.div className="space-y-4" variants={fadeUp}>
              <p className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase">
                Primary Gold
              </p>
              <MagneticButton className="px-10 py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-label text-xs uppercase tracking-[0.2em] font-bold">
                Reserve Experience
              </MagneticButton>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeUp}>
              <p className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase">
                Ghost Outline
              </p>
              <MagneticButton className="px-10 py-4 rounded-full border border-primary/20 text-primary font-label text-xs uppercase tracking-[0.2em] hover:bg-primary/5 transition-colors duration-300">
                Discover More
              </MagneticButton>
            </motion.div>
          </div>

          {/* Editorial link */}
          <motion.div className="space-y-4" variants={fadeUp}>
            <p className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase">
              Editorial Link
            </p>
            <motion.a
              href="#"
              className="group flex items-center gap-3 text-primary font-label text-xs uppercase tracking-[0.2em]"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.25 }}
            >
              View Our Sanctuary
              <motion.span
                className="h-px bg-primary"
                initial={{ width: 32 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.4 }}
              />
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Cursor states */}
        <motion.div
          className="bg-surface-container-low p-12 rounded-lg border border-outline-variant/10 space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-12">
            <CursorOrb size="w-8 h-8" label="Default">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            </CursorOrb>

            <CursorOrb size="w-16 h-16" label="3D Hover">
              <span className="material-symbols-outlined text-primary scale-75">add</span>
            </CursorOrb>

            <CursorOrb size="w-16 h-16" label="CTA Hover" filled />
          </div>

          <motion.p
            className="text-xs text-on-surface-variant font-light leading-relaxed italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5 }}
          >
            &ldquo;The interface responds to your presence. The cursor is an extension of your
            intention, shifting from a precise dot to an expansive glow as you engage with
            the sanctuary.&rdquo;
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}