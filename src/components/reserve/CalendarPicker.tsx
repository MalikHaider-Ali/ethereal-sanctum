"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { viewportOnce, staggerContainer, fadeUp } from "../animations";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const TIME_SLOTS = ["09:00 AM", "11:30 AM", "02:15 PM", "04:45 PM", "06:00 PM", "08:30 PM"];

/** Returns the calendar grid for a given month.
 *  Each cell: { day, month: "prev"|"current"|"next", date: Date }
 */
function buildCalendarGrid(year: number, month: number) {
  // First day of the month (0=Sun … 6=Sat), convert to Mon-start (0=Mon … 6=Sun)
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { day: number; kind: "prev" | "current" | "next"; date: Date }[] = [];

  // Trailing days from previous month
  for (let i = firstDow - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    cells.push({ day: d, kind: "prev", date: new Date(year, month - 1, d) });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, kind: "current", date: new Date(year, month, d) });
  }

  // Leading days of next month to fill 6 rows (42 cells)
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, kind: "next", date: new Date(year, month + 1, d) });
  }

  return cells;
}

export default function CalendarPicker({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: {
  selectedDate: Date | null;
  selectedTime: string;
  onDateSelect: (d: Date) => void;
  onTimeSelect: (t: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  const cells = buildCalendarGrid(viewYear, viewMonth);

  const goMonth = (dir: 1 | -1) => {
    setSlideDir(dir);
    const d = new Date(viewYear, viewMonth + dir, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  // Can't go before current month
  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

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
        <motion.span
          className="text-secondary font-label text-xs tracking-[0.3em] uppercase block"
          variants={fadeUp}
        >
          Phase 02
        </motion.span>
        <motion.h2
          className="font-headline text-5xl md:text-6xl text-on-surface"
          variants={fadeUp}
        >
          Claim your moment.
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* ── Calendar ── */}
        <motion.div
          className="bg-surface-container-low rounded-lg p-8 border border-outline-variant/10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {/* Month navigation */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              className={`material-symbols-outlined transition-opacity duration-200 ${
                canGoPrev ? "text-primary" : "text-outline-variant opacity-30 cursor-not-allowed"
              }`}
              whileHover={canGoPrev ? { scale: 1.2, x: -2 } : {}}
              whileTap={canGoPrev ? { scale: 0.9 } : {}}
              onClick={() => canGoPrev && goMonth(-1)}
            >
              chevron_left
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.span
                key={`${viewMonth}-${viewYear}`}
                className="font-headline text-xl"
                initial={{ opacity: 0, y: slideDir * 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: slideDir * -10 }}
                transition={{ duration: 0.25 }}
              >
                {MONTHS[viewMonth]} {viewYear}
              </motion.span>
            </AnimatePresence>

            <motion.button
              className="material-symbols-outlined text-primary"
              whileHover={{ scale: 1.2, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goMonth(1)}
            >
              chevron_right
            </motion.button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] tracking-widest uppercase text-on-surface-variant mb-3">
            {DAYS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Date grid — animate when month changes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMonth}-${viewYear}`}
              className="grid grid-cols-7 gap-1 text-center"
              initial={{ opacity: 0, x: slideDir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDir * -24 }}
              transition={{ duration: 0.28 }}
            >
              {cells.map((cell, i) => {
                const isOtherMonth = cell.kind !== "current";
                const isPast = cell.date < today;
                const isToday = isSameDay(cell.date, today);
                const isSelected =
                  selectedDate !== null && isSameDay(cell.date, selectedDate);
                const isDisabled = isOtherMonth || isPast;

                return (
                  <motion.button
                    key={i}
                    disabled={isDisabled}
                    onClick={() => !isDisabled && onDateSelect(cell.date)}
                    className={[
                      "py-2 text-sm rounded-full transition-colors duration-200",
                      isDisabled
                        ? "text-outline-variant/40 cursor-not-allowed"
                        : isSelected
                        ? "bg-primary text-on-primary font-bold cursor-pointer"
                        : isToday
                        ? "border border-primary/50 text-primary cursor-pointer hover:bg-primary/10"
                        : "hover:bg-surface-container-highest cursor-pointer",
                    ].join(" ")}
                    whileHover={!isDisabled && !isSelected ? { scale: 1.12 } : {}}
                    whileTap={!isDisabled ? { scale: 0.9 } : {}}
                    animate={isSelected ? { scale: [1, 1.18, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {cell.day}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Today shortcut */}
          <motion.button
            className="mt-6 w-full text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300 text-center"
            onClick={() => {
              const d = new Date();
              setViewYear(d.getFullYear());
              setViewMonth(d.getMonth());
              onDateSelect(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
            }}
            whileHover={{ scale: 1.03 }}
          >
            Jump to Today
          </motion.button>
        </motion.div>

        {/* ── Time slots ── */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <span className="block font-label text-xs tracking-widest uppercase text-on-surface-variant">
            Available Hours
          </span>
          <div className="grid grid-cols-2 gap-4">
            {TIME_SLOTS.map((slot, i) => {
              const isActive = slot === selectedTime;
              return (
                <motion.button
                  key={slot}
                  onClick={() => onTimeSelect(slot)}
                  className={`py-4 rounded-full font-label text-sm tracking-widest transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? "border border-primary bg-primary/10 text-primary"
                      : "border border-outline-variant/30 hover:border-primary text-on-surface"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  {slot}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}