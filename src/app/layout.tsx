import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/layout/footer";
import StructuredData from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Studio 587 | Web Development & Branding in Canmore & Bow Valley",
    template: "%s | Studio 587",
  },
  description:
    "Professional web development, branding, and digital marketing services for businesses in Canmore, Banff, and the Bow Valley. Custom websites that drive results.",
  keywords: [
    "web development Canmore",
    "website design Bow Valley",
    "Canmore branding agency",
    "digital marketing Banff",
    "web developer Alberta",
  ],
  authors: [{ name: "Studio 587" }],
  creator: "Studio 587",
  metadataBase: new URL("https://studio587.ca"),
  alternates: {
    canonical: "/",
  },
  // Open Graph tags
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Studio 587",
    title: "Studio 587 | Web Development & Branding in Canmore & Bow Valley",
    description:
      "Professional web development, branding, and digital marketing for Canmore and Bow Valley businesses.",
    images: [
      { url: "/Studio587_OpenGraph_Image.jpg", width: 1200, height: 630 },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Studio 587 | Web Development in Canmore",
    description:
      "Professional web development, branding, and digital marketing for Canmore and Bow Valley businesses.",
  },
  // Geo targeting
  other: {
    "geo.region": "CA-AB",
    "geo.placename": "Canmore",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        {children}

        {/* Next.js version */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MLZ32JK0PG"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MLZ32JK0PG');
    `,
          }}
        />
      </body>
    </html>
  );
}
