"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const tabs = ["Overview", "Benefits", "Process"];

const detailContent: Record<
  string,
  {
    overview: string;
    benefits: string[];
    process: string[];
    duration: string;
    therapist: string;
    // Maps to a treatment option on the /reserve page
    reserveKey: string;
  }
> = {
  "Luminous Facial": {
    overview:
      "Beginning with a personalized ionized gold mist, this facial guides your skin through deep cellular hydration layers. Rare botanical extracts penetrate the dermis to restore luminosity from within.",
    benefits: [
      "Restored natural radiance & even skin tone",
      "Deep cellular hydration lasting 4–6 weeks",
      "Reduction in fine lines and surface texture",
      "Stimulated collagen production",
    ],
    process: [
      "Personalized skin-mapping consultation",
      "Ionized gold particle mist application",
      "Multi-layer botanical serum infusion",
      "Lymphatic drainage facial massage",
      "Silk-finish hydration seal",
    ],
    duration: "75 Minutes",
    therapist: "Senior Aesthetician",
    reserveKey: "Botanical Alchemy",
  },
  "Serenova Ritual": {
    overview:
      "Beginning with a personalized aromatherapy selection, this ritual guides you through a rhythmic obsidian stone massage, followed by a Tibetan bowl sound bath and finished with a silk cocoon hydration mask.",
    benefits: [
      "Complete nervous system recalibration",
      "Muscular tension dissolved at the cellular level",
      "Elevated serotonin and dopamine response",
      "Deep parasympathetic activation",
    ],
    process: [
      "Aromatherapy profiling & selection",
      "Heated obsidian stone placement",
      "Rhythmic stone massage sequence",
      "Tibetan singing bowl sound bath",
      "Silk cocoon hydration mask finish",
    ],
    duration: "120 Minutes",
    therapist: "Master Alchemist",
    reserveKey: "Celestial Attunement",
  },
  "Obsidian Body Wrap": {
    overview:
      "Volcanic clay sourced from Iceland is activated with thermal energy and applied in rhythmic layers. The detoxifying draw is sealed with a silk-protein moisture barrier for transformative skin texture.",
    benefits: [
      "Deep-pore detoxification and purification",
      "Improved lymphatic drainage",
      "Skin texture refined to silk-like quality",
      "Mineral replenishment from volcanic clay",
    ],
    process: [
      "Dry brushing exfoliation ritual",
      "Warm volcanic clay application",
      "Thermal wrap cocoon for 20 minutes",
      "Rinse and silk-protein moisture seal",
      "Cooling botanical mist finish",
    ],
    duration: "90 Minutes",
    therapist: "Body Specialist",
    reserveKey: "Oceanic Drift",
  },
  "Molecular Sculpt": {
    overview:
      "Micro-current waveforms calibrated to your individual facial topography lift and define contours without injectables. Non-invasive, deeply effective.",
    benefits: [
      "Lifted and defined facial contours",
      "Stimulated ATP production in muscle tissue",
      "Improved facial symmetry over sessions",
      "Zero downtime, immediate visible results",
    ],
    process: [
      "3D facial mapping and calibration",
      "Conductive gel preparation",
      "Micro-current waveform treatment",
      "Targeted lifting sequences per zone",
      "Firming serum absorption finish",
    ],
    duration: "60 Minutes",
    therapist: "Clinical Technician",
    reserveKey: "Solar Radiance",
  },
};

export default function TreatmentDetailOverlay({
  treatment,
  onClose,
}: {
  treatment: { title: string; price: string; src: string; alt: string } | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isBooking, setIsBooking] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Pointer parallax on image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), { stiffness: 60, damping: 20 });
  const imgY = useSpring(useTransform(mouseY, [-300, 300], [-8, 8]), { stiffness: 60, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = panelRef.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { mouseX.set(0); mouseY.set(0); };

  // Navigate to /reserve with treatment pre-selected
  const handleBookExperience = () => {
    if (!treatment) return;
    setIsBooking(true);
    const detail = detailContent[treatment.title];
    const reserveKey = detail?.reserveKey ?? treatment.title;
    // Short delay so user sees the button animation before navigation
    setTimeout(() => {
      router.push(`/reserve?treatment=${encodeURIComponent(reserveKey)}`);
    }, 600);
  };

  const detail = treatment
    ? detailContent[treatment.title] ?? detailContent["Serenova Ritual"]
    : null;

  const tabContent = {
    Overview: detail && (
      <div className="space-y-10">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-secondary mb-2">Duration</h4>
            <p className="text-on-surface font-light">{detail.duration}</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-secondary mb-2">Therapist</h4>
            <p className="text-on-surface font-light">{detail.therapist}</p>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline text-2xl text-primary italic">The Experience</h4>
          <p className="text-on-surface-variant font-light leading-relaxed">{detail.overview}</p>
        </div>
      </div>
    ),
    Benefits: detail && (
      <div className="space-y-6">
        <h4 className="font-headline text-2xl text-primary italic">What You Gain</h4>
        <ul className="space-y-4">
          {detail.benefits.map((b, i) => (
            <motion.li
              key={b}
              className="flex items-start gap-4 text-on-surface-variant font-light text-sm leading-relaxed"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <motion.span
                className="material-symbols-outlined text-secondary text-lg mt-0.5 flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 300 }}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </motion.span>
              {b}
            </motion.li>
          ))}
        </ul>
      </div>
    ),
    Process: detail && (
      <div className="space-y-6">
        <h4 className="font-headline text-2xl text-primary italic">The Ritual Steps</h4>
        <ol className="space-y-5">
          {detail.process.map((step, i) => (
            <motion.li
              key={step}
              className="flex items-start gap-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.span
                className="flex-shrink-0 w-7 h-7 rounded-full border border-primary/30 flex items-center justify-center text-[10px] text-primary font-bold tracking-widest"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 280 }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
              <span className="text-on-surface-variant font-light text-sm leading-relaxed pt-0.5">
                {step}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    ),
  };

  return (
    <AnimatePresence>
      {treatment && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-surface-container-lowest/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Panel slides in from right */}
          <motion.div
            ref={panelRef}
            className="fixed inset-y-0 right-0 z-[70] w-full md:w-[85vw] bg-surface border-l border-outline-variant/20 flex flex-col md:flex-row overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 36 }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-8 left-8 z-[80] w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
            >
              <span className="material-symbols-outlined">close</span>
            </motion.button>

            {/* Left: Image with pointer parallax */}
            <div className="w-full md:w-1/2 h-[512px] md:h-full relative overflow-hidden">
              <motion.div className="absolute inset-0" style={{ x: imgX, y: imgY, scale: 1.08 }}>
                <Image
                  src={treatment.src}
                  alt={treatment.alt}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface" />

              {/* Price badge */}
              <motion.div
                className="absolute bottom-10 left-10 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-surface-container-lowest/70 backdrop-blur-md px-6 py-3 rounded-full border border-primary/20">
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-0.5">Investment</span>
                  <span className="text-2xl text-primary font-light">{treatment.price}</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Content panel */}
            <motion.div
              className="w-full md:w-1/2 p-12 md:p-24 flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              {/* Header */}
              <div className="mb-12">
                <motion.span
                  className="text-secondary tracking-[0.3em] uppercase text-[10px] mb-4 block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  Signature Experience
                </motion.span>
                <motion.h2
                  className="font-headline text-6xl md:text-7xl text-primary font-light mb-8 leading-tight"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {treatment.title.split(" ").slice(0, -1).join(" ")} <br />
                  <span className="italic">{treatment.title.split(" ").slice(-1)[0]}</span>
                </motion.h2>
                <motion.p
                  className="text-on-surface-variant text-xl font-light leading-relaxed"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  A transformative journey designed to recalibrate your senses through ancient wisdom and modern clinical precision.
                </motion.p>
              </div>

              {/* Tabs */}
              <div className="flex gap-12 border-b border-outline-variant/20 mb-12">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab}
                    className={`relative pb-4 text-xs tracking-widest uppercase transition-colors duration-300 ${
                      activeTab === tab ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                    }`}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="flex-grow mb-20"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {tabContent[activeTab as keyof typeof tabContent]}
                </motion.div>
              </AnimatePresence>

              {/* Booking footer */}
              <motion.div
                className="mt-auto pt-8 flex items-center justify-between border-t border-outline-variant/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Total Investment</span>
                  <span className="text-3xl text-primary font-light">{treatment.price}</span>
                </div>

                <motion.button
                  className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-12 py-5 rounded-full text-sm font-bold tracking-widest uppercase shadow-lg relative overflow-hidden min-w-[200px] flex items-center justify-center gap-3"
                  onClick={handleBookExperience}
                  disabled={isBooking}
                  whileHover={{ scale: isBooking ? 1 : 1.04 }}
                  whileTap={{ scale: isBooking ? 1 : 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  {/* Shimmer sweep */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />
                  <AnimatePresence mode="wait">
                    {isBooking ? (
                      <motion.span
                        key="loading"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Spinner */}
                        <motion.span
                          className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full inline-block"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Preparing...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <span className="material-symbols-outlined text-base">calendar_add_on</span>
                        Book Experience
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}