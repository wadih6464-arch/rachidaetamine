export function MapSection() {
  const query = encodeURIComponent("Palais Mimouna Polo, 2 Rue de la Loire");
  const embed = `https://www.google.com/maps?q=${query}&output=embed`;
  const link = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <div className="mx-auto max-w-4xl">
      <div
        className="relative overflow-hidden rounded-2xl border shadow-soft"
        style={{ borderColor: "oklch(0.78 0.13 80 / 0.6)" }}
      >
        <iframe
          src={embed}
          title="Palais Mimouna Polo"
          loading="lazy"
          className="h-[380px] w-full sm:h-[460px]"
          style={{ border: 0, filter: "saturate(0.85) sepia(0.1)" }}
          allowFullScreen
        />
      </div>
      <div className="mt-6 text-center">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 rounded-full px-8 py-3 font-display text-sm uppercase tracking-[0.3em] text-cream transition-all hover:scale-105"
          style={{
            background: "var(--gradient-gold)",
            color: "oklch(0.985 0.012 85)",
            boxShadow: "var(--shadow-gold)",
          }}
        >
          Itinéraire
          <span>→</span>
        </a>
      </div>
    </div>
  );
}
