import { motion } from "framer-motion";
import { eventoConfig } from "../../config/evento.config";
import type { Invitado } from "../../types/invitation.types";
import { EnvelopeLetter } from "../ui/EnvelopeLetter";
import { SeatedPortrait } from "../ui/SeatedPortrait";
import "./LocationsSection.css";

export function LocationsSection({ invitado }: { invitado: Invitado | null }) {
  const { homenajeado } = eventoConfig;
  return <section id="encuentro" className="gathering gathering-celebration" tabIndex={-1} aria-labelledby="gathering-title">
    <motion.header className="gathering-quote wrap" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6 }}>
      <span className="gathering-quote-mark" aria-hidden="true">“</span>
      <h2 id="gathering-title">Su alegría nos sigue reuniendo.<br />Celebremos sus <em>70 años</em> como más le gustaba: juntos.</h2>
      <p>{homenajeado.pensamiento}.</p>
    </motion.header>
    <div className="wrap gathering-scene">
      <motion.figure className="gathering-portrait" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .8 }}>
        <span className="portrait-spark portrait-spark-one" aria-hidden="true">✧</span>
        <SeatedPortrait />
        <span className="portrait-spark portrait-spark-two" aria-hidden="true">✧</span>
      </motion.figure>
      <motion.div className="gathering-letter" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .6 }}>
        <EnvelopeLetter guestName={invitado?.nombreMostrar ?? "(Nombre)"} />
      </motion.div>
    </div>
    <svg className="gathering-bottom-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
      <path className="wave-shadow" d="M0 66 Q190 97 390 59 T750 65 T1110 63 T1440 53 V100 H0Z" />
      <path d="M0 76 C150 103 300 44 480 57 S720 101 920 70 S1220 49 1440 68 L1440 100 H0Z" />
    </svg>
  </section>;
}
