import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { eventoConfig } from "../../config/evento.config";
import { assetUrl } from "../../utils/assets";

export function GallerySection() {
  const { galeria } = eventoConfig;
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  if (!galeria.fotos.length) return null;
  function move(direction: number) {
    setActive(index => (index + direction + galeria.fotos.length) % galeria.fotos.length);
  }
  const photo = galeria.fotos[active];
  return <section className="gallery-section wrap" aria-labelledby="gallery-title">
    <div className="gallery-heading"><p className="eyebrow">Nuestro pequeño álbum</p><h2 id="gallery-title">{galeria.titulo}</h2><p>{galeria.subtitulo}</p></div>
    <div className="photo-grid">{galeria.fotos.map((foto, index) => <button key={foto.archivo} className="photo-card" aria-label={`Ampliar: ${foto.titulo}`} onClick={() => { setActive(index); dialog.current?.showModal(); }}><img src={assetUrl(foto.archivo)} alt={foto.titulo} loading="lazy" /><span>{foto.titulo}</span></button>)}</div>
    <dialog ref={dialog} className="photo-dialog" aria-label="Álbum de recuerdos" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); }}>
      <button className="dialog-close" aria-label="Cerrar foto" onClick={() => dialog.current?.close()}><X size={22} /></button>
      <figure><img src={assetUrl(photo.archivo)} alt={photo.titulo} /><figcaption>{photo.titulo}</figcaption></figure>
      {galeria.fotos.length > 1 && <div className="gallery-controls"><button onClick={() => move(-1)}><ChevronLeft size={18} /> Anterior</button><span>{active + 1} / {galeria.fotos.length}</span><button onClick={() => move(1)}>Siguiente <ChevronRight size={18} /></button></div>}
    </dialog>
  </section>;
}
