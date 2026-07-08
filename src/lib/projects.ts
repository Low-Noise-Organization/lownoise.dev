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
    github: "https://github.com/Low-Noise-Studio",
    category: "Applications",
  },
  {
    name: "CipherKey",
    description:
      "Modern encryption toolkit featuring intuitive CLI and TUI interfaces for secure file encryption, decryption, and key management.",
    tags: ["Rust", "CLI", "Security"],
    status: "Active Development",
    github: "https://github.com/Low-Noise-Studio",
    category: "Developer Tools",
  },
  {
    name: "Voxen",
    description:
      "A lightweight, performant game engine designed for 2D and voxel-based games with a focus on clean architecture and developer experience.",
    tags: ["Rust", "Game Engine", "OpenGL"],
    status: "Research",
    github: "https://github.com/Low-Noise-Studio",
    category: "Games",
  },
  {
    name: "Knight",
    description:
      "A minimal, fast static site generator built from scratch. Designed for developers who appreciate simplicity and Markdown-first workflows.",
    tags: ["Rust", "CLI", "Static Site"],
    status: "Planning",
    github: "https://github.com/Low-Noise-Studio",
    category: "Developer Tools",
  },
  {
    name: "Pretty Chat",
    description:
      "A beautiful, real-time messaging application with end-to-end encryption and a focus on privacy-first communication.",
    tags: ["Kotlin", "Android", "E2EE"],
    status: "Planning",
    github: "https://github.com/Low-Noise-Studio",
    category: "Applications",
  },
  {
    name: "Folio",
    description:
      "A portfolio CMS designed for developers who want to showcase their work without sacrificing control or performance.",
    tags: ["Kotlin", "Web", "CMS"],
    status: "Planning",
    category: "Developer Tools",
  },
  {
    name: "Community RPG",
    description:
      "An open-source role-playing game framework that empowers communities to create, share, and play custom RPG campaigns collaboratively.",
    tags: ["Rust", "Game Engine", "Open Source"],
    status: "Research",
    category: "Games",
  },
  {
    name: "De 0 a Java",
    description:
      "An educational series teaching Java programming from absolute zero. Focused on clarity, practice, and real understanding.",
    tags: ["Java", "Education", "Content"],
    status: "Published",
    category: "Education",
  },
];
