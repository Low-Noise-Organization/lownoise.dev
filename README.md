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
- `src/components/three/`: `NoiseSphere.tsx` (esfera de ruido, también en 404 y reseñas) y `SortScene.tsx` (barras 3D del visualizador).
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

Las imágenes son originales y se generan con `art/halftone_art.py`: esculpe cada escena con campos de distancia (SDF) y la pasa por una trama de media tinta a 45° en una sola tinta clara sobre transparente. Para regenerarlas:

```bash
python3 -m venv .venv-art && .venv-art/bin/pip install numpy pillow
.venv-art/bin/python art/halftone_art.py            # todas, a public/art/
.venv-art/bin/python art/halftone_art.py voxen hero # solo algunas
```

Para añadir un proyecto: una función de escena en `halftone_art.py`, su entrada en `SCENES`, un icono en `ProjectIcon.tsx` y la correspondencia repo→imagen (`ART`) en `components/site/Code.tsx`.

## Notas

- Respeta `prefers-reduced-motion`: sin animaciones, esfera estática y cifras ya terminadas.
- El formulario usa Formspree (id público) y el botón de WhatsApp tiene límites en el cliente; no son garantías duras contra el abuso.
