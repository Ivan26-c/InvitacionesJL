/**
 * ============================================================================
 * GOOGLE APPS SCRIPT PARA RECIBIR CONFIRMACIONES EN GOOGLE SHEETS
 * ============================================================================
 * INSTRUCCIONES (toma 2 minutos):
 * 1. Crea una hoja nueva en Google Sheets (https://sheets.new) y ponle de título
 *    por ejemplo: "Confirmaciones Homenaje José Luis".
 * 2. En el menú superior entra a: Extensiones -> Apps Script.
 * 3. Borra el código que aparece por defecto y pega TODO este archivo.
 * 4. Haz clic en el botón azul "Implementar" (arriba a la derecha) -> "Nueva implementación".
 * 5. En "Seleccionar tipo" (icono de engranaje) elige: "Aplicación web".
 * 6. Configura:
 *    - Ejecutar como: "Yo"
 *    - Quién tiene acceso: "Cualquier persona"
 * 7. Haz clic en "Implementar", autoriza el acceso a tu hoja y copia la URL
 *    que termina en `/exec`.
 * 8. Pega esa URL en `src/config/evento.config.ts` -> `rsvp.googleSheetsUrl`.
 * ============================================================================
 */

const NOMBRE_HOJA = "Confirmaciones";

function obtenerOCrearHoja() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(NOMBRE_HOJA);

  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA);
    hoja.appendRow([
      "Fecha y Hora",
      "Código Invitado",
      "Nombre del Invitado",
      "¿Asistirá?",
      "Personas Confirmadas",
      "Palabras o Recuerdo",
    ]);
    hoja.getRange(1, 1, 1, 6).setFontWeight("bold");
    hoja.setFrozenRows(1);
  }

  return hoja;
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);

    const hoja = obtenerOCrearHoja();
    const fechaLima = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone() || "America/Lima",
      "dd/MM/yyyy HH:mm:ss"
    );

    hoja.appendRow([
      fechaLima,
      String(data.codigo || "GENERICO"),
      String(data.nombre || "Invitado"),
      data.asistira ? "SÍ ASISTIRÁ" : "NO PODRÁ ASISTIR",
      data.asistira ? Number(data.pasesConfirmados || 1) : 0,
      String(data.mensaje || ""),
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "Servicio RSVP activo — Homenaje José Luis Quezada Céspedes" })
  ).setMimeType(ContentService.MimeType.JSON);
}
