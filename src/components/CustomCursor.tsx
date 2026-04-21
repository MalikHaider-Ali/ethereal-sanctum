"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "click" | "text" | "drag";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot follows instantly
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

  // Ring lags behind for that premium feel
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 24 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 24 });

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    const handleDown = () => setCursorState("click");
    const handleUp = () => setCursorState("default");

    // Detect hoverable elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest(
        "a, button, [role='button'], input, textarea, select, label, .cursor-pointer, [data-cursor]"
      ) as HTMLElement | null;

      if (el) {
        const type = el.dataset.cursor;
        if (type === "drag") setCursorState("drag");
        else setCursorState("hover");
      } else if (
        target.closest("p, h1, h2, h3, h4, h5, blockquote")
      ) {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isVisible, mouseX, mouseY]);

  // Ring size per state
  const ringSize = {
    default: 32,
    hover: 56,
    click: 20,
    text: 4,
    drag: 64,
  }[cursorState];

  const ringOpacity = {
    default: 1,
    hover: 0.9,
    click: 0.6,
    text: 0,
    drag: 0.7,
  }[cursorState];

  const dotSize = {
    default: 5,
    hover: 0,
    click: 8,
    text: 2,
    drag: 0,
  }[cursorState];

  const dotOpacity = cursorState === "hover" || cursorState === "drag" ? 0 : 1;

  return (
    <>
      {/* Hide the native cursor globally */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      {/* Outer ring — slow spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? ringOpacity : 0,
          width: ringSize,
          height: ringSize,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: cursorState === "hover"
              ? "1.5px solid rgba(230,213,180,0.9)"
              : cursorState === "drag"
              ? "1.5px dashed rgba(156,208,210,0.8)"
              : "1px solid rgba(230,213,180,0.7)",
            backgroundColor:
              cursorState === "hover"
                ? "rgba(230,213,180,0.08)"
                : cursorState === "click"
                ? "rgba(230,213,180,0.15)"
                : "transparent",
            transition: "background-color 0.15s, border 0.15s",
          }}
        />

        {/* Drag label inside ring */}
        {cursorState === "drag" && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(156,208,210,0.9)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
            }}
          >
            drag
          </motion.span>
        )}

        {/* Hover label — small dot becomes cross */}
        {cursorState === "hover" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "rgba(230,213,180,0.9)",
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Inner dot — fast, precise */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? dotOpacity : 0,
          width: dotSize,
          height: dotSize,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor:
              cursorState === "click"
                ? "rgba(156,208,210,1)"
                : "rgba(230,213,180,1)",
            transition: "background-color 0.1s",
          }}
        />
      </motion.div>
    </>
  );
}