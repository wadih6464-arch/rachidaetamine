import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { CurtainIntro } from "@/components/wedding/CurtainIntro";
import { GoldParticles } from "@/components/wedding/GoldParticles";
import { ScratchBalls } from "@/components/wedding/ScratchBalls";
import { Details } from "@/components/wedding/Details";
import { Countdown } from "@/components/wedding/Countdown";
import { MapSection } from "@/components/wedding/MapSection";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { Section } from "@/components/wedding/Section";

export const Route = createFileRoute("/")({
  component: Index,
});

const MUSIC_SRC =
  "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3";

function Index() {
  const [entered, setEntered] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = () => {
    // Create + play audio inside the user gesture to satisfy autoplay policies
    if (!audioRef.current) {
      const a = new Audio(MUSIC_SRC);
      a.loop = true;
      a.volume = 0.35;
      audioRef.current = a;
    }
    audioRef.current
      .play()
      .then(() => setMusicOn(true))
      .catch(() => setMusicOn(false));
    setEntered(true);
  };

  const toggleMusic = (next: boolean) => {
    const a = audioRef.current;
    if (!a) return;
    if (next) {
      a.play().then(() => setMusicOn(true)).catch(() => {});
    } else {
      a.pause();
      setMusicOn(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GoldParticles />

      <CurtainIntro onEnter={handleEnter} />

      {entered && <MusicToggle playing={musicOn} onToggle={toggleMusic} />}

      <div className="relative z-10">
        <Section eyebrow="Save the date" title="Une date à révéler">
          <ScratchBalls />
        </Section>

        <Section eyebrow="Compte à rebours" title="Bientôt l'union">
          <div className="mx-auto max-w-3xl">
            <Countdown />
            <p className="mt-10 text-center font-display text-sm italic text-foreground/60">
              Chaque seconde nous rapproche de ce jour inoubliable
            </p>
          </div>
        </Section>

        <Section eyebrow="Les détails" title="La célébration">
          <Details />
        </Section>

        <Section eyebrow="Le lieu" title="Palais Mimouna Polo">
          <MapSection />
        </Section>
      </div>
    </main>
  );
}
