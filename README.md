# lownoise.dev

Web del estudio de software **Low Noise**, con un sistema visual propio (tinta clara sobre casi negro, un color de señal, Newsreader + Hanken Grotesk + IBM Plex Mono). Bilingüe EN/ES. Next.js 16 con exportación estática, publicada en GitHub Pages: <https://low-noise-organization.github.io/lownoise.dev/>.

## Desarrollo

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
GITHUB_PAGES=true npm run build   # genera ./out con el basePath /lownoise.dev
```

El despliegue es automático con cada push a `main` (`.github/workflows/deploy.yml`).

## Estructura

- `src/lib/content.ts`: todos los textos (EN/ES), el formulario y los límites de WhatsApp.
- `src/lib/projects.ts`: catálogo de proyectos de código abierto. Las cifras de la web se calculan de aquí.
- `src/components/`: `Site.tsx` (página), `ProjectIcon.tsx` (un icono de línea por proyecto), `hooks.ts`.
- `src/app/globals.css`: sistema visual (tokens y componentes).
- `src/app/fonts/`: tipografías incluidas, en subconjunto latino (todas OFL, licencias en `public/fonts-LICENSE.txt`).
- `public/art/`: imágenes en media tinta (portada y una por proyecto).
- `src/app/opengraph-image.png`: imagen al compartir el enlace (1200×630).

## Arte propio

Las imágenes son originales y se generan con `art/halftone_art.py`: esculpe cada escena con campos de distancia (SDF) y la pasa por una trama de media tinta a 45° en una sola tinta clara sobre transparente. Para regenerarlas:

```bash
python3 -m venv .venv-art && .venv-art/bin/pip install numpy pillow
.venv-art/bin/python art/halftone_art.py            # todas, a public/art/
.venv-art/bin/python art/halftone_art.py voxen hero # solo algunas
```

Para añadir un proyecto: una función de escena en `halftone_art.py`, su entrada en `SCENES`, un icono en `ProjectIcon.tsx` y la correspondencia repo→imagen en `Site.tsx`.

## Notas

- Respeta `prefers-reduced-motion`: sin animaciones, las cifras aparecen ya terminadas.
- El formulario usa Formspree (id público) y el botón de WhatsApp tiene límites en el cliente; no son garantías duras contra el abuso.
