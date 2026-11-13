# lownoise.dev

Web del estudio de software **Low Noise**. Diseño en blanco y negro puro (sin color de acento: la jerarquía sale de la escala, el peso, las líneas finas y la inversión de secciones), tipografía Geist + Geist Mono y una escena 3D interactiva. Bilingüe EN/ES. Next.js 16 con exportación estática, publicada en GitHub Pages: <https://low-noise-organization.github.io/lownoise.dev/>.

**El 3D.** La portada es una esfera de puntos hecha de «ruido» (three.js + react-three-fiber, shader propio con ruido simplex). Donde está el cursor el ruido cae a cero y la superficie queda lisa; manteniendo pulsado se silencia entera. Con `prefers-reduced-motion` se pinta una vez y se detiene, y sin WebGL se muestra una imagen estática.

## Desarrollo

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
GITHUB_PAGES=true npm run build   # genera ./out con el basePath /lownoise.dev
```

El despliegue es automático con cada push a `main` (`.github/workflows/deploy.yml`).

## Estructura

- `src/lib/content.ts`: textos EN/ES de la web, formulario y límites de WhatsApp. `src/lib/hidden.ts`: textos de las páginas ocultas.
- `src/lib/projects.ts`: catálogo de proyectos de código abierto (las cifras de la web se calculan de aquí).
- `src/lib/lang.ts`: idioma compartido (localStorage + `<html lang>`) para la web y las páginas ocultas.
- `src/components/site/`: secciones de la portada (`Header`, `Hero`, `Services`, `Process`, `Work`, `Code`, `Contact`, `Footer`); `Site.tsx` las compone.
- `src/components/three/`: `NoiseSphere.tsx` (esfera de ruido, también en 404 y reseñas), `Robot.tsx` (robot de la sección de IA, sigue al cursor) y `SortScene.tsx` (barras 3D del visualizador).
- `src/components/lab/`: páginas ocultas. `src/app/globals.css`: todo el sistema visual.
- `src/app/fonts/`: Geist y Geist Mono (SIL OFL, subconjunto latino; licencia en `public/fonts-LICENSE.txt`).

## Páginas ocultas

No están enlazadas desde la portada, llevan `noindex` y `robots.txt` las excluye.

- `/hidden/`: índice.
- `/hidden/algorithms/`: visualizador 3D/2D de 9 algoritmos de ordenación (arrastra para girar) con su código en 5 lenguajes.
- `/hidden/reviews/`: formulario de reseñas; la esfera se calma al subir la valoración. Envía por **Formspree** (mismo formulario que el contacto), no por Discord.
- `/hidden/404/`: no existe a propósito, enseña la página 404.
- `/hiden/`, `/algorithms/`, `/reviews/`: direcciones antiguas, redirigen a las nuevas.

> Seguridad: la versión anterior de las reseñas llevaba la URL de un webhook de Discord incrustada en el código (y en el historial público de git). Cualquiera podía publicar en ese canal. Hay que **revocar ese webhook en Discord**; el código nuevo no usa ninguno.

## Arte propio

Todo el arte es propio y vectorial, sin imágenes de IA:

- **Imágenes de proyecto** (`public/art/<slug>.svg`): las dibuja `art/make_icons.py`, con un sistema común (placa negra 4:3, trama de puntos, marcas de esquina y un emblema geométrico en blanco y grises). Cada una pesa 2-4 KB. `python3 art/make_icons.py [--sheet]` las regenera (y `--sheet` genera una hoja de contactos para revisarlas).
- **Proyectos con icono propio** (Ryoku Transit, Music Player, CipherKey): usan el de su repositorio (`public/icons/`), en gris y a color al pasar el cursor.
- **Logo** (`src/components/Mark.tsx`, `public/logo.svg`, `public/favicon.svg`): un anillo atravesado por una onda que sale convertida en recta.
- **Imagen al compartir** (`src/app/opengraph-image.png` y `twitter-image.png`): `node art/make_og.mjs` (necesita Playwright y Chromium).
- `public/art/hero.png` (respaldo sin WebGL) sigue generándose con `art/halftone_art.py`.

Para añadir un proyecto: una función de emblema en `make_icons.py` y su entrada en `EMBLEMS`, un icono de línea en `ProjectIcon.tsx` y la correspondencia repo→imagen (`ART`) en `components/site/art.tsx`.

## Notas

- Respeta `prefers-reduced-motion`: sin animaciones, esfera estática y cifras ya terminadas.
- El formulario usa Formspree (id público) y el botón de WhatsApp tiene límites en el cliente; no son garantías duras contra el abuso.
