import { motion } from "framer-motion";

const items = [
  {
    icon: "❖",
    label: "La date",
    main: "Samedi",
    sub: "13 Juin 2026",
  },
  {
    icon: "✦",
    label: "L'heure",
    main: "À partir",
    sub: "de 17h00",
  },
  {
    icon: "❀",
    label: "Le lieu",
    main: "Palais Mimouna Polo",
    sub: "2 Rue de la Loire",
  },
];

export function Details() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.15 }}
          className="group relative overflow-hidden rounded-2xl border bg-card/70 p-8 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-gold"
          style={{ borderColor: "oklch(0.78 0.13 80 / 0.5)" }}
        >
          {/* Corner ornaments */}
          {[
            "top-2 left-2",
            "top-2 right-2 rotate-90",
            "bottom-2 left-2 -rotate-90",
            "bottom-2 right-2 rotate-180",
          ].map((c, k) => (
            <span key={k} className={`absolute ${c} text-xs`} style={{ color: "oklch(0.78 0.13 80 / 0.7)" }}>
              ⌐
            </span>
          ))}

          <div className="text-3xl text-gradient-gold animate-shimmer">{it.icon}</div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-foreground/50">
            {it.label}
          </p>
          <h3 className="mt-4 font-script text-4xl text-gradient-gold">{it.main}</h3>
          <p className="mt-1 font-display text-lg tracking-wide text-foreground/80">{it.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
