import { eventoConfig } from "../config/evento.config";

function toCompactUtcString(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function getGoogleCalendarUrl(): string {
  const inicio = eventoConfig.fechaEvento;
  const fin = new Date(inicio.getTime() + eventoConfig.duracionHoras * 60 * 60 * 1000);
  const ubicacionActiva = eventoConfig.ubicaciones.find((u) => u.activa);

  const titulo = `Celebremos sus 70 años — ${eventoConfig.homenajeado.nombreCompleto}`;
  const detalles = `${eventoConfig.homenajeado.encabezado}. "${eventoConfig.homenajeado.pensamiento}"`;
  const lugar = ubicacionActiva
    ? `${ubicacionActiva.lugar}, ${ubicacionActiva.direccion}`
    : "";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: titulo,
    dates: `${toCompactUtcString(inicio)}/${toCompactUtcString(fin)}`,
    details: detalles,
    location: lugar,
    ctz: eventoConfig.zonaHoraria,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
