"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { viewportOnce } from "../animations";

const credentials = [
  { icon: "verified_user", title: "Board Certified", sub: "International Medical Acc." },
  { icon: "clinical_notes", title: "Clinical Excellence", sub: "Holistic Health Institute" },
  { icon: "award_star", title: "Five Star Sanctuary", sub: "Global Spa Association" },
  { icon: "ecg_heart", title: "Ethical Practice", sub: "Certified B-Corp Medical" },
];

function CredentialBadge({ icon, title, sub, index }: { icon: string; title: string; sub: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [14, -14]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-60, 60], [-14, 14]), { stiffness: 160, damping: 22 });
  const glowX = useSpring(mouseX, { stiffness: 100, damping: 22 });
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center space-y-4 md:space-y-6"
      style={{ rotateX, rotateY, perspective: 600 }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-primary/30 bg-surface-container-lowest flex items-center justify-center text-primary relative overflow-hidden"
        whileHover={{ borderColor: "rgba(230,213,180,0.65)" }}
        animate={{ y: [0, -7, 0] }}
        transition={{
          y: { duration: 3 + index * 0.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 },
          borderColor: { duration: 0.3 },
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at calc(50% + ${glowX}px) calc(50% + ${glowY}px), rgba(230,213,180,0.28) 0%, transparent 70%)`,
          }}
        />
        <span className="material-symbols-outlined text-2xl md:text-4xl relative z-10">{icon}</span>
      </motion.div>

      <div>
        <h4 className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-primary">{title}</h4>
        <p className="text-[9px] md:text-[10px] text-on-surface-variant mt-1">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function CredentialsBand() {
  return (
    <section className="py-16 md:py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          className="absolute top-[38%] left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent z-0 hidden md:block origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
          {credentials.map((c, i) => (
            <CredentialBadge key={c.title} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}