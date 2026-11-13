import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { type CSSProperties, useState } from "react";
import { eventoConfig } from "../../config/evento.config";
import { scrollToSection } from "../../utils/scroll";
import { PhotoCover } from "../ui/PhotoCover";
import "./HeroSection.css";

export function HeroSection() {
  const { homenajeado, fechaEvento, zonaHoraria } = eventoConfig;
  const [photoError, setPhotoError] = useState(false);
  const hasPhoto = Boolean(homenajeado.fotoPrincipal) && !photoError;
  const date = new Intl.DateTimeFormat("es", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: zonaHoraria }).format(fechaEvento).replace(/\//g, ".");
  return <section className={`invitation-cover ${hasPhoto ? "" : "cover-without-photo"}`} aria-labelledby="hero-title">
    {hasPhoto && <PhotoCover src={homenajeado.fotoPrincipal} name={homenajeado.nombreCompleto} cutout={homenajeado.recortarSilueta} onError={() => setPhotoError(true)} />}
    <div className="cover-shade" aria-hidden="true" />
    <div className="cover-decorations" aria-hidden="true">
      {[ [8, 23, 34], [85, 18, 47], [17, 71, 58], [90, 65, 32], [30, 12, 20], [73, 82, 24] ].map(([x, y, size], i) =>
        <span key={i} className="cover-bubble" style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, "--delay": `${-i * 2}s` } as CSSProperties} />)}
      {[ [12, 48], [80, 37], [23, 83], [92, 77], [64, 13] ].map(([x, y], i) =>
        <span key={i} className="cover-glimmer" style={{ left: `${x}%`, top: `${y}%`, "--delay": `${-i * 1.7}s` } as CSSProperties}>✧</span>)}
    </div>
    <motion.div className="cover-lettering" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1 }}>
      <p className="cover-date">{date}</p>
      <div className="cover-name-sticker">
        <h1 id="hero-title">{homenajeado.nombreCorto}</h1>
        <p className="cover-small-caption">Su alegría nos reúne</p>
      </div>
      <div className="cover-age-sticker" aria-label={`${homenajeado.edad} años`}>
        <span className="cover-age-number">{homenajeado.edad}</span>
        <span className="cover-age-word">AÑOS</span>
      </div>
    </motion.div>
    <button className="cover-scroll" aria-label="Ver los detalles del encuentro" onClick={() => scrollToSection("encuentro")}><ChevronDown size={24} strokeWidth={1.5} /></button>
  </section>;
}
