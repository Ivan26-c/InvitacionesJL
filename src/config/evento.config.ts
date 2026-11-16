import type { FotoGaleria, UbicacionEvento } from "../types/invitation.types";

export const eventoConfig = {
  homenajeado: {
    nombreCompleto: "José Luis Quezada Céspedes",
    nombreCorto: "José Luis",
    apellidos: "Quezada Céspedes",
    iniciales: "JL",
    edad: 70,
    encabezado: "Celebremos su vida",
    pensamiento: "Ven acompañanos como a él le gustaba celebrar",
    fotoPrincipal: "images/jose-luis-portada-panoramica.jpg",
    recortarSilueta: true,
  },
  fechaEvento: new Date("2026-11-28T13:00:00-05:00"),
  zonaHoraria: "America/Lima",
  duracionHoras: 5,
  ubicaciones: [{
    id: "reunion",
    activa: true,
    etiqueta: "El encuentro",
    titulo: "Nos vemos en casa",
    hora: "1:00 p. m.",
    lugar: "AA.HH. Las Capullanas",
    direccion: "Mz D lote 12",
    mapsUrl: "https://maps.app.goo.gl/HsBxvp9tuBnJgekq9",
    imagen: "",
  }] satisfies UbicacionEvento[],
  galeria: {
    titulo: "Momentos que nos hacen sonreír",
    subtitulo: "Porque las mejores historias se vuelven a contar juntos.",
    fotos: [] as FotoGaleria[],
  },
  musica: {
    archivoMp3: "audio/musica.mp3",
  },
  rsvp: {
    googleSheetsUrl:
      "https://script.google.com/macros/s/AKfycbyz7Dny6A6DHU1gqjCm6KAemBYq2QaBEuV3R62yV4WxVdUhB7l8_HETMVzimU-742PAcg/exec",
    fechaLimiteTexto: "Cuéntanos si podrás venir para preparar este día juntos.",
    maxPasesGenericos: 5,
  },
  organizador: { pinAcceso: "2026", urlPublicaBase: "https://ivan26-c.github.io/InvitacionesJL" },
  cierre: {
    fraseFinal: "Qué bonito seguir reuniéndonos por ti.",
    familiaFirma: "Familia Quezada",
  },
};
