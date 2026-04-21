"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [containerW, setContainerW] = useState(0);

  // Measure real pixel width so After image stays full-size inside clip
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerW(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Slider position 0–100
  const rawX = useMotionValue(50);
  const springX = useSpring(rawX, { stiffness: 260, damping: 32 });
  const [pct, setPct] = useState(50);
  useMotionValueEvent(springX, "change", (v) => setPct(Math.min(99, Math.max(1, v))));

  // 3-D card tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltY, { stiffness: 100, damping: 24 });
  const rotateY = useSpring(tiltX, { stiffness: 100, damping: 24 });
  const cardScale = useSpring(1, { stiffness: 180, damping: 22 });

  const getPct = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.min(98, Math.max(2, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    tiltX.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 7);
    tiltY.set(-((e.clientY - rect.top - rect.height / 2) / rect.height) * 7);
    if (isDragging) rawX.set(getPct(e.clientX));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    cardScale.set(1.012);
    rawX.set(getPct(e.clientX));
  };

  const onMouseUp = () => { setIsDragging(false); cardScale.set(1); };

  const onMouseLeave = () => {
    setIsDragging(false);
    tiltX.set(0); tiltY.set(0); cardScale.set(1);
  };

  const onTouchMove = (e: React.TouchEvent) => rawX.set(getPct(e.touches[0].clientX));

  return (
    <motion.div
      ref={containerRef}
      className="relative aspect-[4/5] rounded-lg overflow-hidden select-none cursor-col-resize bg-surface-container-low"
      style={{ rotateX, rotateY, scale: cardScale, perspective: 900 }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* BEFORE — full bleed, always behind */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        crossOrigin="anonymous"
      />

      {/* AFTER — clip wrapper shrinks, inner img stays full-width */}
      {containerW > 0 && (
        <div
          className="absolute top-0 left-0 bottom-0 overflow-hidden pointer-events-none"
          style={{ width: `${pct}%` }}
        >
          <img
            src={afterSrc}
            alt={afterAlt}
            draggable={false}
            crossOrigin="anonymous"
            className="absolute top-0 left-0 h-full object-cover pointer-events-none"
            style={{ width: `${containerW}px` }}
          />
        </div>
      )}

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-primary z-20 pointer-events-none"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <motion.div
        className="absolute top-1/2 z-30 w-10 h-10 bg-primary rounded-full flex items-center justify-center pointer-events-none"
        style={{
          left: `${pct}%`,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 20px rgba(230,213,180,0.5)",
        }}
        animate={{ scale: isDragging ? 1.3 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
      >
        <span
          className="material-symbols-outlined text-on-primary"
          style={{ fontSize: "18px", fontVariationSettings: "'wght' 300" }}
        >
          unfold_more
        </span>
      </motion.div>

      {/* Before label */}
      <div className="absolute bottom-6 left-6 z-30 bg-surface-container-lowest/60 backdrop-blur px-4 py-1 rounded-full text-[10px] uppercase tracking-widest text-primary border border-primary/20 pointer-events-none">
        Before
      </div>

      {/* After label */}
      <div className="absolute bottom-6 right-6 z-30 bg-primary/80 backdrop-blur px-4 py-1 rounded-full text-[10px] uppercase tracking-widest text-on-primary pointer-events-none">
        After
      </div>

      {/* Drag hint */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="bg-surface-container-lowest/80 backdrop-blur-sm px-5 py-2 rounded-full border border-primary/20">
          <p className="text-primary text-[10px] tracking-widest uppercase font-medium">
            ← Drag to Compare →
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}