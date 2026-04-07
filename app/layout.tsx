import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { Analytics } from "@/components/Analytics";
import { CommandPalette } from "@/components/CommandPalette";
import { JsonLd } from "@/components/JsonLd";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { Providers } from "@/components/shared/Providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mdkhaledbin.me"),
  title: {
    default: "Md Khaled Bin | Full-Stack Engineer & AI Specialist",
    template: "%s | Md Khaled Bin",
  },
  description:
    "Full-Stack Engineer specializing in AI systems, scalable web applications, and competitive programming. Codeforces Pupil - SUST CSE - 20+ shipped projects.",
  keywords: [
    "Full-Stack Engineer",
    "AI Specialist",
    "Next.js",
    "React",
    "Python",
    "Competitive Programming",
  ],
  authors: [{ name: "Md Khaled Bin", url: "https://mdkhaledbin.me" }],
  creator: "Md Khaled Bin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdkhaledbin.me",
    siteName: "MD Khaled Bin Portfolio",
    title: "MD Khaled Bin | Full-Stack Engineer & AI Specialist",
    description:
      "Full-Stack Engineer specializing in AI systems and scalable applications.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Md Khaled Bin - Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Khaled Bin | Full-Stack Engineer",
    description: "Building AI systems and scalable applications",
    creator: "@mdkhaledbin",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="grain-texture min-h-full flex flex-col bg-background text-foreground">
        <Script
          data-goatcounter="https://mdkhaledbin.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
        <Providers>
          <JsonLd />
          <Analytics />
          <CommandPalette />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-9999 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content" className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
