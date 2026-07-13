import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Low Noise — Software Engineering",
    short_name: "Low Noise",
    description:
      "Adrián Velasco · Backend Developer especializado en Java, ciberseguridad y sistemas.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090e",
    theme_color: "#07090e",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
