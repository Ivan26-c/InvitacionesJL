import { AnimatePresence, MotionConfig } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { LocationsSection } from "../components/sections/LocationsSection";
import { GallerySection } from "../components/sections/GallerySection";
import { RsvpSection } from "../components/sections/RsvpSection";
import { FooterSection } from "../components/sections/FooterSection";
import { WelcomeCard } from "../components/ui/WelcomeCard";
import { eventoConfig } from "../config/evento.config";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useGuest } from "../hooks/useGuest";
import { scrollToSection } from "../utils/scroll";

export function InvitationPage() {
  const { invitado } = useGuest();
  const { isPlaying, toggleMusic, startMusic, error } = useAudioPlayer();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "";
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [opened]);

  const handleOpen = () => {
    void startMusic(true);
    setOpened(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="invitation" aria-hidden={!opened}>
        <button className="skip-link" onClick={() => scrollToSection("contenido")}>Ir a la invitación</button>
        <main id="contenido" tabIndex={-1}>
          <HeroSection />
          <div className="invitation-content">
            <svg className="cover-paper-transition" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
              <path className="paper-back" d="M0 66 Q190 97 390 59 T750 65 T1110 63 T1440 53 V100 H0Z" />
              <path className="paper-front" d="M0 76 C150 103 300 44 480 57 S720 101 920 70 S1220 49 1440 68 L1440 100 H0Z" />
              <path className="paper-fiber" d="M0 76 C150 103 300 44 480 57 S720 101 920 70 S1220 49 1440 68" />
            </svg>
            <LocationsSection invitado={invitado} />
            <GallerySection />
            <RsvpSection key={invitado?.codigo ?? "generico"} invitado={invitado} />
          </div>
        </main>
        <div className="invitation-footer-surface"><FooterSection /></div>
        {opened && eventoConfig.musica.archivoMp3 && (
          <div className="music-control">
            {error && <p role="status">{error}</p>}
            <button onClick={toggleMusic} aria-pressed={isPlaying} aria-label={isPlaying ? "Pausar música" : "Reproducir música"}>
              {isPlaying ? <VolumeX size={18} /> : <Music2 size={18} />}
              <span>{isPlaying ? "Pausar" : "Música"}</span>
              <span className={`equalizer ${isPlaying ? "playing" : ""}`} aria-hidden="true"><i /><i /><i /></span>
            </button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {!opened && <WelcomeCard key="welcome" invitado={invitado} onOpen={handleOpen} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
