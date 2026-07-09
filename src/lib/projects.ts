export interface Project {
  name: string;
  description: string;
  tags: string[];
  status: string;
  github?: string;
  category: string;
}

export const projects: Project[] = [
  {
    name: "AndroidDrop",
    description:
      "A cross-platform file-sharing tool that enables seamless transfer between Android devices and desktop systems over local networks.",
    tags: ["Kotlin", "Rust", "Jetpack Compose"],
    status: "Active Development",
    github: "https://github.com/Low-Noise-Organization/AndroidDrop",
    category: "Applications",
  },
  {
    name: "CipherKey",
    description:
      "Modern encryption toolkit featuring intuitive CLI and TUI interfaces for secure file encryption, decryption, and key management.",
    tags: ["Rust", "CLI", "Security"],
    status: "Active Development",
    github: "https://github.com/Low-Noise-Organization/CipherKey",
    category: "Applications",
  },
  {
    name: "Pretty Chat",
    description:
      "A beautiful, real-time messaging application with end-to-end encryption and a focus on privacy-first communication.",
    tags: ["Kotlin", "Android", "E2EE"],
    status: "Planning",
    github: "https://github.com/Low-Noise-Organization/Pretty-Chat",
    category: "Applications",
  },
  {
    name: "Notes App",
    description:
      "Mobile application to take notes with modern technologies. Create, read, edit, search, and delete notes quickly in a dark theme",
    tags: ["Kotlin", "Android", "E2EE"],
    status: "Planning",
    github: "https://github.com/Low-Noise-Organization/NotesAppMobile",
    category: "Applications",
  },
  {
    name: "Voxen",
    description:
      "A lightweight, performant game engine designed for 2D and voxel-based games with a focus on clean architecture and developer experience.",
    tags: ["Rust", "Game Engine", "OpenGL"],
    status: "Research",
    category: "Developer Tools",
  },
  {
    name: "BashHunterPrompt",
    description:
      "A professional framework for creating dynamic prompts in Bash (PS1)",
    tags: ["Bash", "Shell"],
    status: "Research",
    github: "https://github.com/Low-Noise-Organization/Low_Noise_BashPrompt",
    category: "Developer Tools",
  },
  {
    name: "Knight",
    description:
      "A chess game built in Java with a Swing interface. Play against other people on the same network or challenge an AI opponent.",
    tags: ["Java", "Swing"],
    status: "Planning",
    github: "https://github.com/Low-Noise-Organization/Master_Chess/",
    category: "Games",
  },
  {
    name: "CheckMateTUI",
    description:
      "A minimal, fast static site generator built from scratch. Designed for developers who appreciate simplicity and Markdown-first workflows.",
    tags: ["Rust", "CLI", "Static Site"],
    status: "Planning",
    github: "https://github.com/Low-Noise-Organization/CheckMateTUI",
    category: "Developer Tools",
  },
  {
    name: "Community RPG",
    description:
      "An open-source role-playing game framework that empowers communities to create, share, and play custom RPG campaigns collaboratively.",
    tags: ["Java", "Game Engine", "Open Source"],
    status: "Research",
    github: "https://github.com/Low-Noise-Organization/Community-JavaRPG",
    category: "Games",
  },
  {
    name: "De 0 a Java",
    description:
      "An educational series teaching Java programming from absolute zero. Focused on clarity, practice, and real understanding.",
    tags: ["Java", "Education", "Content"],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/De_0_a_Java",
    category: "Education",
  },
  {
    name: "Exercism",
    description:
      "Exercism solutions in different languages, with comments and explanations",
    tags: ["Java", "Education", "C", "JavaScript"],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/Exercism_Stack_Lenguages",
    category: "Education",
  },
  {
    name: "LabNet",
    description:
      "Web platform to learn cybersecurity with vulnerable machines",
    tags: ["CSS", "Education", "HTML", "JavaScript"],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/HackerNet",
    category: "Research",
  },
  {
    name: "DiscordBot",
    description:
      "A Discord bot built in Java for server management and automation.",
    tags: ["Java"],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/DiscordBot-JAVA",
    category: "Research",
  },
  {
    name: "Livre",
    description:
      "Platform for organizing and reading books and documents (PDF, EPUB) in the browser",
    tags: ["HTML", "CSS", "JavaScript"],
    status: "Published",
    github: "https://github.com/Low-Noise-Organization/Biblioteca_Libros",
    category: "Research",
  },
];
