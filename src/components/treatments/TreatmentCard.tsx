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

interface Treatment {
  title: string;
  price: string;
  description: string;
  src: string;
  alt: string;
  featured?: boolean;
  colStart?: string;
  offsetY?: boolean;
}

export default function TreatmentCard({
  treatment,
  index,
  onClick,
}: {
  treatment: Treatment;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-driven reveal
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Pointer 3D tilt on image card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [6, -6]), {
    stiffness: 120,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-6, 6]), {
    stiffness: 120,
    damping: 26,
  });
  const cardScale = useSpring(1, { stiffness: 220, damping: 22 });

  // Inner glow that follows pointer
  const glowX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const glowY = useSpring(mouseY, { stiffness: 90, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleEnter = () => cardScale.set(1.02);
  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    cardScale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={`group cursor-pointer ${treatment.colStart ?? ""} ${
        treatment.offsetY ? "md:mt-24" : ""
      }`}
      style={{ y, opacity }}
      onClick={onClick}
    >
      {/* Image card with 3D tilt */}
      <motion.div
        className={`aspect-[4/5] overflow-hidden rounded-lg bg-surface-container-low mb-6 relative ${
          treatment.featured
            ? "shadow-[0px_24px_48px_rgba(0,0,0,0.35)] ring-1 ring-primary/20"
            : ""
        }`}
        style={{ rotateX, rotateY, scale: cardScale, perspective: 900 }}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <Image
          src={treatment.src}
          alt={treatment.alt}
          fill
          className={`object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 ${
            treatment.featured ? "scale-110" : ""
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Subtle dark overlay that lifts on hover */}
        {!treatment.featured && (
          <div className="absolute inset-0 bg-surface-container-lowest/20 group-hover:bg-transparent transition-colors duration-500" />
        )}

        {/* Featured gradient bottom fade */}
        {treatment.featured && (
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-60" />
        )}

        {/* Pointer-tracking inner shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at calc(50% + ${glowX}px) calc(50% + ${glowY}px), rgba(230,213,180,0.1) 0%, transparent 55%)`,
          }}
        />

        {/* "Signature" badge */}
        {treatment.featured && (
          <motion.div
            className="absolute bottom-6 left-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          >
            <span className="bg-primary text-on-primary text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1 rounded-full">
              Signature
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Title row */}
      <motion.div
        className="flex justify-between items-baseline mb-2"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.15 + index * 0.05 }}
      >
        <h3 className="font-headline text-2xl text-primary font-light group-hover:text-on-background transition-colors duration-300">
          {treatment.title}
        </h3>
        <motion.span
          className="text-secondary text-xs tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {treatment.price}
        </motion.span>
      </motion.div>

      <motion.p
        className="text-on-surface-variant font-light text-sm leading-relaxed line-clamp-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
      >
        {treatment.description}
      </motion.p>
    </motion.div>
  );
}