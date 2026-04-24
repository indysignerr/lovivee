import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getContent, type GeneralSettings } from "@/lib/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lovive.fr"),
  title: "L'Ovive — Pizzeria & Restaurant à Biot",
  description:
    "Pizzeria et restaurant à Biot. Pizzas au four, plats cuisinés maison, terrasse au calme. Réservation au 04 93 65 07 83.",
  keywords: ["pizzeria Biot", "restaurant Biot", "pizza Biot", "L'Ovive", "restaurant 06410"],
  openGraph: {
    title: "L'Ovive — Pizzeria & Restaurant à Biot",
    description: "Une table posée là, entre pierre et Méditerranée.",
    type: "website",
    locale: "fr_FR",
    siteName: "L'Ovive",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Ovive — Pizzeria & Restaurant à Biot",
    description: "Une table posée là, entre pierre et Méditerranée.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getContent<GeneralSettings>("settings/general.json");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings.name,
    image: "https://lovive.fr/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Biot",
      postalCode: "06410",
      addressCountry: "FR",
    },
    telephone: settings.phoneRaw,
    servesCuisine: ["Italian", "French", "Pizza"],
    priceRange: "€€",
    openingHours: ["Mo-Fr 12:00-14:00", "Mo-Sa 19:00-21:00"],
    url: "https://lovive.fr",
  };

  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
