import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ScratchCard() {
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

    // Gold scratch surface
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#e9d28a");
    grad.addColorStop(0.5, "#c9a04c");
    grad.addColorStop(1, "#8a6a2a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Pattern overlay
    ctx.fillStyle = "rgba(255, 240, 200, 0.18)";
    for (let y = 0; y < h; y += 14) {
      for (let x = 0; x < w; x += 14) {
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Text
    ctx.fillStyle = "rgba(60, 35, 10, 0.85)";
    ctx.font = "italic 500 22px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Grattez pour découvrir la date", w / 2, h / 2 - 12);
    ctx.font = "300 11px 'Jost', sans-serif";
    ctx.fillStyle = "rgba(60, 35, 10, 0.55)";
    ctx.letterSpacing = "0.4em";
    ctx.fillText("✦  S  &  M  ✦", w / 2, h / 2 + 18);
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
    ctx.lineWidth = 36;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    lastPoint.current = { x, y };
  };

  const checkReveal = () => {
    if (revealed) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 80) {
      if (data[i] === 0) cleared++;
    }
    const ratio = cleared / (data.length / 80);
    if (ratio > 0.55) setRevealed(true);
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* The reveal underneath */}
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border bg-gradient-ivory px-6 py-12 text-center shadow-soft"
        style={{ borderColor: "oklch(0.78 0.13 80 / 0.5)", aspectRatio: "1.6 / 1" }}
      >
        <p className="font-display text-xs uppercase tracking-[0.4em] text-foreground/60">
          Save the date
        </p>
        <p className="mt-3 font-script text-5xl text-gradient-gold sm:text-6xl">
          Samedi
        </p>
        <p className="mt-1 font-display text-3xl tracking-wider text-gradient-gold sm:text-4xl">
          13 Juin 2026
        </p>

        {/* Sparkles after reveal */}
        <AnimatePresence>
          {revealed && (
            <>
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                    x: (Math.random() - 0.5) * 280,
                    y: (Math.random() - 0.5) * 200,
                  }}
                  transition={{ duration: 1.6, delay: i * 0.04, repeat: Infinity, repeatDelay: 1.5 }}
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

        {/* Scratch canvas overlay */}
        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full cursor-grab touch-none rounded-2xl"
              onPointerDown={(e) => {
                drawing.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
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
            />
          )}
        </AnimatePresence>
      </div>
      <p className="mt-6 text-center text-xs uppercase tracking-[0.35em] text-foreground/50">
        ✦ Une date à graver dans vos cœurs ✦
      </p>
    </div>
  );
}
