import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

const siteUrl = "https://lownoise.dev";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "Low Noise — Independent Software Engineering Studio",
  description:
    "An independent software engineering studio. Quiet, intentional, precise. Building elegant, open-source tools and applications with obsessive attention to quality and maintainability.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Low Noise — Independent Software Engineering Studio",
    description:
      "An independent software engineering studio. Quiet, intentional, precise. Building elegant, open-source tools and applications with obsessive attention to quality and maintainability.",
    url: "/",
    siteName: "Low Noise",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Low Noise — Independent Software Engineering Studio",
    description:
      "An independent software engineering studio. Quiet, intentional, precise. Building elegant, open-source tools and applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Low Noise",
  description:
    "Independent software engineering studio. Quiet, intentional, precise. Building elegant, open-source tools and applications.",
  url: siteUrl,
  foundingDate: "2024",
  knowsAbout: [
    "Software Engineering",
    "Java",
    "Rust",
    "Kotlin",
    "Systems Programming",
    "Linux",
    "Open Source",
  ],
  sameAs: [
    "https://github.com/Low-Noise-Organization",
    "https://www.youtube.com/@Low_Noise-n4e",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#main-content"
          className="fixed -top-40 left-4 z-[9999] rounded-b-lg border border-border bg-bg-deep px-4 py-2 font-mono text-xs tracking-wider text-accent transition-all duration-200 focus:top-0 focus:outline-2 focus:outline-offset-2 focus:outline-accent"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
