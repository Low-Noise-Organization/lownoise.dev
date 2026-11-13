import type { Lang } from "./content";

// Copy for the hidden pages (they follow the language chosen on the main site).
export const H = {
  en: {
    back: "Back to site",
    index: {
      badge: "Hidden", title: "Hidden pages.", lead: "Pages that are not linked from the main site. Bookmark this one, or remember the URLs.",
      items: [
        ["Sorting algorithms", "An interactive 3D and 2D visualizer plus code for nine sorting algorithms in five languages.", "/hidden/algorithms/"],
        ["Reviews", "Tell us how a Low Noise product or service worked for you.", "/hidden/reviews/"],
        ["Error 404", "There is nothing at this address on purpose: it shows the not-found page.", "/hidden/404/"],
      ],
    },
    algo: {
      badge: "Lab", title: "Sorting algorithms.", lead: "Watch nine classic algorithms work, in 3D or 2D, and read their code. Drag the 3D view to look around.",
      algorithm: "Algorithm", sort: "Sort", pause: "Pause", resume: "Resume", shuffle: "Shuffle", step: "Step", speed: "Speed", size: "Items", view: "View",
      done: "Sorted", steps: "steps", dragHint: "Drag to rotate",
      legend: ["Unsorted", "Comparing", "Swapping", "Sorted"],
      description: "Description", complexity: "Complexity", best: "Best", average: "Average", worst: "Worst", space: "Space", code: "Code", copy: "Copy", copied: "Copied", soon: "// Coming soon",
      bogoNote: "The visualizer shuffles a few times and then gives up, finishing with bubble sort: real bogo sort may never end.",
    },
    rev: {
      badge: "Reviews", title: "Tell us how it went.", lead: "Your feedback helps us improve. It reaches us by email through the same secure form as the contact page; no data is stored on this site.",
      business: "Business name", product: "Product type", products: ["Website", "Digital product", "Custom software"], pick: "Select…",
      rating: "Rating", ratings: ["", "Poor", "Fair", "Good", "Very good", "Excellent"], message: "Message (optional)", email: "Your email (optional)", emailHint: "Only if you want us to reply.",
      send: "Send review", required: "Choose a rating first.", sent: "Thank you. Your review has been sent.",
      noise: "Noise level", noiseHint: "The sphere calms down as the rating goes up.",
      note: "After sending, a short verification step (reCAPTCHA) is shown by our form provider.",
    },
    nf: { title: "404", lead: "Nothing here. Less noise, also fewer pages.", home: "Back home", hint: "Hold to silence the noise" },
  },
  es: {
    back: "Volver a la web",
    index: {
      badge: "Oculto", title: "Páginas ocultas.", lead: "Páginas que no están enlazadas desde la web principal. Guarda esta en favoritos o recuerda las URLs.",
      items: [
        ["Algoritmos de ordenación", "Visualizador interactivo en 3D y 2D y código de nueve algoritmos de ordenación en cinco lenguajes.", "/hidden/algorithms/"],
        ["Reseñas", "Cuéntanos cómo te ha funcionado un producto o servicio de Low Noise.", "/hidden/reviews/"],
        ["Error 404", "No hay nada en esta dirección a propósito: muestra la página de no encontrado.", "/hidden/404/"],
      ],
    },
    algo: {
      badge: "Laboratorio", title: "Algoritmos de ordenación.", lead: "Mira cómo trabajan nueve algoritmos clásicos, en 3D o en 2D, y lee su código. Arrastra la vista 3D para mirar alrededor.",
      algorithm: "Algoritmo", sort: "Ordenar", pause: "Pausa", resume: "Seguir", shuffle: "Mezclar", step: "Paso", speed: "Velocidad", size: "Elementos", view: "Vista",
      done: "Ordenado", steps: "pasos", dragHint: "Arrastra para girar",
      legend: ["Sin ordenar", "Comparando", "Intercambiando", "Ordenado"],
      description: "Descripción", complexity: "Complejidad", best: "Mejor", average: "Media", worst: "Peor", space: "Espacio", code: "Código", copy: "Copiar", copied: "Copiado", soon: "// Próximamente",
      bogoNote: "El visualizador mezcla unas cuantas veces y se rinde, terminando con ordenación burbuja: el bogo sort real puede no acabar nunca.",
    },
    rev: {
      badge: "Reseñas", title: "Cuéntanos qué tal fue.", lead: "Tu opinión nos ayuda a mejorar. Nos llega por correo con el mismo formulario seguro de la página de contacto; esta web no guarda nada.",
      business: "Nombre del negocio", product: "Tipo de producto", products: ["Página web", "Producto digital", "Programa a medida"], pick: "Selecciona…",
      rating: "Valoración", ratings: ["", "Mala", "Regular", "Buena", "Muy buena", "Excelente"], message: "Mensaje (opcional)", email: "Tu correo (opcional)", emailHint: "Solo si quieres que te respondamos.",
      send: "Enviar reseña", required: "Elige primero una valoración.", sent: "Gracias. Tu reseña se ha enviado.",
      noise: "Nivel de ruido", noiseHint: "La esfera se calma a medida que sube la valoración.",
      note: "Tras enviar, nuestro proveedor de formularios mostrará una breve verificación (reCAPTCHA).",
    },
    nf: { title: "404", lead: "Aquí no hay nada. Menos ruido, también menos páginas.", home: "Volver al inicio", hint: "Mantén pulsado para silenciar el ruido" },
  },
} as const satisfies Record<Lang, unknown>;
