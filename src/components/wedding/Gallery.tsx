import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";

const slides = [
  { src: g1, alt: "Table de mariage marocaine" },
  { src: g2, alt: "Cour de palais marocain" },
  { src: g3, alt: "Bijou marocain doré" },
  { src: g4, alt: "Lanternes dorées" },
  { src: g5, alt: "Bouquet de roses ivoire" },
];

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} className="min-w-0 flex-[0_0_85%] px-2 sm:flex-[0_0_55%] md:flex-[0_0_40%]">
              <div
                className="relative overflow-hidden rounded-2xl border shadow-soft"
                style={{ borderColor: "oklch(0.78 0.13 80 / 0.5)", aspectRatio: "4/5" }}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0" style={{
                  background: "linear-gradient(180deg, transparent 60%, oklch(0.22 0.03 60 / 0.45))",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Précédent"
          className="flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-110"
          style={{ borderColor: "oklch(0.78 0.13 80)", color: "oklch(0.62 0.14 70)" }}
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Suivant"
          className="flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-110"
          style={{ borderColor: "oklch(0.78 0.13 80)", color: "oklch(0.62 0.14 70)" }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
