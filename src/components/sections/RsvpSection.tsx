import { motion } from "framer-motion";
import { ArrowUpRight, CalendarPlus, CheckCircle2, Loader2, MapPin, X } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { eventoConfig } from "../../config/evento.config";
import { useCountdown } from "../../hooks/useCountdown";
import { getGoogleCalendarUrl } from "../../services/calendar.service";
import { enviarConfirmacion, type RsvpResponse } from "../../services/rsvp.service";
import type { Invitado } from "../../types/invitation.types";

export function RsvpSection({ invitado }: { invitado: Invitado | null }) {
  const { fechaEvento, zonaHoraria } = eventoConfig;
  const lugar = eventoConfig.ubicaciones.find((item) => item.activa);
  const time = useCountdown(fechaEvento);
  const weekday = new Intl.DateTimeFormat("es", { weekday: "long", timeZone: zonaHoraria }).format(fechaEvento);
  const date = new Intl.DateTimeFormat("es", { day: "numeric", month: "long", timeZone: zonaHoraria }).format(fechaEvento);
  const year = new Intl.DateTimeFormat("es", { year: "numeric", timeZone: zonaHoraria }).format(fechaEvento);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [asistira, setAsistira] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [mode, setMode] = useState<RsvpResponse["modo"]>();

  const configured = Boolean(eventoConfig.rsvp.googleSheetsUrl.trim());
  const available = configured || import.meta.env.DEV;

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (estado === "sending" || !available) return;
    setEstado("sending");
    try {
      const result = await enviarConfirmacion({
        codigo: invitado?.codigo ?? "GENERICO",
        nombre: invitado?.nombreMostrar ?? "Invitado",
        asistira,
        pasesConfirmados: asistira ? (invitado?.pases ?? 1) : 0,
        mensaje: mensaje.trim(),
      });
      setMode(result.modo);
      setEstado("sent");
    } catch {
      setEstado("error");
    }
  }

  return (
    <section id="confirmar" className="rsvp-section wrap" tabIndex={-1} aria-labelledby="rsvp-title">
      <div className="rsvp-intro">
        <p className="eyebrow">Tu compañía es el mejor regalo</p>
        <h2 id="rsvp-title">
          ¿Nos
          <br />
          <em>acompañas?</em>
        </h2>
      </div>

      <motion.div
        className="rsvp-event-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <div className="event-note">
          <p className="eyebrow">Guarda este día</p>
          <div className="event-when">
            <span className="event-weekday">{weekday}</span>
            <h3>{date}</h3>
            <p>
              {year} <span>·</span> {lugar?.hora ?? "1:00 p. m."}
            </p>
          </div>
          {lugar && (
            <div className="event-where">
              <MapPin size={22} strokeWidth={1.5} />
              <div>
                <h4>{lugar.lugar}</h4>
                <p>{lugar.direccion}</p>
              </div>
            </div>
          )}
          <div className="event-actions">
            <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer">
              <CalendarPlus size={16} /> Agendar
            </a>
            {lugar?.mapsUrl && (
              <a href={lugar.mapsUrl} target="_blank" rel="noopener noreferrer">
                Cómo llegar <ArrowUpRight size={16} />
              </a>
            )}
          </div>
          <div className="countdown" aria-label="Tiempo para el encuentro">
            {time.yaInicio ? (
              <p>El día de reunirnos ha llegado ♡</p>
            ) : (
              <>
                <span className="countdown-intro">NOS VEMOS EN</span>
                <div>
                  {[
                    [time.dias, "días"],
                    [time.horas, "hrs"],
                    [time.minutos, "min"],
                    [time.segundos, "seg"],
                  ].map(([value, label]) => (
                    <span className="countdown-unit" key={label}>
                      <strong>{String(value).padStart(2, "0")}</strong>
                      <small>{label}</small>
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <div className="rsvp-actions">
        <button
          type="button"
          className="button button-olive rsvp-open-button"
          onClick={() => dialogRef.current?.showModal()}
        >
          Confirmar Asistencia
          <ArrowUpRight size={17} />
        </button>
        {estado === "sent" && (
          <p className="rsvp-sent-note" role="status">
            ✓ Confirmación enviada
          </p>
        )}
        <div className="rsvp-doodle" aria-hidden="true">
          ¡Te esperamos! ♡
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="rsvp-dialog"
        aria-labelledby="rsvp-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <button
          type="button"
          className="dialog-close"
          aria-label="Cerrar confirmación"
          onClick={() => dialogRef.current?.close()}
        >
          <X size={20} />
        </button>

        <div className="rsvp-dialog-mark" aria-hidden="true">
          ♡
        </div>
        <h3 id="rsvp-dialog-title" className="rsvp-dialog-title">
          Confirmar Asistencia
        </h3>

        {estado === "sent" ? (
          <div className="rsvp-success" role="status">
            <CheckCircle2 size={32} strokeWidth={1.3} />
            <h4>{asistira ? "¡Qué alegría contar contigo!" : "Gracias por avisarnos."}</h4>
            <p>
              {mode === "local-dev"
                ? "Respuesta de prueba guardada en este proyecto."
                : "Tu respuesta se ha enviado."}{" "}
              {asistira
                ? "Nos vemos para compartir este día."
                : "Te enviamos un abrazo con mucho cariño."}
            </p>
            <div className="rsvp-success-actions">
              <button
                type="button"
                className="text-button"
                onClick={() => setEstado("idle")}
              >
                Cambiar mi respuesta
              </button>
              <button
                type="button"
                className="rsvp-submit-pill"
                onClick={() => dialogRef.current?.close()}
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={submit}>
            <fieldset>
              <legend>¿Asistes a la celebración? *</legend>
              <div className="attendance-options">
                <label>
                  <input
                    type="radio"
                    name="attendance"
                    checked={asistira}
                    onChange={() => setAsistira(true)}
                  />{" "}
                  Sí, asistiré
                </label>
                <label>
                  <input
                    type="radio"
                    name="attendance"
                    checked={!asistira}
                    onChange={() => setAsistira(false)}
                  />{" "}
                  No asistiré
                </label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="guest-message">Mensaje para la familia (opcional)</label>
              <textarea
                id="guest-message"
                rows={3}
                maxLength={1000}
                value={mensaje}
                onChange={(event) => setMensaje(event.target.value)}
                placeholder="Puedes dejarle un mensaje de cariño..."
              />
            </div>

            {estado === "error" && (
              <p className="form-error" role="alert">
                No pudimos enviar tu respuesta. Inténtalo de nuevo o comunícate con la familia.
              </p>
            )}

            <div className="rsvp-form-actions">
              <button
                type="submit"
                className="rsvp-submit-pill"
                disabled={estado === "sending" || !available}
              >
                {estado === "sending" ? (
                  <>
                    <Loader2 className="animate-spin" size={16} /> Enviando...
                  </>
                ) : (
                  "Enviar confirmación"
                )}
              </button>
            </div>

            {!available && (
              <p className="form-note">
                Por ahora, confirma tu asistencia directamente con la familia.
              </p>
            )}
          </form>
        )}
      </dialog>
    </section>
  );
}
