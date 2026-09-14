import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "PAUSE TV NEWS LIMITED",
  description:
    "Credible News. Engaging Entertainment. We keep our audience informed, inspired, and entertained — one story at a time.",
  keywords: [
    "comedy show",
    "interviews",
    "news comedy",
    "late night",
    "entertainment",
  ],
  authors: [{ name: "PauseTV" }],
  creator: "PauseTV",
  publisher: "PauseTV",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "PAUSE TV NEWS LIMITED",
    description:
      "Credible News. Engaging Entertainment. We keep our audience informed, inspired, and entertained — one story at a time.",
    siteName: "PAUSE TV NEWS LIMITED",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Credible News. Engaging Entertainment. We keep our audience informed, inspired, and entertained — one story at a time.s",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAUSE TV NEWS LIMITED",
    description:
      "Credible News. Engaging Entertainment. We keep our audience informed, inspired, and entertained — one story at a time.",
    images: [`${baseUrl}/og-image.png`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PauseTV",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Credible News. Engaging Entertainment. We keep our audience informed, inspired, and entertained — one story at a time.",
    sameAs: [
      "https://web.facebook.com/groups/797965853581493/",
      "https://www.youtube.com/@pausetvnewsltd",
      "https://www.instagram.com/pausetvnews1976/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "pausetvofficial@gmail.com",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="canonical" href={baseUrl} />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="PauseTV" />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        {children}
        <SanityLive />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
