"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { viewportOnce } from "../animations";

interface TransformationItem {
  title: string;
  timeline: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  offset?: boolean;
}

export default function TransformationCard({
  item,
  index,
}: {
  item: TransformationItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Scroll-driven Y reveal for stagger feel
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={`group ${item.offset ? "md:mt-24" : ""}`}
      style={{ y, opacity }}
    >
      <BeforeAfterSlider
        beforeSrc={item.beforeSrc}
        afterSrc={item.afterSrc}
        beforeAlt={item.beforeAlt}
        afterAlt={item.afterAlt}
      />

      {/* Card info */}
      <motion.div
        className="flex justify-between items-end border-b border-outline-variant/20 pb-4 mt-8"
        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div>
          <motion.h3
            className="font-headline text-3xl text-primary font-light mb-1"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {item.title}
          </motion.h3>
          <p className="text-on-surface-variant text-[11px] uppercase tracking-widest font-medium">
            Timeline: {item.timeline}
          </p>
        </div>
        <motion.span
          className="material-symbols-outlined text-secondary text-xl"
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={viewportOnce}
          transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
        >
          verified
        </motion.span>
      </motion.div>
    </motion.div>
  );
}