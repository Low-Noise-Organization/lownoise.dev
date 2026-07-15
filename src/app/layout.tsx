import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/lib/ThemeContext";
import "./globals.css";

const pixelFont = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = "https://lownoise.dev";

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: {
    template: "%s | Low Noise",
    default: "Low Noise — Independent Software Engineering Studio",
  },
  description:
    "An independent software engineering studio. Quiet, intentional, precise. Building elegant, open-source tools and applications with obsessive attention to quality and maintainability.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: { siteName: "Low Noise", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", creator: "@Low_Noise" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Low Noise",
  description: "Independent software engineering studio. Quiet, intentional, precise. Building elegant, open-source tools and applications.",
  url: siteUrl,
  foundingDate: "2024",
  knowsAbout: ["Software Engineering", "Java", "Rust", "Kotlin", "Systems Programming", "Linux", "Open Source"],
  sameAs: ["https://github.com/Low-Noise-Organization", "https://www.youtube.com/@Low_Noise-n4e"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixelFont.variable} h-full`} data-theme="dark">
      <body className="min-h-full flex flex-col bg-bg-deep text-text-primary scanlines">
        <a
          href="#main-content"
          className="fixed -top-40 left-4 z-[9999] border-2 border-border bg-base px-4 py-2 text-xs text-accent transition-all duration-200 focus:top-0 focus:outline-2 focus:outline-offset-2 focus:outline-accent"
          style={{ boxShadow: "inset -2px -2px 0 0 var(--color-surface0), inset 2px 2px 0 0 var(--color-overlay1)" }}
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider>
          <Navigation />
          <main id="main-content" className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
