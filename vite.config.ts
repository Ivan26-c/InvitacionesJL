import react from "@vitejs/plugin-react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";

async function readBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function localConfirmationsMiddleware(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Método no permitido" }));
    return;
  }

  readBody(req)
    .then(async (payload) => {
      const filePath = resolve(process.cwd(), "db", "confirmaciones-locales.json");
      let lista: unknown[] = [];
      try {
        lista = JSON.parse(await readFile(filePath, "utf8"));
      } catch {
        lista = [];
      }

      lista.push({
        codigo: String(payload.codigo || "GENERICO"),
        nombre: String(payload.nombre || "Invitado").trim(),
        asistira: Boolean(payload.asistira),
        pasesConfirmados: Number(payload.pasesConfirmados || 0),
        mensaje: String(payload.mensaje || "").trim(),
        fecha: new Date().toISOString(),
      });

      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, JSON.stringify(lista, null, 2) + "\n", "utf8");

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: true, mode: "local" }));
    })
    .catch(() => {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Solicitud inválida" }));
    });
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "./",
  plugins: [
    react(),
    {
      name: "local-rsvp-api",
      configureServer(server) {
        server.middlewares.use("/api/confirmaciones", localConfirmationsMiddleware);
      },
    },
  ],
});
