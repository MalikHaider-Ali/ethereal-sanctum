import { Variants } from "framer-motion";

// Fade Up Animation
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Fade In Animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Slide Left Animation
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Slide Right Animation
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Stagger Container Animation (Fast - 0.1s between children)
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger Container Animation (Slow - 0.2s between children)
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // Slower stagger timing
      delayChildren: 0.1, // Optional: add delay before children start
    },
  },
};

// Stagger Container Animation (Very Slow - 0.3s between children)
export const staggerContainerVerySlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

// Viewport Once Configuration
export const viewportOnce = {
  once: true,
  margin: "-50px",
  amount: 0.2,
};

// Optional: Different viewport configurations
export const viewportOnceLight = {
  once: true,
  amount: 0.1, // Triggers when 10% visible
};

export const viewportOnceFull = {
  once: true,
  amount: 0.5, // Triggers when 50% visible
};

// Optional: Scale Animation
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Optional: Rotate Animation
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};