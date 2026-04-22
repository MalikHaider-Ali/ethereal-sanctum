"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "./animations";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
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
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { target: 5000, suffix: "+", label: "Happy Clients" },
  { target: 12, suffix: "+", label: "Years Excellence" },
  { target: 98, suffix: "%", label: "Clinical Efficacy" },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 border-y border-outline-variant/10">
      <motion.div
        className="px-6 md:px-12 grid grid-cols-3 gap-6 md:gap-16 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {stats.map((s) => (
          <motion.div key={s.label} className="space-y-1 md:space-y-2" variants={fadeUp}>
            <p className="font-headline text-4xl sm:text-5xl md:text-6xl text-primary">
              <CountUp target={s.target} suffix={s.suffix} />
            </p>
            <p className="font-label text-[9px] md:text-xs tracking-widest text-on-surface-variant uppercase">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}