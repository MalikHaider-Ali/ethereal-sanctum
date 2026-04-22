"use client";

import { motion, LayoutGroup } from "framer-motion";

const filters = ["All", "Face", "Body", "Mind", "Rituals"];

export default function TreatmentsFilterBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (f: string) => void;
}) {
  return (
    <motion.section
      className="sticky top-[72px] z-40 bg-surface/80 backdrop-blur-md px-4 md:px-12 py-5 md:py-8 mb-10 md:mb-16"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-outline-variant/20 pb-4">
        <LayoutGroup>
          <div className="flex gap-5 md:gap-8 overflow-x-auto no-scrollbar">
            {filters.map((filter) => {
              const isActive = filter === active;
              return (
                <motion.button
                  key={filter}
                  onClick={() => onChange(filter)}
                  className={`relative text-xs tracking-widest uppercase pb-2 transition-colors duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  {filter}
                  {isActive && (
                    <motion.div
                      layoutId="filter-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="hidden md:flex items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-sm">filter_list</span>
          <span className="text-[10px] uppercase tracking-widest">Refine</span>
        </div>
      </div>
    </motion.section>
  );
}