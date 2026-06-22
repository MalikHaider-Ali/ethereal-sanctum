"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TreatmentsFilterBar from "./TreatmentsFilterBar";
import TreatmentCard from "./TreatmentCard";
import TreatmentDetailOverlay from "./TreatmentDetailOverlay";

// Static treatments data
const treatmentsData = [
  {
    id: "1",
    name: "Luminous Facial",
    duration: 75,
    category: "Face",
    description: "A regenerative journey utilizing ionized gold particles and deep cellular hydration to restore your natural radiance.",
    benefits: ["Restored natural radiance", "Deep cellular hydration", "Reduced fine lines"],
    processSteps: ["Skin mapping", "Gold mist", "Serum infusion", "Massage", "Hydration seal"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJd8EndeeUSlIP4cF88CAlfKl-tXPPaZyhQbOJ43DVt-xKYuIcUj0MQqrg1qD4Fyj7grW6U6adBRr0bGBkfO5q9asHI9A3p-K-mvXnRjQRXCpiheaslg19jvT-nIopD1Mp-1IavIbSwxZ6z0ko88mm6e8zRUqr54iEjVVWH0ZoJLvYOPdgIw8PNmez5Rx-f77FnhObQwYOIVl03gSUFh5JzGN4fLW056nzWjVMtOMse91u7K3Uy-9Q1XT-K9cKUiY7bL5QgQ4CvA",
  },
  {
    id: "2",
    name: "Serenova Ritual",
    duration: 120,
    category: "Rituals",
    description: "Our flagship sensory experience blending hot stone therapy with vibrational sound healing for absolute transcendence.",
    benefits: ["Nervous system reset", "Deep tension release", "Elevated mood"],
    processSteps: ["Aromatherapy", "Obsidian stones", "Sound bath", "Silk mask"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWNc8B7yJuNZr1RXXGWBWo6m5zgJ-qzDBWrxVHggROAyOjEKZqbAxOo-d7lt4wToUfrpthY4QMhUrvNW-EQ8evD2HDMr89NsZMqcaeRgOl2Geoa8VuOglCCjg7lqKMwbrrvO_4FQESlXmG6m64q9l3O0UN9WQ-s5cKXdvwgjpGx4BCut1fFBzcs5qJ-pnA4jCzTOhxlUuzvafaFbZaUW5RACe0__Bvt0B8OrSzGjndAlJa88HRxZDxHxRX3jxUU5FzmusJ6Z75eA",
  },
  {
    id: "3",
    name: "Obsidian Body Wrap",
    duration: 90,
    category: "Body",
    description: "Detoxifying volcanic clay infusion followed by a silk-protein moisture seal for skin that feels ethereal.",
    benefits: ["Deep detox", "Improved drainage", "Silk skin texture"],
    processSteps: ["Dry brush", "Clay application", "Thermal wrap", "Rinse", "Moisture seal"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGOZIXv43sKf-H7hnMVESuw8jGFABNEaILJKC_ksLNaChYz8xN8YBs55J_E6_9oG2dsH1rrvr6wDw9pgT6XdO5evzxljFq4cWpIwsItZ7z2tBUJjGcO1xtVpo4_eBLgLaHDwnKkyVY7rCq-6CrZRNdmX-040InNYMII-8GnXibMUrd7oRvoU8L90acvXpcNRQpfDYH4qOPkha87AsW6mPNt6fd_3FV-rGmryo06Ax2bNiVc8KqW5fKV1yrgTc7C6sTSwWFtVfZhA",
  },
  {
    id: "4",
    name: "Molecular Sculpt",
    duration: 60,
    category: "Face",
    description: "Targeted micro-current technology that lifts and defines facial contours with clinical precision.",
    benefits: ["Lifted contours", "Zero downtime", "Immediate results"],
    processSteps: ["3D mapping", "Gel prep", "Micro-current", "Lifting", "Serum finish"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvJMGxfDtMb2Yj5VzQcwFAt7dVw9riUL1AlnqSvNKNQNyb-RHIfgbXtLvFLfgu5urQZ6yzao-U0v3kdshE7VVi5wHZtEL40sQYjklqnFRvHPbcipDF_K3Uj5MMVnZSIZ-4X-3dQqBwyVvJMqi8C1Vb0uw6em7O-dO3iHaBvWYAawpx1PUq-_VoGJ88B-fJ5Bejyg1jBu9J7u7jBMhHYSDM3XYbJuEnloyYYc_ieRepuDDtzGeNy6_qKLBfHv4B9zvvV90JEUiA",
  },
];

// Pricing mapping
const getPrice = (name: string, duration: number) => {
  if (name.includes("Serenova")) return "$420";
  if (name.includes("Luminous")) return "$240";
  if (name.includes("Obsidian")) return "$310";
  if (name.includes("Molecular")) return "$190";
  return `$${duration * 3}`;
};

// Image mapping
const getTreatmentImage = (name: string, fallbackImg?: string) => {
  if (fallbackImg) return fallbackImg;
  if (name.includes("Luminous")) return "https://lh3.googleusercontent.com/aida-public/AB6AXuAJd8EndeeUSlIP4cF88CAlfKl-tXPPaZyhQbOJ43DVt-xKYuIcUj0MQqrg1qD4Fyj7grW6U6adBRr0bGBkfO5q9asHI9A3p-K-mvXnRjQRXCpiheaslg19jvT-nIopD1Mp-1IavIbSwxZ6z0ko88mm6e8zRUqr54iEjVVWH0ZoJLvYOPdgIw8PNmez5Rx-f77FnhObQwYOIVl03gSUFh5JzGN4fLW056nzWjVMtOMse91u7K3Uy-9Q1XT-K9cKUiY7bL5QgQ4CvA";
  if (name.includes("Serenova")) return "https://lh3.googleusercontent.com/aida-public/AB6AXuBWNc8B7yJuNZr1RXXGWBWo6m5zgJ-qzDBWrxVHggROAyOjEKZqbAxOo-d7lt4wToUfrpthY4QMhUrvNW-EQ8evD2HDMr89NsZMqcaeRgOl2Geoa8VuOglCCjg7lqKMwbrrvO_4FQESlXmG6m64q9l3O0UN9WQ-s5cKXdvwgjpGx4BCut1fFBzcs5qJ-pnA4jCzTOhxlUuzvafaFbZaUW5RACe0__Bvt0B8OrSzGjndAlJa88HRxZDxHxRX3jxUU5FzmusJ6Z75eA";
  if (name.includes("Obsidian")) return "https://lh3.googleusercontent.com/aida-public/AB6AXuAGOZIXv43sKf-H7hnMVESuw8jGFABNEaILJKC_ksLNaChYz8xN8YBs55J_E6_9oG2dsH1rrvr6wDw9pgT6XdO5evzxljFq4cWpIwsItZ7z2tBUJjGcO1xtVpo4_eBLgLaHDwnKkyVY7rCq-6CrZRNdmX-040InNYMII-8GnXibMUrd7oRvoU8L90acvXpcNRQpfDYH4qOPkha87AsW6mPNt6fd_3FV-rGmryo06Ax2bNiVc8KqW5fKV1yrgTc7C6sTSwWFtVfZhA";
  if (name.includes("Molecular")) return "https://lh3.googleusercontent.com/aida-public/AB6AXuCvJMGxfDtMb2Yj5VzQcwFAt7dVw9riUL1AlnqSvNKNQNyb-RHIfgbXtLvFLfgu5urQZ6yzao-U0v3kdshE7VVi5wHZtEL40sQYjklqnFRvHPbcipDF_K3Uj5MMVnZSIZ-4X-3dQqBwyVvJMqi8C1Vb0uw6em7O-dO3iHaBvWYAawpx1PUq-_VoGJ88B-fJ5Bejyg1jBu9J7u7jBMhHYSDM3XYbJuEnloyYYc_ieRepuDDtzGeNy6_qKLBfHv4B9zvvV90JEUiA";
  return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80";
};

export default function TreatmentsGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTreatment, setSelectedTreatment] = useState<any | null>(null);

  // Filter treatments based on active category
  const filteredTreatments = activeFilter === "All" 
    ? treatmentsData 
    : treatmentsData.filter((t) => t.category === activeFilter);

  return (
    <>
      <TreatmentsFilterBar active={activeFilter} onChange={setActiveFilter} />

      <section className="px-4 md:px-12 max-w-7xl mx-auto min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 items-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {filteredTreatments.map((treatment, i) => (
              <TreatmentCard
                key={treatment.id}
                treatment={{
                  title: treatment.name,
                  price: getPrice(treatment.name, treatment.duration),
                  description: treatment.description,
                  src: getTreatmentImage(treatment.name, treatment.imageUrl),
                  alt: treatment.name,
                  featured: i % 3 === 1,
                  offsetY: false,
                }}
                index={i}
                onClick={() => setSelectedTreatment(treatment)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <TreatmentDetailOverlay
        treatment={selectedTreatment ? {
          title: selectedTreatment.name,
          price: getPrice(selectedTreatment.name, selectedTreatment.duration),
          src: getTreatmentImage(selectedTreatment.name, selectedTreatment.imageUrl),
          alt: selectedTreatment.name,
        } : null}
        onClose={() => setSelectedTreatment(null)}
      />
    </>
  );
}