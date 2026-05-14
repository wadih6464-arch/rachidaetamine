import { motion } from "framer-motion";
import heroImg from "@/assets/hero.jpg";
import { Monogram } from "./Monogram";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background image with veil */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.985 0.012 85 / 0.55), oklch(0.985 0.012 85 / 0.85) 60%, oklch(0.985 0.012 85))",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="flex flex-col items-center text-center"
      >
        <Monogram size={140} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-6 font-display text-xs uppercase tracking-[0.5em] text-foreground/60"
        >
          Mariage
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="mt-4 flex flex-col items-center gap-2 leading-none text-gradient-gold"
        >
          <span className="font-display text-6xl font-light tracking-wide sm:text-7xl md:text-8xl">Rachida</span>
          <span className="font-script text-4xl opacity-80 sm:text-5xl md:text-6xl">and</span>
          <span className="font-display text-6xl font-light tracking-wide sm:text-7xl md:text-8xl">Amine</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="gold-divider my-8 w-48 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="max-w-xl font-display text-lg italic leading-relaxed text-foreground/80 sm:text-xl"
        >
          Ont l'immense joie de vous inviter à célébrer leur mariage
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2 text-foreground/50"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-10 w-px"
            style={{ background: "linear-gradient(180deg, oklch(0.78 0.13 80), transparent)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
