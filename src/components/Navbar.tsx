"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "Results", href: "/results" },
  { label: "Sanctuary", href: "/about" },
  { label: "Journal", href: "/library" },
  { label: "Reserve", href: "/reserve" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-12 py-6 transition-all duration-500 ${
        scrolled
          ? "bg-stone-950/80 backdrop-blur-2xl"
          : "bg-transparent backdrop-blur-2xl"
      }`}
    >
      <Link
        href="/"
        className="font-headline font-light italic text-3xl text-[#e6d5b4] hover:opacity-80 transition-opacity duration-300"
      >
        Ethereal Sanctum
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map(({ label, href }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={label}
              href={href}
              className={`font-label uppercase tracking-[0.2em] text-[12px] transition-colors duration-500 ${
                isActive
                  ? "text-[#e6d5b4] border-b-[0.5px] border-[#e6d5b4]/40 pb-1"
                  : "text-[#cec5b9] hover:text-[#e6d5b4]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
        <Link
          href="/treatments"
          className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3 rounded-full font-label text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300 inline-block relative overflow-hidden group"
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          />
          Consultation
        </Link>
      </motion.div>
    </nav>
  );
}