"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

export default function DSHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 80, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-600, 600], [-4, 4]), { stiffness: 80, damping: 22 });
  // Glow orb
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 16 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 16 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <div
      ref={ref}
      className="relative h-[60vh] flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax background texture */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5CVLRM0aGkp1jHkUZ0cbqLSXCiAAWJqtdpmPkDPyorYYqNyxzJUvKOKGJuqQsfJms9yENnC4w-DKQDtqoxj2BRg-ZcbO0k3mg2qIwVCpmf32fdqE09YKDSHsT2DBHoXoat3stVNcTEFowJxkLd5pVnZb5NYVb-Ca2dV4XjnMlNbMq9KH_srYWklUZV_WqwDEcNtXb_wAI8uozJTDaHtlsqk4l5i8v_t8DbzPjFnX7ZJvPRilXkDTjo-RSPHynQfJZpg4bKk-cjA"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-lowest" />
      </motion.div>

      {/* Pointer glow */}
      <motion.div
        className="absolute pointer-events-none z-[5] w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `calc(50% + ${glowX}px)`,
          top: `calc(50% + ${glowY}px)`,
          background: "radial-gradient(circle, rgba(230,213,180,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Title */}
      <motion.div className="relative z-10 text-center px-6" style={{ opacity }}>
        <motion.p
          className="font-label text-xs tracking-[0.4em] uppercase text-primary mb-6 block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Design Language
        </motion.p>

        <motion.div style={{ rotateX, rotateY, perspective: 1200 }} className="transform-gpu">
          <motion.h1
            className="font-headline font-light italic text-[clamp(48px,7vw,96px)] leading-tight text-primary tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Ethereal Sanctum <br />
            <motion.span
              className="text-on-surface-variant font-light not-italic"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Design System
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}