import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ORG } from "@/lib/projects";
import "./globals.css";

// Type system, bundled and subset to Latin (SIL OFL): Geist for everything, Geist Mono for labels and data.
const sans = localFont({ src: [{ path: "./fonts/Geist.woff2", weight: "100 900", style: "normal" }], variable: "--f-sans", display: "swap", fallback: ["system-ui", "sans-serif"] });
const mono = localFont({ src: [{ path: "./fonts/GeistMono.woff2", weight: "100 900", style: "normal" }], variable: "--f-mono", display: "swap", fallback: ["ui-monospace", "Menlo", "monospace"] });

const origin = "https://low-noise-organization.github.io";
const siteUrl = `${origin}/lownoise.dev/`; // Pages serves the site under /lownoise.dev/
const description =
  "Low Noise is a software studio: backend services, Android apps, command-line tools, small business websites, and AI and process automation for businesses. Scoped in writing, built in small steps, documented and handed over.";

export const metadata: Metadata = {
  // metadataBase is the origin only: Next already prefixes the basePath to the generated image paths.
  metadataBase: new URL(origin),
  title: { default: "Low Noise — Software studio", template: "%s | Low Noise" },
  description,
  alternates: { canonical: siteUrl },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg` }, // absolute: the hidden pages live in nested paths
  openGraph: {
    siteName: "Low Noise",
    title: "Low Noise — Custom software, with less noise",
    description,
    type: "website",
    url: siteUrl,
    locale: "en",
    alternateLocale: ["es"],
  },
  twitter: { card: "summary_large_image", title: "Low Noise — Custom software, with less noise", description },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#org`,
      name: "Low Noise",
      url: siteUrl,
      logo: `${siteUrl}favicon.svg`,
      description,
      sameAs: [`https://github.com/${ORG}`, "https://www.youtube.com/@Low_Noise-n4e"],
      knowsAbout: ["Backend development", "Android development", "Rust", "Developer tools", "Web development", "Process automation", "Applied AI"],
    },
    { "@type": "WebSite", "@id": `${siteUrl}#site`, url: siteUrl, name: "Low Noise", inLanguage: ["en", "es"], publisher: { "@id": `${siteUrl}#org` } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
