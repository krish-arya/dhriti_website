import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
// Global styles first, so component styles can override them
import "./globals.css";
import AmbientSound from "@/components/AmbientSound";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import { site } from "@/content/site";

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

const description = `${site.name} is an RCI licensed psychologist and certified art therapist based in Delhi, offering online therapy for children, adolescents and adults — art therapy, CBT, DBT, mindfulness and play therapy.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title: {
    default: `${site.name} | RCI Licensed Psychologist & Art Therapist in Delhi · Online Therapy`,
    template: `%s | ${site.brand}`,
  },
  description,
  openGraph: {
    title: `${site.brand} — ${site.name}`,
    description,
    type: "website",
    locale: "en_IN",
    siteName: site.brand,
    images: [{ url: "/images/dhriti-singh.jpg", width: 1532, height: 1744, alt: site.portrait.alt }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f4ece1",
};

/** Tells search engines who she is, what she offers and where. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#dhriti`,
      name: site.name,
      jobTitle: "RCI Licensed Psychologist & Certified Art Therapist",
      image: `${site.url}/images/dhriti-singh.jpg`,
      url: `${site.url}/about`,
      worksFor: { "@id": `${site.url}/#practice` },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: `RCI Licensed Psychologist (CRR No. ${site.rciNumber})`,
          recognizedBy: { "@type": "Organization", name: "Rehabilitation Council of India" },
        },
        { "@type": "EducationalOccupationalCredential", name: "M.A. Clinical Psychology" },
        { "@type": "EducationalOccupationalCredential", name: "Certified Art Therapist" },
      ],
      sameAs: [site.instagram.url],
    },
    {
      "@type": ["ProfessionalService", "MedicalBusiness"],
      "@id": `${site.url}/#practice`,
      name: site.brand,
      url: site.url,
      logo: `${site.url}/images/logo.png`,
      image: `${site.url}/images/dhriti-singh.jpg`,
      description,
      telephone: `+${site.whatsapp.number}`,
      email: site.email,
      founder: { "@id": `${site.url}/#dhriti` },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.country,
      },
      areaServed: [
        { "@type": "City", name: "Delhi" },
        { "@type": "Country", name: "India" },
      ],
      availableChannel: { "@type": "ServiceChannel", name: "Online sessions", serviceUrl: site.url },
      knowsAbout: [
        "Art therapy",
        "Mindfulness-based therapy",
        "Dialectical behaviour therapy",
        "Cognitive behavioural therapy",
        "Play therapy",
        "Child and adolescent psychotherapy",
        "Emotional regulation",
        "Learning disabilities",
      ],
      sameAs: [site.instagram.url],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Footer />
        {/* In the layout so they persist across pages — the music keeps playing on navigation */}
        <RevealObserver />
        <AmbientSound />
      </body>
    </html>
  );
}
