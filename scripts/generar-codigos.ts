import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

interface InvitadoRaw {
  codigo?: string;
  nombreMostrar: string;
  etiqueta?: string;
  pases?: number;
  plural?: boolean;
}

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function generarCodigoUnico(existentes: Set<string>, longitud = 6): string {
  while (true) {
    let codigo = "";
    for (let i = 0; i < longitud; i++) {
      codigo += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
    if (!existentes.has(codigo)) {
      existentes.add(codigo);
      return codigo;
    }
  }
}

async function main() {
  const ruta = resolve(process.cwd(), "src", "data", "invitados.json");
  const contenido = await readFile(ruta, "utf8");
  const invitados = JSON.parse(contenido) as InvitadoRaw[];

  const codigosUsados = new Set<string>(
    invitados
      .map((i) => (i.codigo || "").trim().toUpperCase())
      .filter(Boolean),
  );

  let generados = 0;
  const actualizados = invitados.map((inv) => {
    const actual = (inv.codigo || "").trim().toUpperCase();
    const codigo = actual || generarCodigoUnico(codigosUsados);
    if (!actual) generados++;
    return {
      codigo,
      nombreMostrar: inv.nombreMostrar.trim(),
      etiqueta: inv.etiqueta || (inv.plural ? "Invitados Especiales" : "Invitado Especial"),
      pases: inv.pases ?? 1,
      plural: Boolean(inv.plural ?? (inv.pases && inv.pases > 1)),
    };
  });

  await writeFile(ruta, JSON.stringify(actualizados, null, 2) + "\n", "utf8");

  console.log(`\n✓ Lista procesada (${actualizados.length} invitados, ${generados} códigos nuevos generados).\n`);
  console.table(
    actualizados.map((i) => ({
      Codigo: i.codigo,
      Invitado: i.nombreMostrar,
      Pases: i.pases,
      LinkHash: `/#/${i.codigo}`,
    })),
  );
}

main().catch((err) => {
  console.error("Error al procesar invitados.json:", err);
  process.exit(1);
});
