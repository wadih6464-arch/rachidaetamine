import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onEnter: () => void;
}

export function CurtainIntro({ onEnter }: Props) {
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleEnter = () => {
    setOpening(true);
    onEnter();
    setTimeout(() => setHidden(true), 2200);
  };

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left curtain */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                "repeating-linear-gradient(90deg, oklch(0.32 0.12 25), oklch(0.22 0.1 22) 6px, oklch(0.32 0.12 25) 14px), linear-gradient(90deg, oklch(0.18 0.08 22), oklch(0.34 0.13 25) 50%, oklch(0.18 0.08 22))",
              backgroundBlendMode: "multiply",
              boxShadow: "inset -40px 0 80px rgba(0,0,0,0.55)",
            }}
            initial={{ x: 0 }}
            animate={{ x: opening ? "-105%" : 0 }}
            transition={{ duration: 2.2, ease: [0.7, 0, 0.3, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              background:
                "repeating-linear-gradient(90deg, oklch(0.32 0.12 25), oklch(0.22 0.1 22) 6px, oklch(0.32 0.12 25) 14px), linear-gradient(270deg, oklch(0.18 0.08 22), oklch(0.34 0.13 25) 50%, oklch(0.18 0.08 22))",
              backgroundBlendMode: "multiply",
              boxShadow: "inset 40px 0 80px rgba(0,0,0,0.55)",
            }}
            initial={{ x: 0 }}
            animate={{ x: opening ? "105%" : 0 }}
            transition={{ duration: 2.2, ease: [0.7, 0, 0.3, 1] }}
          />

          {/* Center pelmet & button */}
          <AnimatePresence>
            {!opening && (
              <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <p className="font-script text-5xl text-gold-soft sm:text-6xl" style={{ color: "oklch(0.88 0.09 85)" }}>
                  Safa &amp; Mehdi
                </p>
                <div className="my-6 h-px w-32" style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.13 80), transparent)" }} />
                <p className="font-display text-sm uppercase tracking-[0.4em]" style={{ color: "oklch(0.88 0.09 85)" }}>
                  Une invitation royale
                </p>
                <button
                  onClick={handleEnter}
                  className="group mt-10 relative overflow-hidden rounded-full border px-10 py-3 font-display text-sm uppercase tracking-[0.3em] transition-all hover:scale-105"
                  style={{
                    borderColor: "oklch(0.78 0.13 80)",
                    color: "oklch(0.92 0.06 85)",
                    background: "linear-gradient(135deg, oklch(0.32 0.12 25 / 0.4), oklch(0.22 0.1 22 / 0.6))",
                    boxShadow: "0 0 30px oklch(0.78 0.13 80 / 0.4)",
                  }}
                >
                  <span className="relative z-10">Entrer</span>
                </button>
                <p className="mt-6 text-xs tracking-widest" style={{ color: "oklch(0.78 0.06 80 / 0.7)" }}>
                  ♪ avec musique douce
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
