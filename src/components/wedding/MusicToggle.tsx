interface Props {
  playing: boolean;
  onToggle: (playing: boolean) => void;
}

export function MusicToggle({ playing, onToggle }: Props) {
  return (
    <button
      type="button"
      aria-label={playing ? "Couper la musique" : "Activer la musique"}
      onClick={() => onToggle(!playing)}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:scale-110"
      style={{
        borderColor: "oklch(0.78 0.13 80 / 0.7)",
        background: "oklch(0.985 0.012 85 / 0.7)",
        boxShadow: "0 4px 20px oklch(0.62 0.14 70 / 0.3)",
        color: "oklch(0.62 0.14 70)",
      }}
    >
      {playing ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 12 21 7.5 19.5 6 15 10.5 10.5 6 9 7.5 13.5 12 9 16.5 10.5 18 15 13.5 19.5 18 21 16.5 16.5 12zM3 9v6h4l5 5V4L7 9H3z" />
        </svg>
      )}
    </button>
  );
}
