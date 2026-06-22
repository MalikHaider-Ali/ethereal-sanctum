"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { viewportOnce } from "../animations";

// Static treatment options
const staticTreatmentOptions = [
  {
    id: "opt-1",
    icon: "waves",
    duration: "90 MIN",
    title: "Oceanic Drift",
    description:
      "A weightless sensory deprivation experience enhanced with mineral-rich thermal waters.",
  },
  {
    id: "opt-2",
    icon: "auto_awesome",
    duration: "120 MIN",
    title: "Celestial Attunement",
    description:
      "Guided meditation paired with vibrational sound therapy and obsidian stone massage.",
    featured: true,
  },
  {
    id: "opt-3",
    icon: "eco",
    duration: "60 MIN",
    title: "Botanical Alchemy",
    description:
      "Custom-blended herbal oils designed to restore your skin's natural luminescence.",
  },
  {
    id: "opt-4",
    icon: "flare",
    duration: "75 MIN",
    title: "Solar Radiance",
    description:
      "Heat-based therapy focusing on circulation and metabolic revitalization.",
  },
  {
    id: "opt-5",
    icon: "face",
    duration: "75 MIN",
    title: "Luminous Facial",
    description:
      "A regenerative journey utilizing ionized gold particles and deep cellular hydration.",
  },
  {
    id: "opt-6",
    icon: "spa",
    duration: "90 MIN",
    title: "Obsidian Body Wrap",
    description:
      "Detoxifying volcanic clay infusion followed by a silk-protein moisture seal.",
  },
];

const getCategoryIcon = (category: string, name: string) => {
  const cat = category?.toLowerCase() || "";
  const n = name?.toLowerCase() || "";
  if (n.includes("facial") || cat.includes("face")) return "face";
  if (n.includes("ritual") || cat.includes("ritual")) return "auto_awesome";
  if (n.includes("body") || n.includes("wrap") || cat.includes("body")) return "spa";
  if (n.includes("alchemy") || n.includes("botanical")) return "eco";
  return "waves";
};

interface MappedTreatment {
  id: string;
  icon: string;
  duration: string;
  title: string;
  description: string;
}

function TreatmentCard({
  t,
  index,
  selected,
  onSelect,
}: {
  t: MappedTreatment;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-80, 80], [5, -5]), { stiffness: 140, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-5, 5]), { stiffness: 140, damping: 24 });
  const glowX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 90, damping: 20 });
  const scale = useSpring(1, { stiffness: 220, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => {
    mouseX.set(0); mouseY.set(0); scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-lg p-8 border cursor-pointer ${
        selected
          ? "bg-surface-container-high border-primary/40 shadow-[0_0_40px_rgba(230,213,180,0.07)]"
          : "bg-surface-container-low border-outline-variant/10 hover:border-primary/30"
      }`}
      style={{ rotateX, rotateY, scale, perspective: 700 }}
      onClick={onSelect}
      onMouseMove={handleMove}
      onMouseEnter={() => scale.set(1.02)}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Pointer inner glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background: `radial-gradient(circle at calc(50% + ${glowX}px) calc(50% + ${glowY}px), rgba(230,213,180,0.09) 0%, transparent 55%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <motion.span
            className="material-symbols-outlined text-primary text-4xl"
            animate={selected ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {t.icon}
          </motion.span>
          <span className="text-xs font-label tracking-widest text-on-surface-variant">
            {t.duration}
          </span>
        </div>

        <h3
          className={`font-headline text-3xl mb-4 transition-colors duration-300 ${
            selected ? "text-primary" : "group-hover:text-primary"
          }`}
        >
          {t.title}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
          {t.description}
        </p>

        <div className="flex items-center gap-2 text-primary font-label text-xs tracking-widest uppercase">
          {selected ? (
            <>
              <motion.span
                className="material-symbols-outlined text-sm"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </motion.span>
              <span>Selected</span>
            </>
          ) : (
            <>
              <span>Select Treatment</span>
              <motion.span
                className="material-symbols-outlined text-sm"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                arrow_forward
              </motion.span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TreatmentSelector({
  selected,
  onSelect,
  treatments = [],
}: {
  selected: string;
  onSelect: (t: string) => void;
  treatments?: any[];
}) {
  // Always use static treatment options, ignore the treatments prop
  const options = staticTreatmentOptions;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {options.map((t, i) => (
        <TreatmentCard
          key={t.id}
          t={t}
          index={i}
          selected={selected === t.title}
          onSelect={() => onSelect(t.title)}
        />
      ))}
    </div>
  );
}