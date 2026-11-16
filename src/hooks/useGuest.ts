import { useMemo } from "react";
import { useParams } from "react-router-dom";
import invitadosData from "../data/invitados.json";
import type { Invitado } from "../types/invitation.types";

const listaInvitados = invitadosData as Invitado[];

export function useGuest() {
  const { codigo } = useParams<{ codigo?: string }>();

  const invitado = useMemo<Invitado | null>(() => {
    const desdeQuery =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("i") || ""
        : "";
    const limpio = (codigo || desdeQuery).trim().toUpperCase();
    if (!limpio) return null;

    return (
      listaInvitados.find((item) => item.codigo.trim().toUpperCase() === limpio) ?? null
    );
  }, [codigo]);

  return {
    invitado,
  };
}
