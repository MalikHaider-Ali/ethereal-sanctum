"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { viewportOnce } from "../animations";

const checklist = [
  "Arrive 15 mins prior to cleanse",
  "Hydrate with distilled essences",
  "Silence all digital anchors",
];

export default function SummaryCard({
  treatment,
  date,
  time,
}: {
  treatment: string;
  date: Date | null;
  time: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [4, -4]), { stiffness: 100, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-4, 4]), { stiffness: 100, damping: 24 });
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.aside
      ref={ref}
      className="sticky top-32"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ rotateX, rotateY, perspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className="bg-surface-container-low rounded-lg p-10 border border-outline-variant/10 space-y-10 relative overflow-hidden"
      >
        {/* Pointer inner glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background: `radial-gradient(circle at calc(50% + ${glowX}px) calc(50% + ${glowY}px), rgba(230,213,180,0.06) 0%, transparent 60%)`,
          }}
        />

        <div className="space-y-2 relative z-10">
          <h3 className="font-headline text-3xl text-on-surface">Your Consultation</h3>
          <p className="text-on-surface-variant text-sm font-label tracking-widest uppercase">
            Summary of Intent
          </p>
        </div>

        <div className="space-y-8 relative z-10">
          {/* Treatment */}
          <motion.div
            className="flex gap-6 items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container-high border border-primary/20 relative flex-shrink-0">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYaQ6roK8DvbjPMsWWtFSaGxIJGf5Isk-iErRPdM7JGKQc_vGFl8x7vL-QRegQkY702NCAXN7MnSADS4R6ywZB3rC4W-pMzc19-mTqlP-U4iSRdomHXLQiv0CUVfX190Jh08uP_r2VPN8bjhUqubnXkhCNFpsA4qXOmTrASm-Zvilzh6yK2tjyaEnmnPhSsneuUdaYSLyu8yknfckvBeA7fABBtszYLbY0AUHyp5ITWl1cF_6Vldo3F61nyqXk3qj6yheel5wqIA"
                alt="Treatment"
                fill
                className="object-cover grayscale brightness-75 contrast-125"
                sizes="64px"
              />
            </div>
            <div>
              <p className="text-on-surface-variant text-[10px] tracking-widest uppercase">Treatment</p>
              <motion.p
                className="text-primary font-headline text-lg"
                key={treatment}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {treatment || "None selected"}
              </motion.p>
            </div>
          </motion.div>

          {/* Date & Time */}
          <motion.div
            className="flex gap-6 items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-surface-container-high border border-outline-variant/30 flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">calendar_today</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-[10px] tracking-widest uppercase">Date &amp; Time</p>
              <motion.p
                className="text-on-surface font-headline text-lg"
                key={`${date?.toISOString()}-${time}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {date
                  ? date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "—"}
                {time ? ` — ${time}` : ""}
              </motion.p>
            </div>
          </motion.div>

          {/* Checklist */}
          <div className="pt-8 border-t border-outline-variant/20 space-y-4">
            <p className="text-on-surface-variant text-[10px] tracking-widest uppercase mb-4">
              Preparation Checklist
            </p>
            {checklist.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <motion.span
                  className="material-symbols-outlined text-secondary text-lg"
                  style={{ fontVariationSettings: "'wght' 700" }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 300 }}
                >
                  check
                </motion.span>
                <span className="text-xs text-on-surface-variant">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support */}
        <motion.div
          className="pt-8 space-y-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p className="text-on-surface-variant text-[10px] tracking-widest uppercase">Support</p>
          <motion.div
            className="flex items-center gap-2 text-primary"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span className="material-symbols-outlined text-sm">call</span>
            <span className="font-label text-xs tracking-widest">+1 (888) ALCHEMY</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}