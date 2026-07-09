export interface TechGroup {
  title: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  {
    title: "Languages",
    items: ["Java", "Rust", "Kotlin", "Bash"],
  },
  {
    title: "Platforms",
    items: ["Linux", "Android", "Desktop"],
  },
  {
    title: "Interests",
    items: [
      "Open Source",
      "CLI",
      "TUI",
      "Cybersecurity",
      "Software Architecture",
    ],
  },
];
