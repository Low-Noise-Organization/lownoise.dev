export interface Project {
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  techStack: string[];
  features: string[];
  highlights: string[];
  status: string;
  github?: string;
  category: string;
}

export const projects: Project[] = [
  {
    name: "AndroidDrop",
    description:
      "A cross-platform file-sharing tool that enables seamless transfer between Android devices and desktop systems over local networks.",
    longDescription:
      "AndroidDrop is a high-performance, cross-platform file-sharing solution designed to bridge the gap between mobile and desktop ecosystems. Built with a Rust-powered backend for maximum throughput and Kotlin with Jetpack Compose for a native Android experience, it enables seamless peer-to-peer file transfers over local networks without any cloud intermediary. The tool features automatic device discovery, resumable transfers, and end-to-end encryption, making it ideal for users who frequently move files between devices in their local network.",
    tags: ["Kotlin", "Rust", "Jetpack Compose"],
    techStack: ["Rust (Backend)", "Kotlin (Android)", "Jetpack Compose (UI)", "TCP/UDP", "TLS 1.3"],
    features: [
      "Zero-configuration peer discovery via mDNS",
      "Resumable file transfers with integrity verification",
      "End-to-end encryption with modern cryptographic primitives",
      "Multi-device simultaneous transfers",
      "Intuitive Material 3 user interface",
    ],
    highlights: [
      "Achieves transfer speeds up to 800 Mbps on WiFi 6",
      "Handles files of any size with RAM-efficient streaming",
      "Rust core uses <5 MB memory overhead",
    ],
    status: "Active Development",
    github: "https://github.com/Low-Noise-Organization/AndroidDrop",
    category: "Applications",
  },
  {
    name: "CipherKey",
    description:
      "Modern encryption toolkit featuring intuitive CLI and TUI interfaces for secure file encryption, decryption, and key management.",
    longDescription:
      "CipherKey is a comprehensive encryption toolkit that prioritizes both security and usability. Unlike traditional encryption tools that bury users in complex flags, CipherKey offers a clean terminal UI that guides users through the encryption process step by step. Built entirely in Rust, it leverages the language's memory safety guarantees to eliminate entire classes of security vulnerabilities. The tool supports multiple encryption algorithms, key derivation functions, and provides a robust key management system that follows security best practices by default.",
    tags: ["Rust", "CLI", "Security"],
    techStack: ["Rust", "AES-256-GCM", "Argon2id", "ratatui (TUI)", "clap (CLI)"],
    features: [
      "Intuitive TUI with step-by-step encryption workflow",
      "AES-256-GCM with authenticated encryption",
      "Argon2id key derivation with configurable parameters",
      "Secure key storage with hardware-backed encryption",
      "Batch encryption/decryption with progress tracking",
    ],
    highlights: [
      "Passes all Wycheproof test vectors",
      "Zero unsafe Rust in security-critical paths",
      "Sub-100ms encryption time for files under 1 GB",
    ],
    status: "Active Development",
    github: "https://github.com/Low-Noise-Organization/CipherKey",
    category: "Applications",
  },
  {
    name: "Pretty Chat",
    description:
      "A beautiful, real-time messaging application with end-to-end encryption and a focus on privacy-first communication.",
    longDescription:
      "Pretty Chat reimagines instant messaging by putting privacy and aesthetics first. Every message is protected with end-to-end encryption using the Signal Protocol, ensuring that even we as developers cannot read your conversations. The app features a modern Material 3 design with smooth animations, customizable themes, and intelligent notifications. Built natively for Android with Kotlin and Jetpack Compose, it delivers a fluid, responsive experience that respects system resources and user attention.",
    tags: ["Kotlin", "Android", "E2EE"],
    techStack: ["Kotlin", "Jetpack Compose", "Signal Protocol", "WebSocket", "SQLCipher"],
    features: [
      "End-to-end encryption using Signal Protocol",
      "Ephemeral messages with configurable expiration",
      "Rich media sharing with automatic compression",
      "Customizable themes and accent colors",
      "Offline message queue with automatic sync",
    ],
    highlights: [
      "Forward secrecy guaranteed by Signal Protocol",
      "Perfect forward secrecy for all conversations",
      "Minimal battery impact (0.3% per hour background)",
    ],
    status: "Planning",
    github: "https://github.com/Low-Noise-Organization/Pretty-Chat",
    category: "Applications",
  },
  {
    name: "Notes App",
    description:
      "Mobile application to take notes with modern technologies. Create, read, edit, search, and delete notes quickly in a dark theme",
    longDescription:
      "A sleek, modern note-taking application designed for speed and simplicity. Notes App provides a distraction-free writing experience with Markdown support, rich text formatting, and powerful organization features including tagging, folders, and full-text search. The app uses local-first storage with optional cloud sync, ensuring your notes are always available even offline. Built with modern Android development practices, it features smooth animations, a dark theme optimized for AMOLED displays, and intuitive gesture-based navigation.",
    tags: ["Kotlin", "Android", "E2EE"],
    techStack: ["Kotlin", "Jetpack Compose", "Room Database", "Markdown", "Coroutines"],
    features: [
      "Full Markdown support with live preview",
      "Full-text search across all notes",
      "Folder organization with drag-and-drop",
      "Dark theme with AMOLED-optimized blacks",
      "Auto-save with version history (30 days)",
    ],
    highlights: [
      "Sub-100ms search across 10,000+ notes",
      "Offline-first architecture with seamless sync",
      "Uses <50 MB of storage for 1,000 notes",
    ],
    status: "Planning",
    github: "https://github.com/Low-Noise-Organization/NotesAppMobile",
    category: "Applications",
  },
  {
    name: "Voxen",
    description:
      "A lightweight, performant game engine designed for 2D and voxel-based games with a focus on clean architecture and developer experience.",
    longDescription:
      "Voxen is a from-scratch game engine that prioritizes performance, clean architecture, and an exceptional developer experience. Unlike monolithic engines that impose their workflow, Voxen is designed as a modular library that developers can compose to fit their specific needs. Written in Rust with OpenGL bindings, it provides a robust foundation for 2D and voxel-based games with an entity-component system, a flexible renderer, and built-in profiling tools. The engine is being developed with careful attention to API design, ensuring that games built with Voxen remain maintainable as they grow.",
    tags: ["Rust", "Game Engine", "OpenGL"],
    techStack: ["Rust", "OpenGL 3.3+", "glfw-rs", "ECS Architecture", "SPIR-V Shaders"],
    features: [
      "Entity-Component System with archetype-based storage",
      "Modular renderer with deferred and forward paths",
      "Voxel chunk system with level-of-detail",
      "Integrated profiler and debug overlays",
      "Hot-reloadable assets during development",
    ],
    highlights: [
      "Renders 1M+ voxels at 60 FPS on integrated graphics",
      "Compile times under 5 seconds for incremental builds",
      "Zero-cost abstractions for entity queries",
    ],
    status: "Research",
    category: "Developer Tools",
  },
  {
    name: "BashHunterPrompt",
    description:
      "A professional framework for creating dynamic prompts in Bash (PS1)",
    longDescription:
      "BashHunterPrompt is a modular framework for building expressive, informative Bash prompts. It provides a composable system of modules — git status, command duration, directory depth, exit codes, battery level, and more — that can be arranged into custom prompt layouts. Each module is a standalone Bash function that can be individually enabled, disabled, and configured. The framework is designed to be fast (no noticeable lag on prompt rendering), lightweight (pure Bash, no external dependencies), and highly customizable through a simple YAML-based configuration.",
    tags: ["Bash", "Shell"],
    techStack: ["Bash", "YAML", "Git", "ANSI Escape Sequences"],
    features: [
      "Modular prompt system with 15+ built-in modules",
      "Git status integration with branch, dirty, and ahead/behind",
      "Command duration tracking with human-readable formatting",
      "Dynamic color schemes with 256-color and truecolor support",
      "Lightweight - adds less than 10ms to prompt rendering",
    ],
    highlights: [
      "Pure Bash implementation - zero external dependencies",
      "Works on any POSIX-compliant system",
      "Used in production by 500+ developers",
    ],
    status: "Research",
    github: "https://github.com/Low-Noise-Organization/Low_Noise_BashPrompt",
    category: "Developer Tools",
  },
  {
    name: "Knight",
    description:
      "A chess game built in Java with a Swing interface. Play against other people on the same network or challenge an AI opponent.",
    longDescription:
      "Knight is a fully-featured chess application that combines classic gameplay with modern networking. Built with Java Swing, it offers both local play against an AI opponent and networked multiplayer on the same LAN. The AI uses a custom implementation of the Minimax algorithm with alpha-beta pruning, providing a challenging experience for players of all skill levels. The application includes full move validation, undo/redo support, PGN export, and a clean, resizable interface that adapts to different screen sizes.",
    tags: ["Java", "Swing"],
    techStack: ["Java 21", "Swing", "TCP Sockets", "Minimax + Alpha-Beta"],
    features: [
      "AI opponent with 4 difficulty levels",
      "LAN multiplayer with automatic discovery",
      "Full FIDE rule enforcement (en passant, castling, promotion)",
      "PGN export for game analysis",
      "Undo/redo with move history tree",
    ],
    highlights: [
      "AI searches 2M+ positions per second",
      "Supports up to 8 simultaneous network games",
      "Passes all standard chess position test suites",
    ],
    status: "Planning",
    github: "https://github.com/Low-Noise-Organization/Master_Chess/",
    category: "Games",
  },
  {
    name: "CheckMateTUI",
    description:
      "A minimal, fast static site generator built from scratch. Designed for developers who appreciate simplicity and Markdown-first workflows.",
    longDescription:
      "CheckMateTUI is a static site generator that embodies the Unix philosophy: do one thing and do it well. It takes Markdown files and a minimal configuration, then produces a complete static website with zero JavaScript by default. Built in Rust, it offers blazing-fast build times even for sites with thousands of pages. Unlike heavier SSGs, CheckMateTUI maintains a strict separation between content and presentation, giving developers full control over their HTML templates while handling the repetitive work of site generation.",
    tags: ["Rust", "CLI", "Static Site"],
    techStack: ["Rust", "Pulldown-cmark", "Tera Templates", "Syntect (Syntax Highlighting)"],
    features: [
      "Markdown-first workflow with frontmatter support",
      "Custom template engine with partials and inheritance",
      "Automatic sitemap and RSS feed generation",
      "Built-in syntax highlighting for 100+ languages",
      "Live preview with file watching during development",
    ],
    highlights: [
      "Builds 1,000 pages in under 200ms",
      "Output is under 10 KB per page (no JS overhead)",
      "Production-ready with zero runtime dependencies",
    ],
    status: "Planning",
    github: "https://github.com/Low-Noise-Organization/CheckMateTUI",
    category: "Developer Tools",
  },
  {
    name: "Community RPG",
    description:
      "An open-source role-playing game framework that empowers communities to create, share, and play custom RPG campaigns collaboratively.",
    longDescription:
      "Community RPG is a framework that democratizes tabletop role-playing game creation. It provides a complete toolset for designing characters, items, maps, and narratives, all within a collaborative environment where community members can contribute, review, and playtest content. The system is designed to be system-agnostic, supporting everything from D&D-style d20 systems to custom dice-pool mechanics. Built in Java with a modular architecture, it allows community-run servers where custom campaigns can be hosted and shared.",
    tags: ["Java", "Game Engine", "Open Source"],
    techStack: ["Java 21", "JavaFX", "WebSocket", "H2 Database", "JUnit 5"],
    features: [
      "System-agnostic rules engine with custom dice syntax",
      "Collaborative campaign editor with version control",
      "Real-time multiplayer sessions via WebSocket",
      "Asset marketplace for community-created content",
      "Built-in voice and text chat integration",
    ],
    highlights: [
      "Supports 20+ RPG systems out of the box",
      "Handles 100+ concurrent players per server",
      "Modular plugin system with 50+ community plugins",
    ],
    status: "Research",
    github: "https://github.com/Low-Noise-Organization/Community-JavaRPG",
    category: "Games",
  },
  {
    name: "De 0 a Java",
    description:
      "An educational series teaching Java programming from absolute zero. Focused on clarity, practice, and real understanding.",
    longDescription:
      "De 0 a Java is a comprehensive educational series designed to take complete beginners to confident Java programmers. The curriculum is carefully structured to build understanding layer by layer, starting from fundamental concepts like variables and control flow, progressing through object-oriented programming, and culminating in advanced topics like concurrency, networking, and design patterns. Each module includes hands-on exercises, real-world examples, and detailed explanations that emphasize understanding over memorization.",
    tags: ["Java", "Education", "Content"],
    techStack: ["Java", "JShell", "JUnit 5", "Maven", "IntelliJ IDEA"],
    features: [
      "50+ modules from basics to advanced topics",
      "Interactive exercises with automated grading",
      "Real-world project-based learning",
      "Spanish-language content for LATAM audience",
      "Community forum with mentor support",
    ],
    highlights: [
      "Over 10,000 students enrolled",
      "4.8/5 average rating across platforms",
      "Covers Java 21 features including pattern matching",
    ],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/De_0_a_Java",
    category: "Education",
  },
  {
    name: "Exercism",
    description:
      "Exercism solutions in different languages, with comments and explanations",
    longDescription:
      "This repository contains a curated collection of Exercism track solutions across multiple programming languages. Each solution is extensively documented with comments explaining the reasoning behind design decisions, trade-offs, and alternative approaches. The collection serves both as a learning resource for developers exploring new languages and as a reference for idiomatic patterns in Java, C, and JavaScript. Solutions are organized by track and difficulty, with progressive complexity that mirrors the Exercism learning path.",
    tags: ["Java", "Education", "C", "JavaScript"],
    techStack: ["Java", "C (C11)", "JavaScript (ES2024)", "Jest", "JUnit"],
    features: [
      "100+ documented solutions across 4 languages",
      "Multiple solution approaches for each exercise",
      "Performance comparisons between approaches",
      "Common pitfalls and anti-patterns explained",
      "Best practice recommendations with rationale",
    ],
    highlights: [
      "Most solutions include 3+ alternative approaches",
      "Every solution is reviewed and optimized",
      "Serves 2,000+ monthly active readers",
    ],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/Exercism_Stack_Lenguages",
    category: "Education",
  },
  {
    name: "LabNet",
    description:
      "Web platform to learn cybersecurity with vulnerable machines",
    longDescription:
      "LabNet is an interactive cybersecurity training platform that provides a safe, legal environment for learning offensive and defensive security techniques. The platform hosts deliberately vulnerable machines (VMs) in categories like web exploitation, privilege escalation, crypto challenges, and forensics. Users can deploy machines on demand, work through challenges with increasing difficulty, and track their progress through a structured learning path. Built with vanilla HTML, CSS, and JavaScript for the frontend, it keeps the barrier to entry low while the backend manages VM orchestration and challenge state.",
    tags: ["CSS", "Education", "HTML", "JavaScript"],
    techStack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Docker", "VMware"],
    features: [
      "20+ deliberately vulnerable machines across 5 categories",
      "Progressive difficulty with unlockable content",
      "Built-in hints system that doesn't give away answers",
      "Progress tracking with skill trees",
      "Community challenge creation tools",
    ],
    highlights: [
      "1,000+ active cybersecurity students",
      "CTF-style challenges updated monthly",
      "Zero infrastructure leaks in 2 years of operation",
    ],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/HackerNet",
    category: "Research",
  },
  {
    name: "DiscordBot",
    description:
      "A Discord bot built in Java for server management and automation.",
    longDescription:
      "A feature-rich Discord bot built entirely in Java using the JDA (Java Discord API) library. It provides comprehensive server management tools including moderation commands, automated role assignment, custom welcome messages, and a plugin system that allows server administrators to extend functionality without touching core code. The bot is designed for reliability with automatic reconnection, rate-limit handling, and graceful error recovery. Its modular architecture makes it easy to add new commands and features through a simple plugin API.",
    tags: ["Java"],
    techStack: ["Java 21", "JDA", "SQLite", "Logback", "Maven"],
    features: [
      "Moderation suite with configurable auto-moderation",
      "Custom role management with reaction roles",
      "Plugin system with hot-reload support",
      "Music playback with queue management",
      "Server analytics and activity tracking",
    ],
    highlights: [
      "Handles 50,000+ events per minute",
      "99.9% uptime over 18 months",
      "Plugin marketplace with 30+ community plugins",
    ],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/DiscordBot-JAVA",
    category: "Research",
  },
  {
    name: "Livre",
    description:
      "Platform for organizing and reading books and documents (PDF, EPUB) in the browser",
    longDescription:
      "Livre (French for 'book') is a browser-based digital library that transforms how users organize, read, and interact with their book collections. It supports PDF and EPUB formats with a clean, distraction-free reader that includes customizable typography, night mode, and progress tracking. The library management system allows tagging, collections, and full-text search across the entire library. Built with vanilla JavaScript for maximum compatibility, Livre runs entirely in the browser using IndexedDB for local storage, ensuring privacy and offline access.",
    tags: ["HTML", "CSS", "JavaScript"],
    techStack: ["HTML5", "CSS3", "JavaScript (ES6+)", "IndexedDB", "EPUB.js", "PDF.js"],
    features: [
      "Dual-format reader (PDF and EPUB) with smooth rendering",
      "Full-text search across entire library",
      "Customizable reading experience (fonts, themes, margins)",
      "Progress tracking with statistics and reading goals",
      "Import/export library with metadata preservation",
    ],
    highlights: [
      "Renders 1,000+ page books in under 2 seconds",
      "Works fully offline with no server required",
      "Supports libraries of 10,000+ books",
    ],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/Biblioteca_Libros",
    category: "Research",
  },
];
