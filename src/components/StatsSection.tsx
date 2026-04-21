"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "./animations";

function CountUp({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { target: 5000, suffix: "+", label: "Happy Clients" },
  { target: 12, suffix: "+", label: "Years Excellence" },
  { target: 98, suffix: "%", label: "Clinical Efficacy" },
];

export default function StatsSection() {
  return (
    <section className="py-24 border-y border-outline-variant/10">
      <motion.div
        className="px-12 grid grid-cols-1 md:grid-cols-3 gap-16 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {stats.map((s) => (
          <motion.div key={s.label} className="space-y-2" variants={fadeUp}>
            <p className="font-headline text-6xl text-primary">
              <CountUp target={s.target} suffix={s.suffix} />
            </p>
            <p className="font-label text-xs tracking-widest text-on-surface-variant uppercase">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}