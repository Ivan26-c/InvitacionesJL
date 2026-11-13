import { eventoConfig } from "../../config/evento.config";
import { Sunburst } from "../ui/CelebrationArt";

export function FooterSection() {
  return <footer className="invitation-footer wrap"><Sunburst /><p>{eventoConfig.cierre.fraseFinal}</p><span>{eventoConfig.cierre.familiaFirma} <span aria-hidden="true">·</span> Con todo nuestro cariño</span></footer>;
}
