import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-06-13T17:00:00").getTime();

function diff() {
  const now = Date.now();
  const d = Math.max(0, TARGET - now);
  return {
    j: Math.floor(d / 86400000),
    h: Math.floor((d / 3600000) % 24),
    m: Math.floor((d / 60000) % 60),
    s: Math.floor((d / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(diff());
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items: { label: string; value: number }[] = [
    { label: "Jours", value: t.j },
    { label: "Heures", value: t.h },
    { label: "Minutes", value: t.m },
    { label: "Secondes", value: t.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-6">
      {items.map((it) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center justify-center rounded-xl border bg-card/60 px-2 py-4 backdrop-blur-sm sm:px-6 sm:py-8"
          style={{
            borderColor: "oklch(0.78 0.13 80 / 0.4)",
            boxShadow: "0 8px 30px -10px oklch(0.62 0.14 70 / 0.3)",
          }}
        >
          <motion.span
            key={it.value}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-3xl font-light tabular-nums text-gradient-gold sm:text-5xl md:text-6xl"
          >
            {String(it.value).padStart(2, "0")}
          </motion.span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-foreground/60 sm:mt-2 sm:text-xs">
            {it.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
