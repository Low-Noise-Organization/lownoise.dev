import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://low-noise-organization.github.io/lownoise.dev/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Low Noise", template: "%s | Low Noise" },
  description: "Software crafted with intention. Open-source tools, systems and apps with less noise and more craftsmanship.",
  icons: { icon: "favicon.svg" },
  openGraph: { siteName: "Low Noise", type: "website" },
};

// Applies the saved theme before first paint to avoid a flash.
const themeScript = `try{var t=new URLSearchParams(location.search).get('t')||localStorage.getItem('ln-theme');if(t==='washi')document.documentElement.dataset.theme='washi'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
