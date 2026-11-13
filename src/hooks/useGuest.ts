import { useMemo } from "react";
import { useParams } from "react-router-dom";
import invitadosData from "../data/invitados.json";
import type { Invitado } from "../types/invitation.types";

const listaInvitados = invitadosData as Invitado[];

export function useGuest() {
  const { codigo } = useParams<{ codigo?: string }>();

  const invitado = useMemo<Invitado | null>(() => {
    const limpio = (codigo || "").trim().toUpperCase();
    if (!limpio) return null;

    return (
      listaInvitados.find((item) => item.codigo.trim().toUpperCase() === limpio) ?? null
    );
  }, [codigo]);

  return {
    invitado,
  };
}
