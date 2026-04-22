"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "Results", href: "/results" },
  { label: "Sanctuary", href: "/about" },
  { label: "Journal", href: "/design-system" },
  { label: "Reserve", href: "/reserve" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 md:py-6 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-stone-950/90 backdrop-blur-2xl"
            : "bg-transparent backdrop-blur-2xl"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-headline font-light italic text-2xl md:text-3xl text-[#e6d5b4] hover:opacity-80 transition-opacity duration-300 z-10"
        >
          Ethereal Sanctum
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map(({ label, href }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={label}
                href={href}
                className={`font-label uppercase tracking-[0.2em] text-[11px] lg:text-[12px] transition-colors duration-500 ${
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

        <div className="flex items-center gap-4">
          {/* CTA — desktop */}
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            <Link
              href="/treatments"
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-label text-xs tracking-widest uppercase hover:opacity-90 transition-opacity duration-300 inline-block relative overflow-hidden"
            >
              Consultation
            </Link>
          </motion.div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-10"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-px bg-[#e6d5b4] origin-center"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-6 h-px bg-[#e6d5b4]"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-px bg-[#e6d5b4] origin-center"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-surface-container-lowest flex flex-col justify-center items-center gap-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={href}
                  className={`font-headline italic text-4xl transition-colors duration-300 ${
                    pathname.startsWith(href)
                      ? "text-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
              className="mt-6"
            >
              <Link
                href="/treatments"
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-full font-label text-sm tracking-widest uppercase"
              >
                Consultation
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}