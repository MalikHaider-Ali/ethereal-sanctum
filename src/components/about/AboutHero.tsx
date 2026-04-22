"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 80, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-600, 600], [-5, 5]), { stiffness: 80, damping: 22 });
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <header
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3SWOYggUdcsLv52s3bKlD1OlyYWDw-bQqIJXXxoFEj_6W25Lw70abXqhBhF5Oad5FYJELaDoPyfTteq0L1ULuceBKVxaxFbFD04K9JtNGP01DSpXxCm_nOW4p05HS1NW9zZVIETLPfkNZYc_bE3q1e4nrFfv5kuDpwVG-fK6ZtK_3VhtaeLnGX5_dqCgfGaT23DFHJHYbS0ZO2ivC4hUrNuG5g_b6VJbFDFAf-2sRwqz5E_tSS8fdZ9clA1u2M53yv_9h2xf1ng"
          alt="Sanctuary Interior"
          fill
          className="object-cover opacity-40 scale-110"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest/20 via-transparent to-surface-container-lowest" />
      </motion.div>

      {/* Pointer glow */}
      <motion.div
        className="absolute pointer-events-none z-[5] w-[400px] md:w-[560px] h-[400px] md:h-[560px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `calc(50% + ${glowX}px)`,
          top: `calc(50% + ${glowY}px)`,
          background: "radial-gradient(circle, rgba(230,213,180,0.08) 0%, transparent 65%)",
        }}
      />

      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y: textY, opacity }}
      >
        <motion.span
          className="font-label text-primary uppercase tracking-[0.4em] text-xs md:text-sm mb-6 md:mb-8 block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Our Philosophy
        </motion.span>

        <motion.div style={{ rotateX, rotateY, perspective: 1200 }} className="transform-gpu">
          <motion.h1
            className="font-headline font-light text-[clamp(3rem,9vw,8rem)] text-primary leading-tight tracking-tight"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Where Science Meets <br />
            <motion.span
              className="italic"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              Serenity
            </motion.span>
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 md:h-12 bg-gradient-to-b from-primary/60 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </header>
  );
}