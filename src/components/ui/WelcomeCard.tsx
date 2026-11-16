import { motion } from "framer-motion";
import { eventoConfig } from "../../config/evento.config";
import type { Invitado } from "../../types/invitation.types";
import { Sunburst } from "./CelebrationArt";
import "./WelcomeCard.css";

interface WelcomeCardProps {
  invitado: Invitado | null;
  onOpen: () => void;
}

export function WelcomeCard({ invitado, onOpen }: WelcomeCardProps) {
  const { homenajeado } = eventoConfig;

  return (
    <motion.div
      className="welcome-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      role="region"
      aria-labelledby="welcome-title"
    >
      <motion.div
        className="welcome-card"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.5 }}
      >
        <span className="welcome-card-frame" aria-hidden="true" />
        <div className="welcome-crest">
          <Sunburst className="welcome-sunburst" />
          <p className="welcome-eyebrow">{homenajeado.edad} años · 28 de noviembre</p>
        </div>

        {invitado && (
          <p className="welcome-guest">Para {invitado.nombreMostrar}</p>
        )}

        <p className="welcome-subtitle">Bienvenid@ a la invitación de</p>
        <h1 id="welcome-title" className="welcome-name">
          {homenajeado.nombreCorto}
        </h1>

        <div className="welcome-ornament" aria-hidden="true">
          <span />
          <i>✧</i>
          <span />
        </div>

        <button
          type="button"
          className="welcome-open-button"
          onClick={onOpen}
        >
          Abrir invitación
        </button>
      </motion.div>
    </motion.div>
  );
}
