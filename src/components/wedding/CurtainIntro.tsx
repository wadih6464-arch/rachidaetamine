import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onEnter: () => void;
}

type Phase = "closed" | "opening" | "revealed";

export function CurtainIntro({ onEnter }: Props) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [hidden, setHidden] = useState(false);

  const handleOpen = () => {
    setPhase("opening");
    onEnter(); // start music inside the user gesture
    // reveal text once curtains have travelled
    setTimeout(() => setPhase("revealed"), 1600);
  };

  const handleContinue = () => {
    setHidden(true);
  };

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: "oklch(0.12 0.04 25)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Invitation text — revealed AFTER curtains open */}
          <AnimatePresence>
            {phase === "revealed" && (
              <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <p
                  className="mb-6 max-w-xs font-display text-[10px] uppercase leading-relaxed tracking-[0.4em] sm:text-xs"
                  style={{ color: "oklch(0.88 0.09 85 / 0.85)" }}
                >
                  Vous êtes cordialement invités à
                  <br />
                  célébrer le mariage de
                </p>
                <div
                  className="flex flex-col items-center gap-1 leading-none"
                  style={{ color: "oklch(0.88 0.09 85)" }}
                >
                  <span className="font-display text-5xl font-light tracking-wide sm:text-6xl">
                    Rachida
                  </span>
                  <span className="font-script text-4xl leading-none opacity-90 sm:text-5xl">
                    &amp;
                  </span>
                  <span className="font-display text-5xl font-light tracking-wide sm:text-6xl">
                    Amine
                  </span>
                </div>
                <div
                  className="my-6 h-px w-32"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.78 0.13 80), transparent)",
                  }}
                />
                <p
                  className="max-w-sm px-4 font-display text-[10px] uppercase leading-relaxed tracking-[0.3em] sm:text-xs"
                  style={{ color: "oklch(0.88 0.09 85 / 0.75)" }}
                >
                  Nous serions ravis de vous inviter à célébrer avec nous le
                  plus beau jour de notre vie. Ce serait un honneur de vous
                  compter parmi nous en ce moment si important.
                </p>
                <button
                  onClick={handleContinue}
                  className="group relative mt-10 overflow-hidden rounded-full border px-10 py-3 font-display text-sm uppercase tracking-[0.3em] transition-all hover:scale-105"
                  style={{
                    borderColor: "oklch(0.78 0.13 80)",
                    color: "oklch(0.92 0.06 85)",
                    background:
                      "linear-gradient(135deg, oklch(0.32 0.12 25 / 0.4), oklch(0.22 0.1 22 / 0.6))",
                    boxShadow: "0 0 30px oklch(0.78 0.13 80 / 0.4)",
                  }}
                >
                  <span className="relative z-10">Découvrir</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left curtain */}
          <motion.div
            className="absolute inset-y-0 left-0 z-20 w-1/2"
            style={{
              background:
                "repeating-linear-gradient(90deg, oklch(0.32 0.12 25), oklch(0.22 0.1 22) 6px, oklch(0.32 0.12 25) 14px), linear-gradient(90deg, oklch(0.18 0.08 22), oklch(0.34 0.13 25) 50%, oklch(0.18 0.08 22))",
              backgroundBlendMode: "multiply",
              boxShadow: "inset -40px 0 80px rgba(0,0,0,0.55)",
            }}
            initial={{ x: 0 }}
            animate={{ x: phase === "closed" ? 0 : "-105%" }}
            transition={{ duration: 2.2, ease: [0.7, 0, 0.3, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 z-20 w-1/2"
            style={{
              background:
                "repeating-linear-gradient(90deg, oklch(0.32 0.12 25), oklch(0.22 0.1 22) 6px, oklch(0.32 0.12 25) 14px), linear-gradient(270deg, oklch(0.18 0.08 22), oklch(0.34 0.13 25) 50%, oklch(0.18 0.08 22))",
              backgroundBlendMode: "multiply",
              boxShadow: "inset 40px 0 80px rgba(0,0,0,0.55)",
            }}
            initial={{ x: 0 }}
            animate={{ x: phase === "closed" ? 0 : "105%" }}
            transition={{ duration: 2.2, ease: [0.7, 0, 0.3, 1] }}
          />

          {/* Closed-state CTA on top of curtains */}
          <AnimatePresence>
            {phase === "closed" && (
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <p
                  className="mb-8 font-script text-3xl sm:text-4xl"
                  style={{ color: "oklch(0.88 0.13 80)" }}
                >
                  Bienvenue
                </p>
                <button
                  onClick={handleOpen}
                  className="group relative overflow-hidden rounded-full border px-10 py-3 font-display text-sm uppercase tracking-[0.3em] transition-all hover:scale-105"
                  style={{
                    borderColor: "oklch(0.78 0.13 80)",
                    color: "oklch(0.92 0.06 85)",
                    background:
                      "linear-gradient(135deg, oklch(0.32 0.12 25 / 0.4), oklch(0.22 0.1 22 / 0.6))",
                    boxShadow: "0 0 30px oklch(0.78 0.13 80 / 0.4)",
                  }}
                >
                  <span className="relative z-10">Ouvrir les rideaux</span>
                </button>
                <p
                  className="mt-6 text-xs tracking-widest"
                  style={{ color: "oklch(0.78 0.06 80 / 0.7)" }}
                >
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
