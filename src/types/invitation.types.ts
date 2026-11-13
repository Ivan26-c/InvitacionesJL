export interface Invitado {
  codigo: string;
  nombreMostrar: string;
  etiqueta?: string;
  pases: number;
  plural: boolean;
}

export interface UbicacionEvento {
  id: string;
  activa: boolean;
  etiqueta: string;
  titulo: string;
  hora: string;
  lugar: string;
  direccion: string;
  referencia?: string;
  mapsUrl: string;
  imagen: string;
}

export interface FotoGaleria {
  archivo: string;
  titulo: string;
  epoca?: string;
}

export interface RsvpPayload {
  codigo: string;
  nombre: string;
  asistira: boolean;
  pasesConfirmados: number;
  mensaje: string;
}
