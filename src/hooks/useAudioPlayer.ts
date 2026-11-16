import { useCallback, useEffect, useRef, useState } from "react";
import { eventoConfig } from "../config/evento.config";
import { assetUrl } from "../utils/assets";

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef(false);
  const mounted = useRef(true);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio(assetUrl(eventoConfig.musica.archivoMp3));
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = "auto";
    audio.addEventListener("playing", () => {
      if (mounted.current) {
        setError("");
        setIsPlaying(true);
      }
    });
    audio.addEventListener("pause", () => {
      if (mounted.current) setIsPlaying(false);
    });
    audio.addEventListener("error", () => {
      if (mounted.current) {
        setIsPlaying(false);
        setError("No pudimos reproducir la canción. Inténtalo de nuevo.");
      }
    });
    audioRef.current = audio;
    return audio;
  }, []);

  const startMusic = useCallback(async (silent = false) => {
    if (!eventoConfig.musica.archivoMp3) return false;
    if (!silent) setError("");
    const audio = ensureAudio();
    if (!audio.paused) return true;
    try {
      await audio.play();
      return true;
    } catch {
      if (!silent && mounted.current) {
        setIsPlaying(false);
        setError("No pudimos reproducir la canción. Inténtalo de nuevo.");
      }
      return false;
    }
  }, [ensureAudio]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      userPausedRef.current = true;
      audio.pause();
    } else {
      userPausedRef.current = false;
      void startMusic(false);
    }
  }, [startMusic]);

  useEffect(() => {
    mounted.current = true;
    if (!eventoConfig.musica.archivoMp3) return;

    ensureAudio();

    const gestureEvents = ["touchend", "click", "keydown"] as const;
    const removeListeners = () => {
      for (const type of gestureEvents) {
        window.removeEventListener(type, handleFirstGesture, true);
      }
    };

    const handleFirstGesture = (event: Event) => {
      if (userPausedRef.current) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest(".music-control")) return;
      void startMusic(true).then((started) => {
        if (started) removeListeners();
      });
    };

    for (const type of gestureEvents) {
      window.addEventListener(type, handleFirstGesture, { capture: true, passive: true });
    }

    void startMusic(true).then((started) => {
      if (started) removeListeners();
    });

    return () => {
      mounted.current = false;
      removeListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [ensureAudio, startMusic]);

  return { isPlaying, toggleMusic, error };
}
