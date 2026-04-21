"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function PointerGlow() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const x = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const y = useSpring(mouseY, { stiffness: 50, damping: 18 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[5] w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2"
      style={{
        left: x,
        top: y,
        background:
          "radial-gradient(circle, rgba(230,213,180,0.055) 0%, transparent 65%)",
      }}
    />
  );
}