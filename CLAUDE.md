# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repositorio

Planificaciones de 1.º año de secundaria (NES, CABA, Argentina) con mirada de colegio cristiano. Cada materia es una página HTML estática y autocontenida que funciona como plataforma de estudio para alumnos y familias:

- [FEC1_Plataforma.html](FEC1_Plataforma.html): Formación Ética y Ciudadana 1
- [Historia1_Plataforma.html](Historia1_Plataforma.html): Historia 1 (del Paleolítico al Feudalismo)
- [Geografia1_Plataforma.html](Geografia1_Plataforma.html): Geografía 1

[index.html](index.html) es la pantalla de inicio: muestra una tarjeta por materia y GitHub Pages la abre como página principal. Las tarjetas salen de la lista `MATERIAS` al principio de su `<script>`. Para sumar una materia, se agrega un objeto a esa lista. Si el campo `archivo` está vacío, la tarjeta aparece como "Próximamente". El botón "Tutor" de cada tarjeta abre WhatsApp (`wa.me`) con un mensaje que nombra la materia. El número se configura en la constante `WHATSAPP_TUTOR`, solo con dígitos y en formato internacional (54 9 + característica + número sin el 15). Si la constante queda vacía, el botón no aparece. Si cambian el título, el color o las estadísticas de una plataforma, actualizá también su tarjeta. Cada plataforma tiene en el menú lateral un enlace "📚 Todas las materias" que vuelve a `index.html`. La sección `#como-usar` de `index.html` muestra el video tutorial `video/Como_usar_la_plataforma.mp4`. Ese video se genera con los scripts de `../video/generador/`, fuera del repositorio (ver su `LEEME.txt`), y conviene regenerarlo si cambia la navegación o el diseño.

No hay paso de compilación, gestor de paquetes, linter ni tests. Para ver una página, abrí el `.html` en el navegador. Todo el contenido está en español rioplatense con voseo ("fijate", "armá", "leé") y está dirigido a chicos de 12 y 13 años. Mantené ese tono al editar.

## Estructura de cada página

Los tres archivos comparten la misma plantilla. El CSS (en `<style>`) y el JS (el único `<script>`, al final) son **idénticos byte a byte**, salvo la paleta de las unidades (`--u1`…`--u5` y sus variantes suaves `--uNs` en `:root`). Un cambio de diseño, de estilos o de comportamiento normalmente hay que aplicarlo en los tres archivos.

El cuerpo usa marcado estilo Pandoc (`section.level1/2/3`, `<colgroup>`, `tr.odd/even`). El repositorio no incluye la fuente que lo generó, así que se edita el HTML directamente y se respeta ese estilo de marcado.

- `nav#side`: el índice del menú lateral. Enlaza a `#intro`, a las unidades `#u1…`, a las semanas `#s1…#sN` (numeradas a lo largo de todo el curso, no por unidad), a las pruebas por unidad `#p1…`, a `#final`, a `#pf` (prueba final) y a `#claves` (claves de corrección). **Si agregás, quitás o renombrás una semana o una unidad, actualizá el menú lateral, los números de `.stats` en la portada y la sección "Mapa del cuatrimestre" de la introducción.**
- `header.hero#top`: portada con etiqueta, título y estadísticas.
- `section#intro.level2`: bienvenida, "los cuatro anteojos de la cosmovisión bíblica", cómo se organiza cada semana, el mapa del cuatrimestre y "Notas bibliográficas". Esta última parte define las abreviaturas de las fuentes que se usan en cada semana (por ejemplo `CN`, `VS cap. N, pp. X`).
- `section.level1.unidad[data-color=uN]`: una unidad. Contiene un `<h1>`, un `<blockquote>` (resumen, programa NES y versículo de la unidad) y después las semanas.
- Cada semana es `section.level2#sN` y sigue un patrón fijo:
  1. Una primera `<table>` con los datos de la semana (Contenido NES / Fuentes / Mirada bíblica / Tipo de actividad). El CSS apunta a `section.level2>table:first-of-type` y oculta su `thead` y su `colgroup`.
  2. Subsecciones `level3` en este orden: 📖 Para leer, 📚 Fuente bibliográfica y páginas (en Geografía se llama "Notas bibliográficas"), ✏️ Actividad, 🎬 Video recomendado y ❓ Preguntas (3 preguntas por semana).
- Las pruebas por unidad son `section.level2.prueba#pN`. Las claves de corrección están en `section.level2.claves#claves`, que el JS pliega detrás de un botón (al imprimir siempre se muestran).
- Los id de las subsecciones semanales (`para-leer`, `preguntas-1`, …) se repiten entre unidades. Solo los id `u/s/p` son destinos de enlaces, así que no dependas de los demás.

## Componentes de contenido reutilizables

- Recuadro bíblico: `<div class="biblia">…</div>`. Termina con un `<p><strong>Para conversar:</strong> …</p>`.
- Foto: `figure.foto > div.foto-marco > img` con `onerror="this.parentNode.classList.add('sin-foto');this.remove()"`, más un enlace `a.foto-fallback` a Google Imágenes y un `<figcaption>`. Las imágenes se enlazan directamente desde `commons.wikimedia.org/wiki/Special:FilePath/<archivo>?width=900`. Para agregar una, copiá una figura existente.
- Video: `a.video` con un `span.vthumb` (miniatura `mqdefault.jpg` de YouTube) y un `span.vtxt` con `data-url`, que el CSS de impresión muestra como URL. En general le sigue un segundo video, precedido por "Alternativa:".

## Descarga de bibliografía

- Los PDF están en `bibliografia/`, con nombres sin espacios ni tildes y con el prefijo de su abreviatura (`VS_`, `HM_`, `NES_`):
  - `comun/`: lo que usan las tres materias (VS, los 4 capítulos de HM y la Guía temática). Cada archivo está una sola vez.
  - `geografia/`, `historia/` y `fec/`: el programa NES y los libros complementarios de cada materia.
- Los originales están fuera del repositorio, en `../bibliografia Geografia/`, `../bibliografia de historia/` y `../bibliografia fec/`.
- En cada página, la sección `#descargas` (al final de la introducción, con su enlace en el menú lateral) lista los PDF en `ul.descargas` y tiene un botón `#btn-descargas`. Ese botón hace clic en cada enlace `a[download]`, uno por uno y con una pausa.
- Si agregás o quitás un PDF, actualizá la lista, el tamaño y el texto del botón ("Descargar todo (N archivos · X MB)").
- El libro de Santillana pesa unos 90 MB. GitHub admite hasta 100 MB por archivo con `git push`, pero la subida desde la web admite solo 25 MB.

## Comportamiento del JS (al final de cada archivo)

- Color de unidad: copia el `data-color` de cada `level1` a las variables `--c`/`--cs` de sus tarjetas `level2`.
- Claves de corrección: pliega `section.claves`.
- Desplazamiento: mueve la barra de progreso y resalta el enlace activo del menú lateral. El enlace activo se calcula a partir de los destinos de `#side a[href^="#"]`, así que una semana que no esté en el menú no se va a resaltar.

## Impresión

Hay un bloque `@media print` completo para A4. Cada unidad y cada semana empiezan en una página nueva, se ocultan el menú lateral y los demás controles, las claves de corrección aparecen desplegadas y se imprimen las URL de los videos. Tené en cuenta la versión impresa cuando cambies el diseño.
