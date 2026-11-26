# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repositorio

Sitio estático de la "Planificación 8vo año" (1.º año de secundaria, NES, CABA, Argentina), con mirada de colegio cristiano. Lo usan alumnos y familias, y se publica con GitHub Pages desde la rama `master`.

| Archivo | Qué es |
|---|---|
| [index.html](index.html) | Pantalla de inicio: tarjetas de materias, video tutorial y enlace al staff |
| [Historia1_Plataforma.html](Historia1_Plataforma.html) | Plataforma de Historia 1 (del Paleolítico al Feudalismo) |
| [Geografia1_Plataforma.html](Geografia1_Plataforma.html) | Plataforma de Geografía 1 |
| [FEC1_Plataforma.html](FEC1_Plataforma.html) | Plataforma de Formación Ética y Ciudadana 1 |
| [Lengua1_Plataforma.html](Lengua1_Plataforma.html) | Plataforma de Lengua 1 (Prácticas del Lenguaje, **anual**: 32 semanas) |
| [Matematica1_Plataforma.html](Matematica1_Plataforma.html) | Plataforma de Matemática 1 (8.°, **anual**: 8 unidades de 4 semanas) |
| [Biologia1_Plataforma.html](Biologia1_Plataforma.html) | Plataforma de Biología 1 (30 semanas en 3 secciones) |
| [Musica1_Plataforma.html](Musica1_Plataforma.html) | Plataforma de Música 1 (12 semanas en 3 meses) |
| [Arte1_Plataforma.html](Arte1_Plataforma.html) | Plataforma de Arte 1 (arte plástica, 1.er trimestre: 12 semanas en 3 unidades) |
| [tutoras.html](tutoras.html) | Staff de tutoras |
| `bibliografia/` | PDF para descargar (ver más abajo) |
| `tutoras/web/` | Fotos de las tutoras ya recortadas |
| `video/` | Video tutorial y su imagen de portada |

No hay paso de compilación, gestor de paquetes, linter ni tests. Para ver una página, abrí el `.html` en el navegador. Para revisar un cambio visual, se puede sacar una captura con Edge sin ventana: `msedge.exe --headless=new --screenshot=... --window-size=1280,900 file:///...`. A veces el primer intento con un perfil nuevo no genera la imagen; repetirlo con el mismo `--user-data-dir` suele funcionar.

Todo el contenido está en español rioplatense con voseo ("fijate", "armá", "tocá") y está dirigido a chicos de 12 y 13 años y a sus familias. Mantené ese tono al editar.

## Publicación (git)

- GitHub Pages publica lo que está en `master` (`origin` = `github.com/luisozkar2/planificaciones-8vo`). El usuario pide los commits y el push a `master`; hacé commit o push **solo cuando lo pida explícitamente** para ese cambio.
- `.gitignore` excluye `tutoras/*.jpeg`, las fotos originales de las tutoras. No hay que subirlas: algunas son capturas del celular con la interfaz de WhatsApp.
- Las advertencias de git sobre LF/CRLF son normales en este repositorio y no requieren acción.
- GitHub admite archivos de hasta 100 MB con `git push`, pero la subida desde la web admite solo 25 MB. El PDF más grande, el de Santillana, pesa unos 90 MB.

## Pantalla de inicio (`index.html`)

- Las tarjetas de materias se generan desde la lista `MATERIAS`, al principio de su `<script>`. Para sumar una materia, se agrega un objeto. Con `archivo: ""`, la tarjeta aparece como "Próximamente", sin enlace ni botón de tutor. Si cambian el título, el color o las estadísticas de una plataforma, actualizá también su tarjeta.
- Cada tarjeta tiene "Entrar →" (un `a.ir`, cuyo `:after` cubre toda la tarjeta) y un botón "Tutor" (`a.wa`, por encima, con `z-index`). El botón abre `wa.me/<WHATSAPP_TUTOR>` con el mensaje "Hola, necesito ayuda con <materia>." Las tarjetas son `div`, no `a`, porque no se pueden anidar enlaces.
- `WHATSAPP_TUTOR` lleva solo dígitos, en formato internacional: `5491158641170` (54 + 9 + 11 + número sin el 15). Si queda vacío, no aparece el botón. **[tutoras.html](tutoras.html) tiene su propia copia de esta constante:** si cambia el número, hay que actualizarlo en los dos archivos.
- La sección `#como-usar` muestra el video tutorial. El botón de la portada y la descripción indican la duración ("4 min") y el tamaño ("14 MB"): actualizalos si cambia el video.
- Al final está el enlace `.staff-link` a `tutoras.html`.
- Estas páginas (`index.html` y `tutoras.html`) tienen su propio CSS, que copia el estilo de las plataformas (portada oscura, Fredoka/Nunito, tarjetas con borde de color) pero **no** comparte la plantilla con ellas.

## Staff de tutoras (`tutoras.html`)

- Las tarjetas se generan desde la lista `TUTORAS` (nombre, rol con emoji, foto, color del área).
- Las fotos son recortes verticales de 600×750, centrados en la cara, en `tutoras/web/<nombre-apellido>.jpg`. Se hacen con ffmpeg a partir de los originales: `crop=W:H:X:Y,scale=600:750`. Para una persona nueva, recortá su foto igual y sumá un bloque a la lista.

## Plataformas de cada materia

Los ocho archivos `*_Plataforma.html` comparten la misma plantilla. El CSS (en `<style>`) y el JS (el único `<script>`, al final) son **idénticos byte a byte**, salvo la paleta de las unidades (`--u1`…`--u5` y sus variantes suaves `--uNs` en `:root`). Un cambio de diseño, de estilos o de comportamiento hay que aplicarlo en los tres archivos. Se puede verificar con `diff` sobre los bloques `<style>` y `<script>`.

El cuerpo usa marcado estilo Pandoc (`section.level1/2/3`, `<colgroup>`, `tr.odd/even`). El repositorio no incluye la fuente que lo generó, así que se edita el HTML directamente y se respeta ese estilo de marcado.

- `nav#side`: el menú lateral. Empieza con "📚 Todas las materias" (vuelve a `index.html`), "⬆️ Portada" (`#top`), la bienvenida (`#intro`) y "📥 Descargar bibliografía" (`#descargas`). Después siguen las unidades `#u1…`, las semanas `#s1…#sN` (numeradas a lo largo de todo el curso, no por unidad), las pruebas por unidad `#p1…`, `#final`, `#pf` (prueba final) y `#claves` (claves de corrección). **Si agregás, quitás o renombrás una semana o una unidad, actualizá el menú lateral, los números de `.stats` en la portada, la sección "Mapa del cuatrimestre" de la introducción y la tarjeta de `index.html`.**
- `header.hero#top`: portada con etiqueta, título y estadísticas.
- `section#intro.level2`: bienvenida, "los cuatro anteojos de la cosmovisión bíblica", cómo se organiza cada semana, el mapa del cuatrimestre, "Notas bibliográficas" y `#descargas`. Las notas definen las abreviaturas de las fuentes que se usan en cada semana (`VS`, `HM`, `CN`, `NES`…).
- `section.level1.unidad[data-color=uN]`: una unidad. Contiene un `<h1>`, un `<blockquote>` (resumen, programa NES y versículo de la unidad) y después las semanas.
- Cada semana es `section.level2#sN` y sigue un patrón fijo:
  1. Una primera `<table>` con los datos de la semana (Contenido NES / Fuentes / Mirada bíblica / Tipo de actividad). El CSS apunta a `section.level2>table:first-of-type` y oculta su `thead` y su `colgroup`.
  2. Subsecciones `level3` en este orden: 📖 Para leer, 📚 Fuente bibliográfica y páginas (en Geografía se llama "Notas bibliográficas"), ✏️ Actividad, 🎬 Video recomendado y ❓ Preguntas (3 preguntas por semana).
- Las pruebas por unidad son `section.level2.prueba#pN`. Las claves de corrección están en `section.level2.claves#claves`, que el JS pliega detrás de un botón (al imprimir siempre se muestran).
- Los id de las subsecciones semanales (`para-leer`, `preguntas-1`, …) se repiten entre unidades. Solo los id `u/s/p` son destinos de enlaces, así que no dependas de los demás.

### Diferencias de Lengua 1

Lengua usa la misma plantilla, pero su contenido está organizado de otra manera:

- Es anual: 32 semanas en tres unidades (`#u1` Bloque I · Literatura, semanas 1-15; `#u2` Bloque II · Estudio y ciudadanía, 16-25; `#u3` Ortografía y proyecto final «Mi antología», 26-31). La semana 32, la evaluación final, está en `#final`, junto con `#claves`. No tiene `#pf`.
- No tiene recuadros bíblicos ni "Mirada bíblica": el material original no los incluye.
- La tabla de cada semana tiene las filas Lectura y teoría / Gramática u Ortografía / Proyecto / Cierre / Videos. Las subsecciones tienen ids únicos con sufijo: `para-leer-sN`, `gramatica-sN` u `ortografia-sN`, `videos-sN`, `cierre-sN` y `ficha-sN`. El cierre puede incluir un taller con dos propuestas (`<h4>Propuesta N · …</h4>` + `<ol>`).
- Las "pruebas" son los 6 diagnósticos (`section.prueba#p1…#p6`, después de las semanas 4, 8, 12, 19, 23 y 29). Cada uno es un enlace a su PDF; `#claves` enlaza los PDF de las claves.
- Los enlaces a PDF dentro de las semanas, los diagnósticos y las claves usan `ul.descargas` **sin** el atributo `download` (se abren en otra pestaña). Así el botón "Descargar todo", que toma `ul.descargas a[download]`, baja solo la lista de `#descargas` (la planificación y los 16 capítulos).
- La plataforma se generó una vez con los scripts de `../generador_lengua/` (ver su `LEEME.txt`). Desde entonces se edita el HTML directamente; si se vuelve a generar, se pierden los cambios hechos a mano.

### Diferencias de Matemática 1

- 8 unidades (`#u1`…`#u8`) de 4 semanas (`#s1`…`#s32`). La paleta solo define `u1`…`u5`, así que las unidades 5 a 8 repiten los colores `u1`…`u4`. `#final` (color `u5`) contiene solo `#claves`, el solucionario de las hojas. No hay `pN`: la cuarta semana de cada unidad es de integración y evaluación.
- No tiene recuadros bíblicos.
- Cada semana tiene una tabla (Objetivo / Libro / Materiales / Hoja de ejercitación) y las subsecciones `clases-sN` (tabla de las 5 clases), `teoria-sN` (enlace al PDF de la semana, que trae teoría, ejercicios y su propio solucionario), `videos-sN` (la etiqueta chica dice para qué clase es cada video) y `hoja-sN`.
- La teoría **no** está pasada a HTML: queda en `bibliografia/matematica/semanas/U#_S#.pdf`, porque tiene fórmulas, tablas y figuras y su formato cambia entre unidades.
- Las hojas de ejercitación y sus soluciones están todas en un PDF cada una (`Hojas_de_ejercitacion.pdf`, `Solucionario_hojas.pdf`). Cada hoja se enlaza con `#page=N` a la página donde empieza.
- En el material original faltan las páginas del libro de la semana 8 ("págs. ______ a ______") y de las semanas 12, 20 y 28. En la página se muestra tal cual o "Repaso de toda la unidad."
- El libro (`Libro_Matematica_F2_Effenberger.pdf`) está escaneado, sin texto.
- Se generó con `../generador_matematica/generar.py` (ver su `LEEME.txt`). Desde entonces se edita el HTML directamente.

### Diferencias de Biología, Música y Arte

Las tres usan la misma plantilla, pero no tienen recuadros bíblicos, ni `#final`, ni `#claves`. Sus unidades son `#u1`…`#u3` y las subsecciones de cada semana tienen ids con sufijo (`para-leer-sN`, `videos-sN`, `trabajo-sN`, etc.).

- **Biología 1:** 30 semanas en tres secciones (evolución 1-11, células y nutrición 12-22, genética y nutrición humana 23-30). Cada semana tiene las páginas del libro, un resumen, un video y una "evaluación rápida" de 2 preguntas. Todo sale del .docx de la planificación. El libro (`Libro_Biologia_1_NES_Santillana.pdf`, unos 86 MB) está escaneado. El título del .docx dice "Biología 2", pero el libro es *Biología 1* NES de Santillana.
- **Música 1:** 12 semanas en 3 meses, con 2 h por semana. La teoría está escrita en la página. Las semanas 9 a 12 no tienen teoría nueva: enlazan a la de semanas anteriores. Tres de los "videos" son búsquedas de YouTube, no un video fijo. Los libros recomendados no están para descargar. En el .docx original, la teoría del mes 2 repite por error la del mes 1; en la página se usa la teoría correcta de ritmo, forma y textura.
- **Arte 1:** 12 semanas en 3 unidades (simetría y color; perspectiva geométrica; teoría del color). Cada semana tiene la teoría, la consigna del trabajo práctico y los pasos. Las semanas 1 a 4 muestran imágenes de ejemplo (`bibliografia/arte/img/`) con `<figure>` y estilo en línea, para no tocar el CSS compartido. Los enlaces al apunte de teoría y al PDF del trimestre usan `#page=N`.
- Las tres se generaron con `../generador_tres/generar.py` (ver su `LEEME.txt`). Desde entonces se editan en el HTML.

### Componentes de contenido reutilizables

- Recuadro bíblico: `<div class="biblia">…</div>`. Termina con un `<p><strong>Para conversar:</strong> …</p>`.
- Foto: `figure.foto > div.foto-marco > img` con `onerror="this.parentNode.classList.add('sin-foto');this.remove()"`, más un enlace `a.foto-fallback` a Google Imágenes y un `<figcaption>`. Las imágenes se enlazan directamente desde `commons.wikimedia.org/wiki/Special:FilePath/<archivo>?width=900`. Para agregar una, copiá una figura existente.
- Video: `a.video` con un `span.vthumb` (miniatura `mqdefault.jpg` de YouTube) y un `span.vtxt` con `data-url`, que el CSS de impresión muestra como URL. En general le sigue un segundo video, precedido por "Alternativa:".

### Comportamiento del JS

- Color de unidad: copia el `data-color` de cada `level1` a las variables `--c`/`--cs` de sus tarjetas `level2`.
- Claves de corrección: pliega `section.claves`.
- Desplazamiento: mueve la barra de progreso y resalta el enlace activo del menú lateral. El enlace activo se calcula a partir de los destinos de `#side a[href^="#"]`, así que una semana que no esté en el menú no se va a resaltar.
- Descargas: `#btn-descargas` hace clic en cada `ul.descargas a[download]`, uno por uno y con una pausa de 900 ms.

### Impresión

Hay un bloque `@media print` completo para A4. Cada unidad y cada semana empiezan en una página nueva, se ocultan el menú lateral y los demás controles (incluido `.btn-descargas`), las claves de corrección aparecen desplegadas y se imprimen las URL de los videos. Tené en cuenta la versión impresa cuando cambies el diseño.

## Bibliografía para descargar

- Los PDF están en `bibliografia/`, con nombres sin espacios ni tildes y con el prefijo de su abreviatura (`VS_`, `HM_`, `NES_`):
  - `comun/`: lo que usan las tres materias (VS, los 4 capítulos de HM y la Guía temática). Cada archivo está una sola vez.
  - `geografia/`, `historia/` y `fec/`: el programa NES y los libros complementarios de cada materia.
  - `lengua/`: `Planificacion_anual_Lengua_1.pdf`, `libro/LL_NN_*.pdf` (los 16 capítulos del libro *Lengua y Literatura 1*, Serie Llaves, Mandioca), `fichas/Ficha_semana_NN.pdf` (32), `diagnosticos/Diagnostico_N.pdf` (6) y `diagnosticos/claves/Diagnostico_N_Clave.pdf` (6).
  - `biologia/`, `musica/` y `arte/`: libro y planificación de Biología; plan de estudio de Música (.docx); PDF del trimestre, apunte de teoría e imágenes de ejemplo de Arte. Los originales están en `Escritorio\PLANIFICACION 8tvo\Biologia`, `\Musica` y `\Arte`.
  - `matematica/`: `Programa_Matematica_8.pdf`, `Planificacion_semana_a_semana.pdf`, `Libro_Matematica_F2_Effenberger.pdf`, `Hojas_de_ejercitacion.pdf`, `Solucionario_hojas.pdf`, `Anexo_Teorema_de_Pitagoras.pdf` y `semanas/U#_S#.pdf` (32).
- Los originales están fuera del repositorio: en `../bibliografia Geografia/`, `../bibliografia de historia/` y `../bibliografia fec/`; los de Lengua en `Escritorio\PLANIFICACION 8tvo\Lengua 1 - Material para familias\`, y los de Matemática en `Escritorio\PLANIFICACION 8tvo\8vo Home\`.
- Si agregás o quitás un PDF, actualizá en esa plataforma la lista `ul.descargas`, el tamaño de cada archivo y el texto del botón ("Descargar todo (N archivos · X MB)").

## Video tutorial

`video/Como_usar_la_plataforma.mp4` (3:35, 1920×1080, unos 14 MB) y `video/portada_video.jpg`. Muestra la pantalla de inicio, una plataforma (Historia como ejemplo), las descargas, cada parte de la semana, el celular, el botón "Tutor" y el staff de tutoras. **Conviene regenerarlo cuando cambia la navegación o el diseño.** La versión actual es anterior a Lengua, Matemática, Biología, Música y Arte: la narración nombra solo tres materias y las capturas muestran tres tarjetas.

Se genera con los scripts de `../video/generador/`, fuera del repositorio (ver su `LEEME.txt`):

1. `escenas.json`: una entrada por escena, con el texto en pantalla (`texto`), la narración (`voz`), la página (`url`) y opciones: `ir` (selector al que bajar), `offset`, `resaltar` (uno o varios selectores), `separado` (un recuadro por elemento), `clic`, `celular`, `resaltarAlto`, y `tipo: "titulo"` para las portadas.
2. `node capturar.mjs C:/wks_planificacion/planificaciones-8vo frames`: controla Edge por CDP y saca una captura de 1920×1080 por escena, con el resaltado y el texto.
3. `python narrar_neural.py [voz] [velocidad]`: narración con voces neurales de Microsoft mediante `edge-tts`, una herramienta no oficial. La voz actual es `es-AR-TomasNeural` (hombre, rioplatense) a `-4%`. La alternativa sin internet es `narrar.ps1`, con las voces instaladas en Windows (Raúl o Sabina, es-MX), que suenan menos naturales.
4. `bash armar.sh <salida.mp4>`: une cada imagen con su audio usando ffmpeg (instalado con winget en `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_*`, no está en el PATH de Git Bash).

Después de armarlo: si hace falta, ajustá el volumen (`-af volume=NdB` hasta un `mean_volume` de alrededor de −22 dB), copialo a `video/`, regenerá `portada_video.jpg` desde `frames/escena_01.png` y actualizá la duración y el tamaño en `index.html`. En la narración, escribí las palabras como se pronuncian ("uatsap", "ve, ese"), porque la voz lee el texto literalmente.
