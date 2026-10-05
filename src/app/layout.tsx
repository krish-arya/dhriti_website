import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const description = `${site.name} — ${site.credentials.join(", ")}. A thoughtful, non-judgmental space to pause, understand and grow.`;

export const metadata: Metadata = {
  title: `${site.name} · ${site.credentials[0]} | ${site.brand}`,
  description,
  openGraph: {
    title: `${site.brand} — ${site.name}`,
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ece1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
