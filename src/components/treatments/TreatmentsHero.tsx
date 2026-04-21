"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

export default function TreatmentsHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll parallax on the bleed image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Pointer tilt on headline
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), {
    stiffness: 80,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-600, 600], [-4, 4]), {
    stiffness: 80,
    damping: 22,
  });

  // Pointer glow
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 16 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 16 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <header
      ref={ref}
      className="px-12 mb-24 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Pointer ambient glow */}
        <motion.div
          className="absolute pointer-events-none z-0 w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `calc(30% + ${glowX}px)`,
            top: `calc(50% + ${glowY}px)`,
            background:
              "radial-gradient(circle, rgba(230,213,180,0.07) 0%, transparent 65%)",
          }}
        />

        <motion.div className="relative z-10" style={{ y: textY }}>
          {/* Label */}
          <motion.p
            className="text-secondary font-label tracking-[0.4em] uppercase text-xs mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Alchemy of Self
          </motion.p>

          {/* Headline with pointer tilt */}
          <motion.div
            style={{ rotateX, rotateY, perspective: 1200 }}
            className="transform-gpu"
          >
            <motion.h1
              className="font-headline text-8xl md:text-9xl leading-none text-primary -ml-1 tracking-tighter"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              Our <br />
              <motion.span
                className="italic font-light"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.75 }}
              >
                Treatments
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Body copy */}
          <motion.div
            className="mt-12 max-w-xl text-on-surface-variant leading-relaxed text-lg font-light"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
          >
            Where clinical precision meets organic luxury. Discover our curated
            collection of transformative rituals designed for the modern
            alchemist.
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative bleed image — parallax on scroll */}
      <motion.div
        className="absolute -right-24 top-0 w-1/3 aspect-[3/4] opacity-40 pointer-events-none"
        style={{ y: imageY }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbqRhCjW86D3dXVwxATBQhsRhNl2wpf0pDG3-Bz8sympfHVmEfsWFmlHjvd9PlsfP_NEAZrP5a6v5AYHrWCSybJ8zxTgDJSRWEtbdLXuiEJ_RlnVlEK0tGJX7cAO4inyKS4Oe_XYVdqYNcbn8ysUfbm9TuH-FjNDbb6jgw24JnfZVUqC4vGV3fl5qm4jEc24MP_bMxwwc2m-QzG04JIoE-d6NsWf5yY4gg1bE2nMbneQUX6THdVpOZOaK8Z0sDC4FWETLSSN348w"
          alt="Flowing silk texture"
          fill
          className="object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-1000"
          sizes="33vw"
        />
      </motion.div>
    </header>
  );
}