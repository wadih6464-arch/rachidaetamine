import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BallProps {
  value: string;
  label: string;
  delay?: number;
}

function ScratchBall({ value, label, delay = 0 }: BallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const grad = ctx.createRadialGradient(w * 0.35, h * 0.3, 4, w / 2, h / 2, w / 1.4);
    grad.addColorStop(0, "#f5e3a8");
    grad.addColorStop(0.5, "#c9a04c");
    grad.addColorStop(1, "#7a5a22");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 240, 200, 0.18)";
    for (let y = 0; y < h; y += 10) {
      for (let x = 0; x < w; x += 10) {
        ctx.beginPath();
        ctx.arc(x, y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = "rgba(60, 35, 10, 0.7)";
    ctx.font = "italic 500 14px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Grattez", w / 2, h / 2);
  }, []);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 28;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();
    lastPoint.current = { x, y };
  };

  const checkReveal = () => {
    if (revealed) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 80) {
      total++;
      if (data[i] === 0) cleared++;
    }
    if (cleared / total > 0.5) setRevealed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center"
    >
      <div
        className="relative h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40"
        style={{
          filter: "drop-shadow(0 12px 24px oklch(0.62 0.14 70 / 0.4))",
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, oklch(0.99 0.02 85), oklch(0.95 0.04 85) 60%, oklch(0.88 0.06 80))",
            border: "1px solid oklch(0.78 0.13 80 / 0.5)",
          }}
        >
          <span className="font-body text-3xl font-semibold tabular-nums text-gradient-gold sm:text-5xl md:text-6xl">
            {value}
          </span>
        </div>

        <AnimatePresence>
          {revealed && (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                    x: (Math.random() - 0.5) * 160,
                    y: (Math.random() - 0.5) * 160,
                  }}
                  transition={{
                    duration: 1.6,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                  }}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "oklch(0.92 0.09 85)",
                    boxShadow: "0 0 12px oklch(0.78 0.13 80)",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full cursor-grab touch-none rounded-full"
              onPointerDown={(e) => {
                drawing.current = true;
                (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
                const p = getPos(e);
                lastPoint.current = p;
                scratch(p.x, p.y);
              }}
              onPointerMove={(e) => {
                if (!drawing.current) return;
                const p = getPos(e);
                scratch(p.x, p.y);
              }}
              onPointerUp={() => {
                drawing.current = false;
                lastPoint.current = null;
                checkReveal();
              }}
              onPointerLeave={() => {
                drawing.current = false;
                lastPoint.current = null;
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-foreground/55">
        {label}
      </p>
    </motion.div>
  );
}

export function ScratchBalls() {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-8 md:gap-14">
      <ScratchBall value="13" label="Jour" delay={0} />
      <span className="font-script text-2xl text-gradient-gold opacity-70 sm:text-4xl">/</span>
      <ScratchBall value="06" label="Mois" delay={0.15} />
      <span className="font-script text-2xl text-gradient-gold opacity-70 sm:text-4xl">/</span>
      <ScratchBall value="2026" label="Année" delay={0.3} />
    </div>
  );
}
