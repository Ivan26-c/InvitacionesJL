import { useLayoutEffect, useRef, useState } from "react";
import "./EnvelopeLetter.css";

interface EnvelopeLetterProps {
  guestName: string;
}

export function EnvelopeLetter({ guestName }: EnvelopeLetterProps) {
  const [open, setOpen] = useState(false);
  const [sheetHeight, setSheetHeight] = useState(250);
  const sheetRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const element = sheetRef.current;
    if (!element) return;

    const updateHeight = () => setSheetHeight(element.offsetHeight);
    updateHeight();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    return () => observer.disconnect();
  }, [guestName]);

  const stagePaddingTop = open ? Math.max(144, sheetHeight - 128 + 20) : 14;

  return (
    <div className="envelope-letter">
      <p className="letter-prompt">Nuestro Papito te quiere decir algo:</p>

      <div
        className={`envelope-stage ${open ? "is-open" : ""}`}
        style={{ paddingTop: `${stagePaddingTop}px` }}
      >
        <button
          type="button"
          className={`envelope-button ${open ? "is-open" : ""}`}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Guardar carta de José Luis" : "Abrir carta de José Luis"}
        >
          <span className="envelope-box">
            <span className="envelope-back" aria-hidden="true" />

            <span className="envelope-flap" aria-hidden="true">
              <span className="envelope-flap-face envelope-flap-front">
                <svg viewBox="0 0 360 124" preserveAspectRatio="none">
                  <path d="M0 0 L180 120 L360 0 Z" className="flap-surface" />
                  <path d="M1 0 L180 120 L359 0" className="flap-stroke" />
                </svg>
                <span className="envelope-seal">♡</span>
              </span>
              <span className="envelope-flap-face envelope-flap-back">
                <svg viewBox="0 0 360 124" preserveAspectRatio="none">
                  <path d="M0 0 L180 120 L360 0 Z" className="flap-liner" />
                  <path d="M1 0 L180 120 L359 0" className="flap-stroke" />
                </svg>
              </span>
            </span>

            <span className="letter-window">
              <span ref={sheetRef} className="letter-sheet">
                <span className="letter-sheet-border" aria-hidden="true" />
                <span className="letter-sheet-content">
                  <span className="letter-body">
                    Estás Invitado(a) a celebrar conmigo mi cumpleaños:{" "}
                    <strong className="letter-guest">{guestName}</strong>
                  </span>
                </span>
              </span>
            </span>

            <span className="envelope-front" aria-hidden="true">
              <svg viewBox="0 0 360 216" preserveAspectRatio="none">
                <path d="M0 0 L180 122 L0 216 Z" className="pocket-left" />
                <path d="M360 0 L180 122 L360 216 Z" className="pocket-right" />
                <path d="M0 216 L180 106 L360 216 Z" className="pocket-bottom" />
                <path d="M0 0 L180 122 L360 0" className="pocket-seam" />
                <path d="M0 216 L180 106 L360 216" className="pocket-seam" />
              </svg>
            </span>
          </span>
        </button>

        <span className="letter-hint" aria-hidden="true">
          {open ? "Toca el sobre para guardar" : "Toca el sobre para abrir"}
        </span>
      </div>
    </div>
  );
}
