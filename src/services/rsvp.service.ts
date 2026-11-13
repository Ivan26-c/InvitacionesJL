import { eventoConfig } from "../config/evento.config";
import type { RsvpPayload } from "../types/invitation.types";

export interface RsvpResponse {
  ok: boolean;
  modo: "google-sheets" | "local-dev";
}

export async function enviarConfirmacion(payload: RsvpPayload): Promise<RsvpResponse> {
  const sheetsUrl = eventoConfig.rsvp.googleSheetsUrl.trim();

  if (sheetsUrl.length > 0) {
    await fetch(sheetsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return { ok: true, modo: "google-sheets" };
  }

  if (!import.meta.env.DEV) throw new Error("Confirmaciones no configuradas");

  try {
    const res = await fetch("/api/confirmaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok && data.ok === true) {
      return { ok: true, modo: "local-dev" };
    }
  } catch {
    throw new Error("No se pudo guardar la confirmación local");
  }

  throw new Error("No se pudo guardar la confirmación local");
}
