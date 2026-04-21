"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TreatmentsFilterBar from "./TreatmentsFilterBar";
import TreatmentCard from "./TreatmentCard";
import TreatmentDetailOverlay from "./TreatmentDetailOverlay";

const treatments = [
  {
    title: "Luminous Facial",
    price: "$240",
    category: "Face",
    description:
      "A regenerative journey utilizing ionized gold particles and deep cellular hydration to restore your natural radiance.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJd8EndeeUSlIP4cF88CAlfKl-tXPPaZyhQbOJ43DVt-xKYuIcUj0MQqrg1qD4Fyj7grW6U6adBRr0bGBkfO5q9asHI9A3p-K-mvXnRjQRXCpiheaslg19jvT-nIopD1Mp-1IavIbSwxZ6z0ko88mm6e8zRUqr54iEjVVWH0ZoJLvYOPdgIw8PNmez5Rx-f77FnhObQwYOIVl03gSUFh5JzGN4fLW056nzWjVMtOMse91u7K3Uy-9Q1XT-K9cKUiY7bL5QgQ4CvA",
    alt: "Luxury treatment room",
    featured: false,
    offsetY: false,
  },
  {
    title: "Serenova Ritual",
    price: "$420",
    category: "Rituals",
    description:
      "Our flagship sensory experience blending hot stone therapy with vibrational sound healing for absolute transcendence.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWNc8B7yJuNZr1RXXGWBWo6m5zgJ-qzDBWrxVHggROAyOjEKZqbAxOo-d7lt4wToUfrpthY4QMhUrvNW-EQ8evD2HDMr89NsZMqcaeRgOl2Geoa8VuOglCCjg7lqKMwbrrvO_4FQESlXmG6m64q9l3O0UN9WQ-s5cKXdvwgjpGx4BCut1fFBzcs5qJ-pnA4jCzTOhxlUuzvafaFbZaUW5RACe0__Bvt0B8OrSzGjndAlJa88HRxZDxHxRX3jxUU5FzmusJ6Z75eA",
    alt: "Hot stone therapy",
    featured: true,
    offsetY: true,
    colStart: "",
  },
  {
    title: "Obsidian Body Wrap",
    price: "$310",
    category: "Body",
    description:
      "Detoxifying volcanic clay infusion followed by a silk-protein moisture seal for skin that feels ethereal.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGOZIXv43sKf-H7hnMVESuw8jGFABNEaILJKC_ksLNaChYz8xN8YBs55J_E6_9oG2dsH1rrvr6wDw9pgT6XdO5evzxljFq4cWpIwsItZ7z2tBUJjGcO1xtVpo4_eBLgLaHDwnKkyVY7rCq-6CrZRNdmX-040InNYMII-8GnXibMUrd7oRvoU8L90acvXpcNRQpfDYH4qOPkha87AsW6mPNt6fd_3FV-rGmryo06Ax2bNiVc8KqW5fKV1yrgTc7C6sTSwWFtVfZhA",
    alt: "Essential oils spa",
    featured: false,
    offsetY: false,
  },
  {
    title: "Molecular Sculpt",
    price: "$190",
    category: "Face",
    description:
      "Targeted micro-current technology that lifts and defines facial contours with clinical precision.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvJMGxfDtMb2Yj5VzQcwFAt7dVw9riUL1AlnqSvNKNQNyb-RHIfgbXtLvFLfgu5urQZ6yzao-U0v3kdshE7VVi5wHZtEL40sQYjklqnFRvHPbcipDF_K3Uj5MMVnZSIZ-4X-3dQqBwyVvJMqi8C1Vb0uw6em7O-dO3iHaBvWYAawpx1PUq-_VoGJ88B-fJ5Bejyg1jBu9J7u7jBMhHYSDM3XYbJuEnloyYYc_ieRepuDDtzGeNyVy6_qKLBfHv4B9zvvV90JEUiA",
    alt: "Skincare products",
    featured: false,
    offsetY: true,
    colStart: "md:col-start-2",
  },
];

export default function TreatmentsGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTreatment, setSelectedTreatment] = useState<
    (typeof treatments)[0] | null
  >(null);

  const filtered =
    activeFilter === "All"
      ? treatments
      : treatments.filter((t) => t.category === activeFilter);

  return (
    <>
      <TreatmentsFilterBar active={activeFilter} onChange={setActiveFilter} />

      <section className="px-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {filtered.map((treatment, i) => (
              <TreatmentCard
                key={treatment.title}
                treatment={treatment}
                index={i}
                onClick={() => setSelectedTreatment(treatment)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <TreatmentDetailOverlay
        treatment={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
      />
    </>
  );
}