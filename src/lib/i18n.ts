export type Language = "en" | "es" | "it" | "fr";

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
];

type Translations = Record<string, Record<Language, string>>;

export const t: Translations = {
  /* Navigation */
  "nav.home": { en: "HOME", es: "INICIO", it: "HOME", fr: "ACCUEIL" },
  "nav.projects": { en: "PROJECTS", es: "PROYECTOS", it: "PROGETTI", fr: "PROJETS" },
  "nav.about": { en: "ABOUT", es: "SOBRE", it: "CHI SIAMO", fr: "À PROPOS" },
  "nav.tech": { en: "TECH", es: "TECNOLOGÍAS", it: "TECNOLOGIE", fr: "TECHNO" },
  "nav.contact": { en: "CONTACT", es: "CONTACTO", it: "CONTATTI", fr: "CONTACT" },
  "nav.language": { en: "LANG", es: "IDIOMA", it: "LINGUA", fr: "LANGUE" },
  "nav.theme": { en: "THEME", es: "TEMA", it: "TEMA", fr: "THÈME" },

  /* Hero */
  "hero.est": { en: "EST. 2026", es: "FUND. 2026", it: "FOND. 2026", fr: "FOND. 2026" },
  "hero.title": { en: "LOW NOISE", es: "LOW NOISE", it: "LOW NOISE", fr: "LOW NOISE" },
  "hero.subtitle1": { en: "Independent software engineering studio.", es: "Estudio independiente de ingeniería de software.", it: "Studio indipendente di ingegneria del software.", fr: "Studio indépendant d'ingénierie logicielle." },
  "hero.subtitle2": { en: "Quiet, intentional, precise.", es: "Tranquilo, intencional, preciso.", it: "Silenzioso, intenzionale, preciso.", fr: "Calme, intentionnel, précis." },
  "hero.viewProjects": { en: "▼ VIEW PROJECTS", es: "▼ VER PROYECTOS", it: "▼ VEDI PROGETTI", fr: "▼ VOIR PROJETS" },
  "hero.hireUs": { en: "► HIRE US", es: "► CONTRÁTANOS", it: "► ASSUMICI", fr: "► EMBARCHEZ-NOUS" },

  /* About section */
  "about.section": { en: "SECTION", es: "SECCIÓN", it: "SEZIONE", fr: "SECTION" },
  "about.title": { en: "ABOUT", es: "SOBRE NOSOTROS", it: "CHI SIAMO", fr: "À PROPOS" },
  "about.subtitle": { en: "Why Low Noise exists and the philosophy that guides every project.", es: "Por qué existe Low Noise y la filosofía que guía cada proyecto.", it: "Perché esiste Low Noise e la filosofia che guida ogni progetto.", fr: "Pourquoi Low Noise existe et la philosophie qui guide chaque projet." },
  "about.p1": { en: "Low Noise was born from a simple belief: software should be quiet. Not silent, but uncluttered. Intentional. Every line of code should earn its place, every feature should justify its existence, every dependency should prove it is necessary.", es: "Low Noise nació de una creencia simple: el software debe ser tranquilo. No silencioso, sino sin desorden. Intencional. Cada línea de código debe ganarse su lugar, cada característica debe justificar su existencia, cada dependencia debe demostrar que es necesaria.", it: "Low Noise è nato da una semplice convinzione: il software dovrebbe essere silenzioso. Non muto, ma ordinato. Intenzionale. Ogni riga di codice dovrebbe guadagnarsi il suo posto, ogni funzionalità dovrebbe giustificare la sua esistenza, ogni dipendenza dovrebbe dimostrare di essere necessaria.", fr: "Low Noise est né d'une conviction simple : le logiciel doit être calme. Pas silencieux, mais sans encombrement. Intentionnel. Chaque ligne de code doit mériter sa place, chaque fonctionnalité doit justifier son existence, chaque dépendance doit prouver qu'elle est nécessaire." },
  "about.p2": { en: "This is not theoretical. When building AndroidDrop, we chose Rust for the backend not because it is fashionable, but because zero-cost abstractions and memory safety matter for a tool that moves files across a network. When designing CipherKey, we spent weeks on the CLI interface — not because the encryption logic was hard, but because a security tool that is confusing to use is a security risk in itself.", es: "Esto no es teoría. Al construir AndroidDrop, elegimos Rust para el backend no porque esté de moda, sino porque las abstracciones de costo cero y la seguridad de memoria importan para una herramienta que mueve archivos a través de una red. Al diseñar CipherKey, pasamos semanas en la interfaz CLI, no porque la lógica de cifrado fuera difícil, sino porque una herramienta de seguridad confusa es un riesgo en sí misma.", it: "Questo non è teorico. Quando abbiamo costruito AndroidDrop, abbiamo scelto Rust per il backend non perché è di moda, ma perché le astrazioni a costo zero e la sicurezza della memoria sono importanti per uno strumento che sposta file attraverso una rete. Quando abbiamo progettato CipherKey, abbiamo passato settimane sull'interfaccia CLI — non perché la logica di crittografia fosse difficile, ma perché uno strumento di sicurezza confusionario è un rischio in sé.", fr: "Ce n'est pas théorique. Lors de la construction d'AndroidDrop, nous avons choisi Rust pour le backend non pas parce que c'est à la mode, mais parce que les abstractions à coût zéro et la sécurité mémoire comptent pour un outil qui déplace des fichiers sur un réseau. Lors de la conception de CipherKey, nous avons passé des semaines sur l'interface CLI — non pas parce que la logique de chiffrement était difficile, mais parce qu'un outil de sécurité déroutant est un risque en soi." },
  "about.p3": { en: "These decisions are invisible to the user. That is the point. Good engineering disappears. What remains is software that works, that feels natural, that does not get in the way.", es: "Estas decisiones son invisibles para el usuario. Ese es el punto. La buena ingeniería desaparece. Lo que queda es software que funciona, que se siente natural, que no estorba.", it: "Queste decisioni sono invisibili all'utente. Questo è il punto. La buona ingegneria scompare. Ciò che rimane è un software che funziona, che sembra naturale, che non intralcia.", fr: "Ces décisions sont invisibles pour l'utilisateur. C'est le but. La bonne ingénierie disparaît. Il reste un logiciel qui fonctionne, qui semble naturel, qui ne gêne pas." },
  "about.p4": { en: "Low Noise is not just a name. It is a promise. Every project under this studio is built with patience, curiosity, and an unwavering commitment to quality — because software built with care outlasts software built with haste.", es: "Low Noise no es solo un nombre. Es una promesa. Cada proyecto de este estudio se construye con paciencia, curiosidad y un compromiso inquebrantable con la calidad, porque el software construido con cuidado perdura más que el software construido con prisas.", it: "Low Noise non è solo un nome. È una promessa. Ogni progetto di questo studio è costruito con pazienza, curiosità e un impegno incrollabile per la qualità — perché il software costruito con cura sopravvive al software costruito in fretta.", fr: "Low Noise n'est pas qu'un nom. C'est une promesse. Chaque projet de ce studio est construit avec patience, curiosité et un engagement inébranlable envers la qualité — parce que le logiciel construit avec soin dure plus longtemps que le logiciel construit à la hâte." },
  "about.overview": { en: "OVERVIEW", es: "RESUMEN", it: "PANORAMICA", fr: "APERÇU" },
  "about.founded": { en: "FOUNDED", es: "FUNDADO", it: "FONDATO", fr: "FONDÉ" },
  "about.focus": { en: "FOCUS", es: "ENFOQUE", it: "FOCUS", fr: "FOCUS" },
  "about.approach": { en: "APPROACH", es: "ENFOQUE", it: "APPROCCIO", fr: "APPROCHE" },
  "about.license": { en: "LICENSE", es: "LICENCIA", it: "LICENZA", fr: "LICENCE" },
  "about.openSource": { en: "Open source by default", es: "Código abierto por defecto", it: "Open source di default", fr: "Open source par défaut" },
  "about.principlesTitle": { en: "PRINCIPLES", es: "PRINCIPIOS", it: "PRINCIPI", fr: "PRINCIPES" },
  "about.principlesSub": { en: "The values that shape every architectural decision, code review, and release.", es: "Los valores que moldean cada decisión arquitectónica, revisión de código y lanzamiento.", it: "I valori che modellano ogni decisione architetturale, revisione del codice e rilascio.", fr: "Les valeurs qui façonnent chaque décision architecturale, revue de code et publication." },
  "about.principlesDesc": { en: "These are not aspirational posters on a wall. They are decision-making tools. When we face a trade-off, we come back to these principles and ask: which choice aligns?", es: "Estos no son carteles aspiracionales en una pared. Son herramientas para tomar decisiones. Cuando enfrentamos una disyuntiva, volvemos a estos principios y preguntamos: ¿qué elección se alinea?", it: "Questi non sono poster aspirazionali su un muro. Sono strumenti decisionali. Quando affrontiamo un compromesso, torniamo a questi principi e chiediamo: quale scelta si allinea?", fr: "Ce ne sont pas des affiches aspirationnelles sur un mur. Ce sont des outils de décision. Face à un compromis, nous revenons à ces principes et demandons : quel choix s'aligne ?" },

  /* Principles */
  "principle.clarity": { en: "CLARITY", es: "CLARIDAD", it: "CHIAREZZA", fr: "CLARTÉ" },
  "principle.clarityDesc": { en: "Code should be readable by someone unfamiliar with the project. We prefer descriptive names, minimal nesting, and comments that explain why, not what. A codebase should reveal its intent at a glance.", es: "El código debe ser legible para alguien no familiarizado con el proyecto. Preferimos nombres descriptivos, anidación mínima y comentarios que expliquen por qué, no qué. Una base de código debe revelar su intención de un vistazo.", it: "Il codice dovrebbe essere leggibile da qualcuno che non conosce il progetto. Preferiamo nomi descrittivi, annidamento minimo e commenti che spiegano perché, non cosa. Un codebase dovrebbe rivelare la sua intenzione a colpo d'occhio.", fr: "Le code doit être lisible par quelqu'un qui ne connaît pas le projet. Nous préférons des noms descriptifs, un nesting minimal et des commentaires qui expliquent pourquoi, pas quoi. Un codebase doit révéler son intention en un coup d'œil." },
  "principle.maintainability": { en: "MAINTAINABILITY", es: "MANTENIBILIDAD", it: "MANUTENIBILITÀ", fr: "MAINTENABILITÉ" },
  "principle.maintainabilityDesc": { en: "Software is never finished. Every decision considers the person who will modify this code in six months — often ourselves. We choose boring, proven patterns over clever one-liners. Future-proofing is not optional.", es: "El software nunca está terminado. Cada decisión considera a la persona que modificará este código en seis meses, a menudo nosotros mismos. Elegimos patrones aburridos y probados sobre ingeniosas líneas únicas. Prepararse para el futuro no es opcional.", it: "Il software non è mai finito. Ogni decisione considera la persona che modificherà questo codice tra sei mesi — spesso noi stessi. Scegliamo schemi noiosi e collaudati piuttosto che battute intelligenti. Prepararsi per il futuro non è opzionale.", fr: "Le logiciel n'est jamais fini. Chaque décision considère la personne qui modifiera ce code dans six mois — souvent nous-mêmes. Nous choisissons des motifs ennuyeux et éprouvés plutôt que des astuces brillantes. Se préparer pour l'avenir n'est pas optionnel." },
  "principle.architecture": { en: "CLEAN ARCHITECTURE", es: "ARQUITECTURA LIMPIA", it: "ARCHITETTURA PULITA", fr: "ARCHITECTURE PROPRE" },
  "principle.architectureDesc": { en: "Structure reveals intent. We separate concerns not because fashion demands it, but because a well-layered codebase is cheaper to change, easier to test, and simpler to reason about at 2 AM.", es: "La estructura revela la intención. Separamos preocupaciones no porque la moda lo exija, sino porque una base de código bien estratificada es más barata de cambiar, más fácil de probar y más simple de razonar a las 2 AM.", it: "La struttura rivela l'intenzione. Separiamo le preoccupazioni non perché la moda lo richieda, ma perché un codebase ben stratificato è più economico da modificare, più facile da testare e più semplice da ragionare alle 2 di notte.", fr: "La structure révèle l'intention. Nous séparons les préoccupations non pas parce que la mode l'exige, mais parce qu'un codebase bien organisé est moins cher à modifier, plus facile à tester et plus simple à raisonner à 2 heures du matin." },
  "principle.ux": { en: "USER EXPERIENCE", es: "EXPERIENCIA DE USUARIO", it: "ESPERIENZA UTENTE", fr: "EXPÉRIENCE UTILISATEUR" },
  "principle.uxDesc": { en: "Software should respect the user's attention. Every click, every screen, every message should be necessary. We ship features that solve real problems, not features that inflate a changelog.", es: "El software debe respetar la atención del usuario. Cada clic, cada pantalla, cada mensaje debe ser necesario. Enviamos funciones que resuelven problemas reales, no funciones que inflan un registro de cambios.", it: "Il software dovrebbe rispettare l'attenzione dell'utente. Ogni clic, ogni schermata, ogni messaggio dovrebbe essere necessario. Pubblichiamo funzionalità che risolvono problemi reali, non funzionalità che gonfiano un changelog.", fr: "Le logiciel doit respecter l'attention de l'utilisateur. Chaque clic, chaque écran, chaque message doit être nécessaire. Nous livrons des fonctionnalités qui résolvent de vrais problèmes, pas des fonctionnalités qui gonflent un changelog." },
  "principle.opensource": { en: "OPEN SOURCE", es: "CÓDIGO ABIERTO", it: "OPEN SOURCE", fr: "OPEN SOURCE" },
  "principle.opensourceDesc": { en: "Knowledge grows when shared. Every Low Noise project is open by default — not because open source is trendy, but because transparent development produces better software. Our code is our documentation.", es: "El conocimiento crece cuando se comparte. Cada proyecto de Low Noise es abierto por defecto, no porque el código abierto esté de moda, sino porque el desarrollo transparente produce mejor software. Nuestro código es nuestra documentación.", it: "La conoscenza cresce quando viene condivisa. Ogni progetto Low Noise è aperto di default — non perché l'open source sia di moda, ma perché lo sviluppo trasparente produce software migliore. Il nostro codice è la nostra documentazione.", fr: "La connaissance grandit quand elle est partagée. Chaque projet Low Noise est ouvert par défaut — pas parce que l'open source est à la mode, mais parce que le développement transparent produit de meilleurs logiciels. Notre code est notre documentation." },
  "principle.learning": { en: "CONTINUOUS LEARNING", es: "APRENDIZAJE CONTINUO", it: "APPRENDIMENTO CONTINUO", fr: "APPRENTISSAGE CONTINU" },
  "principle.learningDesc": { en: "Every project teaches something. We deliberately explore unfamiliar languages, paradigms, and domains. CipherKey taught us Rust's memory model. Voxen is teaching us graphics pipelines. The studio grows with every commit.", es: "Cada proyecto enseña algo. Exploramos deliberadamente lenguajes, paradigmas y dominios desconocidos. CipherKey nos enseñó el modelo de memoria de Rust. Voxen nos está enseñando pipelines gráficos. El estudio crece con cada commit.", it: "Ogni progetto insegna qualcosa. Esploriamo deliberatamente linguaggi, paradigmi e domini sconosciuti. CipherKey ci ha insegnato il modello di memoria di Rust. Voxen ci sta insegnando le pipeline grafiche. Lo studio cresce con ogni commit.", fr: "Chaque projet enseigne quelque chose. Nous explorons délibérément des langages, paradigmes et domaines inconnus. CipherKey nous a appris le modèle mémoire de Rust. Voxen nous enseigne les pipelines graphiques. Le studio grandit à chaque commit." },

  /* Projects */
  "projects.section": { en: "SECTION", es: "SECCIÓN", it: "SEZIONE", fr: "SECTION" },
  "projects.title": { en: "FEATURED PROJECTS", es: "PROYECTOS DESTACADOS", it: "PROGETTI IN EVIDENZA", fr: "PROJETS PHARES" },
  "projects.subtitle": { en: "A curated selection of our work. View all projects for the complete portfolio.", es: "Una selección curada de nuestro trabajo. Ver todos los proyectos para el portafolio completo.", it: "Una selezione curata del nostro lavoro. Vedi tutti i progetti per il portfolio completo.", fr: "Une sélection curated de notre travail. Voir tous les projets pour le portfolio complet." },
  "projects.viewAll": { en: "VIEW ALL PROJECTS →", es: "VER TODOS LOS PROYECTOS →", it: "VEDI TUTTI I PROGETTI →", fr: "VOIR TOUS LES PROJETS →" },

  /* All Projects page */
  "allProjects.title": { en: "ALL PROJECTS", es: "TODOS LOS PROYECTOS", it: "TUTTI I PROGETTI", fr: "TOUS LES PROJETS" },
  "allProjects.subtitle": { en: "Every project we've built, with complete technical details. Click to expand.", es: "Cada proyecto que hemos construido, con detalles técnicos completos. Haz clic para expandir.", it: "Ogni progetto che abbiamo costruito, con dettagli tecnici completi. Clicca per espandere.", fr: "Chaque projet que nous avons construit, avec des détails techniques complets. Cliquez pour développer." },
  "allProjects.back": { en: "BACK TO HOME", es: "VOLVER AL INICIO", it: "TORNA ALLA HOME", fr: "RETOUR À L'ACCUEIL" },

  /* Technologies */
  "tech.title": { en: "TECHNOLOGIES", es: "TECNOLOGÍAS", it: "TECNOLOGIE", fr: "TECHNOLOGIES" },
  "tech.subtitle": { en: "Languages, platforms, and disciplines.", es: "Lenguajes, plataformas y disciplinas.", it: "Linguaggi, piattaforme e discipline.", fr: "Langages, plateformes et disciplines." },

  /* YouTube */
  "youtube.title": { en: "YOUTUBE", es: "YOUTUBE", it: "YOUTUBE", fr: "YOUTUBE" },
  "youtube.subtitle": { en: "Real software engineering, recorded without a script.", es: "Ingeniería de software real, grabada sin guión.", it: "Ingegneria del software reale, registrata senza copione.", fr: "Génie logiciel réel, enregistré sans script." },
  "youtube.desc": { en: "Low Noise shares real software engineering content. Not tutorials that assume perfect conditions, but honest development logs showing the full picture — including the mistakes, the dead ends, and the refactors.", es: "Low Noise comparte contenido real de ingeniería de software. No tutoriales que asumen condiciones perfectas, sino registros de desarrollo honestos que muestran el panorama completo, incluidos los errores, los callejones sin salida y las refactorizaciones.", it: "Low Noise condivide contenuti reali di ingegneria del software. Non tutorial che assumono condizioni perfette, ma registri di sviluppo onesti che mostrano il quadro completo — inclusi errori, vicoli ciechi e refactoring.", fr: "Low Noise partage du contenu réel de génie logiciel. Pas des tutoriels qui supposent des conditions parfaites, mais des journaux de développement honnêtes montrant l'image complète — y compris les erreurs, les impasses et les refactorisations." },
  "youtube.watch": { en: "Watch on YouTube", es: "Ver en YouTube", it: "Guarda su YouTube", fr: "Regarder sur YouTube" },

  /* Contact */
  "contact.title": { en: "CONTACT", es: "CONTACTO", it: "CONTATTI", fr: "CONTACT" },
  "contact.subtitle": { en: "Get in touch.", es: "Ponte en contacto.", it: "Mettiti in contatto.", fr: "Prenez contact." },
  "contact.social": { en: "SOCIAL", es: "SOCIAL", it: "SOCIAL", fr: "SOCIAL" },
  "contact.email": { en: "EMAIL", es: "EMAIL", it: "EMAIL", fr: "EMAIL" },
  "contact.whatsapp": { en: "WHATSAPP", es: "WHATSAPP", it: "WHATSAPP", fr: "WHATSAPP" },
  "contact.discord": { en: "DISCORD", es: "DISCORD", it: "DISCORD", fr: "DISCORD" },
  "contact.desc1": { en: "Found a bug? Want to contribute? Have an idea for a project?", es: "¿Encontraste un error? ¿Quieres contribuir? ¿Tienes una idea para un proyecto?", it: "Trovato un bug? Vuoi contribuire? Hai un'idea per un progetto?", fr: "Trouvé un bug? Vous voulez contribuer? Vous avez une idée de projet?" },
  "contact.desc2": { en: "Also open to: bad puns about segfaults, architecture debates, and recommendations for good terminal fonts.", es: "También abierto a: malos chistes sobre segfaults, debates de arquitectura y recomendaciones de buenas fuentes para terminal.", it: "Aperto anche a: brutti giochi di parole sui segfault, dibattiti sull'architettura e consigli su buoni font per terminale.", fr: "Également ouvert à : les jeux de mots sur les segfaults, les débats d'architecture et les recommandations de bons polices pour terminal." },
  "contact.name": { en: "NAME", es: "NOMBRE", it: "NOME", fr: "NOM" },
  "contact.emailLabel": { en: "EMAIL", es: "EMAIL", it: "EMAIL", fr: "EMAIL" },
  "contact.subject": { en: "SUBJECT", es: "ASUNTO", it: "OGGETTO", fr: "SUJET" },
  "contact.message": { en: "MESSAGE", es: "MENSAJE", it: "MESSAGGIO", fr: "MESSAGE" },
  "contact.sending": { en: "■ SENDING...", es: "■ ENVIANDO...", it: "■ INVIO...", fr: "■ ENVOI..." },
  "contact.sent": { en: "✓ SENT", es: "✓ ENVIADO", it: "✓ INVIATO", fr: "✓ ENVOYÉ" },
  "contact.sendWhatsApp": { en: "↗ SEND VIA WHATSAPP", es: "↗ ENVIAR POR WHATSAPP", it: "↗ INVIA VIA WHATSAPP", fr: "↗ ENVOYER VIA WHATSAPP" },
  "contact.sendDiscord": { en: "↗ SEND VIA DISCORD", es: "↗ ENVIAR POR DISCORD", it: "↗ INVIA VIA DISCORD", fr: "↗ ENVOYER VIA DISCORD" },
  "contact.sendEmail": { en: "↗ SEND EMAIL", es: "↗ ENVIAR EMAIL", it: "↗ INVIA EMAIL", fr: "↗ ENVOYER EMAIL" },
  "contact.emailjsConfig": { en: "Configure EmailJS keys in Contact.tsx", es: "Configura las claves de EmailJS en Contact.tsx", it: "Configura le chiavi EmailJS in Contact.tsx", fr: "Configurez les clés EmailJS dans Contact.tsx" },
  "contact.discordConfig": { en: "Configure Discord webhook URL in Contact.tsx", es: "Configura la URL del webhook de Discord en Contact.tsx", it: "Configura l'URL del webhook di Discord in Contact.tsx", fr: "Configurez l'URL du webhook Discord dans Contact.tsx" },
  "contact.copied": { en: "COPIED!", es: "¡COPIADO!", it: "COPIATO!", fr: "COPIÉ!" },
  "contact.githubDesc": { en: "Explore repositories, open issues, submit PRs", es: "Explora repositorios, abre issues, envía PRs", it: "Esplora repository, apri issue, invia PR", fr: "Explorez les dépôts, ouvrez des issues, soumettez des PR" },
  "contact.linkedinDesc": { en: "Professional profile and connections", es: "Perfil profesional y conexiones", it: "Profilo professionale e connessioni", fr: "Profil professionnel et connexions" },
  "contact.emailDesc": { en: "Direct messages", es: "Mensajes directos", it: "Messaggi diretti", fr: "Messages directs" },
  "contact.discordDesc": { en: "Join our server or DM", es: "Únete a nuestro servidor o MD", it: "Unisciti al server o DM", fr: "Rejoignez notre serveur ou MP" },

  /* Footer */
  "footer.pages": { en: "PAGES", es: "PÁGINAS", it: "PAGINE", fr: "PAGES" },
  "footer.more": { en: "MORE", es: "MÁS", it: "ALTRO", fr: "PLUS" },
  "footer.connect": { en: "CONNECT", es: "CONECTAR", it: "CONNETTI", fr: "CONNECTER" },
  "footer.tagline": { en: "Independent software engineering studio. Quiet, intentional, precise.", es: "Estudio independiente de ingeniería de software. Tranquilo, intencional, preciso.", it: "Studio indipendente di ingegneria del software. Silenzioso, intenzionale, preciso.", fr: "Studio indépendant d'ingénierie logicielle. Calme, intentionnel, précis." },
  "footer.rights": { en: "ALL RIGHTS RESERVED.", es: "TODOS LOS DERECHOS RESERVADOS.", it: "TUTTI I DIRITTI RISERVATI.", fr: "TOUS DROITS RÉSERVÉS." },
  "footer.built": { en: "BUILT WITH JAVA, RUST, KOTLIN & BASH", es: "CONSTRUIDO CON JAVA, RUST, KOTLIN Y BASH", it: "COSTRUITO CON JAVA, RUST, KOTLIN E BASH", fr: "CONSTRUIT AVEC JAVA, RUST, KOTLIN ET BASH" },

  /* Status */
  "status.published": { en: "PUBLISHED", es: "PUBLICADO", it: "PUBBLICATO", fr: "PUBLIÉ" },
  "status.activeDev": { en: "ACTIVE DEV", es: "DESARROLLO ACTIVO", it: "SVILUPPO ATTIVO", fr: "DÉVELOPPEMENT ACTIF" },
  "status.research": { en: "RESEARCH", es: "INVESTIGACIÓN", it: "RICERCA", fr: "RECHERCHE" },
  "status.planning": { en: "PLANNING", es: "PLANIFICACIÓN", it: "PIANIFICAZIONE", fr: "PLANIFICATION" },

  /* ProjectDetails */
  "project.techStack": { en: "TECH STACK", es: "STACK TECNOLÓGICO", it: "STACK TECNOLOGICO", fr: "STACK TECHNIQUE" },
  "project.features": { en: "KEY FEATURES", es: "CARACTERÍSTICAS CLAVE", it: "CARATTERISTICHE PRINCIPALI", fr: "FONCTIONNALITÉS CLÉS" },
  "project.highlights": { en: "HIGHLIGHTS", es: "DESTACADOS", it: "PUNTI SALIENTI", fr: "POINTS FORTS" },
  "project.viewGithub": { en: "VIEW ON GITHUB →", es: "VER EN GITHUB →", it: "VEDI SU GITHUB →", fr: "VOIR SUR GITHUB →" },
};
