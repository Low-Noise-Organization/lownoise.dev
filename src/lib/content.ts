export type Lang = "en" | "es";

export const CONTACT_USER = "adricoding647";
export const CONTACT_HOST = "gmail.com";
export const contactEmail = () => `${CONTACT_USER}@${CONTACT_HOST}`;

export const T = {
  en: {
    nav: { services: "Services", process: "Process", work: "Work", code: "Open source", contact: "Contact" },
    hero: {
      kicker: "Low Noise // Software studio",
      title: "Custom software, with less noise.",
      lead: "Backend services, Android apps, command-line tools and small business websites. Scoped in writing, built in small steps, documented and handed over.",
      cta: "Tell us about your project",
      secondary: "See our work",
    },
    services: {
      title: "Services",
      items: [
        { name: "Backend and APIs", body: "REST services and data models that stay readable. Validation, error handling and tests from the first endpoint.", stack: "Java 21 · Spring Boot · PostgreSQL" },
        { name: "Android apps", body: "Native apps with a clear interface and honest behaviour when data or connectivity are missing.", stack: "Kotlin · Jetpack Compose" },
        { name: "Terminal and developer tools", body: "Fast CLIs, TUIs and build tooling that small teams can actually maintain.", stack: "Rust · Java · Shell" },
        { name: "Websites for small businesses", body: "Fast, accessible static sites in your visual identity, with no CMS to keep alive.", stack: "HTML · CSS · TypeScript" },
      ],
    },
    process: {
      title: "How we work",
      steps: [
        ["Listen", "A short conversation about the problem, who uses the result and what must not break."],
        ["Write it down", "A one-page scope: what is included, what is not, and how we will know it works."],
        ["Build in small steps", "Working increments you can see, with tests, so surprises show up early."],
        ["Hand over", "Source code, documentation and a README another developer can follow. It is yours."],
      ],
      promise: "Nothing is promised that is not written in the scope. If something cannot be done well, we say so before starting.",
    },
    work: {
      title: "Selected work",
      note: "Our own projects, shown as they are, including what they cannot do yet.",
      labels: { problem: "Problem", decision: "Decision", status: "Status" },
      cases: [
        {
          repo: "ryoku-transit", name: "Ryoku Transit", kind: "Android app · Kotlin",
          problem: "City bus times that are hard to read and no reliable real-time source.",
          decision: "Show scheduled times from the public GTFS feed and label each value as scheduled or reference. No live positions are faked.",
          status: "Works with scheduled times. Real-time data is not available to us.",
        },
        {
          repo: "Voxen", name: "Voxen", kind: "Developer tool · Java",
          problem: "Container builds that are slow to reason about and hard to trace.",
          decision: "One pipeline in front of Docker: build, minimal image, SBOM, signing and image lint.",
          status: "Active. Documented in the repository.",
        },
        {
          repo: "N-Sharp", name: "N# and TUI-OS", kind: "Systems · Rust",
          problem: "Learning how a language and an operating system really work.",
          decision: "Build them: a typed language with its compiler, and a Linux desktop drawn as a terminal UI.",
          status: "Experimental. Tested in QEMU, not yet on real hardware.",
        },
      ],
    },
    code: {
      title: "Open source",
      all: "All", search: "Search projects", none: "No project matches.",
      cat: { systems: "Systems", apps: "Apps", tools: "Tools", games: "Games", learning: "Learning" },
      status: { active: "active", experimental: "experimental", design: "design", stable: "stable" },
    },
    contact: {
      title: "Contact",
      lead: "Describe what you need. This opens your email app with the message ready to send; nothing is stored on this site.",
      type: "What do you need?",
      types: ["Backend or API", "Android app", "Terminal or developer tool", "Website for a business", "Something else"],
      about: "About the project",
      aboutHint: "What problem should it solve, and for whom?",
      when: "When do you need it?",
      whens: ["No fixed date", "In 1–2 months", "As soon as possible"],
      send: "Write the email",
      required: "Describe the project first.",
      or: "Or write directly to",
      issues: "Open an issue on GitHub",
      subject: "Project enquiry",
      lines: { type: "Type", when: "When", about: "About" },
    },
    footer: "Built with care. Powered by curiosity.",
    ill: "01 // WINDOW",
    skip: "Skip to content",
  },
  es: {
    nav: { services: "Servicios", process: "Proceso", work: "Trabajo", code: "Código abierto", contact: "Contacto" },
    hero: {
      kicker: "Low Noise // Estudio de software",
      title: "Software a medida, con menos ruido.",
      lead: "Servicios backend, apps Android, herramientas de línea de comandos y webs para pequeños negocios. Alcance por escrito, desarrollo en pasos cortos, documentación y entrega.",
      cta: "Cuéntanos tu proyecto",
      secondary: "Ver nuestro trabajo",
    },
    services: {
      title: "Servicios",
      items: [
        { name: "Backend y APIs", body: "Servicios REST y modelos de datos que se siguen entendiendo. Validación, gestión de errores y tests desde el primer endpoint.", stack: "Java 21 · Spring Boot · PostgreSQL" },
        { name: "Apps Android", body: "Apps nativas con interfaz clara y un comportamiento honesto cuando faltan datos o conexión.", stack: "Kotlin · Jetpack Compose" },
        { name: "Herramientas de terminal y desarrollo", body: "CLIs, TUIs y utilidades de build rápidas que un equipo pequeño puede mantener.", stack: "Rust · Java · Shell" },
        { name: "Webs para pequeños negocios", body: "Sitios estáticos rápidos y accesibles con tu identidad visual, sin un CMS que mantener vivo.", stack: "HTML · CSS · TypeScript" },
      ],
    },
    process: {
      title: "Cómo trabajamos",
      steps: [
        ["Escuchar", "Una conversación corta sobre el problema, quién usará el resultado y qué no puede fallar."],
        ["Ponerlo por escrito", "Un alcance de una página: qué incluye, qué no y cómo sabremos que funciona."],
        ["Construir en pasos cortos", "Incrementos que funcionan y se pueden ver, con tests, para que las sorpresas salgan pronto."],
        ["Entregar", "Código fuente, documentación y un README que otro desarrollador pueda seguir. Es tuyo."],
      ],
      promise: "No se promete nada que no esté en el alcance. Si algo no se puede hacer bien, lo decimos antes de empezar.",
    },
    work: {
      title: "Trabajo destacado",
      note: "Proyectos propios, tal como son, incluido lo que todavía no hacen.",
      labels: { problem: "Problema", decision: "Decisión", status: "Estado" },
      cases: [
        {
          repo: "ryoku-transit", name: "Ryoku Transit", kind: "App Android · Kotlin",
          problem: "Horarios de autobús urbano difíciles de leer y sin una fuente fiable de tiempo real.",
          decision: "Mostrar los horarios programados del GTFS público y etiquetar cada dato como horario o referencia. No se simulan posiciones en vivo.",
          status: "Funciona con horarios programados. No tenemos acceso a datos en tiempo real.",
        },
        {
          repo: "Voxen", name: "Voxen", kind: "Herramienta de desarrollo · Java",
          problem: "Builds de contenedores lentos de razonar y difíciles de trazar.",
          decision: "Un solo pipeline delante de Docker: build, imagen mínima, SBOM, firma y lint de imagen.",
          status: "Activo. Documentado en el repositorio.",
        },
        {
          repo: "N-Sharp", name: "N# y TUI-OS", kind: "Sistemas · Rust",
          problem: "Aprender cómo funcionan de verdad un lenguaje y un sistema operativo.",
          decision: "Construirlos: un lenguaje tipado con su compilador y un escritorio Linux dibujado como TUI.",
          status: "Experimental. Probado en QEMU, todavía no en hardware real.",
        },
      ],
    },
    code: {
      title: "Código abierto",
      all: "Todos", search: "Buscar proyectos", none: "Ningún proyecto coincide.",
      cat: { systems: "Sistemas", apps: "Apps", tools: "Herramientas", games: "Juegos", learning: "Aprendizaje" },
      status: { active: "activo", experimental: "experimental", design: "diseño", stable: "estable" },
    },
    contact: {
      title: "Contacto",
      lead: "Describe lo que necesitas. Se abre tu app de correo con el mensaje listo para enviar; esta web no guarda nada.",
      type: "¿Qué necesitas?",
      types: ["Backend o API", "App Android", "Herramienta de terminal o desarrollo", "Web para un negocio", "Otra cosa"],
      about: "Sobre el proyecto",
      aboutHint: "¿Qué problema debe resolver y para quién?",
      when: "¿Para cuándo?",
      whens: ["Sin fecha fija", "En 1–2 meses", "Cuanto antes"],
      send: "Redactar el correo",
      required: "Describe primero el proyecto.",
      or: "O escribe directamente a",
      issues: "Abrir una issue en GitHub",
      subject: "Consulta de proyecto",
      lines: { type: "Tipo", when: "Plazo", about: "Sobre el proyecto" },
    },
    footer: "Hecho con cuidado. Movido por la curiosidad.",
    ill: "01 // VENTANA",
    skip: "Saltar al contenido",
  },
} as const;
