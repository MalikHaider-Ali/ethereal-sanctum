"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

const filters = [
  "All Outcomes",
  "Facial Sculpting",
  "Dermal Renewal",
  "Contour Mastery",
  "Bio-Luminescence",
];

export default function FilterBar({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (f: string) => void;
}) {
  return (
    <motion.div
      className="mb-16 flex flex-wrap justify-center gap-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0 }}
    >
      <LayoutGroup>
        {filters.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <motion.button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`relative px-8 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 ${
                isActive
                  ? "text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:text-primary"
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {filter}
            </motion.button>
          );
        })}
      </LayoutGroup>
    </motion.div>
  );
}