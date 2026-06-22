"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionValue, useSpring } from "framer-motion";
import { viewportOnce, staggerContainer, fadeUp } from "../animations";

function GlowInput({
  label,
  type = "text",
  placeholder,
  fullWidth = false,
  value = "",
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
  value?: string;
  onChange?: (val: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-300);
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20 });

  return (
    <div
      ref={ref}
      className={`space-y-2 ${fullWidth ? "md:col-span-2" : ""}`}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
      }}
      onMouseLeave={() => mouseX.set(-300)}
    >
      <label
        className={`font-label text-xs tracking-widest uppercase transition-colors duration-300 ${
          focused ? "text-primary" : "text-on-surface-variant"
        }`}
      >
        {label}
      </label>

      <div className="relative">
        {type === "textarea" ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent border-0 border-b border-outline-variant py-4 text-xl placeholder:text-surface-variant focus:ring-0 focus:outline-none resize-none h-32 transition-colors duration-300"
            style={{ borderBottomColor: focused ? "#e6d5b4" : undefined }}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent border-0 border-b border-outline-variant py-4 text-xl placeholder:text-surface-variant focus:ring-0 focus:outline-none transition-colors duration-300"
            style={{ borderBottomColor: focused ? "#e6d5b4" : undefined }}
          />
        )}

        {/* Animated underline fill */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-secondary to-primary pointer-events-none"
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />

        {/* Pointer glow dot on border */}
        <motion.div
          className="absolute bottom-0 w-8 h-[2px] bg-primary/50 blur-[2px] pointer-events-none"
          style={{ left: glowX }}
        />
      </div>
    </div>
  );
}

export default function ReserveForm({
  treatmentId,
  slotId,
  onSuccess,
}: {
  treatmentId: string | null;
  slotId: string | null;
  onSuccess: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intentions, setIntentions] = useState("");

  const handleSubmit = async () => {
    if (!agreed) return;
    
    setLoading(true);
    setError(null);

    // Simulate loading and success
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 500);
    }, 1000);
  };

  const isFormValid = name.trim() !== "" && email.trim() !== "" && agreed && !submitted && !loading;

  return (
    <motion.section
      className="space-y-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.span className="text-secondary font-label text-xs tracking-[0.3em] uppercase block" variants={fadeUp}>
          Phase 03
        </motion.span>
        <motion.h2 className="font-headline text-5xl md:text-6xl text-on-surface" variants={fadeUp}>
          Final Manifestation.
        </motion.h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUp}>
          <GlowInput
            label="Full Name"
            placeholder="Julian Vane"
            value={name}
            onChange={setName}
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <GlowInput
            label="Email Address"
            type="email"
            placeholder="julian@alchemist.digital"
            value={email}
            onChange={setEmail}
          />
        </motion.div>
        <motion.div className="md:col-span-2" variants={fadeUp}>
          <GlowInput
            label="Personal Intentions (Optional)"
            type="textarea"
            placeholder="Describe any specific focus areas for your treatment..."
            fullWidth
            value={intentions}
            onChange={setIntentions}
          />
        </motion.div>
      </motion.div>

      {/* Error Display - Keep for structure but won't be used */}
      {error && (
        <motion.div
          className="text-error font-label text-xs tracking-wider uppercase text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {/* Agreement checkbox */}
      <motion.div
        className="flex items-center gap-4 py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          className={`w-6 h-6 border rounded-full flex items-center justify-center transition-colors duration-300 ${
            agreed ? "border-primary bg-primary/10" : "border-primary"
          }`}
          onClick={() => setAgreed(!agreed)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence>
            {agreed && (
              <motion.div
                className="w-3 h-3 bg-primary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            )}
          </AnimatePresence>
        </motion.button>
        <p className="text-on-surface-variant text-sm">
          I agree to the{" "}
          <a href="#" className="text-primary underline underline-offset-4">
            Sacred Terms
          </a>{" "}
          and cancellation policy.
        </p>
      </motion.div>

      {/* Submit button */}
      <motion.button
        className="w-full md:w-auto px-16 py-6 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-label text-sm tracking-[0.2em] uppercase shadow-xl relative overflow-hidden disabled:opacity-40"
        onClick={handleSubmit}
        disabled={!isFormValid}
        whileHover={{ scale: isFormValid ? 1.04 : 1 }}
        whileTap={{ scale: isFormValid ? 0.97 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
      >
        {/* Shimmer sweep */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2"
            >
              <span className="w-4 h-4 rounded-full border-2 border-[#e6d5b4]/20 border-t-[#e6d5b4] animate-spin" />
              Manifesting Ritual...
            </motion.span>
          ) : submitted ? (
            <motion.span
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Confirmed
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Finalize Reservation
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.section>
  );
}