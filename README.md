# José Luis · 70 años de cariño

Invitación familiar en React, TypeScript y Vite. Diseño crema, oliva y terracota, adaptable a celular; animaciones suaves que respetan la preferencia de movimiento reducido.

## Iniciar

```bash
npm install
npm run dev
npm run build
```

Datos actuales: **28 de noviembre de 2026, 1:00 p. m. (UTC−5)**, **AA.HH. Las Capullanas, Mz D lote 12**. Se asumió el año 2026. Edita todos los datos en `src/config/evento.config.ts`.

La invitación tiene portada, encuentro y confirmación. No incluye programa, misa, vestimenta ni pantalla de entrada. El álbum y la música aparecen únicamente cuando los configuras.

## Tus fotos y música

La portada ocupa toda la primera pantalla, sin encabezado, márgenes ni franjas desenfocadas. Usa `public/images/jose-luis-portada-panoramica.jpg`, conservada sin cambios, con encuadre que llena la pantalla y recorta los laterales en móvil. La tipografía blanca Allura coincide con la referencia. La fecha, el nombre y la edad forman un bloque centrado sobre la foto en todos los dispositivos. La portada permanece pegada a la pantalla al desplazarse, mientras el contenido crema sube hasta cubrirla. El acercamiento sigue disponible al pasar el cursor o tocar, sin avisos sobre la foto. Burbujas y destellos suaves acompañan el borde inferior ondulado de papel, que continúa en el fondo crema del encuentro.

Su silueta lleva un borde fino: al pasar el cursor se acerca, al tocar o pulsar Enter queda ampliada, y otro toque o Escape la reduce. Una capa fija de la fotografía original conserva las botellas, los platos y la mesa delante del retrato durante el zoom. La textura solo aparece en el contorno y debajo del recorte, nunca sobre su rostro o cuerpo. Las animaciones respetan la preferencia de movimiento reducido. La flecha inferior lleva a los datos del encuentro y conserva el código personal del invitado.

1. Para usar otra foto, guárdala en `public/images/papa.jpg`.
2. Cambia `fotoPrincipal` a `"images/papa.jpg"` y `recortarSilueta` a `false`: el contorno y la mesa corresponden exclusivamente a la foto panorámica actual. La nueva foto llena la portada y también admite zoom.
3. Para añadir recuerdos, guarda tus imágenes en `public/images/galeria/` y completa `galeria.fotos`:

```ts
fotos: [
  { archivo: "images/galeria/familia.jpg", titulo: "Un día en familia" },
  { archivo: "images/galeria/celebracion.jpg", titulo: "Siempre juntos" },
]
```

4. Crea la carpeta `public/audio/` y guarda tu canción como `musica.mp3`.
5. Cambia `musica.archivoMp3` a `"audio/musica.mp3"`. El invitado elige cuándo reproducirla; no hay música automática ni sintetizada.

Las imágenes antiguas de ejemplo se conservan en disco, pero no se muestran. Con la foto principal vacía se ve la ilustración de los 70 años. La galería admite ampliación, flechas del teclado y cierre con Escape.

## Lugar y calendario

La dirección ya está configurada. **Cómo llegar** abre el enlace exacto proporcionado: `https://maps.app.goo.gl/HsBxvp9tuBnJgekq9`, configurable en `ubicaciones[0].mapsUrl`.

**Agendar** abre Google Calendar con el título, la dirección y el 28 de noviembre de 2026 a la 1 p. m. precargados. Usa `America/Lima` y fechas UTC para conservar el instante del encuentro. La duración de cinco horas es un valor editable heredado del proyecto. Cada invitado decide si guarda el evento.

La sección del encuentro tiene una frase centrada, carta a la izquierda y retrato a la derecha; en celular muestra primero la foto y después la carta. Las ondas separan el encuentro del resto de la invitación. `SeatedPortrait.tsx` usa la foto original intacta `public/images/jose-luis-silla-original.jpg` y solo la transparencia de `public/images/jose-luis-silla-mascara.png`. No muestra los colores generados: el rostro y el cuerpo visibles proceden del JPG original. El acercamiento suave del torso mantiene la silla en primer plano. La máscara corresponde exclusivamente a esta foto; hay que actualizarla si se cambia la imagen.

La máscara se obtuvo con la herramienta integrada ImageGen, con este encargo: quitar únicamente el fondo, incluidos los huecos entre la silla y las extremidades, conservar al mismo hombre con su silla y cojín, preservar composición, proporciones, rostro, cuerpo, ropa y pose, sin retoques ni elementos añadidos, y entregar transparencia real. Se usa únicamente su canal alfa sobre el original y se afinan los huecos de la silla con SVG.

## Invitaciones personales

- General: `/#/`
- Personal: `/#/4X1R6T`
- Panel de enlaces: `/#/panel-invitados`

Edita nombres y pases en `src/data/invitados.json`. Ejecuta `npm run generar-codigos` para generar códigos faltantes. La navegación entre secciones conserva el código personal. El enlace genérico admite hasta cinco asistentes, configurable en `rsvp.maxPasesGenericos`.

El panel conserva el PIN de la base (`2026`). Es una comodidad visual, no autenticación: los datos del frontend son públicos.

## Confirmación de asistencia

En desarrollo, las pruebas se guardan en `db/confirmaciones-locales.json` y la interfaz indica que son locales. En una publicación estática, el formulario requiere conectar Google Sheets; sin esa conexión no simula un envío ni guarda respuestas ocultas en el navegador.

Para conectarlo:

1. Crea una hoja en Google Sheets.
2. Abre **Extensiones → Apps Script**.
3. Pega el contenido de `scripts/google-sheets-rsvp.gs`.
4. Selecciona **Implementar → Nueva implementación → Aplicación web**.
5. Ejecutar como **Yo**; acceso **Cualquier persona**.
6. Copia la URL que termina en `/exec` a `rsvp.googleSheetsUrl`.
7. Comprueba una respuesta en la hoja antes de compartir la invitación.

La integración existente usa `no-cors`: puede enviar, pero el navegador no puede verificar la respuesta del servidor. Revisa la hoja durante la prueba real.

## Publicar en GitHub Pages

Se conserva `.github/workflows/deploy-pages.yml`. Sube el proyecto a tu repositorio, selecciona **Settings → Pages → GitHub Actions** y ejecuta el flujo. `npm run build` genera `dist/`; las rutas de fotos y música respetan la base de Vite.

Para una vista previa de WhatsApp con tu foto, añade en `index.html` una etiqueta `og:image` con su URL pública absoluta cuando esté publicado.
