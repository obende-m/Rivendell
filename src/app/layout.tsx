import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { JsonLd } from "@/components/seo/JsonLd";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Rivendell Consults | Building Legacies Through Design",
    template: "%s | Rivendell Consults",
  },
  description:
    "Rivendell Consults delivers exceptional architecture, construction, and real estate developments through innovation, precision, and craftsmanship.",
  keywords: [
    "architecture",
    "construction",
    "real estate",
    "luxury development",
    "interior design",
    "project management",
    "Nigeria",
    "Lagos",
  ],
  authors: [{ name: "Rivendell Consults" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rivendell Consults",
    title: "Rivendell Consults | Building Legacies Through Design",
    description:
      "Exceptional architecture, construction, and real estate developments through innovation, precision, and craftsmanship.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivendell Consults | Building Legacies Through Design",
    description:
      "Exceptional architecture, construction, and real estate developments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${manrope.variable}`} style={{ colorScheme: "dark" }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="font-manrope text-body-md text-on-surface antialiased bg-background">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}


