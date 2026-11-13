import { useEffect, useState } from "react";

export interface TiempoRestante {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  yaInicio: boolean;
}

function calcularTiempo(objetivo: Date): TiempoRestante {
  const diff = objetivo.getTime() - Date.now();
  if (diff <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, yaInicio: true };
  }

  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
    yaInicio: false,
  };
}

export function useCountdown(fechaObjetivo: Date): TiempoRestante {
  const [tiempo, setTiempo] = useState<TiempoRestante>(() =>
    calcularTiempo(fechaObjetivo),
  );

  useEffect(() => {
    setTiempo(calcularTiempo(fechaObjetivo));
    const timer = window.setInterval(() => {
      setTiempo(calcularTiempo(fechaObjetivo));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [fechaObjetivo]);

  return tiempo;
}
