import {
  ArrowLeft,
  Check,
  Copy,
  Eye,
  Lock,
  MessageCircle,
  Search,
  Users,
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { eventoConfig } from "../config/evento.config";
import invitadosData from "../data/invitados.json";
import type { Invitado } from "../types/invitation.types";

const invitados = invitadosData as Invitado[];

export function AdminLinksPage() {
  const [unlocked, setUnlocked] = useState<boolean>(() => import.meta.env.DEV);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [copiadoCodigo, setCopiadoCodigo] = useState<string | null>(null);

  const baseUrl = useMemo(() => {
    if (eventoConfig.organizador.urlPublicaBase.trim()) {
      return eventoConfig.organizador.urlPublicaBase
        .trim()
        .replace(/\/+$/, "");
    }
    const { origin, pathname } = window.location;
    return `${origin}${pathname.replace(/\/+$/, "")}`;
  }, []);

  const construirLink = (codigo: string) => `${baseUrl}/?i=${codigo}`;

  const construirTextoWhatsApp = (inv: Invitado) => {
    const saludo = inv.plural
      ? `Estimados *${inv.nombreMostrar}*`
      : `Estimado(a) *${inv.nombreMostrar}*`;
    const link = construirLink(inv.codigo);

    return `${saludo}, con mucho cariño queremos invitarles a acompañarnos para celebrar la vida y los ${eventoConfig.homenajeado.edad} años de nuestro querido padre *${eventoConfig.homenajeado.nombreCompleto}*.\n\nIngresa a tu invitación personal aquí:\n${link}`;
  };

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return invitados;
    return invitados.filter(
      (i) =>
        i.nombreMostrar.toLowerCase().includes(q) ||
        i.codigo.toLowerCase().includes(q),
    );
  }, [busqueda]);

  const totalPases = useMemo(
    () => invitados.reduce((acc, item) => acc + item.pases, 0),
    [],
  );

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === eventoConfig.organizador.pinAcceso) {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const copiarLink = async (codigo: string) => {
    await navigator.clipboard.writeText(construirLink(codigo));
    setCopiadoCodigo(codigo);
    setTimeout(() => setCopiadoCodigo(null), 2000);
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
        <form
          onSubmit={handleUnlock}
          className="w-full max-w-sm rounded-2xl bg-ivory-card border border-sand p-8 text-center shadow-editorial space-y-4"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-gold-soft border border-sand flex items-center justify-center text-gold-dark">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-2xl text-navy font-semibold">
            Panel del Organizador
          </h1>
          <p className="text-xs text-navy-muted">
            Ingresa el PIN configurado en <code>evento.config.ts</code>
          </p>
          <input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="PIN de acceso"
            className="w-full rounded-xl bg-ivory border border-sand px-4 py-2.5 text-center text-sm focus:outline-none focus:border-gold"
          />
          {pinError && (
            <p className="text-xs text-red-600">PIN incorrecto.</p>
          )}
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-navy text-ivory text-sm font-medium hover:bg-navy-deep transition-colors"
          >
            Ingresar
          </button>
          <Link
            to="/"
            className="block text-xs text-navy-muted hover:text-navy underline"
          >
            Volver a la invitación
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-navy py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-gold-dark font-semibold hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Invitación Genérica</span>
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-navy">
              Directorio de Invitados y Enlaces
            </h1>
            <p className="text-sm text-navy-muted mt-1">
              Edita la lista en <code>src/data/invitados.json</code> y ejecuta{" "}
              <code>npm run generar-codigos</code> para crear códigos nuevos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-ivory-card border border-sand px-4 py-3 text-center">
              <div className="font-serif text-2xl font-semibold text-navy">
                {invitados.length}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-navy-muted">
                Links únicos
              </div>
            </div>
            <div className="rounded-xl bg-ivory-card border border-sand px-4 py-3 text-center">
              <div className="font-serif text-2xl font-semibold text-gold-dark">
                {totalPases}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-navy-muted">
                Total pases
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-navy-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar invitado por nombre o código..."
            className="w-full rounded-xl bg-ivory-card border border-sand pl-11 pr-4 py-3 text-sm text-navy focus:outline-none focus:border-gold shadow-sm"
          />
        </div>

        <div className="space-y-3">
          {filtrados.map((inv) => {
            const link = construirLink(inv.codigo);
            const waUrl = `https://wa.me/?text=${encodeURIComponent(
              construirTextoWhatsApp(inv),
            )}`;

            return (
              <div
                key={inv.codigo}
                className="rounded-xl bg-ivory-card border border-sand p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-navy text-gold-light font-semibold">
                      {inv.codigo}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-navy">
                      {inv.nombreMostrar}
                    </h2>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-navy-muted">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gold" />
                      {inv.pases} {inv.pases === 1 ? "pase" : "pases"} (
                      {inv.plural ? "Plural" : "Singular"})
                    </span>
                    <span className="truncate max-w-xs sm:max-w-md font-mono text-[11px] opacity-75">
                      {link}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to={`/${inv.codigo}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-sand-dark text-xs font-medium text-navy hover:border-navy transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Probar</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => copiarLink(inv.codigo)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-sand-dark text-xs font-medium text-navy hover:border-navy transition-colors"
                  >
                    {copiadoCodigo === inv.codigo ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-ivory text-xs font-medium hover:bg-navy-deep transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-gold-light" />
                    <span>Enviar WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
