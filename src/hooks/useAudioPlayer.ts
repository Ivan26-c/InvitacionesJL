import { useCallback, useEffect, useRef, useState } from "react";
import { eventoConfig } from "../config/evento.config";
import { assetUrl } from "../utils/assets";

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingRef = useRef(false);
  const mounted = useRef(true);
  const startMusic = useCallback(async () => {
    if (!eventoConfig.musica.archivoMp3 || pendingRef.current) return;
    pendingRef.current = true;
    setError("");
    if (!audioRef.current) {
      const audio = new Audio(assetUrl(eventoConfig.musica.archivoMp3));
      audio.loop = true;
      audio.volume = .55;
      audio.addEventListener("playing", () => { if (mounted.current) setIsPlaying(true); });
      audio.addEventListener("pause", () => { if (mounted.current) setIsPlaying(false); });
      audio.addEventListener("error", () => {
        if (mounted.current) { setIsPlaying(false); setError("No pudimos reproducir la canción. Inténtalo de nuevo."); }
      });
      audioRef.current = audio;
    }
    try {
      await audioRef.current.play();
    } catch {
      if (mounted.current) { setIsPlaying(false); setError("No pudimos reproducir la canción. Inténtalo de nuevo."); }
    } finally { pendingRef.current = false; }
  }, []);
  const toggleMusic = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) audioRef.current.pause();
    else void startMusic();
  }, [startMusic]);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; audioRef.current?.pause(); };
  }, []);
  return { isPlaying, toggleMusic, error };
}
