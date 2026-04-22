"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { viewportOnce } from "../animations";

const team = [
  {
    name: "Dr. Elara Vance",
    role: "Medical Director — MD, PhD Neuroscience",
    quote: "Healing is not merely the absence of disease, but the presence of vibrant, balanced energy within the cellular structure.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDROkoZPyT4AMnXbFYz4OTgz_m3E9LQGFC4O1kcd9yVyai0Uc3yPGxg_AYFTndv23RbtQZs_DCN2QdeogcR70g5OBbY1tXNjBjZZSrkT2QFSK1l6O9XSnXo0lNJjcWqRmSro-n9HK9Zrll-YIRO78I7Wkbr0Zxmh1rwxGdZ_j4Zq-EUdMdSZmZvEHHT6unsJfUI9m9A4UV2Fp0v44PYF3ms7vWaabwBtr-nQSi_W-HG8ZbOsNnoZMKcZQin3T1_JPy43VB0mW-Dyg",
    alt: "Dr. Elara Vance portrait",
    imageLeft: true,
  },
  {
    name: "Julian Thorne",
    role: "Lead Alchemist — Holistic Pharmacology",
    quote: "We synthesize the ancient wisdom of botanical extraction with precision molecular delivery to create profound shifts in vitality.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0nQrZUaNUYBGBc02Mzilr2LjWIjC75OlLROhYxM1kYUPgTVDSC5rbxR2LKhR7BoUU5BQh6exz-0gYgwiEmuOGtOTby6XX6ZycHw2nH1fMCVS2Kow_Y0RYwiKe3JHGKwuTH2B7Q5S0aFey1do3Kq3eKegTplhm3lsYN2CVDHjw1l9I4No4FJFZOywoAKbeIW1uD8hbMxX0cBRfPTVH6EsMEj1JGjuFS1Jyz11bXnVUtIgPoS_HqvNibb35IyhiIBh2ZILmfWGswQ",
    alt: "Julian Thorne portrait",
    imageLeft: false,
  },
  {
    name: "Saffron Reed",
    role: "Somatic Therapist — MA Psychology",
    quote: "The body remembers what the mind chooses to forget. Our work is to provide the safety for the nervous system to finally release.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB82Adg6KRRR-cC1o6v40ZpQY9e4CJDDr2bsDEubYY5IaclJaZMDclEFENz5BnC2Zb6IuByRfs-SIaezMcq3TFRUhm8HFMDJSxWUi73j7PTf12CF_xmJk4JL_FKjGa8MS0gyWqM01j_3RqnJSoXBjqTO6dNFUTXRL7y5uuGxXkw7kH7AFQkPSiCW9cHUQ7b27h4CWeTdvuQVMIvpURdzvfUHIu-ti4dCittA2xY-jTfiISXpPLg9Te_QbzHwGKGPebBoGDP_VTBsQ",
    alt: "Saffron Reed portrait",
    imageLeft: true,
  },
];

function MagneticCard({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [7, -7]), { stiffness: 120, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-7, 7]), { stiffness: 120, damping: 28 });
  const scale = useSpring(1, { stiffness: 250, damping: 22 });
  const glowX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const glowY = useSpring(mouseY, { stiffness: 90, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      className="aspect-[4/5] rounded-lg overflow-hidden bg-surface-container-high relative"
      style={{ rotateX, rotateY, scale, perspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); scale.set(1); }}
      onMouseEnter={() => scale.set(1.025)}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 58vw" />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at calc(50% + ${glowX}px) calc(50% + ${glowY}px), rgba(230,213,180,0.13) 0%, transparent 55%)`,
        }}
      />
    </motion.div>
  );
}

function TeamMember({ member, index }: { member: (typeof team)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const imageX = useTransform(scrollYProgress, [0, 1], [member.imageLeft ? -80 : 80, 0]);
  const textX = useTransform(scrollYProgress, [0, 1], [member.imageLeft ? 80 : -80, 0]);
  const rowOpacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
      {/* On mobile: image always on top, text below */}
      <motion.div
        className={`md:col-span-7 ${!member.imageLeft ? "md:order-2" : ""}`}
        style={{ x: imageX, opacity: rowOpacity }}
      >
        <MagneticCard src={member.src} alt={member.alt} />
      </motion.div>

      <motion.div
        className={`md:col-span-5 ${member.imageLeft ? "md:pl-8 lg:pl-12" : "md:pr-8 lg:pr-12 md:order-1"}`}
        style={{ x: textX, opacity: rowOpacity }}
      >
        <motion.h3
          className="font-headline text-3xl md:text-4xl lg:text-5xl text-primary mb-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.18 }}
        >
          {member.name}
        </motion.h3>

        <motion.p
          className="font-label text-secondary uppercase tracking-widest text-xs mb-5 md:mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.32 }}
        >
          {member.role}
        </motion.p>

        <motion.div
          className="h-px w-16 md:w-24 bg-outline-variant/30 mb-6 md:mb-8 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: 0.42 }}
        />

        <motion.blockquote
          className="font-headline italic text-xl md:text-2xl text-on-surface-variant leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.85, delay: 0.52 }}
        >
          &ldquo;{member.quote}&rdquo;
        </motion.blockquote>
      </motion.div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-surface max-w-7xl mx-auto space-y-24 md:space-y-48">
      {team.map((member, i) => (
        <TeamMember key={member.name} member={member} index={i} />
      ))}
    </section>
  );
}