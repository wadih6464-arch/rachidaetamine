import { motion } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
}

export function Monogram({ size = 180, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`relative inline-block animate-glow ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <linearGradient id="goldgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.92 0.07 85)" />
            <stop offset="50%" stopColor="oklch(0.78 0.13 80)" />
            <stop offset="100%" stopColor="oklch(0.6 0.14 70)" />
          </linearGradient>
        </defs>
        {/* Outer ornate circle */}
        <motion.circle
          cx="100" cy="100" r="92"
          fill="none"
          stroke="url(#goldgrad)"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100" cy="100" r="86"
          fill="none"
          stroke="url(#goldgrad)"
          strokeWidth="1.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
        {/* 8-point ornament */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          const x1 = 100 + Math.cos(a) * 78;
          const y1 = 100 + Math.sin(a) * 78;
          const x2 = 100 + Math.cos(a) * 86;
          const y2 = 100 + Math.sin(a) * 86;
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="url(#goldgrad)" strokeWidth="0.8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.04 }}
            />
          );
        })}
        {/* SM letters */}
        <motion.text
          x="100" y="118"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontSize="72"
          fontWeight="500"
          fill="url(#goldgrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ letterSpacing: "0.05em" }}
        >
          S<tspan dx="-6" fontSize="50" baselineShift="-4" fontStyle="italic">&amp;</tspan><tspan dx="-2">M</tspan>
        </motion.text>
      </svg>
    </motion.div>
  );
}
